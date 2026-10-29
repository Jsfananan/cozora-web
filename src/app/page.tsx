import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Pricing from '@/components/Pricing';
import Creators from '@/components/Creators';
import About from '@/components/About';
import Faq from '@/components/Faq';
import Footer from '@/components/Footer';
import Reveal from '@/components/library/Reveal';

// The hero counts and "Recent drops" in HowItWorks pulls live from the Substack archive.
// Without this the homepage would freeze those three skills at build time.
export const revalidate = 1800;

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Reveal><HowItWorks /></Reveal>
        <Reveal><Pricing /></Reveal>
        <Reveal><Creators /></Reveal>
        <Reveal><About /></Reveal>
        <Reveal><Faq /></Reveal>
      </main>
      <Footer />
    </>
  );
}
