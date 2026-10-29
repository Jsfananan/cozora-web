'use client';

import { useState } from 'react';

const faqs = [
  {
    q: 'What do I get with a membership?',
    a: "The creator community, new Claude skills every week, and the full Skill Library, fully searchable so you can find the skill you need in seconds. Creator interviews stay free for everyone, member or not.",
  },
  {
    q: 'What exactly is a \u201cskill\u201d?',
    a: "A saved set of instructions that teaches Claude to do one job well. Our creators share skills they actually use, often ones they\u2019ve refined over months. You get the complete prompt or a downloadable skill you drop straight into Claude, the thinking behind when and why to use it, and for many of them, a video of the creator running it end to end.",
  },
  {
    q: 'What is a skills journey?',
    a: "A short path through the library, in order. You pick a goal, like writing better or growing your Substack, and we show you which skill to try first, second and third.",
  },
  {
    q: 'How often are new skills added?',
    a: "Two new skills every week, on Tuesday and Thursday. You can run each one the night it drops.",
  },
  {
    q: 'Where does all of this happen?',
    a: "On Substack. You subscribe at cozora.substack.com. It\u2019s free to follow, and $19/month or $99/year gets you the community and the full Skill Library.",
  },
  {
    q: 'Do I need technical experience to join?',
    a: "No. Members range from complete beginners to experienced builders. The skills are built for practical use: you drop them into Claude and go, no theory required.",
  },
  {
    q: 'What makes this different from AI courses?',
    a: "Courses give you knowledge. We give you working skills and the community of creators who built them. You\u2019re shipping real workflows, not just watching lessons.",
  },
  {
    q: 'Can I cancel anytime?',
    a: "Yes. There are no long-term contracts. Cancel anytime from your Substack account. If you\u2019re on an annual plan, you keep access through the end of your billing period.",
  },
  {
    q: 'Who are the creators?',
    a: "Real practitioners, not influencers. Our 50+ creators are actively building with AI: shipping products, running agencies, creating content, and leading teams. They share the skills they use, and we add new voices regularly.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-5 sm:px-6" id="cz-faq">
      <div className="max-w-3xl mx-auto">
        <p className="text-sm font-semibold uppercase tracking-widest text-cz-coral mb-4">
          FAQ
        </p>
        <h2 className="text-4xl sm:text-5xl font-display font-bold text-cz-text mb-2">
          Got Questions?
        </h2>
        <p className="text-lg text-cz-text-muted mb-12">
          Everything you need to know before joining.
        </p>

        <ul className="divide-y divide-cz-border border-t border-b border-cz-border">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <li key={index}>
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between gap-4 py-6 text-left group"
                >
                  <span className="font-display font-semibold text-cz-text text-[1.05rem] tracking-tight group-hover:text-cz-teal transition-colors">
                    {faq.q}
                  </span>
                  <span
                    className={`w-7 h-7 rounded-full border flex items-center justify-center text-cz-teal text-lg shrink-0 transition-all duration-300 ${
                      isOpen
                        ? 'rotate-45 border-cz-teal bg-cz-teal/10'
                        : 'border-cz-border'
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-80' : 'max-h-0'
                  }`}
                >
                  <p className="pb-6 text-cz-text-muted text-[0.95rem] leading-relaxed max-w-[680px]">
                    {faq.a}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Final CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-display font-bold text-cz-text mb-3">
            Ready to start?
          </h3>
          <p className="text-cz-text-muted mb-8 max-w-md mx-auto">
            Join 50+ expert creators and start building with AI this week.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://cozora.substack.com/subscribe"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-cz-accent hover:bg-cz-accent-hover text-white font-semibold rounded-full transition-colors text-center"
            >
              Join for $19/month
            </a>
            <a
              href="/library"
              className="px-8 py-3.5 border border-cz-border-strong hover:border-cz-accent text-cz-text hover:text-cz-accent rounded-full bg-white transition-colors text-center"
            >
              Browse the library
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
