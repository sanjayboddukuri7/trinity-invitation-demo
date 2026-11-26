import type { Ornament } from './invites';

/* Decorative SVG art per invitation style. Colours follow the model's theme via currentColor / CSS variables. */

export function OrnamentArt({ kind, className = '' }: { kind: Ornament; className?: string }) {
  if (kind === 'mandala') return <Mandala className={className} />;
  if (kind === 'balloons') return <Balloons className={className} />;
  if (kind === 'kolam') return <Kolam className={className} />;
  return <Rings className={className} />;
}

function Mandala({ className }: { className: string }) {
  const petals = Array.from({ length: 16 });
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden fill="none" stroke="currentColor">
      <g className="spin-slow" style={{ transformOrigin: '100px 100px' }}>
        {petals.map((_, i) => (
          <path key={i} d="M100 100 C 92 70, 92 45, 100 22 C 108 45, 108 70, 100 100 Z" strokeWidth="1.2" transform={`rotate(${(360 / 16) * i} 100 100)`} />
        ))}
      </g>
      {Array.from({ length: 8 }).map((_, i) => (
        <path key={i} d="M100 100 C 88 82, 88 66, 100 54 C 112 66, 112 82, 100 100 Z" strokeWidth="1.4" transform={`rotate(${45 * i + 22.5} 100 100)`} />
      ))}
      <circle cx="100" cy="100" r="96" strokeWidth="1" strokeDasharray="2 5" />
      <circle cx="100" cy="100" r="60" strokeWidth="1" />
      <circle cx="100" cy="100" r="16" strokeWidth="1.6" />
      <circle cx="100" cy="100" r="6" fill="currentColor" />
    </svg>
  );
}

function Balloons({ className }: { className: string }) {
  const b = [
    { x: 50, y: 70, c: 'rgb(var(--brand))', r: -8 },
    { x: 100, y: 50, c: 'rgb(var(--accent))', r: 0 },
    { x: 150, y: 72, c: '#FBBF24', r: 8 },
  ];
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      {b.map((x, i) => (
        <g key={i} className="float" style={{ animationDelay: `${i * 0.7}s`, transformBox: 'fill-box' }} transform={`rotate(${x.r} ${x.x} ${x.y})`}>
          <path d={`M${x.x} ${x.y + 34} q -6 30 4 60 q 8 30 -2 50`} fill="none" stroke="rgb(var(--ink-muted))" strokeWidth="1.2" />
          <ellipse cx={x.x} cy={x.y} rx="26" ry="32" fill={x.c} />
          <ellipse cx={x.x - 9} cy={x.y - 12} rx="6" ry="9" fill="white" opacity="0.45" />
          <path d={`M${x.x - 4} ${x.y + 32} l4 6 l4 -6 z`} fill={x.c} />
        </g>
      ))}
      {[[20, 30], [180, 26], [30, 150], [176, 140], [100, 150]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 2 ? 3 : 4} fill={i % 2 ? 'rgb(var(--brand))' : 'rgb(var(--accent))'} />
      ))}
    </svg>
  );
}

function Kolam({ className }: { className: string }) {
  const dots: [number, number][] = [];
  for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) dots.push([40 + c * 30, 40 + r * 30]);
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden fill="none" stroke="currentColor">
      {dots.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.6" fill="currentColor" stroke="none" />)}
      <g strokeWidth="1.6" strokeLinecap="round">
        <path d="M100 25 C 130 55, 130 55, 175 100 C 130 145, 130 145, 100 175 C 70 145, 70 145, 25 100 C 70 55, 70 55, 100 25 Z" />
        <path d="M100 55 C 120 75, 120 75, 145 100 C 120 125, 120 125, 100 145 C 80 125, 80 125, 55 100 C 80 75, 80 75, 100 55 Z" />
        <circle cx="100" cy="100" r="14" />
        {[0, 90, 180, 270].map(a => (
          <path key={a} d="M100 86 C 92 74, 108 66, 100 55" transform={`rotate(${a} 100 100)`} />
        ))}
      </g>
    </svg>
  );
}

function Rings({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden fill="none">
      <circle cx="82" cy="112" r="40" stroke="currentColor" strokeWidth="7" />
      <circle cx="122" cy="112" r="40" stroke="rgb(var(--accent))" strokeWidth="7" />
      <path d="M110 60 l12 -14 l12 14 l-12 12 z" fill="rgb(var(--accent))" />
      <path d="M116 60 l6 -8 l6 8" stroke="white" strokeWidth="1.5" opacity="0.8" />
      {[[40, 40], [160, 36], [30, 170], [170, 166]].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y - 6} l2 4 l4 2 l-4 2 l-2 4 l-2 -4 l-4 -2 l4 -2 z`} fill="currentColor" opacity="0.6" />
      ))}
    </svg>
  );
}
