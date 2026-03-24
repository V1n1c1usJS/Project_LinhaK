interface Props {
  ml: number;
  gender: 'masculino' | 'feminino';
  className?: string;
}

const SIZES: Record<number, { h: number; w: number; neck: number; cap: number; label: string }> = {
  5:  { h: 90,  w: 36,  neck: 10, cap: 14, label: '5 ml' },
  15: { h: 140, w: 50,  neck: 14, cap: 18, label: '15 ml' },
  50: { h: 200, w: 70,  neck: 18, cap: 24, label: '50 ml' },
};

export default function BottleIllustration({ ml, gender, className = '' }: Props) {
  const s = SIZES[ml] ?? SIZES[50];
  const isFem = gender === 'feminino';

  // Color palette
  const body     = isFem ? '#f5d6e0' : '#1a1a2e';
  const bodyGrad = isFem ? '#e8b4c8' : '#16213e';
  const cap      = isFem ? '#d4a373' : '#c9a96e';
  const capLight = isFem ? '#e8c9a0' : '#dfc998';
  const labelBg  = isFem ? '#fff0f5' : '#c9a96e';
  const labelTxt = isFem ? '#8b5e6b' : '#1a1a2e';
  const brandTxt = isFem ? '#c47d8e' : '#1a1a2e';
  const liquid   = isFem ? 'rgba(232,180,200,0.3)' : 'rgba(201,169,110,0.15)';

  // Layout
  const totalH = s.h + s.neck + s.cap + 6;
  const viewW  = s.w + 40;
  const viewH  = totalH + 20;
  const cx     = viewW / 2;

  // Y positions (top-down)
  const capY   = 10;
  const neckY  = capY + s.cap;
  const bodyY  = neckY + s.neck;
  const bodyH  = s.h;
  const radius = 6;

  const gradId  = `grad-${ml}-${gender}`;
  const liquidId = `liquid-${ml}-${gender}`;

  return (
    <svg
      viewBox={`0 0 ${viewW} ${viewH}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={body} />
          <stop offset="100%" stopColor={bodyGrad} />
        </linearGradient>
        <linearGradient id={liquidId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={liquid} stopOpacity="0" />
          <stop offset="100%" stopColor={liquid} />
        </linearGradient>
      </defs>

      {/* Shadow */}
      <ellipse
        cx={cx} cy={bodyY + bodyH + 4}
        rx={s.w / 2 + 4} ry={4}
        fill="rgba(0,0,0,0.08)"
      />

      {/* Bottle body */}
      <rect
        x={cx - s.w / 2} y={bodyY}
        width={s.w} height={bodyH}
        rx={radius} ry={radius}
        fill={`url(#${gradId})`}
      />

      {/* Liquid fill effect */}
      <rect
        x={cx - s.w / 2 + 2} y={bodyY + bodyH * 0.25}
        width={s.w - 4} height={bodyH * 0.73}
        rx={radius - 1} ry={radius - 1}
        fill={`url(#${liquidId})`}
      />

      {/* Glass highlight */}
      <rect
        x={cx - s.w / 2 + 4} y={bodyY + 4}
        width={6} height={bodyH - 8}
        rx={3} ry={3}
        fill="rgba(255,255,255,0.18)"
      />

      {/* Neck */}
      <rect
        x={cx - s.neck / 2} y={neckY}
        width={s.neck} height={s.neck + 2}
        fill={body}
      />

      {/* Shoulder bevel */}
      <path
        d={`M${cx - s.w / 2} ${bodyY + 1}
            Q${cx - s.w / 2} ${bodyY - 3} ${cx - s.neck / 2} ${neckY + s.neck}
            L${cx + s.neck / 2} ${neckY + s.neck}
            Q${cx + s.w / 2} ${bodyY - 3} ${cx + s.w / 2} ${bodyY + 1} Z`}
        fill={body}
      />

      {/* Cap */}
      <rect
        x={cx - s.cap / 2} y={capY}
        width={s.cap} height={s.cap}
        rx={3} ry={3}
        fill={cap}
      />
      {/* Cap highlight */}
      <rect
        x={cx - s.cap / 2 + 2} y={capY + 2}
        width={4} height={s.cap - 4}
        rx={2} ry={2}
        fill={capLight}
        opacity={0.6}
      />

      {/* Label area */}
      {(() => {
        const lw = s.w * 0.7;
        const lh = bodyH * 0.42;
        const lx = cx - lw / 2;
        const ly = bodyY + bodyH * 0.22;
        return (
          <g>
            <rect
              x={lx} y={ly}
              width={lw} height={lh}
              rx={2} ry={2}
              fill={labelBg}
              opacity={0.92}
            />
            {/* Gold border on label */}
            <rect
              x={lx + 2} y={ly + 2}
              width={lw - 4} height={lh - 4}
              rx={1} ry={1}
              fill="none"
              stroke={cap}
              strokeWidth={0.8}
            />
            {/* Brand "K" */}
            <text
              x={cx} y={ly + lh * 0.42}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={lh * 0.32}
              fontWeight="700"
              fontFamily="serif"
              fill={brandTxt}
              letterSpacing="1"
            >
              K
            </text>
            {/* ML text */}
            <text
              x={cx} y={ly + lh * 0.72}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={lh * 0.18}
              fontWeight="500"
              fontFamily="sans-serif"
              fill={labelTxt}
              letterSpacing="2"
            >
              {s.label.toUpperCase()}
            </text>
          </g>
        );
      })()}
    </svg>
  );
}
