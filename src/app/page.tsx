import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SkillSets from '@/components/SkillSets';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SkillSets />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
