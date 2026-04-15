import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Creator Guide — Cozora',
  description:
    'Welcome to the Cozora creator cohort. Get paid for signups, join the creator WhatsApp, and grab your affiliate link.',
  robots: { index: false, follow: false },
};

const AFFILIATE_SHEET_URL =
  'https://docs.google.com/spreadsheets/d/1ryhXIAyJXVL_L5NKteiPUIu3YtrsUGEp7mPtlO-oXL8/edit?usp=sharing';
const WHATSAPP_URL = 'https://chat.whatsapp.com/JwZI9yVgYmXAXhcwdnl4sb?mode=gi_t';
const PROMO_COPY_URL =
  'https://docs.google.com/document/d/18-t2t1BU9bpE8bBSksTkhXG4Ihm0_9ZinPPtRMRBH2A/edit?tab=t.0';
const CREATOR_CAL_URL =
  'https://calendar.google.com/calendar/u/0?cid=Y180NzczZDlmMjk3MDhmZGQ4MDk0ZDYyYjBhNWYxNTIxMjgzYTk0MTY4OTYzOTdjMzMzNGFiNDhiNjEzZjljNDFkQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20';
const CLASS_CAL_URL =
  'https://docs.google.com/spreadsheets/d/1BVKKXHq_vWYENIWTj8PcQqTtQknMA50lNKXq7_SikA8/edit?usp=sharing';
const TERMS_URL =
  'https://docs.google.com/document/d/1umqJU83N89JDXyNLOfPk0CNPKpMuoMzN8MgizwzwMzE/edit?tab=t.0#heading=h.503mk9qyizyz';
export default function CreatorGuidePage() {
  return (
    <>
      <Navbar />
      <main className="creator-guide">
        <div className="cg-container">
          <header className="cg-header">
            <h1 className="cg-logo">
              COZORA <span>Creators</span>
            </h1>
            <p className="cg-tagline">Welcome to the team! Let&apos;s get you earning.</p>
            <p className="cg-welcome">We are so glad you are here!</p>
            <div className="cg-bonus">🏆 $50/month bonus for top contributor</div>
          </header>

          <div className="cg-mission">
            <p>
              We&apos;re building <strong>the AI learning community by 2026</strong>. The more we
              grow together, the more we all win.
            </p>
          </div>

          <div className="cg-perk">
            <div className="cg-perk-header">
              <span className="cg-perk-icon">🎁</span>
              <h3>Creator Network Perks</h3>
            </div>
            <p>
              All 30+ creators in the cohort give each other <strong>99%–100% off</strong> access
              to their newsletters and services — over <strong>$3,000 in direct value</strong> just
              from joining the network.
            </p>
            <p className="cg-perk-sub">
              Fully reciprocal and self-serve: add your own 99%–100% off link to the{' '}
              <a href={AFFILIATE_SHEET_URL} target="_blank" rel="noreferrer">
                Creator Affiliate &amp; Perks Sheet
              </a>{' '}
              and you&apos;ll instantly see everyone else&apos;s.
            </p>
          </div>

          <section className="cg-step cg-step-primary">
            <span className="cg-step-label">Step 1</span>
            <h2 className="cg-step-title">Send Your PayPal Email for Payouts</h2>
            <p className="cg-step-desc">
              Affiliate commissions are paid via <strong>PayPal</strong>. DM <strong>Joel</strong>{' '}
              or <strong>Nina</strong> on Substack or in the creator WhatsApp with the email address
              tied to your PayPal account — that&apos;s all we need to get you set up.
            </p>
            <p className="cg-small">
              Need a different payout method? Just ask — we&apos;ll work with you.
            </p>
          </section>

          <section className="cg-step">
            <span className="cg-step-label">Step 2</span>
            <h2 className="cg-step-title">Say Hi in the Creator WhatsApp</h2>
            <p className="cg-step-desc">
              Introduce yourself to the rest of the Cozora creator group. Share what you write
              about, who your audience is, and what you&apos;re working on — this is where
              collaboration, cross-promos, and creator perks all start.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="cg-btn cg-btn-secondary"
            >
              Join the Creator WhatsApp →
            </a>
          </section>

          <section className="cg-step">
            <span className="cg-step-label">Step 3</span>
            <h2 className="cg-step-title">Grab Your Affiliate Link &amp; Put It to Work</h2>
            <p className="cg-step-desc">
              Every creator gets <strong>two unique affiliate links</strong> — one for your free
              subs, one for your paid subs. Signups through either are tracked to you.
            </p>

            <div className="cg-codes-wrap">
              <p className="cg-codes-title">
                <strong>Two links, two offers:</strong>
              </p>
              <div className="cg-codes">
                <div className="cg-code">
                  <div className="cg-code-label">Link 1 — for your free subs</div>
                  <div className="cg-code-value">10% OFF</div>
                </div>
                <div className="cg-code">
                  <div className="cg-code-label">Link 2 — for your paid subs</div>
                  <div className="cg-code-value">50% OFF</div>
                </div>
              </div>
              <p className="cg-codes-foot">
                Send the right link to the right audience — both are in the sheet next to your name.
              </p>
            </div>

            <a
              href={AFFILIATE_SHEET_URL}
              target="_blank"
              rel="noreferrer"
              className="cg-btn cg-btn-primary"
            >
              Open the Affiliate &amp; Perks Sheet →
            </a>
            <p className="cg-small">
              Find the row with your name and grab both links. New creators: add your row.
            </p>

            <div className="cg-gift">
              <div className="cg-gift-head">
                <span className="cg-gift-icon">🎁</span>
                <h4>Bonus inside the sheet</h4>
              </div>
              <p>
                The same sheet also holds <strong>creator-to-creator 99%–100% off perks</strong> —
                free or near-free access to every other creator&apos;s premium Substack.
              </p>
              <p className="cg-gift-warn">
                <strong>Keep it in the group.</strong> Do not share these links outside the Cozora
                creator cohort.
              </p>
            </div>

            <p className="cg-promo-head">
              <strong>Then put your link everywhere:</strong>
            </p>
            <div className="cg-promo-grid">
              <div className="cg-promo-item"><span>✓</span> Subscription benefits table</div>
              <div className="cg-promo-item"><span>✓</span> Welcome email sequence</div>
              <div className="cg-promo-item"><span>✓</span> Newsletter mention</div>
              <div className="cg-promo-item"><span>✓</span> Substack Note</div>
              <div className="cg-promo-item"><span>✓</span> Community post</div>
              <div className="cg-promo-item"><span>✓</span> Podcast / video mention</div>
            </div>

            <div className="cg-earnings">
              <div className="cg-earnings-amt">$10,800/year</div>
              <div className="cg-earnings-lbl">
                potential earnings with just 5 signups per month
              </div>
            </div>

            <a
              href={PROMO_COPY_URL}
              target="_blank"
              rel="noreferrer"
              className="cg-btn cg-btn-secondary"
            >
              Get Ready-Made Promo Copy
            </a>

            <p className="cg-examples-head">
              <strong>What creators are actually doing:</strong>
            </p>

            <div className="cg-example">
              <div className="cg-example-tag">Example 1 · Paid subscriber benefits (Substack)</div>
              <div className="cg-example-body">
                <div className="cg-sub-label">Paid subscriber benefits</div>
                <div className="cg-sub-sublabel">
                  Let paid subscribers know what they&apos;ll get out of their subscription
                </div>
                <div className="cg-sub-pill">
                  <span className="cg-sub-emoji">🤩</span>
                  <span>50% off Live AI sessions with top experts (worth $360/yr with Cozora)</span>
                </div>
              </div>
              <p className="cg-example-note">
                Drop this line into your Substack&apos;s paid benefits list. Swap the emoji to match
                your style.
              </p>
            </div>

            <div className="cg-example">
              <div className="cg-example-tag">Example 2 · Newsletter intro blurb + CTA</div>
              <div className="cg-example-body">
                <h3 className="cg-post-title">Before We Dive In: A Quick Share</h3>
                <blockquote className="cg-post-quote">
                  I co-founded <u>Cozora</u> for creators who want to learn AI from people actually
                  using it daily. Every week, AI experts share their screens and show exactly how
                  they work. Live.
                </blockquote>
                <p className="cg-post-p">
                  👉 As a paid subscriber to <u>[your newsletter]</u>, you get 50% off.
                </p>
                <div className="cg-post-cta">Join Cozora here</div>
              </div>
              <p className="cg-example-note">
                Use this as the intro block on a regular newsletter post. Replace the bracketed
                text and drop in your affiliate link behind the button.
              </p>
            </div>

            <div className="cg-tip">
              <p>
                <strong>💡 Pro tip:</strong> Lead with <em>why you use Cozora</em>. Frame the 50%
                off as a gift to your paying readers, not a pitch.
              </p>
            </div>
          </section>

          <section className="cg-resources">
            <div className="cg-resources-head">
              <h3>Setup &amp; Resources</h3>
            </div>
            <div className="cg-resource">
              <div>
                <h4>Monthly Creator Calls</h4>
                <p>Coordinate, share updates, support each other</p>
              </div>
              <a href={CREATOR_CAL_URL} target="_blank" rel="noreferrer">
                Add to calendar →
              </a>
            </div>
            <div className="cg-resource">
              <div>
                <h4>Access Cozora on Substack</h4>
                <p>Free access while you&apos;re a creator ($720/year value)</p>
              </div>
              <a href="https://cozora.substack.com/" target="_blank" rel="noreferrer">
                Open →
              </a>
            </div>
            <div className="cg-resource">
              <div>
                <h4>Creators &amp; Class Calendar</h4>
                <p>See who&apos;s teaching and check your session date</p>
              </div>
              <a href={CLASS_CAL_URL} target="_blank" rel="noreferrer">
                View →
              </a>
            </div>
            <div className="cg-resource">
              <div>
                <h4>Terms &amp; Conditions</h4>
                <p>Review and agree via Substack message</p>
              </div>
              <a href={TERMS_URL} target="_blank" rel="noreferrer">
                Read →
              </a>
            </div>
          </section>

          <div className="cg-foot">
            <p>Questions? DM Joel or Nina anytime — on Substack or in the creator WhatsApp.</p>
            <div className="cg-foot-links">
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                Join the Creator WhatsApp →
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <style>{`
        .creator-guide {
          --cg-bg: #0D1214;
          --cg-bg-card: #152022;
          --cg-border: #2A4A4C;
          --cg-text: #FFFFFF;
          --cg-muted: #A8B8BA;
          --cg-pink: #D63BA3;
          --cg-gold: #C79219;
          --cg-mint: #7ED3C0;
          background: var(--cg-bg);
          color: var(--cg-text);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          line-height: 1.6;
        }
        .cg-container { max-width: 700px; margin: 0 auto; padding: 7rem 1.5rem 2rem; }
        @media (max-width: 600px) { .cg-container { padding-top: 8rem; } }
        .cg-header { text-align: center; padding: 2rem 0 3rem; }
        .cg-logo { font-size: 2.2rem; font-weight: 700; margin-bottom: 0.5rem; }
        .cg-logo span { color: var(--cg-pink); }
        .cg-tagline { color: var(--cg-muted); font-size: 1.05rem; }
        .cg-welcome { color: var(--cg-mint); font-size: 1.1rem; font-weight: 600; margin-top: 0.75rem; }
        .cg-bonus {
          display: inline-block;
          background: linear-gradient(135deg, var(--cg-pink), #a82d82);
          padding: 0.5rem 1.25rem;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.9rem;
          margin-top: 1.25rem;
        }
        .cg-mission {
          background: var(--cg-bg-card);
          border: 1px solid var(--cg-border);
          border-radius: 12px;
          padding: 1.25rem 1.5rem;
          margin-bottom: 1.5rem;
          text-align: center;
        }
        .cg-mission p { font-size: 0.95rem; margin: 0; }
        .cg-mission strong { color: var(--cg-mint); }
        .cg-perk {
          background: linear-gradient(135deg, rgba(214, 59, 163, 0.15), rgba(199, 146, 25, 0.1));
          border: 1px solid rgba(214, 59, 163, 0.3);
          border-radius: 12px;
          padding: 1.25rem 1.5rem;
          margin-bottom: 1.5rem;
        }
        .cg-perk-header { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; }
        .cg-perk-icon { font-size: 1.25rem; }
        .cg-perk-header h3 { font-size: 1rem; font-weight: 600; margin: 0; }
        .cg-perk p { font-size: 0.95rem; margin: 0; }
        .cg-perk strong { color: var(--cg-gold); }
        .cg-perk-sub { margin-top: 0.75rem !important; font-size: 0.9rem !important; color: var(--cg-muted) !important; }
        .cg-perk-sub a { color: var(--cg-mint); text-decoration: underline; }
        .cg-step {
          background: var(--cg-bg-card);
          border: 2px solid var(--cg-border);
          border-radius: 16px;
          padding: 2rem;
          margin-bottom: 1.5rem;
        }
        .cg-step-primary {
          border-color: var(--cg-mint);
          background: linear-gradient(135deg, rgba(29, 92, 94, 0.3), var(--cg-bg-card));
        }
        .cg-step-label {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--cg-mint);
          margin-bottom: 0.75rem;
        }
        .cg-step-primary .cg-step-label {
          background: var(--cg-mint);
          color: var(--cg-bg);
          padding: 0.25rem 0.75rem;
          border-radius: 50px;
        }
        .cg-step-title { font-size: 1.4rem; font-weight: 700; margin-bottom: 0.75rem; }
        .cg-step-desc { margin-bottom: 1.5rem; font-size: 1rem; }
        .cg-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          border-radius: 10px;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 600;
          transition: all 0.2s ease;
          width: 100%;
          text-align: center;
        }
        .cg-btn-primary { background: var(--cg-mint); color: var(--cg-bg); }
        .cg-btn-primary:hover { background: #6bc4ad; transform: translateY(-1px); }
        .cg-btn-secondary { background: var(--cg-pink); color: var(--cg-text); }
        .cg-btn-secondary:hover { background: #c42e91; }
        .cg-small { display: block; text-align: center; margin-top: 1rem; color: var(--cg-muted); font-size: 0.9rem; }
        .cg-codes-wrap { background: var(--cg-bg); border-radius: 10px; padding: 1.25rem; margin: 1.5rem 0; }
        .cg-codes-title { font-size: 0.95rem; margin-bottom: 1rem; }
        .cg-codes { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        .cg-code { background: var(--cg-bg); border: 1px dashed var(--cg-border); border-radius: 8px; padding: 1rem; text-align: center; }
        .cg-code-label { font-size: 0.8rem; color: var(--cg-muted); margin-bottom: 0.25rem; }
        .cg-code-value { font-family: monospace; font-size: 1.1rem; font-weight: 600; color: var(--cg-gold); }
        .cg-codes-foot { font-size: 0.85rem; color: var(--cg-muted); margin-top: 1rem; text-align: center; }
        .cg-promo-head { margin-top: 2rem; font-size: 1rem; }
        .cg-promo-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; margin-top: 1rem; }
        .cg-promo-item {
          background: var(--cg-bg);
          padding: 0.75rem 1rem;
          border-radius: 8px;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .cg-promo-item span { color: var(--cg-mint); }
        .cg-earnings { background: var(--cg-bg); border-radius: 10px; padding: 1.25rem; margin: 1.5rem 0; text-align: center; }
        .cg-earnings-amt { font-size: 2rem; font-weight: 700; color: var(--cg-gold); }
        .cg-earnings-lbl { font-size: 0.9rem; color: var(--cg-muted); }
        .cg-examples-head { margin-top: 2rem; font-size: 1rem; }
        .cg-example {
          background: var(--cg-bg);
          border: 1px solid var(--cg-border);
          border-radius: 12px;
          padding: 1.25rem;
          margin-top: 1rem;
        }
        .cg-example-tag {
          display: inline-block;
          font-family: monospace;
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--cg-mint);
          background: rgba(126, 211, 192, 0.1);
          padding: 0.25rem 0.6rem;
          border-radius: 50px;
          margin-bottom: 0.9rem;
        }
        .cg-example-body {
          background: #FAFAF7;
          color: #1F2328;
          border-radius: 8px;
          padding: 1.1rem 1.15rem;
          font-family: 'Inter', -apple-system, sans-serif;
        }
        .cg-example-note {
          font-size: 0.82rem !important;
          color: var(--cg-muted) !important;
          margin-top: 0.75rem !important;
          margin-bottom: 0 !important;
        }
        .cg-sub-label { font-weight: 700; font-size: 0.95rem; color: #1F2328; margin-bottom: 0.2rem; }
        .cg-sub-sublabel { font-size: 0.82rem; color: #6E7781; margin-bottom: 0.75rem; }
        .cg-sub-pill {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          border: 1px solid #D0D7DE;
          border-radius: 8px;
          padding: 0.7rem 0.9rem;
          font-size: 0.92rem;
          color: #1F2328;
          background: #FFFFFF;
        }
        .cg-sub-emoji { font-size: 1.1rem; flex-shrink: 0; }
        .cg-post-title { font-family: 'Georgia', serif; font-size: 1.35rem; font-weight: 800; color: #1F2328; margin-bottom: 0.75rem; line-height: 1.25; }
        .cg-post-quote {
          border-left: 3px solid #EA580C;
          padding: 0.15rem 0 0.15rem 0.9rem;
          margin: 0 0 0.85rem;
          font-family: 'Georgia', serif;
          font-size: 0.95rem;
          line-height: 1.55;
          color: #1F2328;
        }
        .cg-post-p { font-family: 'Georgia', serif; font-size: 0.95rem; color: #1F2328; margin-bottom: 1rem; }
        .cg-post-cta {
          display: inline-block;
          background: #EA580C;
          color: #FFFFFF;
          font-weight: 600;
          font-size: 0.95rem;
          padding: 0.7rem 1.25rem;
          border-radius: 6px;
        }
        .cg-gift {
          background: linear-gradient(135deg, rgba(199, 146, 25, 0.14), rgba(214, 59, 163, 0.1));
          border: 1px solid rgba(199, 146, 25, 0.4);
          border-radius: 10px;
          padding: 1.1rem 1.25rem;
          margin-top: 1.25rem;
        }
        .cg-gift-head { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; }
        .cg-gift-icon { font-size: 1.15rem; }
        .cg-gift-head h4 { font-size: 0.95rem; font-weight: 600; margin: 0; color: var(--cg-gold); }
        .cg-gift p { font-size: 0.9rem; margin: 0; }
        .cg-gift strong { color: var(--cg-gold); }
        .cg-gift-warn { margin-top: 0.65rem !important; font-size: 0.85rem !important; color: var(--cg-muted) !important; }
        .cg-gift-warn strong { color: var(--cg-pink); }
        .cg-tip {
          background: rgba(126, 211, 192, 0.08);
          border: 1px solid rgba(126, 211, 192, 0.25);
          border-radius: 10px;
          padding: 1rem 1.25rem;
          margin-top: 1.5rem;
        }
        .cg-tip p { font-size: 0.9rem; margin: 0; }
        .cg-tip strong { color: var(--cg-mint); }
        .cg-resources { margin-top: 2rem; }
        .cg-resources-head { padding: 1rem 0; border-top: 1px solid var(--cg-border); }
        .cg-resources-head h3 { font-size: 1.1rem; font-weight: 600; }
        .cg-resource {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: var(--cg-bg-card);
          border-radius: 10px;
          margin-bottom: 0.75rem;
        }
        .cg-resource h4 { font-size: 0.95rem; font-weight: 600; margin-bottom: 0.25rem; }
        .cg-resource p { font-size: 0.85rem; color: var(--cg-muted); }
        .cg-resource a { color: var(--cg-mint); text-decoration: none; font-size: 0.9rem; font-weight: 500; white-space: nowrap; }
        .cg-resource a:hover { text-decoration: underline; }
        .cg-foot { text-align: center; padding: 2rem 0; border-top: 1px solid var(--cg-border); margin-top: 2rem; }
        .cg-foot p { color: var(--cg-muted); margin-bottom: 1rem; }
        .cg-foot-links { display: flex; justify-content: center; gap: 2rem; }
        .cg-foot-links a { color: var(--cg-text); text-decoration: none; font-size: 0.95rem; }
        .cg-foot-links a:hover { color: var(--cg-mint); }
        @media (max-width: 600px) {
          .cg-promo-grid { grid-template-columns: 1fr; }
          .cg-codes { grid-template-columns: 1fr; }
          .cg-foot-links { flex-direction: column; gap: 1rem; }
          .cg-resource { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
        }
      `}</style>
    </>
  );
}
