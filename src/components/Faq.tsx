'use client';

import { useState } from 'react';

const faqs = [
  {
    q: 'What do I get with a membership?',
    a: "The creator community, a new Claude skill every week, and the full Skill Library \u2014 every skill we\u2019ve published, searchable by topic. Creator interviews stay free for everyone, member or not.",
  },
  {
    q: 'What exactly is a \u201cskill\u201d?',
    a: "Each week, one of our 40+ creators shares a skill they actually use \u2014 often one they\u2019ve refined over months. You get a short video walkthrough, the complete prompt or a downloadable skill you drop straight into Claude, and the thinking behind when and why to use it.",
  },
  {
    q: 'How often do creators go live?',
    a: "Creator interviews go live regularly, and they\u2019re free for everyone \u2014 member or not. The weekly rhythm lives in the Skill Library: a new Claude skill you can run the night it drops.",
  },
  {
    q: 'Where does all of this happen?',
    a: "On Substack. You subscribe at cozora.substack.com \u2014 free to follow, $39/month or $359/year for the community and the full Skill Library.",
  },
  {
    q: 'Do I need technical experience to join?',
    a: "No. Members range from complete beginners to experienced builders. The skills are built for practical implementation \u2014 you drop them into Claude and go, no theory required.",
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
    a: "Real practitioners \u2014 not influencers. Our 40+ creators are actively building with AI: shipping products, running agencies, creating content, and leading teams. They share the skills they use daily, and we add new voices regularly.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" id="cz-faq">
      <div className="max-w-3xl mx-auto">
        <p className="text-sm font-mono text-cz-coral mb-4 tracking-wide">
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
            Join 40+ expert creators and start building with AI this week.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://cozora.substack.com/subscribe"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-cz-accent hover:bg-cz-accent-hover text-cz-bg font-semibold rounded-lg transition-colors text-center"
            >
              Join for $39/month
            </a>
            <a
              href="/library"
              className="px-8 py-3.5 border border-cz-border hover:border-cz-accent text-cz-text hover:text-cz-accent rounded-lg transition-colors text-center"
            >
              See the skills first
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
