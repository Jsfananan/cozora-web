import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SkillSets from '@/components/SkillSets';
import Pricing from '@/components/Pricing';
import Creators from '@/components/Creators';
import About from '@/components/About';
import Faq from '@/components/Faq';
import Footer from '@/components/Footer';

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
