// Draws a shareable 1080x1080 badge for a finished journey and downloads it as a PNG.
// Client-only (canvas). Colors match the Dawn palette and the on-page medal.

import type { JourneyIcon } from './journeys';

const GRADIENT: Record<JourneyIcon, [string, string]> = {
  sparkles: ['#FFD2B0', '#B9A6EE'],
  pen: ['#8FD3C4', '#C8EBE2'],
  chat: ['#FFB48A', '#FFD2B0'],
  play: ['#B9A6EE', '#FFB48A'],
  swatch: ['#FFD2B0', '#8FD3C4'],
  bulb: ['#B9A6EE', '#D9CCF7'],
  code: ['#8FD3C4', '#B9A6EE'],
};

// Same 24x24 outline glyphs as the page (Heroicons outline).
const PATHS: Record<JourneyIcon, string> = {
  sparkles:
    'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z',
  pen: 'M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10',
  chat: 'M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155',
  play: 'M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z',
  swatch:
    'M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z',
  bulb: 'M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18',
  code: 'M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5',
};

const INK = '#22303A';
const LAGOON = '#1F5F5B';
const CORAL = '#A8512C';

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function glow(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, color);
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 1080, 1080);
}

function fitText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, start: number, weight = 800) {
  let size = start;
  do {
    ctx.font = `${weight} ${size}px "Bricolage Grotesque", Inter, system-ui, sans-serif`;
    size -= 2;
  } while (ctx.measureText(text).width > maxWidth && size > 40);
}

export async function downloadBadge(opts: { title: string; icon: JourneyIcon; steps: number }) {
  const S = 1080;
  const canvas = document.createElement('canvas');
  canvas.width = S;
  canvas.height = S;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  try {
    await Promise.all([
      document.fonts.load('800 80px "Bricolage Grotesque"'),
      document.fonts.load('600 30px Inter'),
    ]);
  } catch {
    // fall back to the system font stack
  }

  // Paper background with soft brand glows.
  ctx.fillStyle = '#FBF8F3';
  ctx.fillRect(0, 0, S, S);
  glow(ctx, 160, 140, 560, 'rgba(143,211,196,0.55)');
  glow(ctx, 940, 260, 520, 'rgba(185,166,238,0.45)');
  glow(ctx, 900, 980, 560, 'rgba(255,180,138,0.45)');

  // Inner card with a thin brand border.
  ctx.save();
  ctx.shadowColor = 'rgba(31,95,91,0.18)';
  ctx.shadowBlur = 50;
  ctx.shadowOffsetY = 20;
  ctx.fillStyle = 'rgba(255,255,255,0.92)';
  ctx.beginPath();
  ctx.roundRect(70, 70, S - 140, S - 140, 64);
  ctx.fill();
  ctx.restore();
  ctx.strokeStyle = 'rgba(31,95,91,0.22)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(70, 70, S - 140, S - 140, 64);
  ctx.stroke();

  // Wordmark.
  try {
    const logo = await loadImage('/brand/cozora-logo.png');
    const w = 300;
    const h = (logo.height / logo.width) * w;
    ctx.drawImage(logo, (S - w) / 2, 130, w, h);
  } catch {
    ctx.fillStyle = LAGOON;
    ctx.font = '800 54px "Bricolage Grotesque", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Cozora', S / 2, 175);
  }

  // Medal: soft halo, white ring, gradient disc, glyph, glint.
  const cx = S / 2;
  const cy = 440;
  const R = 150;
  const [c1, c2] = GRADIENT[opts.icon];
  glow(ctx, cx, cy, 300, 'rgba(143,211,196,0.35)');
  ctx.save();
  ctx.shadowColor = 'rgba(31,95,91,0.45)';
  ctx.shadowBlur = 44;
  ctx.shadowOffsetY = 22;
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(cx, cy, R + 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  const g = ctx.createLinearGradient(cx - R, cy - R, cx + R, cy + R);
  g.addColorStop(0, c1);
  g.addColorStop(1, c2);
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.fill();
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.clip();
  ctx.fillStyle = 'rgba(255,255,255,0.35)';
  ctx.beginPath();
  ctx.moveTo(cx + 30, cy - R);
  ctx.lineTo(cx + 110, cy - R);
  ctx.lineTo(cx + 10, cy + R);
  ctx.lineTo(cx - 70, cy + R);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
  ctx.save();
  const k = 9; // 24px glyph -> 216px
  ctx.translate(cx - 12 * k, cy - 12 * k);
  ctx.scale(k, k);
  ctx.strokeStyle = INK;
  ctx.lineWidth = 1.7;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.stroke(new Path2D(PATHS[opts.icon]));
  ctx.restore();

  // Text.
  ctx.textAlign = 'center';
  ctx.fillStyle = CORAL;
  ctx.font = '600 28px Inter, system-ui, sans-serif';
  if ('letterSpacing' in ctx) (ctx as unknown as { letterSpacing: string }).letterSpacing = '6px';
  ctx.fillText('SKILLS JOURNEY COMPLETE', cx, 690);
  if ('letterSpacing' in ctx) (ctx as unknown as { letterSpacing: string }).letterSpacing = '0px';

  ctx.fillStyle = INK;
  fitText(ctx, opts.title, 800, 96);
  ctx.fillText(opts.title, cx, 790);

  // One stone per skill finished.
  const gap = 46;
  const startX = cx - ((opts.steps - 1) * gap) / 2;
  for (let i = 0; i < opts.steps; i++) {
    ctx.fillStyle = i % 2 ? '#B9A6EE' : '#8FD3C4';
    ctx.beginPath();
    ctx.arc(startX + i * gap, 850, 14, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = INK;
  ctx.font = '500 32px Inter, system-ui, sans-serif';
  ctx.fillText(`${opts.steps} AI skills finished`, cx, 925);
  ctx.fillStyle = LAGOON;
  ctx.font = '600 30px Inter, system-ui, sans-serif';
  ctx.fillText('cozora.org/library', cx, 975);

  const blob: Blob | null = await new Promise((res) => canvas.toBlob(res, 'image/png'));
  if (!blob) return;
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `cozora-badge-${opts.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}.png`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
