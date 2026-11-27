import React, { useEffect, useRef, useState } from 'react';

const ROBOT_W = 52;
const ROBOT_H = 48;
const DUCK_SIZE = 14;
const GRAVITY = 1480;
const BOUNCE_DAMPING = 0.46;

// Arm forward-kinematics geometry in SVG viewBox (0 0 52 48)
const SHOULDER_X = 22.5;
const SHOULDER_Y = 24.5;
const LINK1_LEN = 11.5;
const LINK2_LEN = 16.5;
const GRIP_TIP_OFFSET = 5.0;

// Rest pose (neatly folded SO-101 arm)
const REST_THETA1 = -138;
const REST_THETA2 = -5;

// Carry pose (holding cube proudly forward-up)
const CARRY_THETA1 = -112;
const CARRY_THETA2 = -16;

// Ground grasp pose: Gripper pinch center lands at (G_x ≈ 48.0, G_y ≈ 43.0)
const GRASP_THETA1 = 17;
const GRASP_THETA2 = 46.5;

// Stow pose (reaching back over top to place cube onto rear deck tray)
const STOW_THETA1 = -48;
const STOW_THETA2 = -200;

type RobotMode = 'roam' | 'drag' | 'air' | 'radar_scan' | 'approach' | 'pickup' | 'stow';

interface PointerSample {
  x: number;
  y: number;
  t: number;
}

interface Spark {
  id: number;
  x: number;
  dx: number;
  dy: number;
}

interface TargetDuck {
  id: number;
  x: number; // center X along rail
  y: number; // bottom offset from divider line (0 = resting on divider, <0 = above)
  vx: number;
  vy: number;
  angle: number;
  omega: number;
  facing: 1 | -1;
  detected: boolean;
}

const clamp = (val: number, min: number, max: number) =>
  Math.max(min, Math.min(max, val));

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const smoothstep = (t: number) => {
  const c = clamp(t, 0, 1);
  return c * c * (3 - 2 * c);
};

function computeArmFK(theta1Deg: number, theta2Deg: number) {
  const r1 = (theta1Deg * Math.PI) / 180;
  const r2 = (theta2Deg * Math.PI) / 180;
  const ex = SHOULDER_X + LINK1_LEN * Math.cos(r1);
  const ey = SHOULDER_Y + LINK1_LEN * Math.sin(r1);
  const wx = ex + LINK2_LEN * Math.cos(r2);
  const wy = ey + LINK2_LEN * Math.sin(r2);
  const gx = wx + GRIP_TIP_OFFSET * Math.cos(r2);
  const gy = wy + GRIP_TIP_OFFSET * Math.sin(r2);
  return { ex, ey, wx, wy, gx, gy };
}

const GRASP_FK = computeArmFK(GRASP_THETA1, GRASP_THETA2);

export const LeKiwiMascot: React.FC = () => {
  const railRef = useRef<HTMLDivElement>(null);
  const hitStripRef = useRef<HTMLDivElement>(null);
  const robotWrapRef = useRef<HTMLDivElement>(null);
  const bodyInnerRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  // SVG animated part refs
  const wheelRearRef = useRef<SVGGElement>(null);
  const wheelFrontRef = useRef<SVGGElement>(null);
  const wheelMidRef = useRef<SVGGElement>(null);
  const link1OuterRef = useRef<SVGLineElement>(null);
  const link1InnerRef = useRef<SVGLineElement>(null);
  const elbowJointRef = useRef<SVGGElement>(null);
  const link2OuterRef = useRef<SVGLineElement>(null);
  const link2InnerRef = useRef<SVGLineElement>(null);
  const link2StripeRef = useRef<SVGLineElement>(null);
  const wristGroupRef = useRef<SVGGElement>(null);
  const upperJawRef = useRef<SVGPathElement>(null);
  const lowerJawRef = useRef<SVGPathElement>(null);
  const radarWavesGroupRef = useRef<SVGGElement>(null);
  const radarLedRef = useRef<SVGCircleElement>(null);
  const heldDuckRef = useRef<SVGGElement>(null);

  const [uiMode, setUiMode] = useState<RobotMode>('roam');
  const [sparks, setSparks] = useState<Spark[]>([]);
  const [worldDucks, setWorldDucks] = useState<TargetDuck[]>([]);
  const [stowedCount, setStowedCount] = useState(0);
  const [activeLockDuckId, setActiveLockDuckId] = useState<number | null>(null);

  const duckDomMapRef = useRef<Map<number, HTMLDivElement>>(new Map());

  const stateRef = useRef({
    initialized: false,
    mode: 'roam' as RobotMode,
    x: 340,
    y: 0,
    vx: 0,
    vy: 0,
    angle: 0,
    omega: 0,
    facing: 1 as 1 | -1,
    wheelAngle: 0,
    squash: 0,
    squashVel: 0,
    targetX: 520,
    pauseTimer: 0.7,
    roamTime: 0,
    pinchTimer: 0,
    inBoundsX: true,
    sparkSeq: 0,
    duckSeq: 0,

    // Arm state
    theta1: REST_THETA1,
    theta2: REST_THETA2,
    jawDeg: 4,

    // Radar & Rubber Duck manipulation state
    ducks: [] as TargetDuck[],
    activeDuckId: null as number | null,
    holdingDuck: false,
    stowed: 0,
    phaseTimer: 0,
  });

  const dragRef = useRef<{
    pointerId: number | null;
    downClientX: number;
    downClientY: number;
    downTime: number;
    startRobotX: number;
    startRobotY: number;
    samples: PointerSample[];
  }>({
    pointerId: null,
    downClientX: 0,
    downClientY: 0,
    downTime: 0,
    startRobotX: 0,
    startRobotY: 0,
    samples: [],
  });

  const visibleRef = useRef(true);

  const getBounds = () => {
    const rail = railRef.current;
    if (!rail) {
      return { trackW: 800, minRoamX: 260, maxX: 748, minY: -320, maxY: 280 };
    }
    const rect = rail.getBoundingClientRect();
    const trackW = rect.width || 800;
    const maxX = Math.max(0, trackW - ROBOT_W);

    const headingEl = rail.parentElement?.querySelector('.explore-heading') as HTMLElement | null;
    let headingRight = 250;
    if (headingEl) {
      const hRect = headingEl.getBoundingClientRect();
      headingRight = Math.max(0, hRect.right - rect.left + 18);
    }
    const minRoamX = Math.min(headingRight, Math.max(0, maxX - 104));

    const minY = -Math.max(150, rect.top - 72);
    const maxY = Math.max(180, Math.min(340, window.innerHeight - rect.top - 56));

    return { trackW, minRoamX, maxX, minY, maxY };
  };

  const syncDucksState = () => {
    setWorldDucks(stateRef.current.ducks.map((d) => ({ ...d })));
  };

  const triggerSparks = (atX: number) => {
    const s = stateRef.current;
    const baseId = s.sparkSeq;
    s.sparkSeq += 4;
    const created: Spark[] = [
      { id: baseId + 1, x: atX, dx: -15, dy: -10 },
      { id: baseId + 2, x: atX, dx: -6, dy: -15 },
      { id: baseId + 3, x: atX, dx: 7, dy: -14 },
      { id: baseId + 4, x: atX, dx: 16, dy: -9 },
    ];
    setSparks((prev) => [...prev.slice(-8), ...created]);
    window.setTimeout(() => {
      setSparks((prev) => prev.filter((p) => !created.some((c) => c.id === p.id)));
    }, 380);
  };

  const spawnDuckAt = (preferredX?: number) => {
    const s = stateRef.current;
    const { trackW, minRoamX, maxX } = getBounds();

    if (s.ducks.length >= 4) {
      s.ducks.shift();
    }

    const minDuckX = Math.max(18, minRoamX + 8);
    const maxDuckX = Math.max(minDuckX + 20, trackW - 18);

    let spawnX: number;
    if (preferredX !== undefined) {
      spawnX = clamp(preferredX, 16, Math.max(24, trackW - 16));
    } else {
      const robotCenter = s.x + ROBOT_W * 0.5;
      const roomRight = maxDuckX - robotCenter;
      const roomLeft = robotCenter - minDuckX;
      const dir =
        roomRight > roomLeft + 45
          ? 1
          : roomLeft > roomRight + 45
            ? -1
            : Math.random() < 0.5
              ? 1
              : -1;
      const dist = 85 + Math.random() * Math.min(165, Math.max(55, (maxX - minRoamX) * 0.45));
      spawnX = clamp(robotCenter + dir * dist, minDuckX, maxDuckX);
      if (Math.abs(spawnX - robotCenter) < 52) {
        spawnX = robotCenter - minDuckX > maxDuckX - robotCenter ? minDuckX + 12 : maxDuckX - 12;
      }
    }

    s.duckSeq += 1;
    const robotCenter = s.x + ROBOT_W * 0.5;
    const newDuck: TargetDuck = {
      id: s.duckSeq,
      x: spawnX,
      y: -56,
      vx: 0,
      vy: 20,
      angle: (Math.random() - 0.5) * 24,
      omega: (Math.random() - 0.5) * 130,
      facing: spawnX >= robotCenter ? -1 : 1, // faces toward LeKiwi!
      detected: false,
    };

    s.ducks.push(newDuck);
    syncDucksState();
  };

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]) {
          visibleRef.current = entries[0].isIntersecting;
        }
      },
      { rootMargin: '200px 0px' }
    );
    observer.observe(rail);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let rafId = 0;
    let lastTime = performance.now();

    const getApproachPoseForCube = (cubeX: number, currentRobotX: number, maxX: number) => {
      // Facing right (+1): gripper center is at s.x + GRASP_FK.gx
      const stopRightFacing = cubeX - GRASP_FK.gx;
      // Facing left (-1): gripper center is at s.x + (ROBOT_W - GRASP_FK.gx)
      const stopLeftFacing = cubeX - (ROBOT_W - GRASP_FK.gx);

      const canFaceRight = stopRightFacing >= -2 && stopRightFacing <= maxX + 2;
      const canFaceLeft = stopLeftFacing >= -2 && stopLeftFacing <= maxX + 2;

      if (canFaceRight && canFaceLeft) {
        // Prefer approaching from whichever side LeKiwi is already on!
        if (currentRobotX + ROBOT_W * 0.5 <= cubeX) {
          return { stopX: clamp(stopRightFacing, 0, maxX), facing: 1 as 1 | -1 };
        }
        return { stopX: clamp(stopLeftFacing, 0, maxX), facing: -1 as 1 | -1 };
      }
      if (canFaceRight) {
        return { stopX: clamp(stopRightFacing, 0, maxX), facing: 1 as 1 | -1 };
      }
      return { stopX: clamp(stopLeftFacing, 0, maxX), facing: -1 as 1 | -1 };
    };

    const applyDomTransforms = () => {
      const s = stateRef.current;
      const wrap = robotWrapRef.current;
      const inner = bodyInnerRef.current;
      const shadow = shadowRef.current;

      if (wrap) {
        const isMovingOnGround =
          (s.mode === 'roam' || s.mode === 'approach') && Math.abs(s.vx) > 2;
        const bobY = isMovingOnGround ? Math.sin(s.roamTime * 16) * 0.65 : 0;
        wrap.style.transform = `translate3d(${s.x.toFixed(2)}px, ${(s.y + bobY).toFixed(2)}px, 0)`;
        wrap.style.opacity = '1';
      }

      if (inner) {
        const sx = (1 + s.squash * 0.85) * s.facing;
        const sy = 1 - s.squash * 0.7;
        inner.style.transform = `rotate(${s.angle.toFixed(2)}deg) scale(${sx.toFixed(3)}, ${sy.toFixed(3)})`;
      }

      if (shadow) {
        const heightDist = Math.abs(s.y);
        const shadowScale = clamp(1 - heightDist / 280, 0.22, 1.05);
        const shadowOpacity = s.y > 12 ? 0.08 : clamp(0.26 - heightDist / 900, 0.05, 0.26);
        shadow.style.transform = `translate3d(${(s.x + 8).toFixed(2)}px, 0, 0) scaleX(${shadowScale.toFixed(3)})`;
        shadow.style.opacity = shadowOpacity.toFixed(3);
      }

      // Omniwheels
      const wDeg = (s.wheelAngle % 360).toFixed(1);
      if (wheelRearRef.current) {
        wheelRearRef.current.setAttribute('transform', `translate(14 41) rotate(${wDeg})`);
      }
      if (wheelFrontRef.current) {
        wheelFrontRef.current.setAttribute('transform', `translate(33 41) rotate(${wDeg})`);
      }
      if (wheelMidRef.current) {
        wheelMidRef.current.setAttribute('transform', `translate(23.5 40.2) rotate(${wDeg})`);
      }

      // 2-Link SO-101 Arm Forward Kinematics
      const fk = computeArmFK(s.theta1, s.theta2);
      if (link1OuterRef.current) {
        link1OuterRef.current.setAttribute('x2', fk.ex.toFixed(2));
        link1OuterRef.current.setAttribute('y2', fk.ey.toFixed(2));
      }
      if (link1InnerRef.current) {
        link1InnerRef.current.setAttribute('x2', fk.ex.toFixed(2));
        link1InnerRef.current.setAttribute('y2', fk.ey.toFixed(2));
      }
      if (elbowJointRef.current) {
        elbowJointRef.current.setAttribute(
          'transform',
          `translate(${fk.ex.toFixed(2)} ${fk.ey.toFixed(2)})`
        );
      }
      if (link2OuterRef.current) {
        link2OuterRef.current.setAttribute('x1', fk.ex.toFixed(2));
        link2OuterRef.current.setAttribute('y1', fk.ey.toFixed(2));
        link2OuterRef.current.setAttribute('x2', fk.wx.toFixed(2));
        link2OuterRef.current.setAttribute('y2', fk.wy.toFixed(2));
      }
      if (link2InnerRef.current) {
        link2InnerRef.current.setAttribute('x1', fk.ex.toFixed(2));
        link2InnerRef.current.setAttribute('y1', fk.ey.toFixed(2));
        link2InnerRef.current.setAttribute('x2', fk.wx.toFixed(2));
        link2InnerRef.current.setAttribute('y2', fk.wy.toFixed(2));
      }
      if (link2StripeRef.current) {
        const sx1 = lerp(fk.ex, fk.wx, 0.22);
        const sy1 = lerp(fk.ey, fk.wy, 0.22);
        const sx2 = lerp(fk.ex, fk.wx, 0.78);
        const sy2 = lerp(fk.ey, fk.wy, 0.78);
        link2StripeRef.current.setAttribute('x1', sx1.toFixed(2));
        link2StripeRef.current.setAttribute('y1', sy1.toFixed(2));
        link2StripeRef.current.setAttribute('x2', sx2.toFixed(2));
        link2StripeRef.current.setAttribute('y2', sy2.toFixed(2));
      }
      if (wristGroupRef.current) {
        wristGroupRef.current.setAttribute(
          'transform',
          `translate(${fk.wx.toFixed(2)} ${fk.wy.toFixed(2)}) rotate(${s.theta2.toFixed(2)})`
        );
      }
      if (upperJawRef.current) {
        upperJawRef.current.setAttribute('transform', `rotate(${(-s.jawDeg).toFixed(2)} 2.2 -1.2)`);
      }
      if (lowerJawRef.current) {
        lowerJawRef.current.setAttribute('transform', `rotate(${s.jawDeg.toFixed(2)} 2.2 1.2)`);
      }

      // Held Rubber Duck inside Gripper
      if (heldDuckRef.current) {
        if (s.holdingDuck) {
          heldDuckRef.current.style.display = 'block';
          heldDuckRef.current.setAttribute(
            'transform',
            `translate(${fk.gx.toFixed(2)} ${fk.gy.toFixed(2)}) rotate(${(s.theta2 * 0.22).toFixed(1)})`
          );
        } else {
          heldDuckRef.current.style.display = 'none';
        }
      }

      // Radar emission waves visibility & pulse
      if (radarWavesGroupRef.current) {
        const isScanning = s.mode === 'radar_scan' || s.mode === 'approach';
        radarWavesGroupRef.current.style.opacity = isScanning ? '1' : '0';
      }
      if (radarLedRef.current) {
        const blink =
          s.mode === 'radar_scan' || s.mode === 'approach'
            ? '#47FFFF'
            : Math.sin(s.roamTime * 5) > 0.2
              ? '#38bdf8'
              : '#0284c7';
        radarLedRef.current.setAttribute('fill', blink);
      }

      // Update world rubber ducks positions directly via DOM map
      for (const d of s.ducks) {
        const el = duckDomMapRef.current.get(d.id);
        if (el) {
          el.style.transform = `translate3d(${(d.x - DUCK_SIZE * 0.5).toFixed(2)}px, ${d.y.toFixed(
            2
          )}px, 0) rotate(${d.angle.toFixed(1)}deg) scaleX(${d.facing})`;
        }
      }

      // Keep divider click strip positioned to the right of heading
      if (hitStripRef.current) {
        const { minRoamX } = getBounds();
        hitStripRef.current.style.left = `${Math.max(0, minRoamX - 8)}px`;
      }
    };

    const tick = (now: number) => {
      const dt = Math.min(0.035, Math.max(0.001, (now - lastTime) / 1000));
      lastTime = now;

      const s = stateRef.current;
      const { trackW, minRoamX, maxX, minY, maxY } = getBounds();

      if (!s.initialized && maxX > 20) {
        s.initialized = true;
        s.x = clamp(minRoamX + (maxX - minRoamX) * 0.62, minRoamX, maxX);
        s.targetX = clamp(minRoamX + (maxX - minRoamX) * 0.22, minRoamX, maxX);
        s.facing = s.targetX >= s.x ? 1 : -1;
      }

      if (!visibleRef.current && s.mode === 'roam' && s.ducks.length === 0) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      s.roamTime += dt;

      // Update dropping / tumbling world rubber ducks physics
      for (const d of s.ducks) {
        if (d.y < 0 || Math.abs(d.vy) > 1 || Math.abs(d.vx) > 2) {
          d.vy += GRAVITY * dt;
          d.x += d.vx * dt;
          d.y += d.vy * dt;
          d.angle += d.omega * dt;

          const minDX = DUCK_SIZE * 0.5 + 4;
          const maxDX = Math.max(minDX, trackW - DUCK_SIZE * 0.5 - 4);
          if (d.x < minDX) {
            d.x = minDX;
            d.vx = Math.abs(d.vx) * 0.6;
          } else if (d.x > maxDX) {
            d.x = maxDX;
            d.vx = -Math.abs(d.vx) * 0.6;
          }

          if (d.y >= 0) {
            d.y = 0;
            if (Math.abs(d.vy) > 95) {
              d.vy = -Math.abs(d.vy) * 0.42;
              d.vx *= 0.72;
              d.omega *= 0.5;
              d.angle *= 0.5;
            } else {
              d.vy = 0;
              d.vx *= Math.pow(0.001, dt);
              if (Math.abs(d.vx) < 3) d.vx = 0;
              d.omega = 0;
              d.angle = 0;
            }
          }
        }
      }

      // Spring-damper recovery for landing squash
      if (Math.abs(s.squash) > 0.001 || Math.abs(s.squashVel) > 0.001) {
        const springF = -260 * s.squash - 18 * s.squashVel;
        s.squashVel += springF * dt;
        s.squash += s.squashVel * dt;
      } else {
        s.squash = 0;
        s.squashVel = 0;
      }

      // Helper to smoothly relax arm toward target angles
      const relaxArmTo = (t1: number, t2: number, jaw: number, rate = 10) => {
        const alpha = Math.min(1, dt * rate);
        s.theta1 += (t1 - s.theta1) * alpha;
        s.theta2 += (t2 - s.theta2) * alpha;
        s.jawDeg += (jaw - s.jawDeg) * alpha;
      };

      if (s.mode === 'drag') {
        s.wheelAngle += (190 + Math.abs(s.angle) * 8) * dt;
        relaxArmTo(
          REST_THETA1 - 12 + Math.sin(s.roamTime * 18) * 8,
          REST_THETA2 + Math.sin(s.roamTime * 15) * 10,
          s.holdingDuck ? 3.5 : 14 + Math.sin(s.roamTime * 22) * 4,
          14
        );
      } else if (s.mode === 'air') {
        const prevY = s.y;
        s.vy += GRAVITY * dt;
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        s.angle += s.omega * dt;
        s.wheelAngle += s.vx * s.facing * dt * 3.5;
        relaxArmTo(
          REST_THETA1 + clamp(-s.vy * 0.02, -16, 16),
          REST_THETA2 + clamp(s.vy * 0.015, -12, 18),
          12,
          12
        );

        if (s.x >= 0 && s.x <= maxX) {
          s.inBoundsX = true;
        }
        if (s.inBoundsX) {
          if (s.x < 0) {
            s.x = 0;
            s.vx = Math.abs(s.vx) * 0.66;
            s.omega = -s.omega * 0.65;
            s.facing = 1;
          } else if (s.x > maxX) {
            s.x = maxX;
            s.vx = -Math.abs(s.vx) * 0.66;
            s.omega = -s.omega * 0.65;
            s.facing = -1;
          }
        } else {
          if (s.x < 0 && s.vx < 140) {
            s.vx += (220 - s.x * 4) * dt * 6;
          } else if (s.x > maxX && s.vx > -140) {
            s.vx -= (220 + (s.x - maxX) * 4) * dt * 6;
          }
        }

        if (s.y < minY) {
          s.y = minY;
          s.vy = Math.abs(s.vy) * 0.42;
        }

        if (prevY <= 0.5 && s.y >= 0 && s.vy > 0 && s.x >= -12 && s.x <= maxX + 12) {
          s.x = clamp(s.x, 0, maxX);
          s.inBoundsX = true;
          s.y = 0;

          const impactSpeed = Math.abs(s.vy);
          if (impactSpeed > 180) {
            s.squash = clamp(impactSpeed / 1900, 0.08, 0.28);
            s.squashVel = 0;
            triggerSparks(s.x + ROBOT_W * 0.5);
          }

          if (impactSpeed > 105) {
            s.vy = -impactSpeed * BOUNCE_DAMPING;
            s.vx *= 0.76;
            s.omega *= 0.52;
            s.angle = (((s.angle % 360) + 540) % 360) - 180;
            s.angle *= 0.55;
          } else {
            s.vy = 0;
            s.omega = 0;
            s.angle = 0;
            s.squash = Math.max(s.squash, 0.09);
            s.mode = 'roam';
            s.pauseTimer = 0.35;
            s.targetX = clamp(
              minRoamX + Math.random() * Math.max(20, maxX - minRoamX),
              minRoamX,
              maxX
            );
            setUiMode('roam');
          }
        } else if (s.y > 0) {
          if (s.y >= maxY || (s.vy > 40 && s.y > 42)) {
            const clampedBottom = Math.min(s.y, maxY);
            s.y = clampedBottom;
            s.vy = -Math.sqrt(2 * GRAVITY * (clampedBottom + 62));
            if (s.x < 0) {
              s.vx = Math.max(160, (minRoamX - s.x) * 1.8);
            } else if (s.x > maxX) {
              s.vx = Math.min(-160, (maxX - s.x) * 1.8);
            } else {
              s.vx *= 0.7;
            }
            s.omega = clamp(s.vx * 0.35, -360, 360);
          }
        }
      } else if (s.mode === 'stow') {
        // Neatly place the currently held rubber duck onto the rear deck before scanning the next one
        s.y = 0;
        s.vx = 0;
        s.phaseTimer += dt;
        const dur = 0.42;
        const p = clamp(s.phaseTimer / dur, 0, 1);

        if (p < 0.6) {
          const k = smoothstep(p / 0.6);
          s.theta1 = lerp(CARRY_THETA1, STOW_THETA1, k);
          s.theta2 = lerp(CARRY_THETA2, STOW_THETA2, k);
          s.jawDeg = 3;
        } else {
          if (s.holdingDuck) {
            const nextStowed = Math.min(3, s.stowed + 1);
            s.stowed = nextStowed;
            s.holdingDuck = false;
            setStowedCount(nextStowed);
          }
          const k = smoothstep((p - 0.6) / 0.4);
          s.theta1 = lerp(STOW_THETA1, REST_THETA1, k);
          s.theta2 = lerp(STOW_THETA2, REST_THETA2, k);
          s.jawDeg = lerp(12, 4, k);
        }

        if (p >= 1) {
          s.mode = 'roam';
          s.phaseTimer = 0;
          setUiMode('roam');
        }
      } else if (s.mode === 'radar_scan') {
        // Active mmWave Radar Sweep & Target Echo Lock-On
        s.y = 0;
        s.vx *= Math.pow(0.001, dt);
        s.angle += (0 - s.angle) * Math.min(1, dt * 14);
        relaxArmTo(REST_THETA1 + 5, REST_THETA2 + 4, 8, 10);

        const target = s.ducks.find((d) => d.id === s.activeDuckId);
        if (!target) {
          s.mode = 'roam';
          setActiveLockDuckId(null);
          setUiMode('roam');
        } else {
          const { facing } = getApproachPoseForCube(target.x, s.x, maxX);
          s.facing = facing;
          s.phaseTimer += dt;

          // Radar wave reaches rubber duck -> trigger echo ripple!
          if (s.phaseTimer >= 0.24 && !target.detected) {
            target.detected = true;
            setActiveLockDuckId(target.id);
            syncDucksState();
          }

          if (s.phaseTimer >= 0.72 && target.y >= -1) {
            s.mode = 'approach';
            s.phaseTimer = 0;
            setUiMode('approach');
          }
        }
      } else if (s.mode === 'approach') {
        // Drive briskly to exact pre-grasp standoff X
        s.y = 0;
        s.angle += (0 - s.angle) * Math.min(1, dt * 14);
        relaxArmTo(REST_THETA1 + 10, REST_THETA2 + 12, 16, 9);

        const target = s.ducks.find((d) => d.id === s.activeDuckId);
        if (!target) {
          s.mode = 'roam';
          setActiveLockDuckId(null);
          setUiMode('roam');
        } else {
          const { stopX, facing } = getApproachPoseForCube(target.x, s.x, maxX);
          s.facing = facing;
          const dist = stopX - s.x;

          if (Math.abs(dist) <= 2.2 && target.y >= -0.5) {
            s.x = stopX;
            s.vx = 0;
            s.mode = 'pickup';
            s.phaseTimer = 0;
            setUiMode('pickup');
          } else {
            const dir: 1 | -1 = dist >= 0 ? 1 : -1;
            const speed = clamp(Math.abs(dist) * 3.4, 34, 138);
            const desiredVx = dir * speed;
            s.vx += (desiredVx - s.vx) * Math.min(1, dt * 12);
            s.x = clamp(s.x + s.vx * dt, 0, maxX);
            s.wheelAngle += s.vx * s.facing * dt * 4.8;
          }
        }
      } else if (s.mode === 'pickup') {
        // Articulate SO-101 arm down -> clamp gripper around rubber duck -> lift proudly!
        s.y = 0;
        s.vx = 0;
        s.phaseTimer += dt;
        const totalDur = 1.05;
        const p = clamp(s.phaseTimer / totalDur, 0, 1);

        const targetIdx = s.ducks.findIndex((d) => d.id === s.activeDuckId);

        if (p < 0.36) {
          const k = smoothstep(p / 0.36);
          s.theta1 = lerp(REST_THETA1 + 10, GRASP_THETA1, k);
          s.theta2 = lerp(REST_THETA2 + 12, GRASP_THETA2, k);
          s.jawDeg = lerp(16, 18, k);
        } else if (p < 0.54) {
          const k = smoothstep((p - 0.36) / 0.18);
          s.theta1 = GRASP_THETA1;
          s.theta2 = GRASP_THETA2;
          s.jawDeg = lerp(18, 4, k);

          if (k >= 0.65 && targetIdx !== -1 && !s.holdingDuck) {
            const picked = s.ducks[targetIdx];
            s.holdingDuck = true;
            s.ducks.splice(targetIdx, 1);
            s.activeDuckId = null;
            setActiveLockDuckId(null);
            triggerSparks(picked.x);
            syncDucksState();
          }
        } else {
          const k = smoothstep((p - 0.54) / 0.46);
          s.theta1 = lerp(GRASP_THETA1, CARRY_THETA1, k);
          s.theta2 = lerp(GRASP_THETA2, CARRY_THETA2, k);
          s.jawDeg = 4;
        }

        if (p >= 1) {
          s.squash = -0.07;
          s.mode = 'roam';
          s.pauseTimer = 0.65;
          setUiMode('roam');
        }
      } else {
        // Autonomous Roaming on y = 0
        s.y = 0;
        s.vy = 0;
        s.angle += (0 - s.angle) * Math.min(1, dt * 14);

        // Check if any rubber duck is waiting on the divider line to be Radar-detected!
        const readyDuck = s.ducks.find((d) => d.y >= -4);
        if (readyDuck) {
          if (s.holdingDuck) {
            s.mode = 'stow';
            s.phaseTimer = 0;
            setUiMode('stow');
          } else {
            let nearest = readyDuck;
            let bestDist = Math.abs(readyDuck.x - (s.x + ROBOT_W * 0.5));
            for (const d of s.ducks) {
              const dist = Math.abs(d.x - (s.x + ROBOT_W * 0.5));
              if (dist < bestDist) {
                bestDist = dist;
                nearest = d;
              }
            }
            s.activeDuckId = nearest.id;
            s.mode = 'radar_scan';
            s.phaseTimer = 0;
            s.vx = 0;
            setUiMode('radar_scan');
          }
        } else {
          // Normal peaceful roaming
          if (s.holdingDuck) {
            const carryBob = Math.sin(s.roamTime * 3.5) * 2.2;
            relaxArmTo(CARRY_THETA1 + carryBob, CARRY_THETA2 - carryBob * 0.5, 4, 10);
          } else {
            let idleT1 = REST_THETA1 + Math.sin(s.roamTime * 3.2) * 2.5;
            let idleJaw = 4;
            if (s.pinchTimer > 0) {
              s.pinchTimer = Math.max(0, s.pinchTimer - dt);
              idleT1 -= 6 * Math.sin(Math.min(1, s.pinchTimer * 2) * Math.PI);
              idleJaw = 3 + Math.abs(Math.sin(s.roamTime * 14)) * 10;
            }
            relaxArmTo(idleT1, REST_THETA2, idleJaw, 10);
          }

          if (s.x > maxX) s.x = maxX;

          if (s.pauseTimer > 0) {
            s.vx *= Math.pow(0.002, dt);
            s.pauseTimer -= dt;
            if (s.pauseTimer <= 0) {
              const span = Math.max(30, maxX - minRoamX);
              let nextTarget = minRoamX + Math.random() * span;
              if (Math.abs(nextTarget - s.x) < Math.min(70, span * 0.35)) {
                nextTarget =
                  s.x - minRoamX > span * 0.5
                    ? minRoamX + Math.random() * (span * 0.35)
                    : maxX - Math.random() * (span * 0.35);
              }
              s.targetX = clamp(nextTarget, minRoamX, maxX);
            }
          } else {
            const dist = s.targetX - s.x;
            if (Math.abs(dist) < 4) {
              s.vx = 0;
              s.pauseTimer = 1.0 + Math.random() * 1.8;
              if (!s.holdingDuck && Math.random() < 0.65) {
                s.pinchTimer = 0.9;
              }
            } else {
              const dir: 1 | -1 = dist > 0 ? 1 : -1;
              s.facing = dir;
              const desiredSpeed = clamp(Math.abs(dist) * 1.9, 22, 58);
              const targetVx = dir * desiredSpeed;
              s.vx += (targetVx - s.vx) * Math.min(1, dt * 7);
              s.x += s.vx * dt;
              s.wheelAngle += Math.abs(s.vx) * dt * 4.6;
            }
          }
        }
      }

      applyDomTransforms();
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const handleStripClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    if (!rail) return;
    const rect = rail.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    spawnDuckAt(clickX);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    e.preventDefault();
    e.stopPropagation();

    const s = stateRef.current;
    const now = performance.now();
    const prevMode = s.mode;

    dragRef.current = {
      pointerId: e.pointerId,
      downClientX: e.clientX,
      downClientY: e.clientY,
      downTime: now,
      startRobotX: s.x,
      startRobotY: s.y,
      samples: [{ x: e.clientX, y: e.clientY, t: now }],
    };

    let hasStartedDrag = false;

    const handleWindowMove = (ev: PointerEvent) => {
      if (dragRef.current.pointerId !== ev.pointerId) return;
      const nowMove = performance.now();
      const dx = ev.clientX - dragRef.current.downClientX;
      const dy = ev.clientY - dragRef.current.downClientY;

      if (!hasStartedDrag && Math.hypot(dx, dy) >= 7) {
        hasStartedDrag = true;
        s.mode = 'drag';
        s.vx = 0;
        s.vy = 0;
        s.omega = 0;
        s.squash = -0.06;
        s.squashVel = 0;
        s.activeDuckId = null;
        setActiveLockDuckId(null);
        setUiMode('drag');
      }

      if (!hasStartedDrag) return;

      s.x = dragRef.current.startRobotX + dx;
      s.y = dragRef.current.startRobotY + dy;

      const samples = dragRef.current.samples;
      const prev = samples[samples.length - 1];
      if (prev) {
        const stepDt = Math.max(0.008, (nowMove - prev.t) / 1000);
        const instVx = (ev.clientX - prev.x) / stepDt;
        if (Math.abs(instVx) > 60) {
          s.facing = instVx > 0 ? 1 : -1;
        }
        const targetTilt = clamp(instVx * 0.018, -24, 24);
        s.angle += (targetTilt - s.angle) * 0.35;
      }

      samples.push({ x: ev.clientX, y: ev.clientY, t: nowMove });
      const cutoff = nowMove - 110;
      while (samples.length > 2 && samples[0].t < cutoff) {
        samples.shift();
      }
    };

    const finishPointer = (ev: PointerEvent) => {
      if (dragRef.current.pointerId !== ev.pointerId) return;
      window.removeEventListener('pointermove', handleWindowMove);
      window.removeEventListener('pointerup', finishPointer);
      window.removeEventListener('pointercancel', finishPointer);
      dragRef.current.pointerId = null;

      const nowUp = performance.now();
      const totalDist = Math.hypot(
        ev.clientX - dragRef.current.downClientX,
        ev.clientY - dragRef.current.downClientY
      );
      const { trackW, maxX } = getBounds();

      if (!hasStartedDrag && totalDist < 7) {
        // Single click on LeKiwi -> Spawn a target rubber duck for Radar detection & pickup!
        s.squash = -0.1;
        if (prevMode === 'air') {
          s.mode = 'air';
        }
        spawnDuckAt();
        return;
      }

      // Dragged & Released -> Fling LeKiwi!
      const samples = dragRef.current.samples;
      samples.push({ x: ev.clientX, y: ev.clientY, t: nowUp });
      const recent = samples.filter((pt) => nowUp - pt.t <= 95);
      if (recent.length >= 2) {
        const first = recent[0];
        const last = recent[recent.length - 1];
        const dtThrow = Math.max(0.014, (last.t - first.t) / 1000);
        s.vx = clamp((last.x - first.x) / dtThrow, -1850, 1850);
        s.vy = clamp((last.y - first.y) / dtThrow, -1850, 1650);
      } else {
        s.vx = 0;
        s.vy = 0;
      }
      if (Math.abs(s.vx) > 25) {
        s.facing = s.vx > 0 ? 1 : -1;
      }
      s.omega = clamp(s.vx * 0.36, -680, 680);
      s.inBoundsX = s.x >= 0 && s.x <= maxX;

      // If LeKiwi was holding a rubber duck when thrown hard, let it pop out & bounce so LeKiwi can fetch it again!
      if (s.holdingDuck && Math.hypot(s.vx, s.vy) > 240) {
        s.duckSeq += 1;
        const dropped: TargetDuck = {
          id: s.duckSeq,
          x: clamp(s.x + ROBOT_W * 0.5, 16, Math.max(24, trackW - 16)),
          y: Math.min(0, s.y - 12),
          vx: s.vx * 0.55 + (Math.random() - 0.5) * 90,
          vy: Math.min(-140, s.vy * 0.5 - 80),
          angle: 0,
          omega: clamp(s.vx * 0.45, -420, 420),
          facing: s.vx >= 0 ? 1 : -1,
          detected: false,
        };
        s.holdingDuck = false;
        s.ducks.push(dropped);
        syncDucksState();
      }

      if (Math.abs(s.y) < 4 && Math.abs(s.vy) < 40 && Math.abs(s.vx) < 40) {
        s.vy = -150;
      }

      s.mode = 'air';
      setUiMode('air');
    };

    window.addEventListener('pointermove', handleWindowMove);
    window.addEventListener('pointerup', finishPointer);
    window.addEventListener('pointercancel', finishPointer);
  };

  return (
    <div ref={railRef} className="lekiwi-divider-rail" aria-hidden="true">
      {/* Clickable strip along open divider line to drop a rubber duck right where clicked */}
      <div
        ref={hitStripRef}
        className="lekiwi-divider-click-strip"
        onClick={handleStripClick}
        title="Click to drop a rubber duck for LeKiwi!"
      />

      {/* Ground contact shadow projected right onto the divider line */}
      <div ref={shadowRef} className="lekiwi-ground-shadow" />

      {/* Target Rubber Ducks on the divider line */}
      {worldDucks.map((duck) => {
        const isLocked = duck.detected || activeLockDuckId === duck.id;
        return (
          <div
            key={duck.id}
            ref={(el) => {
              if (el) {
                duckDomMapRef.current.set(duck.id, el);
              } else {
                duckDomMapRef.current.delete(duck.id);
              }
            }}
            className="lekiwi-world-duck"
            style={{
              transform: `translate3d(${(duck.x - DUCK_SIZE * 0.5).toFixed(2)}px, ${duck.y.toFixed(
                2
              )}px, 0) scaleX(${duck.facing})`,
            }}
          >
            {isLocked && <span className="duck-echo-ring" />}
            <svg
              width={DUCK_SIZE + 2}
              height={DUCK_SIZE + 1}
              viewBox="0 0 16 15"
              fill="none"
              className="duck-svg"
            >
              {/* Plump yellow body + cute upturned tail */}
              <path
                d="M 2.2 8.2 C 1.4 7.3 1.2 9.8 2.0 11.4 C 2.9 13.3 5.0 14.3 7.8 14.3 C 11.2 14.3 13.4 12.7 13.4 10.3 C 13.4 8.4 11.7 7.4 9.2 7.5 C 6.6 7.6 4.4 8.8 2.2 8.2 Z"
                fill="#facc15"
                stroke="#854d0e"
                strokeWidth="0.7"
                strokeLinejoin="round"
              />
              {/* Round cute duck head */}
              <circle
                cx="10.2"
                cy="5.1"
                r="3.3"
                fill="#fde047"
                stroke="#854d0e"
                strokeWidth="0.7"
              />
              {/* Seamless yellow neck blend */}
              <ellipse cx="9.6" cy="7.6" rx="2.5" ry="1.5" fill="#facc15" />
              {/* Orange duck bill */}
              <path
                d="M 13.0 4.5 C 14.8 4.5 15.5 5.1 15.4 5.7 C 15.3 6.3 14.4 6.6 12.9 6.3 Z"
                fill="#f97316"
                stroke="#9a3412"
                strokeWidth="0.55"
                strokeLinejoin="round"
              />
              {/* Little folded wing */}
              <path
                d="M 5.2 9.8 C 6.6 8.9 8.8 9.2 9.4 10.6 C 8.6 11.9 6.2 12.0 5.0 10.9"
                fill="#eab308"
                stroke="#a16207"
                strokeWidth="0.6"
                strokeLinecap="round"
              />
              {/* Glossy eye */}
              <circle cx="11.1" cy="4.6" r="0.8" fill="#0f172a" />
              <circle cx="11.35" cy="4.35" r="0.28" fill="#ffffff" />
            </svg>
          </div>
        );
      })}

      {/* Tiny landing dust sparks */}
      {sparks.map((sp) => (
        <span
          key={sp.id}
          className="lekiwi-landing-spark"
          style={
            {
              left: `${sp.x}px`,
              '--sp-dx': `${sp.dx}px`,
              '--sp-dy': `${sp.dy}px`,
            } as React.CSSProperties
          }
        />
      ))}

      {/* Interactive Radar-Equipped LeKiwi Robot */}
      <div
        ref={robotWrapRef}
        className={`lekiwi-robot-wrap is-${uiMode}`}
        onPointerDown={handlePointerDown}
        title="Click to drop a rubber duck · Drag to throw!"
      >
        <div ref={bodyInnerRef} className="lekiwi-body-inner">
          <svg
            width={ROBOT_W}
            height={ROBOT_H}
            viewBox="0 0 52 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="lekiwi-svg"
          >
            {/* Stowed mini rubber ducks sitting in a row on the rear deck */}
            {Array.from({ length: stowedCount }).map((_, idx) => (
              <g key={idx} transform={`translate(${9.8 + idx * 4.2} 21.4) scale(0.45)`}>
                <ellipse cx="6" cy="8.2" rx="4.4" ry="3" fill="#facc15" stroke="#854d0e" strokeWidth="1" />
                <circle cx="8" cy="4.2" r="2.6" fill="#fde047" stroke="#854d0e" strokeWidth="1" />
                <ellipse cx="10.8" cy="4.6" rx="1.5" ry="0.8" fill="#f97316" />
                <circle cx="8.6" cy="3.9" r="0.65" fill="#0f172a" />
              </g>
            ))}

            {/* Third back omniwheel peeking in center */}
            <g ref={wheelMidRef} transform="translate(23.5 40.2)" opacity="0.72">
              <circle r="4.8" fill="#1e293b" />
              <rect x="-1.6" y="-5.6" width="3.2" height="1.8" rx="0.9" fill="#cbd5e1" />
              <rect
                x="-1.6"
                y="-5.6"
                width="3.2"
                height="1.8"
                rx="0.9"
                fill="#cbd5e1"
                transform="rotate(90)"
              />
              <rect
                x="-1.6"
                y="-5.6"
                width="3.2"
                height="1.8"
                rx="0.9"
                fill="#cbd5e1"
                transform="rotate(180)"
              />
              <rect
                x="-1.6"
                y="-5.6"
                width="3.2"
                height="1.8"
                rx="0.9"
                fill="#cbd5e1"
                transform="rotate(270)"
              />
            </g>

            {/* Dual-deck circular mobile base chassis */}
            <rect
              x="9.5"
              y="37.2"
              width="28"
              height="2.5"
              rx="1.25"
              fill="#334155"
              stroke="#0f172a"
              strokeWidth="0.75"
            />
            <rect x="13" y="32.2" width="1.8" height="5.2" fill="#475569" />
            <rect x="30.5" y="32.2" width="1.8" height="5.2" fill="#475569" />

            {/* Signature Blue LiPo Battery tucked between decks */}
            <rect
              x="16"
              y="32.8"
              width="12.5"
              height="4.5"
              rx="1"
              fill="#2563eb"
              stroke="#1e3a8a"
              strokeWidth="0.65"
            />
            <rect x="17.2" y="33.7" width="7.5" height="1.1" rx="0.55" fill="#60a5fa" opacity="0.85" />

            {/* Rear Compute / Servo Controller Box */}
            <rect
              x="10.2"
              y="25.8"
              width="9.4"
              height="4.4"
              rx="1.1"
              fill="#475569"
              stroke="#0f172a"
              strokeWidth="0.75"
            />
            <line x1="12" y1="27" x2="12" y2="29" stroke="#94a3b8" strokeWidth="0.7" />
            <line x1="13.8" y1="27" x2="13.8" y2="29" stroke="#94a3b8" strokeWidth="0.7" />
            <line x1="15.6" y1="27" x2="15.6" y2="29" stroke="#94a3b8" strokeWidth="0.7" />

            {/* Upper Circular Deck */}
            <rect
              x="9"
              y="30"
              width="29"
              height="2.7"
              rx="1.35"
              fill="#64748b"
              stroke="#0f172a"
              strokeWidth="0.75"
            />

            {/* Front Base Camera Module */}
            <rect
              x="28.2"
              y="32"
              width="5.6"
              height="5.4"
              rx="1.1"
              fill="#94a3b8"
              stroke="#0f172a"
              strokeWidth="0.7"
            />
            <circle cx="31.3" cy="34.8" r="1.85" fill="#0f172a" />
            <circle cx="31.9" cy="34.2" r="0.6" fill="#e0f2fe" />

            {/* ==============================================================
                MOUNTED TI mmWave RADAR SENSOR MODULE + RF CHIRP WAVEFRONTS
                ============================================================== */}
            <g className="lekiwi-radar-module">
              {/* Mast bracket on front of upper deck */}
              <path
                d="M33.2 30.2 L34.6 24.8"
                stroke="#334155"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Signature Crimson TI mmWave Radar Evaluation PCB */}
              <g transform="translate(35.2 24.5) rotate(8)">
                <rect
                  x="-1.8"
                  y="-4.2"
                  width="3.8"
                  height="7.6"
                  rx="0.9"
                  fill="#dc2626"
                  stroke="#7f1d1d"
                  strokeWidth="0.7"
                />
                {/* Gold MIMO Patch Antenna Array Traces */}
                <line x1="1.1" y1="-2.7" x2="1.1" y2="-1.5" stroke="#fbbf24" strokeWidth="0.9" />
                <line x1="1.1" y1="-0.5" x2="1.1" y2="0.7" stroke="#fbbf24" strokeWidth="0.9" />
                <line x1="1.1" y1="1.7" x2="1.1" y2="2.8" stroke="#fbbf24" strokeWidth="0.9" />
                {/* Active RF Status LED */}
                <circle ref={radarLedRef} cx="-0.3" cy="-2.5" r="0.85" fill="#38bdf8" />
              </g>

              {/* Expanding FMCW Radar Sweep Arcs */}
              <g ref={radarWavesGroupRef} className="lekiwi-radar-waves" style={{ opacity: 0 }}>
                <path
                  className="radar-wave w1"
                  d="M 38.5 22.2 A 5.5 5.5 0 0 1 38.5 29.2"
                  stroke="#1791FF"
                  strokeWidth="1.35"
                  strokeLinecap="round"
                />
                <path
                  className="radar-wave w2"
                  d="M 41.2 20.4 A 9 9 0 0 1 41.2 31.2"
                  stroke="#38bdf8"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <path
                  className="radar-wave w3"
                  d="M 44.0 18.6 A 12.5 12.5 0 0 1 44.0 33.2"
                  stroke="#47FFFF"
                  strokeWidth="1.05"
                  strokeLinecap="round"
                />
              </g>
            </g>

            {/* SO-101 Manipulator Turret Base */}
            <rect
              x="19.5"
              y="23.4"
              width="7.4"
              height="6.8"
              rx="1.4"
              fill="#475569"
              stroke="#0f172a"
              strokeWidth="0.75"
            />

            {/* ==============================================================
                2-DOF ARTICULATED SO-101 ARM + 2-FINGER GRIPPER + HELD CUBE
                ============================================================== */}
            <g>
              {/* Link 1: Upper Arm */}
              <line
                ref={link1OuterRef}
                x1={SHOULDER_X}
                y1={SHOULDER_Y}
                x2="14"
                y2="17"
                stroke="#0f172a"
                strokeWidth="5.4"
                strokeLinecap="round"
              />
              <line
                ref={link1InnerRef}
                x1={SHOULDER_X}
                y1={SHOULDER_Y}
                x2="14"
                y2="17"
                stroke="#94a3b8"
                strokeWidth="3.9"
                strokeLinecap="round"
              />

              {/* Shoulder Servo Horn */}
              <circle
                cx={SHOULDER_X}
                cy={SHOULDER_Y}
                r="2.5"
                fill="#cbd5e1"
                stroke="#0f172a"
                strokeWidth="0.7"
              />
              <circle cx={SHOULDER_X} cy={SHOULDER_Y} r="0.75" fill="#0f172a" />

              {/* Link 2: Forearm */}
              <line
                ref={link2OuterRef}
                x1="14"
                y1="17"
                x2="30"
                y2="15.5"
                stroke="#0f172a"
                strokeWidth="5.1"
                strokeLinecap="round"
              />
              <line
                ref={link2InnerRef}
                x1="14"
                y1="17"
                x2="30"
                y2="15.5"
                stroke="#cbd5e1"
                strokeWidth="3.6"
                strokeLinecap="round"
              />
              <line
                ref={link2StripeRef}
                x1="17.5"
                y1="16.7"
                x2="26.5"
                y2="15.8"
                stroke="#1791FF"
                strokeWidth="1.1"
                strokeLinecap="round"
              />

              {/* Elbow Servo Wheel */}
              <g ref={elbowJointRef} transform="translate(14 17)">
                <circle r="2.65" fill="#94a3b8" stroke="#0f172a" strokeWidth="0.75" />
                <circle r="0.8" fill="#0f172a" />
              </g>

              {/* Held Rubber Duck rendered right between gripper jaws */}
              <g ref={heldDuckRef} style={{ display: 'none' }}>
                <g transform="translate(-6.8 -8.2) scale(0.88)">
                  <path
                    d="M 2.2 8.2 C 1.4 7.3 1.2 9.8 2.0 11.4 C 2.9 13.3 5.0 14.3 7.8 14.3 C 11.2 14.3 13.4 12.7 13.4 10.3 C 13.4 8.4 11.7 7.4 9.2 7.5 C 6.6 7.6 4.4 8.8 2.2 8.2 Z"
                    fill="#facc15"
                    stroke="#854d0e"
                    strokeWidth="0.75"
                    strokeLinejoin="round"
                  />
                  <circle cx="10.2" cy="5.1" r="3.3" fill="#fde047" stroke="#854d0e" strokeWidth="0.75" />
                  <ellipse cx="9.6" cy="7.6" rx="2.5" ry="1.5" fill="#facc15" />
                  <path
                    d="M 13.0 4.5 C 14.8 4.5 15.5 5.1 15.4 5.7 C 15.3 6.3 14.4 6.6 12.9 6.3 Z"
                    fill="#f97316"
                    stroke="#9a3412"
                    strokeWidth="0.6"
                  />
                  <path
                    d="M 5.2 9.8 C 6.6 8.9 8.8 9.2 9.4 10.6 C 8.6 11.9 6.2 12.0 5.0 10.9"
                    fill="#eab308"
                    stroke="#a16207"
                    strokeWidth="0.6"
                  />
                  <circle cx="11.1" cy="4.6" r="0.8" fill="#0f172a" />
                  <circle cx="11.35" cy="4.35" r="0.28" fill="#ffffff" />
                </g>
              </g>

              {/* Wrist Servo & Parallel Gripper Jaws */}
              <g ref={wristGroupRef} transform="translate(30 15.5)">
                <rect
                  x="-2.4"
                  y="-2.5"
                  width="5.0"
                  height="5.0"
                  rx="1.2"
                  fill="#475569"
                  stroke="#0f172a"
                  strokeWidth="0.75"
                />
                <circle cx="0.2" cy="0" r="1.05" fill="#38bdf8" />
                <path
                  ref={upperJawRef}
                  d="M 2.2 -1.2 L 7.0 -2.2 L 8.3 -1.0"
                  stroke="#334155"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  ref={lowerJawRef}
                  d="M 2.2 1.2 L 7.0 2.2 L 8.3 1.0"
                  stroke="#334155"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </g>

            {/* Rear Omniwheel with 6 Spinning White Rollers */}
            <g ref={wheelRearRef} transform="translate(14 41)">
              <circle r="5.4" fill="#1e293b" stroke="#0f172a" strokeWidth="0.7" />
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <rect
                  key={deg}
                  x="-2"
                  y="-6.5"
                  width="4"
                  height="2.1"
                  rx="1.05"
                  fill="#f8fafc"
                  stroke="#1e293b"
                  strokeWidth="0.65"
                  transform={`rotate(${deg})`}
                />
              ))}
              <circle r="2.2" fill="#64748b" stroke="#0f172a" strokeWidth="0.6" />
              <circle r="0.75" fill="#0f172a" />
            </g>

            {/* Front Omniwheel with 6 Spinning White Rollers */}
            <g ref={wheelFrontRef} transform="translate(33 41)">
              <circle r="5.4" fill="#1e293b" stroke="#0f172a" strokeWidth="0.7" />
              {[30, 90, 150, 210, 270, 330].map((deg) => (
                <rect
                  key={deg}
                  x="-2"
                  y="-6.5"
                  width="4"
                  height="2.1"
                  rx="1.05"
                  fill="#f8fafc"
                  stroke="#1e293b"
                  strokeWidth="0.65"
                  transform={`rotate(${deg})`}
                />
              ))}
              <circle r="2.2" fill="#64748b" stroke="#0f172a" strokeWidth="0.6" />
              <circle r="0.75" fill="#0f172a" />
            </g>
          </svg>
        </div>
      </div>

      <style>{`
        .lekiwi-divider-rail {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 0;
          overflow: visible;
          pointer-events: none;
          z-index: 30;
          user-select: none;
          -webkit-user-select: none;
        }

        .lekiwi-divider-click-strip {
          position: absolute;
          left: 250px;
          right: 0;
          bottom: -6px;
          height: 52px;
          pointer-events: auto;
          cursor: pointer;
          z-index: 1;
        }

        .lekiwi-ground-shadow {
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 36px;
          height: 4px;
          opacity: 0;
          border-radius: 999px;
          background: radial-gradient(ellipse at center, rgba(15, 23, 42, 0.55) 0%, rgba(15, 23, 42, 0) 75%);
          transform-origin: center;
          pointer-events: none;
          will-change: transform, opacity;
        }

        [data-theme='dark'] .lekiwi-ground-shadow {
          background: radial-gradient(ellipse at center, rgba(56, 189, 248, 0.45) 0%, rgba(56, 189, 248, 0) 75%);
        }

        /* World Target Rubber Duck */
        .lekiwi-world-duck {
          position: absolute;
          left: 0;
          bottom: 0;
          width: ${DUCK_SIZE + 2}px;
          height: ${DUCK_SIZE + 1}px;
          pointer-events: none;
          z-index: 26;
          transform-origin: 50% 88%;
          will-change: transform;
        }

        .duck-svg {
          display: block;
          overflow: visible;
          filter: drop-shadow(0 2px 3px rgba(15, 23, 42, 0.22));
        }

        .duck-echo-ring {
          position: absolute;
          inset: -5px;
          border-radius: 50%;
          border: 1.4px solid #38bdf8;
          pointer-events: none;
          animation: lekiwiEchoPing 0.75s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }

        @keyframes lekiwiEchoPing {
          0% {
            opacity: 0.95;
            transform: scale(0.55);
          }
          100% {
            opacity: 0;
            transform: scale(1.9);
          }
        }

        .lekiwi-robot-wrap {
          position: absolute;
          left: 0;
          bottom: 0;
          width: ${ROBOT_W}px;
          height: ${ROBOT_H}px;
          opacity: 0;
          pointer-events: auto;
          cursor: grab;
          touch-action: none;
          user-select: none;
          -webkit-user-select: none;
          will-change: transform;
          z-index: 28;
        }

        .lekiwi-robot-wrap::before {
          content: '';
          position: absolute;
          inset: -6px;
        }

        .lekiwi-robot-wrap.is-drag {
          cursor: grabbing;
          z-index: 60;
        }

        .lekiwi-body-inner {
          width: 100%;
          height: 100%;
          transform-origin: 50% 84%;
          will-change: transform;
          transition: filter 0.15s ease;
        }

        .lekiwi-robot-wrap:hover .lekiwi-body-inner {
          filter: drop-shadow(0 3px 6px rgba(23, 145, 255, 0.28));
        }

        .lekiwi-robot-wrap.is-drag .lekiwi-body-inner {
          filter: drop-shadow(0 8px 14px rgba(15, 23, 42, 0.28));
        }

        .lekiwi-svg {
          display: block;
          overflow: visible;
        }

        /* Animated RF Chirp Waves */
        .lekiwi-radar-waves {
          transition: opacity 0.16s ease;
        }

        .radar-wave {
          opacity: 0;
          animation: lekiwiChirpWave 0.62s ease-out infinite;
        }
        .radar-wave.w1 {
          animation-delay: 0ms;
        }
        .radar-wave.w2 {
          animation-delay: 140ms;
        }
        .radar-wave.w3 {
          animation-delay: 280ms;
        }

        @keyframes lekiwiChirpWave {
          0% {
            opacity: 0;
            transform: translateX(-2px);
          }
          35% {
            opacity: 0.95;
          }
          100% {
            opacity: 0;
            transform: translateX(4px);
          }
        }

        .lekiwi-landing-spark {
          position: absolute;
          bottom: 0;
          width: 4px;
          height: 4px;
          margin-left: -2px;
          border-radius: 50%;
          background-color: var(--key-blue-2);
          pointer-events: none;
          animation: lekiwiSparkBurst 0.36s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes lekiwiSparkBurst {
          0% {
            opacity: 0.9;
            transform: translate(0, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(var(--sp-dx), var(--sp-dy)) scale(0.2);
          }
        }
      `}</style>
    </div>
  );
};
