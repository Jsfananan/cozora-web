'use client';

import { useState } from 'react';
import BuyButton from './BuyButton';

const faqs = [
  {
    q: "What if I can\u2019t make the Thursday sessions live?",
    a: "Every session is recorded. Most members watch 50/50 live vs replay. The value is in both the content and the community \u2014 live attendance helps with networking, but replays ensure you never miss the workflows.",
  },
  {
    q: 'Do I need technical experience to join?',
    a: "No. We have members from complete beginners to experienced developers. The smart matching system connects you with people at your level, and sessions are designed for practical implementation, not theory.",
  },
  {
    q: 'How quickly will I see results?',
    a: "Most members implement their first workflow within 2 weeks. By month\u2019s end, you\u2019ll have 2 working systems.",
  },
  {
    q: 'What makes this different from AI courses?',
    a: "Courses give you knowledge. We give you working systems, expert guidance, and the collaborators who help you ship. You\u2019re building, not just learning.",
  },
  {
    q: 'What happens when new cohorts launch?',
    a: "You get automatic access. Your price never increases. As we add AI Design, AI Video, AI Product Management, and AI Marketing cohorts throughout 2026, your membership expands \u2014 but your cost stays locked.",
  },
  {
    q: "What if I don\u2019t find the right collaboration partners?",
    a: "We don\u2019t leave it to chance. Onboarding calls, monthly show & tells, and discussion boards are all designed to surface connections. If you\u2019re not finding your people, we\u2019ll help you proactively.",
  },
  {
    q: 'Can I cancel anytime?',
    a: "Yes. There are no long-term contracts. Cancel anytime from your account settings. If you\u2019re on an annual plan, you keep access through the end of your billing period.",
  },
  {
    q: 'Who are the creators teaching the sessions?',
    a: "Real practitioners \u2014 not influencers. Our 30+ creators are actively building with AI: shipping products, running agencies, creating content, and leading teams. They teach what they use daily, and we add new voices every week.",
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
            Join 30+ expert creators and start building with AI this week.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://cozora.substack.com/subscribe"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-cz-accent hover:bg-cz-accent-hover text-cz-bg font-semibold rounded-lg transition-colors text-center"
            >
              Subscribe on Substack
            </a>
            <BuyButton className="px-8 py-3.5 border border-cz-border hover:border-cz-accent text-cz-text hover:text-cz-accent rounded-lg transition-colors text-center">
              Get Skill Sets &mdash; $99
            </BuyButton>
          </div>
        </div>
      </div>
    </section>
  );
}
