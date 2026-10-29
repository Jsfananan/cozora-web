import type { CSSProperties } from 'react';
import type { JourneyIcon } from '@/lib/journeys';

// One looping motion graphic per journey. Pure SVG + CSS keyframes (cz-sc-* in
// globals.css), so it costs no JS and freezes on its final frame under
// prefers-reduced-motion. Decorative only: aria-hidden.

const TEAL = '#1F5F5B';
const MINT = '#8FD3C4';
const FUCHSIA = '#FFB48A';
const AMBER = '#B9A6EE';
const PEACH = '#FFB48A';
const SUN = '#FFD2B0';
const LINE = '#E8E0D2';

function d(ms: number): CSSProperties {
  return { animationDelay: `${ms}ms` };
}

/* Get started: a skill card drops into a Claude window, clicks in, sparkles. */
function InstallScene() {
  return (
    <>
      <rect x="40" y="30" width="240" height="150" rx="16" fill="#fff" stroke={LINE} strokeWidth="2" />
      <rect x="40" y="30" width="240" height="26" rx="16" fill="#E3F4EF" />
      <circle cx="58" cy="43" r="4" fill={PEACH} />
      <circle cx="72" cy="43" r="4" fill={SUN} />
      <circle cx="86" cy="43" r="4" fill={MINT} />
      <rect x="70" y="92" width="180" height="62" rx="12" fill="none" stroke={LINE} strokeWidth="2" strokeDasharray="6 6" />
      <g className="cz-sc cz-sc-drop">
        <rect x="70" y="92" width="180" height="62" rx="12" fill={TEAL} />
        <rect x="86" y="108" width="70" height="8" rx="4" fill={MINT} />
        <rect x="86" y="124" width="110" height="6" rx="3" fill="#ffffff" opacity="0.5" />
        <rect x="86" y="136" width="84" height="6" rx="3" fill="#ffffff" opacity="0.35" />
      </g>
      <g className="cz-sc cz-sc-pop">
        <circle cx="244" cy="96" r="15" fill={FUCHSIA} />
        <path d="M237 96l5 5 9-10" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {[
        [30, 24, 0],
        [292, 40, 300],
        [300, 168, 700],
        [24, 160, 1000],
        [160, 14, 500],
      ].map(([x, y, delay]) => (
        <path
          key={`${x}-${y}`}
          className="cz-sc cz-sc-twinkle"
          style={d(delay)}
          d={`M${x} ${y - 8}L${x + 2} ${y - 2}L${x + 8} ${y}L${x + 2} ${y + 2}L${x} ${y + 8}L${x - 2} ${y + 2}L${x - 8} ${y}L${x - 2} ${y - 2}Z`}
          fill={x > 150 ? SUN : AMBER}
        />
      ))}
    </>
  );
}

/* Write in my voice: lines write themselves under a moving pen, then fan into posts. */
function WriteScene() {
  return (
    <>
      <rect x="30" y="26" width="170" height="158" rx="14" fill="#fff" stroke={LINE} strokeWidth="2" />
      <rect x="48" y="44" width="80" height="10" rx="5" fill={TEAL} />
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          className={`cz-sc cz-sc-l${i + 1}`}
          d={`M48 ${80 + i * 26}H${i === 2 ? 150 : 182}`}
          pathLength={100}
          stroke={i === 0 ? MINT : '#CBD5E1'}
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />
      ))}
      <g className="cz-sc cz-sc-nib">
        <path d="M48 70l14-30 8 4-14 30z" fill={FUCHSIA} />
        <path d="M48 70l-2 8 8-4z" fill={TEAL} />
      </g>
      {[0, 1, 2].map((i) => (
        <g key={i} className="cz-sc cz-sc-post" style={{ ...d(i * 160), '--py': `${(i - 1) * 46}px` } as CSSProperties}>
          <rect x="222" y="82" width="74" height="40" rx="10" fill={i === 1 ? TEAL : '#fff'} stroke={i === 1 ? TEAL : LINE} strokeWidth="2" />
          <rect x="232" y="93" width="34" height="6" rx="3" fill={i === 1 ? MINT : AMBER} />
          <rect x="232" y="105" width="52" height="5" rx="2.5" fill={i === 1 ? '#ffffff' : '#CBD5E1'} opacity={i === 1 ? 0.6 : 1} />
        </g>
      ))}
    </>
  );
}

/* Lead through hard moments: a calm two-way conversation and a pulse that settles. */
function TalkScene() {
  return (
    <>
      <g className="cz-sc cz-sc-bubble-a">
        <rect x="34" y="30" width="150" height="54" rx="18" fill="#fff" stroke={LINE} strokeWidth="2" />
        <path d="M60 84l-8 14 22-14z" fill="#fff" stroke={LINE} strokeWidth="2" strokeLinejoin="round" />
        <rect x="54" y="48" width="100" height="7" rx="3.5" fill={TEAL} />
        <rect x="54" y="62" width="70" height="7" rx="3.5" fill="#CBD5E1" />
      </g>
      <g className="cz-sc cz-sc-bubble-b">
        <rect x="136" y="96" width="150" height="54" rx="18" fill={FUCHSIA} />
        <path d="M262 150l8 14-22-14z" fill={FUCHSIA} />
        {[0, 1, 2].map((i) => (
          <circle key={i} className="cz-sc cz-sc-dot" style={d(i * 160)} cx={186 + i * 18} cy="123" r="5" fill="#fff" />
        ))}
      </g>
      <path
        className="cz-sc cz-sc-pulse"
        d="M24 182H96l10-18 12 30 12-24 10 12H300"
        pathLength={100}
        fill="none"
        stroke={MINT}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

/* Make video and visuals: a rolling film strip, a pulsing play button, live levels. */
function VideoScene() {
  const frames = [FUCHSIA, TEAL, SUN, MINT, PEACH, TEAL, FUCHSIA, SUN];
  return (
    <>
      <defs>
        <clipPath id="cz-strip-clip">
          <rect x="24" y="46" width="272" height="78" rx="12" />
        </clipPath>
      </defs>
      <rect x="24" y="46" width="272" height="78" rx="12" fill="#1F2937" />
      <g clipPath="url(#cz-strip-clip)">
        <g className="cz-sc cz-sc-strip">
          {[...frames, ...frames].map((c, i) => (
            <g key={i}>
              <rect x={30 + i * 68} y="60" width="58" height="50" rx="6" fill={c} opacity="0.92" />
              <rect x={34 + i * 68} y="50" width="8" height="5" rx="1.5" fill="#fff" opacity="0.6" />
              <rect x={34 + i * 68} y="115" width="8" height="5" rx="1.5" fill="#fff" opacity="0.6" />
            </g>
          ))}
        </g>
      </g>
      <g className="cz-sc cz-sc-play">
        <circle cx="160" cy="85" r="26" fill="#fff" />
        <path d="M152 72v26l22-13z" fill={FUCHSIA} />
      </g>
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect
          key={i}
          className="cz-sc cz-sc-eq"
          style={d(i * 110)}
          x={112 + i * 14}
          y="140"
          width="8"
          height="40"
          rx="4"
          fill={i % 2 ? TEAL : MINT}
        />
      ))}
    </>
  );
}

/* Build my brand: swatches fan out into a palette over a brand card. */
function BrandScene() {
  const swatches = [
    { c: TEAL, r: -36 },
    { c: MINT, r: -12 },
    { c: AMBER, r: 12 },
    { c: FUCHSIA, r: 36 },
  ];
  return (
    <>
      <rect x="60" y="138" width="200" height="44" rx="12" fill="#fff" stroke={LINE} strokeWidth="2" />
      <circle cx="84" cy="160" r="10" fill={TEAL} />
      <rect x="102" y="153" width="80" height="7" rx="3.5" fill="#1F2937" />
      <rect x="102" y="165" width="120" height="6" rx="3" fill="#CBD5E1" />
      {swatches.map((s, i) => (
        <g key={s.c} className="cz-sc cz-sc-fan" style={{ '--r': `${s.r}deg`, ...d(i * 70) } as CSSProperties}>
          <rect x="140" y="20" width="40" height="110" rx="10" fill={s.c} stroke="#fff" strokeWidth="3" />
          <rect x="148" y="104" width="24" height="6" rx="3" fill="#fff" opacity="0.7" />
        </g>
      ))}
      <circle className="cz-sc cz-sc-twinkle" style={d(400)} cx="262" cy="40" r="6" fill={SUN} />
      <circle className="cz-sc cz-sc-twinkle" style={d(1100)} cx="58" cy="56" r="5" fill={PEACH} />
    </>
  );
}

/* Think and learn: an idea bulb lights up, rays twinkle around it. */
function ThinkScene() {
  return (
    <>
      <circle cx="160" cy="92" r="54" fill="#fff" stroke={LINE} strokeWidth="2" />
      <g className="cz-sc cz-sc-pop">
        <circle cx="160" cy="88" r="30" fill={SUN} />
        <rect x="146" y="116" width="28" height="12" rx="5" fill={TEAL} />
        <rect x="150" y="130" width="20" height="8" rx="4" fill={MINT} />
      </g>
      {[
        [66, 52, 0],
        [252, 60, 400],
        [74, 150, 800],
        [250, 150, 1100],
        [160, 22, 600],
      ].map(([x, y, delay]) => (
        <path
          key={`${x}-${y}`}
          className="cz-sc cz-sc-twinkle"
          style={d(delay)}
          d={`M${x} ${y - 8}L${x + 2} ${y - 2}L${x + 8} ${y}L${x + 2} ${y + 2}L${x} ${y + 8}L${x - 2} ${y + 2}L${x - 8} ${y}L${x - 2} ${y - 2}Z`}
          fill={PEACH}
        />
      ))}
    </>
  );
}

/* Build with AI: a window fills with lines of a plan, then a check pops. */
function BuildScene() {
  return (
    <>
      <rect x="40" y="30" width="240" height="150" rx="16" fill="#fff" stroke={LINE} strokeWidth="2" />
      <rect x="40" y="30" width="240" height="26" rx="16" fill="#E3F4EF" />
      <circle cx="58" cy="43" r="4" fill={PEACH} />
      <circle cx="72" cy="43" r="4" fill={SUN} />
      <circle cx="86" cy="43" r="4" fill={MINT} />
      <path className="cz-sc cz-sc-l1" pathLength="100" d="M62 78h110" stroke={TEAL} strokeWidth="6" strokeLinecap="round" fill="none" />
      <path className="cz-sc cz-sc-l2" pathLength="100" d="M62 100h150" stroke={MINT} strokeWidth="6" strokeLinecap="round" fill="none" />
      <path className="cz-sc cz-sc-l3" pathLength="100" d="M62 122h90" stroke={PEACH} strokeWidth="6" strokeLinecap="round" fill="none" />
      <g className="cz-sc cz-sc-pop">
        <circle cx="246" cy="132" r="16" fill={TEAL} />
        <path d="M238 132l6 6 11-12" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </>
  );
}

const SCENES: Record<JourneyIcon, () => React.JSX.Element> = {
  bulb: ThinkScene,
  code: BuildScene,
  sparkles: InstallScene,
  pen: WriteScene,
  chat: TalkScene,
  play: VideoScene,
  swatch: BrandScene,
};

export default function JourneyScene({ icon }: { icon: JourneyIcon }) {
  const Scene = SCENES[icon];
  return (
    <svg viewBox="0 0 320 200" className="h-full w-full" role="presentation" aria-hidden>
      <Scene />
    </svg>
  );
}
