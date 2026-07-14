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
  {
    name: 'Michael Simmons',
    focus: 'TIME/Forbes/HBR Writer',
    href: 'https://blockbuster.thoughtleader.school/',
    initial: 'M',
    variant: 'michael' as const,
    avatar: 'https://substackcdn.com/image/fetch/$s_!ZmSK!,w_144,h_144,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2a9378a0-025b-4c2a-a030-cfffc60544f9_694x693.png',
  },
];

const gradients: Record<string, string> = {
  claudia: 'linear-gradient(135deg, #D63BA3, #e066b8)',
  joel: 'linear-gradient(135deg, #1D5C5E, #7ED3C0)',
  michael: 'linear-gradient(135deg, #C79219, #daa52e)',
};

const hoverBorders: Record<string, string> = {
  claudia: 'hover:border-cz-coral hover:shadow-cz-coral/15',
  joel: 'hover:border-cz-teal hover:shadow-cz-teal/15',
  michael: 'hover:border-cz-accent hover:shadow-cz-accent/15',
};

const arrowColors: Record<string, string> = {
  claudia: 'group-hover:text-cz-coral',
  joel: 'group-hover:text-cz-teal',
  michael: 'group-hover:text-cz-accent',
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
        className="w-14 h-14 rounded-full flex items-center justify-center font-display text-xl font-bold text-cz-bg shrink-0 transition-transform duration-300 group-hover:scale-[1.08]"
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
      className="w-14 h-14 rounded-full object-cover bg-cz-bg-card shrink-0 ring-1 ring-cz-border transition-transform duration-300 group-hover:scale-[1.08]"
    />
  );
}

export default function About() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" id="about">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm font-mono text-cz-coral mb-4 tracking-wide">
          WHO WE ARE
        </p>
        <h2 className="text-4xl sm:text-5xl font-display font-bold text-cz-text mb-12">
          Built by creators, for creators.
        </h2>

        <div className="grid md:grid-cols-[0.8fr_1.2fr] gap-12 md:gap-16 items-start">
          <div className="flex flex-row md:flex-col gap-3">
            {founders.map((founder) => (
              <a
                key={founder.name}
                href={founder.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex flex-col md:flex-row items-center gap-3 md:gap-4 p-3 md:p-4 bg-cz-bg-card border border-cz-border rounded-xl no-underline transition-all duration-300 hover:bg-cz-bg-card-hover hover:-translate-y-0.5 hover:shadow-lg ${hoverBorders[founder.variant]}`}
              >
                <FounderAvatar
                  name={founder.name}
                  initial={founder.initial}
                  variant={founder.variant}
                  avatar={founder.avatar}
                />
                <div className="flex-1 min-w-0 text-center md:text-left">
                  <div className="font-display font-semibold text-cz-text text-[1.05rem] tracking-tight mb-0.5">
                    {founder.name}
                  </div>
                  <div className="font-mono text-[0.65rem] uppercase tracking-wider text-cz-text-muted">
                    {founder.focus}
                  </div>
                </div>
                <span className={`hidden md:block text-cz-text-dim transition-all duration-300 group-hover:translate-x-1 ${arrowColors[founder.variant]}`}>
                  &rarr;
                </span>
              </a>
            ))}
          </div>

          <div className="space-y-4 text-cz-text-muted leading-relaxed">
            <p>
              <strong className="text-cz-text font-semibold">AI is moving too fast to learn alone.</strong>
            </p>
            <p>
              We built Cozora because we saw the same pattern everywhere: brilliant creators, founders, and professionals trying to keep up with AI by watching tutorials and reading threads &mdash; but still feeling behind.
            </p>
            <p>
              The real advantage isn&apos;t information. It&apos;s{' '}
              <strong className="text-cz-text font-semibold">relationships with people who&apos;ve already solved the problems you&apos;re facing.</strong>{' '}
              That&apos;s what Cozora is &mdash; a growing community of 40+ expert AI creators sharing the skills that are actually working.
            </p>
            <p>
              We bring in new creators regularly because AI doesn&apos;t stand still and neither do we. From vibe-coding to AI filmmaking, design systems to leadership strategy &mdash;{' '}
              <strong className="text-cz-text font-semibold">if AI is changing it, we&apos;re bringing in someone who&apos;s mastered it.</strong>
            </p>
            <p>
              Think of it as{' '}
              <strong className="text-cz-text font-semibold">the Y Combinator for AI projects.</strong>{' '}
              Learn a new skill, put it to work, and trade notes with people who&apos;ve already done it &mdash; something new every week.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
