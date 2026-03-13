import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SkillSets from '@/components/SkillSets';
import Schedule from '@/components/Schedule';
import Creators from '@/components/Creators';
import Pricing from '@/components/Pricing';
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
        <Schedule />
        <Creators />
        <Pricing />
        <About />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
