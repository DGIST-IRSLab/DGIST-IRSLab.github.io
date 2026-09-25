import React from 'react';

interface RadarArcVisualProps {
  className?: string;
  size?: number;
  opacity?: number;
  interactive?: boolean;
}

export const RadarArcVisual: React.FC<RadarArcVisualProps> = ({
  className = '',
  size = 500,
  opacity = 0.85,
}) => {
  // Center is at bottom-right or center depending on framing
  const cx = 250;
  const cy = 250;

  // Measurement points representing sparse radar point cloud
  const pointCloud = [
    { x: 190, y: 170, r: 2.5, val: '0.82' },
    { x: 210, y: 140, r: 2, val: '0.45' },
    { x: 225, y: 155, r: 3, val: '0.91' },
    { x: 280, y: 180, r: 2, val: '0.63' },
    { x: 310, y: 195, r: 2.5, val: '0.74' },
    { x: 295, y: 220, r: 2, val: '0.38' },
    { x: 160, y: 260, r: 3.5, val: '0.95' },
    { x: 145, y: 240, r: 2, val: '0.51' },
    { x: 175, y: 280, r: 2.5, val: '0.67' },
    { x: 330, y: 120, r: 2, val: '0.42' },
    { x: 345, y: 145, r: 2.5, val: '0.79' },
    { x: 120, y: 180, r: 2, val: '0.34' }
  ];

  return (
    <div
      className={`radar-visual-wrapper ${className}`}
      style={{
        width: '100%',
        maxWidth: `${size}px`,
        aspectRatio: '1 / 1',
        position: 'relative',
        opacity: opacity,
        userSelect: 'none',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
      >
        <defs>
          <radialGradient id="radarCenterGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.15" />
            <stop offset="60%" stopColor="var(--color-accent)" stopOpacity="0.03" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient center background field */}
        <circle cx={cx} cy={cy} r={220} fill="url(#radarCenterGlow)" />

        {/* Concentric Range Rings (dr) */}
        {[60, 110, 160, 210].map((r, idx) => (
          <g key={r}>
            <circle
              cx={cx}
              cy={cy}
              r={r}
              stroke="var(--color-accent)"
              strokeOpacity={idx === 3 ? 0.35 : 0.18}
              strokeWidth={idx === 3 ? 1.2 : 0.8}
              strokeDasharray={idx % 2 === 1 ? '4 4' : 'none'}
            />
            {/* Range distance labels in academic mono format */}
            <text
              x={cx + r + 4}
              y={cy - 6}
              fill="var(--color-text-dim)"
              fontSize="9"
              fontFamily="var(--font-mono)"
              letterSpacing="0.05em"
              opacity="0.8"
            >
              {`R${idx + 1}=${(idx + 1) * 2.5}m`}
            </text>
          </g>
        ))}

        {/* Azimuth Angle Radials */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const x2 = cx + 225 * Math.cos(rad);
          const y2 = cy + 225 * Math.sin(rad);
          return (
            <line
              key={deg}
              x1={cx}
              y1={cy}
              x2={x2}
              y2={y2}
              stroke="var(--color-accent)"
              strokeOpacity="0.12"
              strokeWidth="0.8"
            />
          );
        })}

        {/* Orthogonal Reference Axes with Tick Marks */}
        <line
          x1={cx - 235}
          y1={cy}
          x2={cx + 235}
          y2={cy}
          stroke="var(--color-accent)"
          strokeOpacity="0.3"
          strokeWidth="1"
        />
        <line
          x1={cx}
          y1={cy - 235}
          x2={cx}
          y2={cy + 235}
          stroke="var(--color-accent)"
          strokeOpacity="0.3"
          strokeWidth="1"
        />

        {/* Axis Ticks */}
        {[-200, -150, -100, -50, 50, 100, 150, 200].map((offset) => (
          <g key={offset}>
            <line
              x1={cx + offset}
              y1={cy - 3}
              x2={cx + offset}
              y2={cy + 3}
              stroke="var(--color-accent)"
              strokeOpacity="0.35"
              strokeWidth="0.8"
            />
            <line
              x1={cx - 3}
              y1={cy + offset}
              x2={cx + 3}
              y2={cy + offset}
              stroke="var(--color-accent)"
              strokeOpacity="0.35"
              strokeWidth="0.8"
            />
          </g>
        ))}

        {/* Sparse Radar Point Cloud Reflections */}
        {pointCloud.map((pt, i) => (
          <g key={i}>
            {/* Halo pulse ring */}
            <circle
              cx={pt.x}
              cy={pt.y}
              r={pt.r * 2.8}
              stroke="var(--color-accent)"
              strokeOpacity="0.25"
              strokeWidth="0.75"
            />
            {/* Solid measurement core */}
            <circle
              cx={pt.x}
              cy={pt.y}
              r={pt.r}
              fill="var(--color-accent)"
              opacity="0.85"
            />
          </g>
        ))}

        {/* Micro-Doppler Velocity Waveform Trace in bottom corner */}
        <path
          d={`M ${cx - 200} ${cy + 180} Q ${cx - 150} ${cy + 140}, ${cx - 100} ${cy + 180} T ${cx} ${cy + 180} T ${cx + 100} ${cy + 180} T ${cx + 200} ${cy + 180}`}
          stroke="var(--color-accent)"
          strokeOpacity="0.22"
          strokeWidth="1.2"
          strokeDasharray="2 3"
        />

        {/* Coordinate Center Pip */}
        <circle cx={cx} cy={cy} r={3} fill="var(--color-accent)" />
        <circle cx={cx} cy={cy} r={8} stroke="var(--color-accent)" strokeOpacity="0.4" strokeWidth="1" />

        {/* Technical Coordinate Tag */}
        <text
          x={cx - 220}
          y={cy + 225}
          fill="var(--color-text-dim)"
          fontSize="9"
          fontFamily="var(--font-mono)"
          letterSpacing="0.08em"
        >
          [RADAR: 77GHz FMCW / I-Q CHANNELS / MIMO ARRAY]
        </text>
      </svg>
    </div>
  );
};
