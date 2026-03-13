/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';

interface SessionData {
  date: string;
  topic: string;
  creator: string;
  bio: string[];
  image?: string;
  substackUrl?: string;
}

const SHEET_ID = '1BVKKXHq_vWYENIWTj8PcQqTtQknMA50lNKXq7_SikA8';

const creatorImages: Record<string, string> = {
  'yana g.y.': 'https://i.imgur.com/hz3RMqL.png',
  'michael simmons': 'https://i.imgur.com/VoMEoXe.png',
  'leor gyar': 'https://i.imgur.com/hHhG9dd.png',
  leor: 'https://i.imgur.com/hHhG9dd.png',
  'claudia faith': 'https://i.imgur.com/H4j2Qm2.png',
  claudia: 'https://i.imgur.com/H4j2Qm2.png',
  'phil powis': 'https://i.imgur.com/P4KoVj0.png',
  'joel salinas': 'https://i.imgur.com/eyxXt7P.png',
  wyndo: 'https://i.imgur.com/wDMDD5A.png',
  anfernee: 'https://i.imgur.com/6uD0VdO.png',
  'elena calvillo': 'https://i.imgur.com/AonRMsp.png',
  'dennis berry': 'https://i.imgur.com/wCIea5S.png',
  'jeremy caplan': 'https://i.imgur.com/OvLVNVX.png',
  'ev chapman': 'https://i.imgur.com/JPuC9YC.png',
  'jenny ouyang': 'https://i.imgur.com/paFW8i6.png',
  'daniel nest': 'https://i.imgur.com/GJjma5T.png',
  'max bernstein': 'https://i.imgur.com/a0g0uPR.png',
  sharyph: 'https://i.imgur.com/ReJp7UB.png',
  zeng: 'https://i.imgur.com/Y3nBEfN.png',
  'samuel theophilus': 'https://i.imgur.com/fWbOUre.png',
  'timo mason': 'https://i.imgur.com/l9g2UXx.png',
  'jonas braadbaar': 'https://i.imgur.com/yjPHsdK.png',
  'james presbitero': 'https://i.imgur.com/W0KdEQ5.png',
  'elettra fiumi': 'https://i.imgur.com/gMyQh6C.png',
  'nitin sharma': 'https://i.imgur.com/nwozlhP.png',
  'john brewton': 'https://i.imgur.com/7nzxgbg.png',
  'taylin j. simmonds': 'https://i.imgur.com/hwaI6hw.png',
  'taylin john simmonds': 'https://i.imgur.com/hwaI6hw.png',
  'taylin simmonds': 'https://i.imgur.com/hwaI6hw.png',
  'alex fiore': 'https://i.imgur.com/IY9Fgg3.png',
  'tuhin patra': 'https://i.imgur.com/0GDlkxn.png',
  'pietro montaldo': 'https://i.imgur.com/ZVy7WqT.png',
  'joshua davis': 'https://i.imgur.com/r3foMtF.png',
  'dheeraj sharma': 'https://i.imgur.com/PzisbzA.png',
  'jurgen appelo': 'https://i.imgur.com/enWWFr9.png',
  'nick quick': 'https://i.imgur.com/BMcxKLT.png',
  'andrea chiarelli': '',
};

const creatorBios: Record<string, string[]> = {
  'elettra fiumi': [
    'Award-winning AI filmmaker & director',
    'Partner with Runway, Sora, Pika, ElevenLabs',
    'Teaches AI Cinema at film festivals',
  ],
  'james presbitero': [
    'AI systems designer for founders & creatives',
    'Builds "Unpromptable" leaders',
    '2,000+ Substack subscribers',
  ],
  'alex fiore': [
    'AI Central: 15K+ subscribers, 250K+ weekly readers',
    'Step-by-step tutorials for GPT, Gemini, Claude',
    'Author of comprehensive ChatGPT resource book',
  ],
  wyndo: [
    '10K+ subscribers, #28 Rising in Technology',
    'Built entire newsletter using Claude Code',
    'Top global voice in AI for non-technical users',
  ],
  'taylin john simmonds': [
    'Ghostwriting agency generates $500K+ ARR',
    'Produced $4M+ client revenue, 2B+ impressions',
    'Former teacher turned full-time ghostwriter',
  ],
  'taylin j. simmonds': [
    'Ghostwriting agency generates $500K+ ARR',
    'Produced $4M+ client revenue, 2B+ impressions',
    'Former teacher turned full-time ghostwriter',
  ],
  'nitin sharma': [
    '10K+ subscribers; practical everyday AI guides',
    'Made six figures online as writer',
    'Sells digital AI products via Gumroad',
  ],
  'timo mason': [
    '14M+ views on Twitter with viral threads',
    'AI content systems for Substack creators',
    'Grows & monetizes personal brands with AI',
  ],
  'yana g.y.': [
    '9.8K+ subscribers; Substack Bestseller, Top 100',
    'Built $5K-$10K/mo newsletter',
    'Works 2 hours/day using AI and automations',
  ],
  'daniel nest': [
    '15K+ subscribers on "Why Try AI"',
    'Hands-on generative AI reviewer',
    'Makes AI accessible for non-technical audiences',
  ],
  sharyph: [
    '18K+ subscribers on "The Digital Creator"',
    'Teaches creators to start, grow & scale with AI',
    'Plug-and-play AI prompts across niches',
  ],
  'leor gyar': [
    '58K+ subscribers; Substack Bestseller',
    'Author of "The Hidden Laws of AI"',
    'Explores AI, philosophy & speculative science',
  ],
  leor: [
    '58K+ subscribers; Substack Bestseller',
    'Author of "The Hidden Laws of AI"',
    'Explores AI, philosophy & speculative science',
  ],
  'michael simmons': [
    '119K+ subscribers; #32 in Business on Substack',
    'Published in TIME, Forbes, Fortune, HBR',
    'Articles average 150K+ views',
  ],
  'elena calvillo': [
    'AI Product Leader; trusted by Reforge community',
    'Teaches PMs to lead through technical clarity',
    'Stakeholder alignment & evidence-based decisions',
  ],
  anfernee: [
    '30K+ solopreneurs via "Solopreneur Code"',
    'Built top Notion AI resource on GitHub',
    'Created the "First Digital Dollar Project"',
  ],
  'phil powis': [
    '25K+ subscribers; Substack Bestseller (Top 100)',
    'Co-organizes 500-person Substack Unconference',
    'Expert in email marketing funnels & automation',
  ],
  'dennis berry': [
    '126K+ newsletter subscribers; 152K+ on LinkedIn',
    'Built two multi-million dollar companies',
    '30 years of business & investment experience',
  ],
  'samuel theophilus': [
    'AI Engineer with 6+ years building ML solutions',
    'Published IEEE research on neural networks',
    'Expertise in computer vision and NLP',
  ],
  zeng: [
    'Creative Director & AI video producer',
    'Ambassador for Adobe, Hailuo, LTX Studio',
    'Partners with 20+ AI brands',
  ],
  'john brewton': [
    'Harvard economics grad; ex-PhD at U of Chicago',
    'Sold family B2B distribution company',
    '50K+ audience; #46 Rising in Technology',
  ],
  'joshua davis': [
    '14K+ subscribers across three publications',
    'Founded ZeroAcquire: startup acquisition',
    'Specializes in AI and no-code business exits',
  ],
  'tuhin patra': [
    'Founder of deepwriting.ai content platform',
    'Builds custom AI content systems',
    'Helps solopreneurs automate authority content',
  ],
  'pietro montaldo': [
    'AI tutorials for non-techies',
    'Teaches AI Growth Systems Bootcamp on Maven',
    'Specializes in AI workflows for marketing',
  ],
  claudia: [
    '14K+ subscribers; 0 to 10K in one year',
    '#6 Rising in International on Substack',
    'Serial entrepreneur; $5K+/mo newsletter',
  ],
  'claudia faith': [
    '14K+ subscribers; 0 to 10K in one year',
    '#6 Rising in International on Substack',
    'Serial entrepreneur; $5K+/mo newsletter',
  ],
  'jurgen appelo': [
    '17K+ subscribers; author of 6 books',
    'Inc.com Top 50 Leadership Expert',
    'Author of "Human Robot Agent"',
  ],
  'nick quick': [
    'Created the "Voiceprint" VAST framework',
    'Teaches creators to document voice patterns',
    'Makes AI writing sound like you',
  ],
  'andrea chiarelli': [
    '28K+ subscribers; "The Art of Asking Questions"',
    'PhD in Engineering, MBA, board member',
    'Helps leaders think like consultants',
  ],
  'jeremy caplan': [
    'Wonder Tools newsletter',
    'Columbia Journalism professor',
    'Expert in AI productivity tools',
  ],
};

function getCreatorImage(name: string): string | undefined {
  const lower = name.toLowerCase().trim();
  return creatorImages[lower];
}

function getCreatorBio(name: string): string[] {
  const lower = name.toLowerCase().trim();
  return creatorBios[lower] || [];
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() || '')
    .join('');
}

export default function Schedule() {
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const loadSchedule = async () => {
      try {
        const creatorMap = new Map<string, string>();

        (window as any).__czCreatorsCallback = (response: any) => {
          if (response.table && response.table.rows) {
            response.table.rows.forEach((row: any) => {
              const creatorName = row.c[1]?.v || '';
              const substackUrl = row.c[2]?.v || '';
              if (creatorName && substackUrl) {
                creatorMap.set(creatorName.toLowerCase(), substackUrl);
              }
            });
          }
        };

        const creatorsScript = document.createElement('script');
        creatorsScript.src = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=responseHandler:__czCreatorsCallback&sheet=Creators`;
        document.body.appendChild(creatorsScript);

        setTimeout(() => {
          (window as any).__czScheduleCallback = (response: any) => {
            if (response.table && response.table.rows) {
              const parsed: SessionData[] = response.table.rows
                .map((row: any) => {
                  const dateValue = row.c[0]?.f || row.c[0]?.v || '';
                  const topic = row.c[1]?.v || '';
                  const creator = row.c[2]?.v || '';

                  if (!topic || topic === '-' || !creator) {
                    return null;
                  }

                  const bio = getCreatorBio(creator);
                  const image = getCreatorImage(creator);
                  const substackUrl = creatorMap.get(creator.toLowerCase());

                  return {
                    date: dateValue,
                    topic,
                    creator,
                    bio,
                    image,
                    substackUrl,
                  };
                })
                .filter((s: SessionData | null) => s !== null);

              setSessions(parsed);
              setLoading(false);
            }
          };

          const scheduleScript = document.createElement('script');
          scheduleScript.src = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=responseHandler:__czScheduleCallback`;
          document.body.appendChild(scheduleScript);

          return () => {
            if (document.body.contains(scheduleScript)) {
              document.body.removeChild(scheduleScript);
            }
          };
        }, 100);

        return () => {
          if (document.body.contains(creatorsScript)) {
            document.body.removeChild(creatorsScript);
          }
        };
      } catch (error) {
        console.error('Failed to load schedule:', error);
        setLoading(false);
      }
    };

    loadSchedule();
  }, []);

  const displayedSessions = showAll ? sessions : sessions.slice(0, 8);

  return (
    <section id="cz-schedule"
      className="py-20 px-4 sm:px-6 lg:px-8 relative"
      style={{
        backgroundColor: 'rgba(29, 92, 94, 0.06)',
        borderTopWidth: '1px',
        borderBottomWidth: '1px',
        borderColor: 'rgba(126, 211, 192, 0.1)',
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-12">
          <div>
            <div className="text-xs font-mono text-cz-coral uppercase tracking-widest mb-3">
              AI Creator Cohort
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-cz-text">
              Live Session Schedule
            </h2>
          </div>

          <div
            className="px-4 py-2 rounded-full border flex items-center gap-2 w-fit"
            style={{
              borderColor: 'rgba(126, 211, 192, 0.3)',
              backgroundColor: 'rgba(126, 211, 192, 0.05)',
            }}
          >
            <span className="font-mono text-sm text-cz-teal">Thursdays · 11AM ET</span>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-cz-text-muted">Loading schedule...</p>
          </div>
        ) : sessions.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-cz-text-muted">No sessions available</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {displayedSessions.map((session, idx) => (
                <div
                  key={idx}
                  className="border border-cz-border rounded-lg bg-cz-bg-card hover:border-cz-teal hover:bg-cz-bg-card-hover transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', gap: '1.5rem' }}>
                    <div className="p-6 flex flex-col items-center sm:items-start gap-3">
                      <div className="font-mono text-xs text-cz-teal uppercase tracking-wider">
                        {session.date}
                      </div>

                      {session.image ? (
                        <img
                          src={session.image}
                          alt={session.creator}
                          loading="lazy"
                          className="w-28 h-28 rounded-xl border border-cz-border object-cover"
                        />
                      ) : (
                        <div className="w-28 h-28 rounded-xl border border-cz-border bg-cz-deep-teal flex items-center justify-center">
                          <span className="text-lg font-display font-bold text-cz-teal">
                            {getInitials(session.creator)}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-6 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg sm:text-xl font-display font-bold text-cz-text mb-2">
                          {session.topic}
                        </h3>

                        <div className="flex items-center gap-2 mb-4">
                          {session.substackUrl ? (
                            <a
                              href={session.substackUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-cz-teal hover:underline font-semibold"
                            >
                              {session.creator}
                            </a>
                          ) : (
                            <span className="text-cz-teal font-semibold">{session.creator}</span>
                          )}
                        </div>

                        {session.bio.length > 0 && (
                          <div className="flex flex-wrap gap-3">
                            {session.bio.map((item, bioIdx) => (
                              <div
                                key={bioIdx}
                                className="flex items-center gap-1 text-sm text-cz-text-muted"
                              >
                                <span className="text-cz-teal">~</span>
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <style>{`
                    @media (max-width: 639px) {
                      [style*="grid-template-columns: 130px 1fr"] {
                        grid-template-columns: 1fr;
                      }
                    }
                  `}</style>
                </div>
              ))}
            </div>

            {sessions.length > 8 && (
              <div className="flex justify-center">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="px-6 py-3 font-mono text-sm text-cz-teal hover:text-cz-accent transition-colors"
                >
                  {showAll ? 'Show Less ↑' : 'Show Full Schedule ↓'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
