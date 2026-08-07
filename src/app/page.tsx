import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SkillSets from '@/components/SkillSets';
import Pricing from '@/components/Pricing';
import Creators from '@/components/Creators';
import About from '@/components/About';
import Faq from '@/components/Faq';
import Footer from '@/components/Footer';

// The "Recent drops" strip in SkillSets pulls live from the Substack archive.
// Without this the homepage would freeze those three skills at build time.
export const revalidate = 1800;

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SkillSets />
        <Pricing />
        <Creators />
        <About />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
