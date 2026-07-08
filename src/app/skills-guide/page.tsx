import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InstallGuide from '@/components/install/InstallGuide';

export const metadata: Metadata = {
  title: 'Install a Claude Skill — Cozora',
  description:
    'A guided, click-by-click walkthrough for installing your Cozora skill in Claude — on the web or the desktop app. Do one step, check it off, and you’re running your skill in minutes.',
  openGraph: {
    title: 'Install a Claude Skill — Cozora',
    description:
      'A guided, click-by-click walkthrough for installing your Cozora skill in Claude — web or desktop.',
    url: 'https://cozora.org/skills-guide',
    siteName: 'Cozora',
    type: 'website',
  },
};

export default function InstallPage() {
  return (
    <>
      <Navbar />
      <main>
        <InstallGuide />
      </main>
      <Footer />
    </>
  );
}
