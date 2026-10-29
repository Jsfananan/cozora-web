// Hero motion graphic: a path of "stepping stones" (the logo's colors) and a marker that
// hops from stone to stone, the way a member moves through a skills journey.
// Pure SVG + CSS keyframes (cz-hero-* in globals.css): no JS, decorative only, and it rests
// on its finished frame under prefers-reduced-motion.

const STONES = [
  { x: 62, y: 150, s: 46, fill: '#1F5F5B', delay: 0 },
  { x: 150, y: 98, s: 34, fill: '#8FD3C4', delay: 1.6 },
  { x: 244, y: 142, s: 44, fill: '#FFB48A', delay: 3.2 },
  { x: 338, y: 90, s: 36, fill: '#B9A6EE', delay: 4.8 },
  { x: 424, y: 128, s: 30, fill: '#8FD3C4', delay: 6.4 },
];

const TWINKLES = [
  [30, 40, 0],
  [452, 52, 700],
  [210, 30, 1300],
  [388, 190, 400],
  [96, 206, 1000],
];

export default function HeroScene() {
  return (
    <svg viewBox="0 0 480 240" className="h-auto w-full" role="presentation" aria-hidden>
      {/* the path */}
      <path
        d="M62 150 C100 150 112 98 150 98 C190 98 206 142 244 142 C284 142 298 90 338 90 C378 90 388 128 424 128"
        fill="none"
        stroke="#D9CFBC"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="2 10"
      />

      {/* stones */}
      {STONES.map((st) => (
        <rect
          key={st.x}
          className="cz-hero-stone"
          style={{ animationDelay: `${st.delay}s` }}
          x={st.x - st.s / 2}
          y={st.y - st.s / 2}
          width={st.s}
          height={st.s}
          rx={st.s * 0.28}
          fill={st.fill}
        />
      ))}

      {/* the marker hops along the stones */}
      <g className="cz-hero-hop">
        <g className="cz-hero-bounce">
          <circle r="15" fill="#FFFFFF" stroke="#22303A" strokeWidth="2.5" />
          <path d="M-6 0l4.5 4.5L7 -4" fill="none" stroke="#1F5F5B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>

      {TWINKLES.map(([x, y, delay]) => (
        <path
          key={`${x}-${y}`}
          className="cz-sc cz-sc-twinkle"
          style={{ animationDelay: `${delay}ms` }}
          d={`M${x} ${y - 7}L${x + 2} ${y - 2}L${x + 7} ${y}L${x + 2} ${y + 2}L${x} ${y + 7}L${x - 2} ${y + 2}L${x - 7} ${y}L${x - 2} ${y - 2}Z`}
          fill={x > 240 ? '#B9A6EE' : '#FFB48A'}
        />
      ))}
    </svg>
  );
}
