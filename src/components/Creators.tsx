const row1Creators = [
  { name: 'Jeremy Caplan', href: 'https://substack.com/@wondertools' },
  { name: 'Max Bernstein', href: 'https://substack.com/@maxbernstein3' },
  { name: 'Wyndo', href: 'https://substack.com/@wyndo' },
  { name: 'Ev Chapman', href: 'https://substack.com/@evielync' },
  { name: 'Michael Simmons', href: 'https://substack.com/@michaeldsimmons' },
  { name: 'Jonas Braadbaar', href: 'https://substack.com/@denominations' },
  { name: 'Jenny Ouyang', href: 'https://substack.com/@jennyouyang' },
  { name: 'Claudia Faith', href: 'https://substack.com/@claudiafaith' },
  { name: 'Joel Salinas', href: 'https://substack.com/@leadershipinchange10' },
  { name: 'James Presbitero', href: 'https://substack.com/@jamespresbitero' },
  { name: 'Alex Fiore', href: 'https://substack.com/@gptcentral' },
  { name: 'Elena Calvillo', href: 'https://substack.com/@elenacalvillo' },
  { name: 'Leor Gyar', href: 'https://substack.com/@exploringchatgpt' },
  { name: 'Taylin J. Simmonds', href: 'https://substack.com/@taylinsimmonds' },
  { name: 'Nitin Sharma', href: 'https://substack.com/@nitinfab' },
  { name: 'Timo Mason', href: 'https://substack.com/@timomason' },
];

const row2Creators = [
  { name: 'Anfernee', href: 'https://substack.com/@anferneeck' },
  { name: 'Yana G.Y.', href: 'https://substack.com/@yanagy' },
  { name: 'Phil Powis', href: 'https://substack.com/@sacredbusinessflow' },
  { name: 'Daniel Nest', href: 'https://substack.com/@whytryai' },
  { name: 'Dennis Berry', href: 'https://substack.com/@dennisberry123' },
  { name: 'Samuel Theophilus', href: 'https://substack.com/@nnitiwe' },
  { name: 'Elettra Fiumi', href: 'https://substack.com/@aicinema' },
  { name: 'Sharyph', href: 'https://substack.com/@sharyph' },
  { name: 'Zeng', href: 'https://substack.com/@zengwt' },
  { name: 'John Brewton', href: 'https://substack.com/@johnbrewton' },
  { name: 'Joshua Davis', href: 'https://substack.com/@joshuadavis' },
  { name: 'Tuhin Patra', href: 'https://substack.com/@tuhinpatra' },
  { name: 'Pietro Montaldo', href: 'https://substack.com/@pietromontaldo' },
  { name: 'J\u00fcrgen Appelo', href: 'https://substack.com/@jurgenappelo' },
  { name: 'Nick Quick', href: 'https://substack.com/@nickquick' },
  { name: 'Dheeraj Sharma', href: 'https://substack.com/@genaiunplugged' },
  { name: 'Andrea Chiarelli', href: 'https://substack.com/@andreachiarelli' },
];

function CreatorChip({ name, href }: { name: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 px-5 py-2.5 bg-cz-bg-card border border-cz-border rounded-full whitespace-nowrap font-display text-[0.95rem] font-medium text-cz-text-muted tracking-tight no-underline transition-all duration-300 hover:border-cz-teal hover:text-cz-text hover:bg-cz-bg-card-hover hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cz-teal/10"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-cz-teal opacity-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-[1.4]" />
      {name}
    </a>
  );
}

export default function Creators() {
  return (
    <>
      <style>{`
        @keyframes czMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <section className="bg-cz-bg py-20 px-4 sm:px-6 lg:px-8 overflow-hidden" id="cz-creators">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-sm font-mono text-cz-coral mb-4 tracking-wide">
              OUR CREATOR NETWORK
            </p>
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-cz-text mb-4">
              30+ Expert AI Creators &mdash; and growing every week
            </h2>
            <p className="text-lg text-cz-text-muted font-body max-w-2xl">
              We&apos;re constantly bringing in new voices across design, vibe-coding, video, leadership, strategy, and more.
            </p>
          </div>

          <div className="space-y-4">
            <div className="overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8">
              <div
                className="flex gap-3 px-4 sm:px-6 lg:px-8 hover:[animation-play-state:paused]"
                style={{ animation: 'czMarquee 55s linear infinite' }}
              >
                {[...row1Creators, ...row1Creators].map((creator, index) => (
                  <div key={`${creator.name}-${index}`}>
                    <CreatorChip name={creator.name} href={creator.href} />
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8">
              <div
                className="flex gap-3 px-4 sm:px-6 lg:px-8 hover:[animation-play-state:paused]"
                style={{ animation: 'czMarquee 55s linear infinite reverse' }}
              >
                {[...row2Creators, ...row2Creators].map((creator, index) => (
                  <div key={`${creator.name}-${index}`}>
                    <CreatorChip name={creator.name} href={creator.href} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
