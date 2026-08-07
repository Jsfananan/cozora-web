'use client';

import { useState } from 'react';

type Creator = { name: string; href: string; role: string; avatar: string };

const row1Creators: Creator[] = [
  { name: 'Jeremy Caplan', href: 'https://substack.com/@wondertools', role: 'CUNY J-School Director', avatar: 'https://substackcdn.com/image/fetch/$s_!wnwT!,w_88,h_88,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F71a60be2-fb37-4515-94bc-82e21a1b3269_339x433.jpeg' },
  { name: 'Max Bernstein', href: 'https://substack.com/@maxbernstein3', role: '66K+ Subscribers', avatar: 'https://substackcdn.com/image/fetch/$s_!1BSr!,w_88,h_88,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8002e13d-d86c-461d-933c-706faaf3b287_1024x1024.png' },
  { name: 'Wyndo', href: 'https://substack.com/@wyndo', role: '22K+ Subscribers', avatar: 'https://substackcdn.com/image/fetch/$s_!zTXR!,w_88,h_88,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2ac42946-717d-4e50-8477-551c5d7a3025_1638x1638.jpeg' },
  { name: 'Ev Chapman', href: 'https://substack.com/@evielync', role: 'AI Systems Builder', avatar: 'https://substackcdn.com/image/fetch/$s_!iFzq!,w_88,h_88,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc5221cc6-1da4-4036-9d58-ece54f8fc588_2800x2800.jpeg' },
  { name: 'Michael Simmons', href: 'https://substack.com/@michaeldsimmons', role: 'TIME/Forbes/HBR Writer', avatar: 'https://substackcdn.com/image/fetch/$s_!ZmSK!,w_88,h_88,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2a9378a0-025b-4c2a-a030-cfffc60544f9_694x693.png' },
  { name: 'Jonas Braadbaar', href: 'https://substack.com/@denominations', role: 'AI Architect · CTO', avatar: 'https://substackcdn.com/image/fetch/$s_!sOMl!,w_88,h_88,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6456aa5c-471e-463e-aec8-fce85d1c5c9d_1857x1857.jpeg' },
  { name: 'Jenny Ouyang', href: 'https://substack.com/@jennyouyang', role: '8.5K+ Subscribers', avatar: 'https://substackcdn.com/image/fetch/$s_!J11w!,w_88,h_88,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd58af265-d136-4498-a268-5e2ed0ca8835_1015x1015.png' },
  { name: 'Claudia Faith', href: 'https://substack.com/@claudiafaith', role: 'VC-Backed AI Founder', avatar: 'https://substackcdn.com/image/fetch/$s_!4uTb!,w_88,h_88,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4322256a-dd11-48cf-b695-252ec512c776_1024x1024.png' },
  { name: 'Joel Salinas', href: 'https://substack.com/@leadershipinchange10', role: 'Author · AI Strategy Coach', avatar: 'https://substackcdn.com/image/fetch/$s_!11dD!,w_88,h_88,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2077a8c3-7f7d-49d8-93b4-6e668987264e_2048x2048.png' },
  { name: 'James Presbitero', href: 'https://substack.com/@jamespresbitero', role: 'Creator, Unpromptable', avatar: 'https://substackcdn.com/image/fetch/$s_!Zwf9!,w_88,h_88,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0763a29d-cc76-47d0-b18a-5567aee11ade_572x572.png' },
  { name: 'Alex Fiore', href: 'https://substack.com/@gptcentral', role: '28K+ Subscribers', avatar: 'https://substackcdn.com/image/fetch/$s_!LpG5!,w_88,h_88,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0fd12bb9-e94a-44a3-acd4-68b527812c8c_500x500.png' },
  { name: 'Elena Calvillo', href: 'https://substack.com/@elenacalvillo', role: 'Published Author · Founder', avatar: 'https://substackcdn.com/image/fetch/$s_!RnEf!,w_88,h_88,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fad6b36c8-e5a6-4820-b875-e7165528aae9_3000x3000.jpeg' },
  { name: 'Leor Gyar', href: 'https://substack.com/@exploringchatgpt', role: '58K+ Subscribers', avatar: 'https://substackcdn.com/image/fetch/$s_!c_vO!,w_88,h_88,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F44cdc3e5-e59d-46f4-b5b6-8152ac3296a7_1024x1024.png' },
  { name: 'Taylin J. Simmonds', href: 'https://substack.com/@taylinsimmonds', role: '13K+ Subscribers', avatar: 'https://substackcdn.com/image/fetch/$s_!5B7V!,w_88,h_88,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff98ecdf5-450d-4e10-9dcc-91ff81b4af13_531x531.png' },
  { name: 'Nitin Sharma', href: 'https://substack.com/@nitinfab', role: '12K+ Subscribers', avatar: 'https://substackcdn.com/image/fetch/$s_!uiNg!,w_88,h_88,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F89f7df93-3ffe-4949-a7a6-f036ba5f2616_1792x1792.jpeg' },
  { name: 'Timo Mason', href: 'https://substack.com/@timomason', role: 'Former College Teacher', avatar: 'https://substackcdn.com/image/fetch/$s_!u-oT!,w_88,h_88,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Febe0626a-6a1a-4911-a588-2cec8b1cd281_1024x1024.png' },
];

const row2Creators: Creator[] = [
  { name: 'Anfernee', href: 'https://substack.com/@anferneeck', role: '35K+ Following', avatar: 'https://substackcdn.com/image/fetch/$s_!PipP!,w_88,h_88,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9f856d6f-7844-44f4-992b-000458fe9bb8_1080x1080.png' },
  { name: 'Yana G.Y.', href: 'https://substack.com/@yanagy', role: 'Chartered Marketer (CIM)', avatar: 'https://substackcdn.com/image/fetch/$s_!i_I1!,w_88,h_88,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0b6ca6b3-b1ba-4f58-b788-c70c27b4c567_774x774.png' },
  { name: 'Phil Powis', href: 'https://substack.com/@sacredbusinessflow', role: '31K+ Subscribers', avatar: 'https://substackcdn.com/image/fetch/$s_!TZe3!,w_88,h_88,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F256c73b6-1256-473c-9cc2-7be9a21acecc_2779x2779.jpeg' },
  { name: 'Daniel Nest', href: 'https://substack.com/@whytryai', role: '17K+ Subscribers', avatar: 'https://substackcdn.com/image/fetch/$s_!FDds!,w_88,h_88,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc3cf75e3-f197-48b0-999b-d73cbb1a8ad5_1321x1321.jpeg' },
  { name: 'Dennis Berry', href: 'https://substack.com/@dennisberry123', role: 'Founder, Elite Leaders', avatar: 'https://substackcdn.com/image/fetch/$s_!kHI4!,w_88,h_88,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe172e0d2-7043-434c-af49-609127c663e5_1810x1810.png' },
  { name: 'Samuel Theophilus', href: 'https://substack.com/@nnitiwe', role: 'AI Engineer, 6+ Yrs', avatar: 'https://substackcdn.com/image/fetch/$s_!yXmW!,w_88,h_88,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe2f08135-fc19-4a5a-8873-7b1c8520ffcc_2172x2172.png' },
  { name: 'Elettra Fiumi', href: 'https://substack.com/@aicinema', role: 'Pioneer AI Film Director', avatar: 'https://substackcdn.com/image/fetch/$s_!jrBh!,w_88,h_88,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdf8f8397-aa84-4aa9-825b-6573f41107c1_584x586.jpeg' },
  { name: 'Sharyph', href: 'https://substack.com/@sharyph', role: '18K+ Subscribers', avatar: 'https://substackcdn.com/image/fetch/$s_!wU1i!,w_88,h_88,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3d620718-f593-49fa-88cf-df94b103c492_2048x2048.png' },
  { name: 'Zeng', href: 'https://substack.com/@zengwt', role: 'Adobe AI Ambassador', avatar: 'https://substackcdn.com/image/fetch/$s_!zMT7!,w_88,h_88,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Feba1e434-9167-4514-bfcf-3b9be5dd1b06_400x400.png' },
  { name: 'John Brewton', href: 'https://substack.com/@johnbrewton', role: 'Built & Sold $75M Co.', avatar: 'https://substackcdn.com/image/fetch/$s_!qBby!,w_88,h_88,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Faef24e58-dace-4d89-ab18-380764b73b9c_600x600.png' },
  { name: 'Tuhin Patra', href: 'https://substack.com/@tuhinpatra', role: '5K+ Subscribers', avatar: 'https://substackcdn.com/image/fetch/$s_!4VKL!,w_88,h_88,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2b54fd93-1d21-4564-bdbc-8c2333736dba_1254x1254.png' },
  { name: 'Pietro Montaldo', href: 'https://substack.com/@pietromontaldo', role: '6K+ Subscribers', avatar: 'https://substackcdn.com/image/fetch/$s_!HGTV!,w_88,h_88,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ffe47cc62-870c-4537-b715-142371300cd2_1080x1080.png' },
  { name: 'Jürgen Appelo', href: 'https://substack.com/@jurgenappelo', role: 'Author & Founder', avatar: 'https://substackcdn.com/image/fetch/$s_!ALWw!,w_88,h_88,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F39a53022-7f5b-4098-b626-c084dcd8d92a_1958x1958.jpeg' },
  { name: 'Nick Quick', href: 'https://substack.com/@nickquick', role: 'Creator, Co-Write with AI', avatar: 'https://substackcdn.com/image/fetch/$s_!VyfL!,w_88,h_88,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3783caf1-07c3-423b-a7ae-ff4b0245d2c4_1080x1080.jpeg' },
  { name: 'Dheeraj Sharma', href: 'https://substack.com/@genaiunplugged', role: '20-Yr Enterprise Engineer', avatar: 'https://substackcdn.com/image/fetch/$s_!mIDa!,w_88,h_88,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3edd1f31-6669-445d-8285-dd01139794ab_1080x1080.png' },
  { name: 'Andrea Chiarelli', href: 'https://substack.com/@andreachiarelli', role: 'PhD & MBA Consultant', avatar: 'https://substackcdn.com/image/fetch/$s_!s2yI!,w_88,h_88,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ffb330733-668a-4614-ba04-32263b053aa3_3200x3200.png' },
];

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

function Avatar({ name, avatar }: { name: string; avatar: string }) {
  const [failed, setFailed] = useState(false);

  if (failed || !avatar) {
    return (
      <span className="flex-shrink-0 w-10 h-10 rounded-full bg-cz-deep-teal text-cz-teal grid place-items-center text-sm font-display font-semibold ring-1 ring-cz-border">
        {initials(name)}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={avatar}
      alt=""
      aria-hidden="true"
      loading="lazy"
      onError={() => setFailed(true)}
      className="flex-shrink-0 w-10 h-10 rounded-full object-cover bg-cz-bg ring-1 ring-cz-border"
    />
  );
}

function CreatorChip({ name, href, role, avatar }: Creator) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-3 pl-2 pr-5 py-2 bg-cz-bg-card border border-cz-border rounded-full whitespace-nowrap no-underline transition-all duration-300 hover:border-cz-teal hover:bg-cz-bg-card-hover hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cz-teal/10"
    >
      <Avatar name={name} avatar={avatar} />
      <span className="flex flex-col leading-tight">
        <span className="font-display text-[0.95rem] font-medium text-cz-text-muted tracking-tight transition-colors duration-300 group-hover:text-cz-text">
          {name}
        </span>
        <span className="font-mono text-[0.7rem] text-cz-teal/70 tracking-tight transition-colors duration-300 group-hover:text-cz-teal">
          {role}
        </span>
      </span>
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
              40+ Expert AI Creators &mdash; and growing
            </h2>
            <p className="text-lg text-cz-text-muted font-body max-w-2xl">
              We&apos;re constantly bringing in new voices across design, vibe-coding, video, leadership, strategy, and more.
            </p>
          </div>

          <div className="space-y-4">
            <div className="overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
              <div
                className="flex gap-3 px-4 sm:px-6 lg:px-8 hover:[animation-play-state:paused] motion-reduce:[animation-play-state:paused]"
                style={{ animation: 'czMarquee 55s linear infinite' }}
              >
                {[...row1Creators, ...row1Creators].map((creator, index) => (
                  <div key={`${creator.name}-${index}`}>
                    <CreatorChip {...creator} />
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
              <div
                className="flex gap-3 px-4 sm:px-6 lg:px-8 hover:[animation-play-state:paused] motion-reduce:[animation-play-state:paused]"
                style={{ animation: 'czMarquee 55s linear infinite reverse' }}
              >
                {[...row2Creators, ...row2Creators].map((creator, index) => (
                  <div key={`${creator.name}-${index}`}>
                    <CreatorChip {...creator} />
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
