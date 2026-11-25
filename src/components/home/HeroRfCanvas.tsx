import React, { useEffect, useRef } from 'react';

/**
 * Architectural 3D Time–Frequency / FMCW Range Profile canvas with interactive
 * Monostatic TX -> Hero Text Point Scattering -> RX Echo physics for the HomePage hero.
 *
 *   - Click anywhere on hero: Spawns a TX transceiver emitting a crisp spherical RF wave.
 *     As the wavefront strikes the real glyph outlines of "Intelligent Radio Sensing Lab",
 *     individual radar detection points are stamped along each letter, vivid reflected RX
 *     spherical arcs & echo pulse rays bounce back to the receiver, and the right-side
 *     Range Profile dynamically updates its range-FFT peaks from the true measured distances.
 *   - Interactive Range Profile (right side): Hovering across the Range Profile bins
 *     scrubs a precision range-gate cursor, illuminates the matching beat-frequency 3D
 *     sine wave, and projects a live constant-range gate arc from the transceiver that
 *     highlights the exact stamped letter points at that range.
 */

interface RangeBinSpec {
  /** Beat-frequency cycles across normalized time t ∈ [-1, 1] (proportional to range) */
  cycles: number;
  /** Normalized coordinate along Range Profile axis z ∈ [-0.86, 0.86] */
  zRange: number;
  /** Resting ambient baseline amplitude */
  baseAmp: number;
  modAmp: number;
  modSpeed: number;
  modPhase: number;
  waveSpeed: number;
  wavePhase: number;
}

interface TextScatterer {
  x: number;
  y: number;
  nx: number;
  ny: number;
}

interface EchoScatter {
  sx: number;
  sy: number;
  dist: number;
  hitTime: number;
  rxTime: number;
  returnAngle: number;
  emitsArc: boolean;
  strength: number;
  binIdx: number;
  rxTriggered: boolean;
}

interface ActiveRadarCapture {
  txX: number;
  txY: number;
  age: number;
  minDist: number;
  maxDist: number;
  maxTxRadius: number;
  waveDoneTime: number;
  fadeTimer: number;
  rxPulse: number;
  rxReceived: boolean;
  firstRxTime: number;
  /** Target Range Profile amplitude per bin computed from real glyph reflection distances */
  measuredBins: Float32Array;
  /** Arrived (time-gated) Range Profile amplitude per bin as RX echoes reach receiver */
  arrivedBins: Float32Array;
  scatters: EchoScatter[];
}

const RANGE_BINS: readonly RangeBinSpec[] = [
  { cycles: 1.4, zRange: -0.86, baseAmp: 0.56, modAmp: 0.11, modSpeed: 0.34, modPhase: 0.4, waveSpeed: 0.82, wavePhase: 0.2 },
  { cycles: 2.3, zRange: -0.61, baseAmp: 0.92, modAmp: 0.12, modSpeed: 0.28, modPhase: 1.7, waveSpeed: 1.0, wavePhase: 1.2 },
  { cycles: 3.3, zRange: -0.37, baseAmp: 0.48, modAmp: 0.13, modSpeed: 0.38, modPhase: 3.1, waveSpeed: 1.18, wavePhase: 2.4 },
  { cycles: 4.4, zRange: -0.12, baseAmp: 0.84, modAmp: 0.12, modSpeed: 0.31, modPhase: 4.5, waveSpeed: 1.36, wavePhase: 3.5 },
  { cycles: 5.5, zRange: 0.12, baseAmp: 0.42, modAmp: 0.12, modSpeed: 0.41, modPhase: 0.9, waveSpeed: 1.54, wavePhase: 0.8 },
  { cycles: 6.7, zRange: 0.37, baseAmp: 0.76, modAmp: 0.12, modSpeed: 0.33, modPhase: 2.3, waveSpeed: 1.72, wavePhase: 1.9 },
  { cycles: 7.9, zRange: 0.61, baseAmp: 0.38, modAmp: 0.11, modSpeed: 0.39, modPhase: 3.8, waveSpeed: 1.9, wavePhase: 3.1 },
  { cycles: 9.2, zRange: 0.86, baseAmp: 0.58, modAmp: 0.11, modSpeed: 0.29, modPhase: 5.2, waveSpeed: 2.08, wavePhase: 4.4 },
];

const BIN_COUNT = RANGE_BINS.length;

// Single calm entrance reveal: brief composite beat wave -> steady 3D Range Profile view
const INTRO_HOLD = 0.6;
const INTRO_UNFOLD = 1.8;
const REST_THETA = 0.76;

const TIME_Z = -1.16;
const FREQ_X = 1.12;
const TIME_SAMPLES = 132;
const SPEC_SAMPLES = 256;

// Visual RF propagation speed (px/s)
const WAVE_SPEED = 450;

const clamp = (v: number, min: number, max: number): number =>
  v < min ? min : v > max ? max : v;

const smoothstep = (edge0: number, edge1: number, x: number): number => {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};

const smootherstep = (t: number): number => {
  const c = clamp(t, 0, 1);
  return c * c * c * (c * (c * 6 - 15) + 10);
};

const hannSpectrumKernel = (u: number): number => {
  const au = Math.abs(u);
  if (au < 1e-4) return 1;
  if (Math.abs(au - 1) < 1e-4) return 0.5;
  const piU = Math.PI * u;
  return Math.sin(piU) / (piU * (1 - u * u));
};

const timeEdgeWindow = (t: number): number => {
  const a = Math.abs(t);
  if (a >= 1) return 0;
  if (a <= 0.78) return 1;
  const r = (a - 0.78) / 0.22;
  return 0.5 * (1 + Math.cos(Math.PI * r));
};

const getRevealTheta = (elapsed: number): number => {
  if (elapsed <= INTRO_HOLD) return 0;
  if (elapsed >= INTRO_HOLD + INTRO_UNFOLD) return REST_THETA;
  return smootherstep((elapsed - INTRO_HOLD) / INTRO_UNFOLD) * REST_THETA;
};

/**
 * Samples real glyph boundary scatterers from `.hero-title` onto an offscreen canvas
 * and offsets each point slightly outward along its normal so stamped detection dots
 * remain sharp and visible around every letter.
 */
function sampleHeroTitleScatterers(canvas: HTMLCanvasElement): TextScatterer[] {
  const parent = canvas.parentElement;
  if (!parent) return [];
  const titleEl = parent.querySelector('.hero-title') as HTMLElement | null;
  if (!titleEl) return [];

  const canvasRect = canvas.getBoundingClientRect();
  const titleRect = titleEl.getBoundingClientRect();
  const relLeft = titleRect.left - canvasRect.left;
  const relTop = titleRect.top - canvasRect.top;
  const boxW = Math.ceil(titleRect.width);
  const boxH = Math.ceil(titleRect.height);
  if (boxW < 20 || boxH < 20) return [];

  const off = document.createElement('canvas');
  off.width = boxW;
  off.height = boxH;
  const octx = off.getContext('2d', { willReadFrequently: true });
  if (!octx) return [];

  const cs = window.getComputedStyle(titleEl);
  const fontSize = parseFloat(cs.fontSize) || 56;
  const lineHeight = parseFloat(cs.lineHeight) || fontSize * 1.07;
  const fontWeight = cs.fontWeight || '700';
  const fontFamily = cs.fontFamily || 'Inter, sans-serif';

  const rawText = (titleEl.innerText || titleEl.textContent || '').trim();
  const lines = rawText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length === 0) return [];

  octx.clearRect(0, 0, boxW, boxH);
  octx.fillStyle = '#000';
  octx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  octx.textAlign = 'left';
  octx.textBaseline = 'top';

  const ls = cs.letterSpacing;
  if (ls && ls !== 'normal' && 'letterSpacing' in octx) {
    (octx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = ls;
  }

  const verticalPad = Math.max(0, (lineHeight - fontSize) * 0.42);
  for (let li = 0; li < lines.length; li++) {
    octx.fillText(lines[li], 0, li * lineHeight + verticalPad);
  }

  const img = octx.getImageData(0, 0, boxW, boxH).data;
  const alphaAt = (x: number, y: number): number => {
    if (x < 0 || x >= boxW || y < 0 || y >= boxH) return 0;
    return img[(y * boxW + x) * 4 + 3];
  };

  const candidates: TextScatterer[] = [];
  const scanStep = 3;
  for (let y = 2; y < boxH - 2; y += scanStep) {
    for (let x = 2; x < boxW - 2; x += scanStep) {
      if (alphaAt(x, y) < 120) continue;
      const aL = alphaAt(x - 2, y);
      const aR = alphaAt(x + 2, y);
      const aU = alphaAt(x, y - 2);
      const aD = alphaAt(x, y + 2);
      if (aL < 70 || aR < 70 || aU < 70 || aD < 70) {
        const gx = aL - aR;
        const gy = aU - aD;
        const gl = Math.hypot(gx, gy);
        const nx = gl > 1 ? gx / gl : 1;
        const ny = gl > 1 ? gy / gl : 0;
        // Offset 3.2px outward so stamped detection points sit cleanly outside letter ink
        candidates.push({
          x: relLeft + x + nx * 3.2,
          y: relTop + y + ny * 3.2,
          nx,
          ny,
        });
      }
    }
  }

  // Blue-noise spatial spacing so individual stamped points trace every letter distinctly
  const selected: TextScatterer[] = [];
  const minSpacing = Math.max(15, Math.min(23, boxW / 23));
  const minSpacingSq = minSpacing * minSpacing;
  const stride = Math.max(1, Math.floor(candidates.length / 260));

  for (let pass = 0; pass < 2; pass++) {
    for (let i = pass; i < candidates.length; i += stride) {
      const c = candidates[i];
      let tooClose = false;
      for (let j = 0; j < selected.length; j++) {
        const dx = c.x - selected[j].x;
        const dy = c.y - selected[j].y;
        if (dx * dx + dy * dy < minSpacingSq) {
          tooClose = true;
          break;
        }
      }
      if (!tooClose) {
        selected.push(c);
        if (selected.length >= 64) return selected;
      }
    }
  }

  return selected;
}

export const HeroRfCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const pointer = {
      px: 0,
      py: 0,
      normX: 0.72,
      normY: 0.5,
      targetNormX: 0.72,
      targetNormY: 0.5,
      overGraphic: false,
      graphicStrength: 0,
      scrubbingProfile: false,
      scrubZ: 0,
      scrubStrength: 0,
    };

    let width = 0;
    let height = 0;
    let rafId = 0;
    let simTime = 0;
    let introClock = 0;
    let lastTs = performance.now();

    let textScatterers: TextScatterer[] = [];
    let activeCapture: ActiveRadarCapture | null = null;

    const liveAmps = new Float32Array(BIN_COUNT);
    const hoverWeights = new Float32Array(BIN_COUNT);
    // Smooth blend factor [0..1] between ambient resting profile and live measured click Range Profile
    let measuredMix = 0;

    const rebuildTextScatterers = () => {
      textScatterers = sampleHeroTitleScatterers(canvas);
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rebuildTextScatterers();
    };

    const spawnTxCapture = (txX: number, txY: number) => {
      if (textScatterers.length === 0) rebuildTextScatterers();

      let minDist = Infinity;
      let maxDist = 0;

      const rawHits = textScatterers.map((pt) => {
        const dx = txX - pt.x;
        const dy = txY - pt.y;
        const dist = Math.max(20, Math.hypot(dx, dy));
        const ux = dx / dist;
        const uy = dy / dist;
        const facing = pt.nx * ux + pt.ny * uy;
        const strength = clamp(0.48 + Math.max(0, facing) * 0.52, 0.45, 1.0);
        if (dist < minDist) minDist = dist;
        if (dist > maxDist) maxDist = dist;
        return {
          sx: pt.x,
          sy: pt.y,
          dist,
          returnAngle: Math.atan2(dy, dx),
          facing,
          strength,
        };
      });

      rawHits.sort((a, b) => a.dist - b.dist);

      // Map physical distances into the 8 Range Profile bins using fixed absolute scale
      // so clicking closer vs. farther visibly shifts the Range Profile peaks left vs. right!
      const absMaxRange = Math.max(width * 0.66, maxDist + 30);
      const absMinRange = 28;
      const absRangeSpan = Math.max(absMaxRange - absMinRange, 220);

      const binSums = new Float32Array(BIN_COUNT);
      const scatters: EchoScatter[] = [];
      const arcAnchors: { x: number; y: number }[] = [];
      const arcMinGap = Math.max(38, Math.min(62, width * 0.044));
      const arcMinGapSq = arcMinGap * arcMinGap;

      for (let i = 0; i < rawHits.length; i++) {
        const h = rawHits[i];
        let emitsArc = false;
        if (arcAnchors.length < 12 && h.facing > -0.3) {
          let spaced = true;
          for (let j = 0; j < arcAnchors.length; j++) {
            const adx = h.sx - arcAnchors[j].x;
            const ady = h.sy - arcAnchors[j].y;
            if (adx * adx + ady * ady < arcMinGapSq) {
              spaced = false;
              break;
            }
          }
          if (spaced) {
            emitsArc = true;
            arcAnchors.push({ x: h.sx, y: h.sy });
          }
        }

        const rNorm = clamp((h.dist - absMinRange) / absRangeSpan, 0, 0.999);
        const binIdx = Math.floor(rNorm * BIN_COUNT);
        // Stronger returns contribute proportionally to that Range bin's peak energy
        binSums[binIdx] += h.strength * (emitsArc ? 1.45 : 0.75);

        scatters.push({
          sx: h.sx,
          sy: h.sy,
          dist: h.dist,
          hitTime: h.dist / WAVE_SPEED,
          rxTime: (2 * h.dist) / WAVE_SPEED,
          returnAngle: h.returnAngle,
          emitsArc,
          strength: h.strength,
          binIdx,
          rxTriggered: false,
        });
      }

      // Normalize bin energy to a crisp Range Profile [0.14 .. 1.06]
      let peakSum = 0.01;
      for (let k = 0; k < BIN_COUNT; k++) {
        if (binSums[k] > peakSum) peakSum = binSums[k];
      }
      const measuredBins = new Float32Array(BIN_COUNT);
      for (let k = 0; k < BIN_COUNT; k++) {
        measuredBins[k] = binSums[k] > 0.01 ? 0.18 + (binSums[k] / peakSum) * 0.88 : 0.1;
      }

      const farDist = Number.isFinite(maxDist) && maxDist > 0 ? maxDist : width * 0.55;
      const nearDist = Number.isFinite(minDist) ? minDist : 160;
      const waveDoneTime = (2 * farDist) / WAVE_SPEED + 0.45;

      activeCapture = {
        txX,
        txY,
        age: 0,
        minDist: absMinRange,
        maxDist: absMaxRange,
        maxTxRadius: Math.max(farDist + 100, width * 0.52),
        waveDoneTime,
        fadeTimer: 0,
        rxPulse: 0,
        rxReceived: false,
        firstRxTime: (2 * nearDist) / WAVE_SPEED,
        measuredBins,
        arrivedBins: new Float32Array(BIN_COUNT).fill(0.1),
        scatters,
      };
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (!inside) {
        pointer.overGraphic = false;
        pointer.scrubbingProfile = false;
        return;
      }

      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      const nx = px / Math.max(rect.width, 1);
      const ny = py / Math.max(rect.height, 1);

      pointer.px = px;
      pointer.py = py;
      pointer.overGraphic = rect.width >= 768 && nx >= 0.42;
      if (pointer.overGraphic) {
        pointer.targetNormX = nx;
        pointer.targetNormY = ny;
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      if (reducedMotion) return;
      const targetEl = e.target as HTMLElement | null;
      if (targetEl && targetEl.closest('button, a')) return;

      const rect = canvas.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      if (px < 0 || px > rect.width || py < 0 || py > rect.height) return;

      spawnTxCapture(px, py);
    };

    const onPointerLeave = () => {
      pointer.overGraphic = false;
      pointer.scrubbingProfile = false;
    };

    resize();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        rebuildTextScatterers();
      });
    }

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    document.addEventListener('pointerleave', onPointerLeave, { passive: true });

    const draw = (now: number) => {
      if (width === 0 || height === 0) return;

      const dt = Math.min(0.05, Math.max(0.001, (now - lastTs) * 0.001));
      lastTs = now;

      if (!reducedMotion) {
        simTime += dt;
        introClock += dt;
      }

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const isCompact = width < 768;
      const isTablet = width >= 768 && width < 1040;

      // Smooth pointer interpolation for right-side 3D Range Profile interaction
      const graphicEase = 1 - Math.exp(-dt * 4.5);
      pointer.normX += (pointer.targetNormX - pointer.normX) * graphicEase;
      pointer.normY += (pointer.targetNormY - pointer.normY) * graphicEase;
      pointer.graphicStrength +=
        ((pointer.overGraphic ? 1 : 0) - pointer.graphicStrength) * (1 - Math.exp(-dt * 4.0));

      // Advance active monostatic TX -> Text Points -> RX capture
      let captureFade = 0;
      if (activeCapture) {
        const cap = activeCapture;
        cap.age += dt;
        cap.rxPulse *= Math.exp(-dt * 4.5);

        // Trigger RX bin arrivals at exact round-trip time of flight (2d / c)
        for (let si = 0; si < cap.scatters.length; si++) {
          const sc = cap.scatters[si];
          if (!sc.rxTriggered && cap.age >= sc.rxTime) {
            sc.rxTriggered = true;
            cap.rxReceived = true;
            cap.rxPulse = Math.min(1, cap.rxPulse + (sc.emitsArc ? 0.56 : 0.12));
          }
        }

        // Smoothly grow each Range Profile bin toward its measured value once echoes for that bin arrive
        const binEase = 1 - Math.exp(-dt * 6.5);
        for (let k = 0; k < BIN_COUNT; k++) {
          // Bin k's approximate round-trip arrival time
          const binDist = cap.minDist + ((k + 0.5) / BIN_COUNT) * (cap.maxDist - cap.minDist);
          const binRxReady = cap.age >= (2 * binDist) / WAVE_SPEED - 0.08;
          const targetVal = binRxReady ? cap.measuredBins[k] : 0.1;
          cap.arrivedBins[k] += (targetVal - cap.arrivedBins[k]) * binEase;
        }

        // Hold stamped points & live Range Profile open while user scrubs the Range Profile;
        // otherwise gently linger for 5.2s after echoes complete before smoothly fading back
        if (cap.age > cap.waveDoneTime) {
          if (pointer.scrubbingProfile) {
            cap.fadeTimer = Math.max(0, cap.fadeTimer - dt * 2.5);
          } else {
            cap.fadeTimer += dt;
          }
        }

        const holdDuration = 5.2;
        const fadeDuration = 1.1;
        captureFade =
          cap.fadeTimer <= holdDuration
            ? 1
            : 1 - smoothstep(holdDuration, holdDuration + fadeDuration, cap.fadeTimer);

        if (cap.fadeTimer >= holdDuration + fadeDuration) {
          activeCapture = null;
          captureFade = 0;
        }
      }

      // Smoothly blend Range Profile between resting ambient waves and live click-measured profile
      const targetMix = activeCapture && activeCapture.rxReceived ? captureFade : 0;
      measuredMix += (targetMix - measuredMix) * (1 - Math.exp(-dt * 5.0));

      for (let k = 0; k < BIN_COUNT; k++) {
        const b = RANGE_BINS[k];
        const ambient = b.baseAmp + b.modAmp * Math.sin(simTime * b.modSpeed + b.modPhase);
        const measured = activeCapture ? activeCapture.arrivedBins[k] : ambient;
        liveAmps[k] = ambient * (1 - measuredMix) + measured * measuredMix;
      }

      // Calm resting 3D isometric angle (one-shot reveal, subtle damped hover parallax)
      const baseTheta = reducedMotion ? REST_THETA : getRevealTheta(introClock);
      const revealNorm = baseTheta / REST_THETA;

      const ptrYawOffset = ((pointer.normX - 0.72) / 0.28) * 0.11 * pointer.graphicStrength * revealNorm;
      const ptrPitchOffset = (pointer.normY - 0.5) * 0.05 * pointer.graphicStrength * revealNorm;

      const theta = clamp(baseTheta + ptrYawOffset, 0, Math.PI * 0.46);
      const pitch = Math.sin(2 * theta) * 0.37 + ptrPitchOffset;

      const cosT = Math.cos(theta);
      const sinT = Math.sin(theta);
      const cosP = Math.cos(pitch);
      const sinP = Math.sin(pitch);

      const regionLeft = width * (isCompact ? 0.06 : isTablet ? 0.41 : 0.45);
      const regionRight = width * (isCompact ? 0.94 : 0.935);
      const regionW = Math.max(regionRight - regionLeft, 180);

      const isoCenterShift = Math.sin(2 * theta) * height * 0.035;
      const cx = regionLeft + regionW * 0.5;
      const cy = height * 0.5 + isoCenterShift;

      const diagFit = 1 / (1 + 0.39 * Math.sin(2 * theta));
      const scaleX = Math.min(regionW * 0.435 * diagFit, 268);
      const scaleY = Math.min(height * (isCompact ? 0.27 : 0.31), 148);
      const scaleZ = scaleX * 0.85;

      const project = (x: number, y: number, z: number): [number, number] => {
        const xr = x * cosT + z * sinT;
        const zr = -x * sinT + z * cosT;
        const sx = cx + xr * scaleX;
        const sy = cy - y * scaleY * cosP - zr * scaleZ * sinP * 0.52;
        return [sx, sy];
      };

      const thetaNorm = theta / (Math.PI * 0.5);
      const mobileScale = isCompact ? 0.46 : 1.0;
      const compositeAlpha = mobileScale;
      const harmonicsAlpha = smoothstep(0.06, 0.34, thetaNorm) * mobileScale;
      const spectrumAlpha = smoothstep(0.1, 0.38, thetaNorm) * mobileScale;
      const guideAlpha = Math.sin(2 * theta) * mobileScale;
      const timeGhostAlpha = (1 - smoothstep(0.05, 0.28, thetaNorm)) * 0.16 * mobileScale;

      // ======================================================================
      // INTERACTIVE RANGE PROFILE SCRUBBER (continuous along the right-side axis!)
      // ======================================================================
      const specSpan = 1.02;
      const [axisStartX, axisStartY] = project(FREQ_X, 0, -specSpan);
      const [axisEndX, axisEndY] = project(FREQ_X, 0, specSpan);

      let hoveredBinIdx = -1;
      let isScrubbingNow = false;

      if (pointer.overGraphic && spectrumAlpha > 0.35 && !isCompact) {
        // Project cursor onto the 2D screen line of the Range Profile axis
        const axDx = axisEndX - axisStartX;
        const axDy = axisEndY - axisStartY;
        const axLenSq = Math.max(axDx * axDx + axDy * axDy, 1);
        const rawT = ((pointer.px - axisStartX) * axDx + (pointer.py - axisStartY) * axDy) / axLenSq;
        const clampedT = clamp(rawT, 0, 1);
        const onAxisY = axisStartY + clampedT * axDy;

        // Cursor counts as scrubbing the Range Profile when above/near the axis span
        const dyFromAxis = onAxisY - pointer.py; // Positive when cursor is above the baseline
        const withinHoriz = rawT >= -0.06 && rawT <= 1.06;
        const withinVert = dyFromAxis >= -36 && dyFromAxis <= scaleY * 1.45;

        if (withinHoriz && withinVert) {
          isScrubbingNow = true;
          const targetZ = -specSpan + clampedT * (specSpan * 2);
          pointer.scrubZ += (targetZ - pointer.scrubZ) * (1 - Math.exp(-dt * 18));

          // Nearest discrete Range bin to scrubbed Z
          let bestDist = Infinity;
          for (let k = 0; k < BIN_COUNT; k++) {
            const d = Math.abs(RANGE_BINS[k].zRange - pointer.scrubZ);
            if (d < bestDist) {
              bestDist = d;
              hoveredBinIdx = k;
            }
          }
        }
      }

      pointer.scrubbingProfile = isScrubbingNow;
      pointer.scrubStrength +=
        ((isScrubbingNow ? 1 : 0) - pointer.scrubStrength) * (1 - Math.exp(-dt * 11));

      const hoverEase = 1 - Math.exp(-dt * 11);
      for (let k = 0; k < BIN_COUNT; k++) {
        const target = k === hoveredBinIdx ? 1 : 0;
        hoverWeights[k] += (target - hoverWeights[k]) * hoverEase;
      }

      // Compute continuous scrubbed physical range radius (when active capture exists)
      const scrubNorm01 = clamp((pointer.scrubZ + specSpan) / (specSpan * 2), 0, 1);
      const scrubRadiusPx = activeCapture
        ? activeCapture.minDist + scrubNorm01 * (activeCapture.maxDist - activeCapture.minDist)
        : 0;
      const scrubGateHalfWidth = activeCapture
        ? ((activeCapture.maxDist - activeCapture.minDist) / BIN_COUNT) * 0.68
        : 0;

      // Color helpers: IRS Lab blues + hover chromatic shift + vivid TX/RX colors
      const hShift = pointer.graphicStrength;
      const axisRgb = isDark ? '148, 163, 184' : '15, 23, 42';
      const primaryRgb = isDark ? '71, 255, 255' : '0, 59, 209';
      const txRgb = isDark ? '71, 255, 255' : '0, 128, 255';
      const rxRgb = isDark ? '154, 165, 255' : '79, 70, 229';   // Vivid indigo reflection accent
      const rxBrightRgb = isDark ? '224, 231, 255' : '67, 56, 202';
      const hoverAccentRgb = rxRgb;

      const lerpColorRgb = (t01: number, peakHover = 0): string => {
        let r: number;
        let g: number;
        let b: number;
        if (isDark) {
          const r0 = 23 + (59 - 23) * hShift;
          const g0 = 145 + (130 - 145) * hShift;
          const b0 = 255 + (246 - 255) * hShift;
          const r1 = 71 + (94 - 71) * hShift;
          const g1 = 255 + (234 - 255) * hShift;
          const b1 = 255 + (212 - 255) * hShift;
          r = r0 + (r1 - r0) * t01;
          g = g0 + (g1 - g0) * t01;
          b = b0 + (b1 - b0) * t01;
          if (peakHover > 0.01) {
            const p = peakHover * 0.9;
            r += (154 - r) * p;
            g += (165 - g) * p;
            b += (255 - b) * p;
          }
        } else {
          const r0 = 29 * hShift;
          const g0 = 59 + (78 - 59) * hShift;
          const b0 = 209 + (216 - 209) * hShift;
          const r1 = 23 + (8 - 23) * hShift;
          const g1 = 145;
          const b1 = 255 + (178 - 255) * hShift;
          r = r0 + (r1 - r0) * t01;
          g = g0 + (g1 - g0) * t01;
          b = b0 + (b1 - b0) * t01;
          if (peakHover > 0.01) {
            const p = peakHover * 0.92;
            r += (79 - r) * p;
            g += (70 - g) * p;
            b += (229 - b) * p;
          }
        }
        return `${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}`;
      };

      const evalRangeProfile = (z: number): number => {
        let sum = 0;
        const binWidth = 0.056;
        for (let k = 0; k < BIN_COUNT; k++) {
          const u = (z - RANGE_BINS[k].zRange) / binWidth;
          if (Math.abs(u) < 4.0) {
            sum += liveAmps[k] * hannSpectrumKernel(u);
          }
        }
        const edgeTaper = smoothstep(specSpan, 0.92, Math.abs(z));
        return Math.abs(sum) * edgeTaper;
      };

      ctx.clearRect(0, 0, width, height);

      // ======================================================================
      // 1. INTERACTIVE 3D BEAT WAVEFORM & LIVE RANGE PROFILE (RIGHT SIDE)
      // ======================================================================

      // Floor hairline rails connecting each beat sinusoid to its Range Profile bin
      if (guideAlpha > 0.02) {
        for (let k = 0; k < BIN_COUNT; k++) {
          const b = RANGE_BINS[k];
          const [x0, y0] = project(-1.02, 0, b.zRange);
          const [x1, y1] = project(FREQ_X, 0, b.zRange);
          const hw = hoverWeights[k];

          ctx.beginPath();
          ctx.moveTo(x0, y0);
          ctx.lineTo(x1, y1);
          ctx.strokeStyle =
            hw > 0.05
              ? `rgba(${hoverAccentRgb}, ${((0.2 + hw * 0.5) * guideAlpha).toFixed(3)})`
              : `rgba(${axisRgb}, ${(0.13 * guideAlpha).toFixed(3)})`;
          ctx.lineWidth = 0.75 + hw * 0.65;
          ctx.stroke();
        }
      }

      // Time axis baseline
      {
        const [tx0, ty0] = project(-1.06, 0, TIME_Z);
        const [tx1, ty1] = project(1.06, 0, TIME_Z);
        ctx.beginPath();
        ctx.moveTo(tx0, ty0);
        ctx.lineTo(tx1, ty1);
        ctx.strokeStyle = `rgba(${axisRgb}, ${(0.2 * compositeAlpha).toFixed(3)})`;
        ctx.lineWidth = 0.9;
        ctx.stroke();
      }

      // Range Profile axis baseline & bin ticks
      if (spectrumAlpha > 0.02) {
        const [fx0, fy0] = project(FREQ_X, 0, -1.06);
        const [fx1, fy1] = project(FREQ_X, 0, 1.06);
        ctx.beginPath();
        ctx.moveTo(fx0, fy0);
        ctx.lineTo(fx1, fy1);
        ctx.strokeStyle = `rgba(${axisRgb}, ${(0.28 * spectrumAlpha).toFixed(3)})`;
        ctx.lineWidth = 1.0;
        ctx.stroke();

        for (let k = 0; k < BIN_COUNT; k++) {
          const zr = RANGE_BINS[k].zRange;
          const hw = hoverWeights[k];
          const [tkX, tkY] = project(FREQ_X, 0, zr);
          ctx.beginPath();
          ctx.moveTo(tkX, tkY);
          ctx.lineTo(tkX, tkY + (4 + hw * 3));
          ctx.strokeStyle =
            hw > 0.1
              ? `rgba(${hoverAccentRgb}, ${(0.75 * spectrumAlpha).toFixed(3)})`
              : `rgba(${axisRgb}, ${(0.3 * spectrumAlpha).toFixed(3)})`;
          ctx.lineWidth = 0.85 + hw * 0.45;
          ctx.stroke();
        }
      }

      // 8 constituent beat-frequency sine waves (back -> front)
      const effectiveHarmonicAlpha = Math.max(harmonicsAlpha, timeGhostAlpha);
      if (effectiveHarmonicAlpha > 0.01) {
        for (let k = BIN_COUNT - 1; k >= 0; k--) {
          const b = RANGE_BINS[k];
          const normK = k / (BIN_COUNT - 1);
          const amp = liveAmps[k];
          const hw = hoverWeights[k];

          const depthFactor = 0.56 + (1 - normK) * 0.44;
          // Dim non-hovered waves slightly when actively scrubbing a specific range bin
          const scrubDim = 1 - pointer.scrubStrength * (1 - hw) * 0.42;
          const strokeAlpha =
            effectiveHarmonicAlpha *
            (0.5 * depthFactor * scrubDim + hw * 0.52) *
            (isDark ? 1.06 : 0.98);
          const waveRgb = lerpColorRgb(normK, hw);

          const zWave = TIME_Z + (b.zRange - TIME_Z) * smoothstep(0.02, 0.25, thetaNorm);

          ctx.beginPath();
          for (let s = 0; s <= TIME_SAMPLES; s++) {
            const u = s / TIME_SAMPLES;
            const tVal = -1 + u * 2;
            const env = timeEdgeWindow(tVal);
            const yVal =
              amp *
              0.36 *
              env *
              Math.sin(Math.PI * b.cycles * tVal - b.waveSpeed * simTime + b.wavePhase);
            const [sx, sy] = project(tVal, yVal, zWave);
            if (s === 0) ctx.moveTo(sx, sy);
            else ctx.lineTo(sx, sy);
          }

          ctx.strokeStyle = `rgba(${waveRgb}, ${clamp(strokeAlpha, 0, 0.96).toFixed(3)})`;
          ctx.lineWidth = 1.05 + (1 - normK) * 0.3 + hw * 1.25;
          ctx.stroke();
        }
      }

      // Live Range Profile curve + stems + interactive Range Gate scrubber
      if (spectrumAlpha > 0.01) {
        const [baseMidX, baseMidY] = project(FREQ_X, 0, 0);
        const [topMidX, topMidY] = project(FREQ_X, 1.15, 0);

        // Soft vertical area fill under Range Profile
        ctx.beginPath();
        ctx.moveTo(axisStartX, axisStartY);
        for (let s = 0; s <= SPEC_SAMPLES; s++) {
          const zVal = -specSpan + (s / SPEC_SAMPLES) * (specSpan * 2);
          const mag = evalRangeProfile(zVal) * 1.12;
          const [sx, sy] = project(FREQ_X, mag, zVal);
          ctx.lineTo(sx, sy);
        }
        ctx.lineTo(axisEndX, axisEndY);
        ctx.closePath();

        const fillGrad = ctx.createLinearGradient(topMidX, topMidY, baseMidX, baseMidY);
        const fillTopRgb = lerpColorRgb(1, 0);
        const fillMidRgb = lerpColorRgb(0, 0);
        if (isDark) {
          fillGrad.addColorStop(
            0,
            `rgba(${fillTopRgb}, ${((0.22 + hShift * 0.04) * spectrumAlpha).toFixed(3)})`
          );
          fillGrad.addColorStop(0.65, `rgba(${fillMidRgb}, ${(0.08 * spectrumAlpha).toFixed(3)})`);
          fillGrad.addColorStop(1, `rgba(${fillMidRgb}, 0)`);
        } else {
          fillGrad.addColorStop(
            0,
            `rgba(${fillTopRgb}, ${((0.17 + hShift * 0.03) * spectrumAlpha).toFixed(3)})`
          );
          fillGrad.addColorStop(0.65, `rgba(${fillMidRgb}, ${(0.05 * spectrumAlpha).toFixed(3)})`);
          fillGrad.addColorStop(1, `rgba(${fillMidRgb}, 0)`);
        }
        ctx.fillStyle = fillGrad;
        ctx.fill();

        // Highlighted Range Gate band under the scrubbed range bin
        if (pointer.scrubStrength > 0.04) {
          const gateHalfZ = 0.115;
          const zL = clamp(pointer.scrubZ - gateHalfZ, -specSpan, specSpan);
          const zR = clamp(pointer.scrubZ + gateHalfZ, -specSpan, specSpan);
          const [glX, glY] = project(FREQ_X, 0, zL);
          const [grX, grY] = project(FREQ_X, 0, zR);

          ctx.beginPath();
          ctx.moveTo(glX, glY);
          const bandSteps = 24;
          for (let bs = 0; bs <= bandSteps; bs++) {
            const zv = zL + (bs / bandSteps) * (zR - zL);
            const mv = evalRangeProfile(zv) * 1.12;
            const [bx, by] = project(FREQ_X, mv, zv);
            ctx.lineTo(bx, by);
          }
          ctx.lineTo(grX, grY);
          ctx.closePath();
          ctx.fillStyle = `rgba(${rxRgb}, ${((isDark ? 0.24 : 0.18) * pointer.scrubStrength * spectrumAlpha).toFixed(3)})`;
          ctx.fill();
        }

        // Individual Range bin impulse stems + apex markers
        for (let k = 0; k < BIN_COUNT; k++) {
          const b = RANGE_BINS[k];
          const normK = k / (BIN_COUNT - 1);
          const mag = evalRangeProfile(b.zRange) * 1.12;
          const hw = hoverWeights[k];
          const peakRgb = lerpColorRgb(normK, hw);

          const [bx, by] = project(FREQ_X, 0, b.zRange);
          const [tx, ty] = project(FREQ_X, mag, b.zRange);

          ctx.beginPath();
          ctx.moveTo(bx, by);
          ctx.lineTo(tx, ty);
          ctx.strokeStyle = `rgba(${peakRgb}, ${((0.46 + hw * 0.5) * spectrumAlpha).toFixed(3)})`;
          ctx.lineWidth = 1.15 + hw * 1.15;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(tx, ty, 2.4 + hw * 1.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${isDark && hw > 0.2 ? '224, 231, 255' : peakRgb}, ${(
            (0.9 + hw * 0.1) *
            spectrumAlpha
          ).toFixed(3)})`;
          ctx.fill();
        }

        // Continuous crisp Range Profile envelope stroke
        const specStrokeGrad = ctx.createLinearGradient(
          axisStartX,
          axisStartY,
          axisEndX,
          axisEndY
        );
        const specStartRgb = lerpColorRgb(0, 0);
        const specEndRgb = lerpColorRgb(1, 0);
        specStrokeGrad.addColorStop(0, `rgba(${specStartRgb}, ${(0.92 * spectrumAlpha).toFixed(3)})`);
        specStrokeGrad.addColorStop(
          1,
          `rgba(${specEndRgb}, ${((isDark ? 0.96 : 0.94) * spectrumAlpha).toFixed(3)})`
        );

        ctx.beginPath();
        for (let s = 0; s <= SPEC_SAMPLES; s++) {
          const zVal = -specSpan + (s / SPEC_SAMPLES) * (specSpan * 2);
          const mag = evalRangeProfile(zVal) * 1.12;
          const [sx, sy] = project(FREQ_X, mag, zVal);
          if (s === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.strokeStyle = specStrokeGrad;
        ctx.lineWidth = 2.05;
        ctx.lineJoin = 'round';
        ctx.stroke();

        // Live Interactive Range-Gate Scrubber Cursor (dashed vertical cursor + range distance pill)
        if (pointer.scrubStrength > 0.04) {
          const sa = pointer.scrubStrength * spectrumAlpha;
          const magScrub = evalRangeProfile(pointer.scrubZ) * 1.12;
          const [sbx, sby] = project(FREQ_X, 0, pointer.scrubZ);
          const [stx, sty] = project(FREQ_X, magScrub, pointer.scrubZ);
          const [topX, topY] = project(FREQ_X, 1.2, pointer.scrubZ);

          ctx.save();
          ctx.setLineDash([2.5, 3]);
          ctx.beginPath();
          ctx.moveTo(sbx, sby + 4);
          ctx.lineTo(topX, topY);
          ctx.strokeStyle = `rgba(${rxRgb}, ${(sa * 0.65).toFixed(3)})`;
          ctx.lineWidth = 1.05;
          ctx.stroke();
          ctx.setLineDash([]);

          // Crisp tracking bead locked onto the Range Profile curve
          ctx.beginPath();
          ctx.arc(stx, sty, 5.2, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${rxRgb}, ${(sa * 0.45).toFixed(3)})`;
          ctx.lineWidth = 1.0;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(stx, sty, 2.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${rxBrightRgb}, ${(sa * 0.96).toFixed(3)})`;
          ctx.fill();

          // Live Range distance readout pill above cursor (ONLY while actively scrubbing)
          const rangeMetersVal = activeCapture
            ? (scrubRadiusPx / 52).toFixed(1)
            : (1.5 + scrubNorm01 * 9.1).toFixed(1);
          const dbVal = Math.round(-26 + clamp(magScrub, 0, 1.2) * 24);
          const rangeTag = `${rangeMetersVal} m  ·  ${dbVal} dB`;

          ctx.font = '600 10.5px Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
          const tw = ctx.measureText(rangeTag).width;
          const padX = 7;
          const pw = tw + padX * 2;
          const ph = 19;
          const pxBox = clamp(topX - pw * 0.5, regionLeft, width - pw - 10);
          const pyBox = Math.max(10, topY - ph - 4);

          ctx.fillStyle = isDark
            ? `rgba(11, 15, 20, ${(sa * 0.88).toFixed(3)})`
            : `rgba(255, 255, 255, ${(sa * 0.92).toFixed(3)})`;
          ctx.strokeStyle = `rgba(${rxRgb}, ${(sa * 0.36).toFixed(3)})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.roundRect(pxBox, pyBox, pw, ph, 999);
          ctx.fill();
          ctx.stroke();

          ctx.textAlign = 'left';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = `rgba(${isDark ? '224, 231, 255' : '55, 48, 163'}, ${(sa * 0.95).toFixed(3)})`;
          ctx.fillText(rangeTag, pxBox + padX, pyBox + ph * 0.5 + 0.5);
          ctx.restore();
        }
      }

      // Composite IF beat waveform (front-most plane)
      {
        const [cStartX, cStartY] = project(-1.0, 0, TIME_Z);
        const [cEndX, cEndY] = project(1.0, 0, TIME_Z);

        const compGrad = ctx.createLinearGradient(cStartX, cStartY, cEndX, cEndY);
        const compStartRgb = lerpColorRgb(0, 0);
        const compMidRgb = lerpColorRgb(0.45, 0);
        const compEndRgb = lerpColorRgb(1, 0);
        if (isDark) {
          compGrad.addColorStop(0, `rgba(${compStartRgb}, ${(0.58 * compositeAlpha).toFixed(3)})`);
          compGrad.addColorStop(0.5, `rgba(${compEndRgb}, ${(0.96 * compositeAlpha).toFixed(3)})`);
          compGrad.addColorStop(1, `rgba(${compMidRgb}, ${(0.8 * compositeAlpha).toFixed(3)})`);
        } else {
          compGrad.addColorStop(0, `rgba(${compStartRgb}, ${(0.76 * compositeAlpha).toFixed(3)})`);
          compGrad.addColorStop(0.55, `rgba(${compMidRgb}, ${(0.95 * compositeAlpha).toFixed(3)})`);
          compGrad.addColorStop(1, `rgba(${compEndRgb}, ${(0.9 * compositeAlpha).toFixed(3)})`);
        }

        if (timeGhostAlpha > 0.01) {
          ctx.beginPath();
          for (let s = 0; s <= TIME_SAMPLES; s++) {
            const tVal = -1 + (s / TIME_SAMPLES) * 2;
            const env = timeEdgeWindow(tVal);
            let sum = 0;
            for (let k = 0; k < BIN_COUNT; k++) {
              const b = RANGE_BINS[k];
              sum +=
                liveAmps[k] *
                Math.sin(Math.PI * b.cycles * tVal - b.waveSpeed * (simTime - 0.12) + b.wavePhase);
            }
            const [sx, sy] = project(tVal, sum * 0.18 * env, TIME_Z + 0.08);
            if (s === 0) ctx.moveTo(sx, sy);
            else ctx.lineTo(sx, sy);
          }
          ctx.strokeStyle = `rgba(${primaryRgb}, ${(0.22 * compositeAlpha).toFixed(3)})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        ctx.beginPath();
        for (let s = 0; s <= TIME_SAMPLES; s++) {
          const tVal = -1 + (s / TIME_SAMPLES) * 2;
          const env = timeEdgeWindow(tVal);
          let sum = 0;
          for (let k = 0; k < BIN_COUNT; k++) {
            const b = RANGE_BINS[k];
            sum +=
              liveAmps[k] *
              Math.sin(Math.PI * b.cycles * tVal - b.waveSpeed * simTime + b.wavePhase);
          }
          const [sx, sy] = project(tVal, sum * 0.18 * env, TIME_Z);
          if (s === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }

        ctx.strokeStyle = compGrad;
        ctx.lineWidth = 2.25;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.stroke();
      }

      // ======================================================================
      // 2. MONOSTATIC TX SPHERICAL WAVE -> STAMPED LETTER POINTS -> VIVID RX ECHOES
      // ======================================================================
      if (activeCapture && captureFade > 0.01) {
        const cap = activeCapture;
        const txRadius = cap.age * WAVE_SPEED;

        // (A) Outgoing TX Spherical Wavefront Packet (crisp glowing leading edge + 2 crests)
        if (txRadius < cap.maxTxRadius) {
          const txFade = Math.pow(1 - clamp(txRadius / cap.maxTxRadius, 0, 1), 1.0) * captureFade;

          // Subtle optical glow underlay on leading TX wavefront
          if (txRadius > 4) {
            ctx.beginPath();
            ctx.arc(cap.txX, cap.txY, txRadius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${txRgb}, ${(txFade * (isDark ? 0.2 : 0.15)).toFixed(3)})`;
            ctx.lineWidth = 5.5;
            ctx.stroke();
          }

          const offsets = [0, 17, 34];
          for (let w = 0; w < offsets.length; w++) {
            const r = txRadius - offsets[w];
            if (r <= 2) continue;
            const wAlpha = txFade * (w === 0 ? 0.82 : w === 1 ? 0.42 : 0.2) * (isDark ? 1.1 : 1.0);

            ctx.save();
            if (w === 2) ctx.setLineDash([4, 6]);
            ctx.beginPath();
            ctx.arc(cap.txX, cap.txY, r, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${w === 0 ? primaryRgb : txRgb}, ${clamp(wAlpha, 0, 0.94).toFixed(3)})`;
            ctx.lineWidth = w === 0 ? 2.0 : 1.05;
            ctx.stroke();
            ctx.restore();
          }
        }

        // (B) Live Interactive Range-Gate Ring on Left when Scrubbing the Range Profile!
        if (pointer.scrubStrength > 0.04 && scrubRadiusPx > 12) {
          const gateAlpha = pointer.scrubStrength * captureFade;
          ctx.save();
          // Soft highlighted range-gate band (annulus)
          ctx.beginPath();
          ctx.arc(cap.txX, cap.txY, scrubRadiusPx, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${rxRgb}, ${(gateAlpha * (isDark ? 0.16 : 0.11)).toFixed(3)})`;
          ctx.lineWidth = Math.max(12, scrubGateHalfWidth * 1.4);
          ctx.stroke();

          // Razor-sharp dashed center range-gate ring
          ctx.setLineDash([4, 5]);
          ctx.beginPath();
          ctx.arc(cap.txX, cap.txY, scrubRadiusPx, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${rxRgb}, ${(gateAlpha * (isDark ? 0.65 : 0.52)).toFixed(3)})`;
          ctx.lineWidth = 1.15;
          ctx.stroke();
          ctx.restore();
        }

        // (C) Individual Stamped Letter Detection Points + Vivid Reflected RX Arcs & Echo Rays
        for (let si = 0; si < cap.scatters.length; si++) {
          const sc = cap.scatters[si];
          const sinceHit = cap.age - sc.hitTime;
          if (sinceHit < 0) continue;

          // Distance match against currently scrubbed Range Profile cursor
          const inScrubGate =
            pointer.scrubStrength > 0.04 &&
            Math.abs(sc.dist - scrubRadiusPx) <= scrubGateHalfWidth;
          const gateProximity =
            pointer.scrubStrength > 0.04
              ? clamp(1 - Math.abs(sc.dist - scrubRadiusPx) / Math.max(scrubGateHalfWidth, 1), 0, 1) *
                pointer.scrubStrength
              : 0;

          // 1. Vivid Reflected RX Spherical Wavefront Arcs + Traveling Echo Pulse Rays
          if (sc.emitsArc) {
            const rxWaveR = sinceHit * WAVE_SPEED;
            const maxRxR = sc.dist + 55;
            if (rxWaveR > 3 && rxWaveR < maxRxR) {
              const travelRatio = rxWaveR / maxRxR;
              const rxFade =
                smoothstep(0, 0.05, travelRatio) *
                Math.pow(1 - smoothstep(0.7, 1.0, travelRatio), 1.15) *
                (0.6 + sc.strength * 0.4) *
                captureFade;

              const halfCone = 0.9;
              const startA = sc.returnAngle - halfCone;
              const endA = sc.returnAngle + halfCone;

              // Subtle luminous glow underlay on primary reflected RX arc
              ctx.beginPath();
              ctx.arc(sc.sx, sc.sy, rxWaveR, startA, endA);
              ctx.strokeStyle = `rgba(${rxRgb}, ${(rxFade * (isDark ? 0.24 : 0.16)).toFixed(3)})`;
              ctx.lineWidth = 5.0;
              ctx.stroke();

              // Crisp double reflected RX arcs
              for (let c = 0; c < 2; c++) {
                const r = rxWaveR - c * 13;
                if (r <= 3) continue;
                const arcAlpha = clamp(rxFade * (c === 0 ? 0.88 : 0.44), 0, 0.96);
                ctx.beginPath();
                ctx.arc(sc.sx, sc.sy, r, startA, endA);
                ctx.strokeStyle = `rgba(${c === 0 ? rxBrightRgb : rxRgb}, ${arcAlpha.toFixed(3)})`;
                ctx.lineWidth = c === 0 ? 2.0 : 1.05;
                ctx.stroke();
              }

              // Crisp traveling RX echo comet ray flying from the struck letter straight into RX!
              const rayProgress = rxWaveR / Math.max(sc.dist, 1);
              if (rayProgress > 0.04 && rayProgress < 1.04) {
                const headT = Math.min(1, rayProgress);
                const tailT = Math.max(0, headT - 0.18);
                const hx = sc.sx + (cap.txX - sc.sx) * headT;
                const hy = sc.sy + (cap.txY - sc.sy) * headT;
                const txPt = sc.sx + (cap.txX - sc.sx) * tailT;
                const tyPt = sc.sy + (cap.txY - sc.sy) * tailT;

                const rayGrad = ctx.createLinearGradient(txPt, tyPt, hx, hy);
                rayGrad.addColorStop(0, `rgba(${rxRgb}, 0)`);
                rayGrad.addColorStop(1, `rgba(${rxBrightRgb}, ${(rxFade * 0.78).toFixed(3)})`);

                ctx.beginPath();
                ctx.moveTo(txPt, tyPt);
                ctx.lineTo(hx, hy);
                ctx.strokeStyle = rayGrad;
                ctx.lineWidth = 1.4;
                ctx.stroke();

                // Bright leading echo packet bead
                ctx.beginPath();
                ctx.arc(hx, hy, 2.3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${rxBrightRgb}, ${(rxFade * 0.92).toFixed(3)})`;
                ctx.fill();
              }
            }
          }

          // 2. Crisp Individual Stamped Detection Point on Each Struck Letter Contour!
          const popProgress = clamp(sinceHit / 0.28, 0, 1);
          const popScale = 1 + (1 - smootherstep(popProgress)) * 0.65;
          const dimOutsideGate =
            pointer.scrubStrength > 0.05 ? 1 - pointer.scrubStrength * (1 - gateProximity) * 0.62 : 1;

          // Initial hit impact ring (crisp flash right when TX wave touches the point)
          if (sinceHit < 0.55) {
            const hp = sinceHit / 0.55;
            const hFade = Math.pow(1 - hp, 1.5) * captureFade;
            ctx.beginPath();
            ctx.arc(sc.sx, sc.sy, 3 + hp * (sc.emitsArc ? 18 : 11), 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${rxRgb}, ${(hFade * (sc.emitsArc ? 0.75 : 0.45)).toFixed(3)})`;
            ctx.lineWidth = sc.emitsArc ? 1.15 : 0.85;
            ctx.stroke();
          }

          // Color each stamped point cleanly by its Range Bin hue (matching the Range Profile!)
          const binNorm = sc.binIdx / (BIN_COUNT - 1);
          const ptRgb = inScrubGate
            ? rxBrightRgb
            : sc.emitsArc
              ? rxRgb
              : lerpColorRgb(binNorm, 0.25);

          const baseR = (sc.emitsArc ? 3.2 : 2.35) * popScale * (1 + gateProximity * 0.55);
          const ptAlpha =
            clamp((0.68 + sc.strength * 0.3) * dimOutsideGate + gateProximity * 0.35, 0.14, 0.98) *
            captureFade;

          // Outer crisp detection ring on primary points & range-gated points
          if (sc.emitsArc || gateProximity > 0.2) {
            ctx.beginPath();
            ctx.arc(sc.sx, sc.sy, baseR + 2.8 + gateProximity * 2.0, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${ptRgb}, ${((0.36 + gateProximity * 0.52) * dimOutsideGate * captureFade).toFixed(3)})`;
            ctx.lineWidth = 0.9 + gateProximity * 0.4;
            ctx.stroke();
          }

          // Crisp stamped radar detection point core
          ctx.beginPath();
          ctx.arc(sc.sx, sc.sy, baseR, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${ptRgb}, ${ptAlpha.toFixed(3)})`;
          ctx.fill();

          // Subtle center white/cyan glint on highlighted points
          if (gateProximity > 0.35 || sinceHit < 0.25) {
            ctx.beginPath();
            ctx.arc(sc.sx, sc.sy, baseR * 0.45, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${(Math.max(gateProximity, 1 - sinceHit / 0.25) * 0.85 * captureFade).toFixed(3)})`;
            ctx.fill();
          }

          // Connect scrubbed points back to transceiver with a whisper-thin dashed range ray
          if (inScrubGate && sc.emitsArc && pointer.scrubStrength > 0.2) {
            ctx.save();
            ctx.setLineDash([2, 4]);
            ctx.beginPath();
            ctx.moveTo(sc.sx, sc.sy);
            ctx.lineTo(cap.txX, cap.txY);
            ctx.strokeStyle = `rgba(${rxRgb}, ${(gateProximity * 0.32 * captureFade).toFixed(3)})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
            ctx.restore();
          }
        }

        // (D) Monostatic Transceiver Node at Click Point: TX -> RX Reception Indicator
        const isRxPhase = cap.rxReceived || cap.rxPulse > 0.05;
        const nodeRgb = isRxPhase ? rxRgb : primaryRgb;
        const bracketHalf = 9.5 + cap.rxPulse * 5.5;
        const arm = 4.2;

        ctx.save();
        ctx.strokeStyle = `rgba(${nodeRgb}, ${(captureFade * (0.8 + cap.rxPulse * 0.2)).toFixed(3)})`;
        ctx.lineWidth = 1.25;
        ctx.beginPath();
        ctx.moveTo(cap.txX - bracketHalf, cap.txY - bracketHalf + arm);
        ctx.lineTo(cap.txX - bracketHalf, cap.txY - bracketHalf);
        ctx.lineTo(cap.txX - bracketHalf + arm, cap.txY - bracketHalf);

        ctx.moveTo(cap.txX + bracketHalf - arm, cap.txY - bracketHalf);
        ctx.lineTo(cap.txX + bracketHalf, cap.txY - bracketHalf);
        ctx.lineTo(cap.txX + bracketHalf, cap.txY - bracketHalf + arm);

        ctx.moveTo(cap.txX + bracketHalf, cap.txY + bracketHalf - arm);
        ctx.lineTo(cap.txX + bracketHalf, cap.txY + bracketHalf);
        ctx.lineTo(cap.txX + bracketHalf - arm, cap.txY + bracketHalf);

        ctx.moveTo(cap.txX - bracketHalf + arm, cap.txY + bracketHalf);
        ctx.lineTo(cap.txX - bracketHalf, cap.txY + bracketHalf);
        ctx.lineTo(cap.txX - bracketHalf, cap.txY + bracketHalf - arm);
        ctx.stroke();

        // Dual expanding RX reception rings when reflected echoes converge
        if (cap.rxPulse > 0.04) {
          for (let rr = 0; rr < 2; rr++) {
            const ringR = 8 + (1 - cap.rxPulse) * (rr === 0 ? 30 : 18);
            ctx.beginPath();
            ctx.arc(cap.txX, cap.txY, ringR, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${rxBrightRgb}, ${(cap.rxPulse * (rr === 0 ? 0.78 : 0.45) * captureFade).toFixed(3)})`;
            ctx.lineWidth = rr === 0 ? 1.5 : 0.95;
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(cap.txX, cap.txY, 2.8 + cap.rxPulse * 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${nodeRgb}, ${(captureFade * 0.96).toFixed(3)})`;
        ctx.fill();

        // Crisp modern sans-serif TX / RX pill badge matching site typography
        const sansFontBold = '700 10.5px Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        const sansFontMeta = '500 10px Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        const modeText = isRxPhase ? 'RX' : 'TX';
        const timeText = isRxPhase ? `  ${(cap.firstRxTime * 12.5).toFixed(1)} ns` : '';

        ctx.font = sansFontBold;
        const modeW = ctx.measureText(modeText).width;
        ctx.font = sansFontMeta;
        const metaW = timeText ? ctx.measureText(timeText).width : 0;

        const padX = 7;
        const pillW = modeW + metaW + padX * 2;
        const pillH = 19;
        const flipLeft = cap.txX + bracketHalf + 8 + pillW > width - 12;
        const pillX = flipLeft ? cap.txX - bracketHalf - 8 - pillW : cap.txX + bracketHalf + 8;
        const pillY = cap.txY - pillH * 0.5;

        ctx.fillStyle = isDark
          ? `rgba(11, 15, 20, ${(captureFade * 0.88).toFixed(3)})`
          : `rgba(255, 255, 255, ${(captureFade * 0.92).toFixed(3)})`;
        ctx.strokeStyle = `rgba(${nodeRgb}, ${(captureFade * 0.36).toFixed(3)})`;
        ctx.lineWidth = 0.85;
        ctx.beginPath();
        ctx.roundRect(pillX, pillY, pillW, pillH, 999);
        ctx.fill();
        ctx.stroke();

        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.font = sansFontBold;
        ctx.fillStyle = `rgba(${isDark && isRxPhase ? '199, 210, 254' : nodeRgb}, ${(captureFade * 0.96).toFixed(3)})`;
        ctx.fillText(modeText, pillX + padX, cap.txY + 0.5);

        if (timeText) {
          ctx.font = sansFontMeta;
          ctx.fillStyle = `rgba(${isDark ? '203, 213, 225' : '71, 85, 105'}, ${(captureFade * 0.88).toFixed(3)})`;
          ctx.fillText(timeText, pillX + padX + modeW, cap.txY + 0.5);
        }
        ctx.restore();
      }

      if (!reducedMotion) {
        rafId = window.requestAnimationFrame(draw);
      }
    };

    const themeObserver = reducedMotion
      ? new MutationObserver(() => {
          draw(performance.now());
        })
      : null;
    if (themeObserver) {
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme'],
      });
    }

    rafId = window.requestAnimationFrame(draw);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      if (themeObserver) themeObserver.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-rf-canvas" aria-hidden="true" />;
};
