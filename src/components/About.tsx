'use client';

import { useState } from 'react';

const founders = [
  {
    name: 'Claudia Faith',
    focus: 'VC-Backed AI Founder',
    href: 'https://levelupwithai.substack.com/',
    initial: 'C',
    variant: 'claudia' as const,
    avatar: 'https://substackcdn.com/image/fetch/$s_!4uTb!,w_144,h_144,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4322256a-dd11-48cf-b695-252ec512c776_1024x1024.png',
  },
  {
    name: 'Joel Salinas',
    focus: 'Author · AI Strategy Coach',
    href: 'https://leadershipinchange.com',
    initial: 'J',
    variant: 'joel' as const,
    avatar: 'https://substackcdn.com/image/fetch/$s_!11dD!,w_144,h_144,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2077a8c3-7f7d-49d8-93b4-6e668987264e_2048x2048.png',
  },
];

const gradients: Record<string, string> = {
  claudia: 'linear-gradient(135deg, #FFB48A, #B9A6EE)',
  joel: 'linear-gradient(135deg, #1F5F5B, #8FD3C4)',
};

const hoverBorders: Record<string, string> = {
  claudia: 'hover:border-cz-coral hover:shadow-cz-coral/15',
  joel: 'hover:border-cz-teal hover:shadow-cz-teal/15',
};

const arrowColors: Record<string, string> = {
  claudia: 'group-hover:text-cz-coral',
  joel: 'group-hover:text-cz-teal',
};

function FounderAvatar({
  name,
  initial,
  variant,
  avatar,
}: {
  name: string;
  initial: string;
  variant: string;
  avatar: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed || !avatar) {
    return (
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center font-display text-xl font-bold text-cz-text shrink-0 transition-transform duration-300 group-hover:scale-[1.08]"
        style={{ background: gradients[variant] }}
      >
        {initial}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={avatar}
      alt={name}
      loading="lazy"
      onError={() => setFailed(true)}
      className="w-20 h-20 rounded-full object-cover bg-cz-bg-card shrink-0 ring-1 ring-cz-border transition-transform duration-300 group-hover:scale-[1.08]"
    />
  );
}

export default function About() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-24 sm:px-6" id="about">
      <p className="text-center text-sm font-semibold uppercase tracking-widest text-cz-coral">Who we are</p>
      <h2 className="mt-3 text-center font-display text-4xl font-bold text-cz-text sm:text-5xl">Built by creators, for creators.</h2>

      <div className="mt-12 grid grid-cols-2 gap-4">
        {founders.map((founder) => (
          <a
            key={founder.name}
            href={founder.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex flex-col items-center gap-4 rounded-3xl border border-cz-border bg-white p-6 text-center no-underline shadow-[0_18px_40px_-32px_rgba(34,48,58,0.35)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lg ${hoverBorders[founder.variant]}`}
          >
            <FounderAvatar name={founder.name} initial={founder.initial} variant={founder.variant} avatar={founder.avatar} />
            <div className="min-w-0">
              <div className="font-display text-lg font-semibold tracking-tight text-cz-text">{founder.name}</div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-cz-text-muted">{founder.focus}</div>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-12 space-y-5 text-lg leading-relaxed text-cz-text-muted">
        <p>
          <strong className="font-semibold text-cz-text">AI is moving too fast to learn alone.</strong>
        </p>
        <p>
          We built Cozora because we saw the same pattern everywhere: brilliant creators, founders, and professionals trying to keep up with AI by watching tutorials and reading threads, but still feeling behind.
        </p>
        <p>
          The real advantage isn&apos;t information. It&apos;s{' '}
          <strong className="font-semibold text-cz-text">relationships with people who&apos;ve already solved the problems you&apos;re facing.</strong>{' '}
          That&apos;s what Cozora is: a growing community of 50+ expert AI creators sharing the skills that are actually working.
        </p>
        <p>
          We bring in new creators regularly because AI doesn&apos;t stand still and neither do we. From vibe-coding to AI filmmaking, design systems to leadership strategy,{' '}
          <strong className="font-semibold text-cz-text">if AI is changing it, we&apos;re bringing in someone who&apos;s mastered it.</strong>
        </p>
        <p>
          <strong className="font-semibold text-cz-text">Learn a new skill, put it to work, and trade notes with the person who built it.</strong>{' '}
          Something new every week.
        </p>
      </div>
    </section>
  );
}
