import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import AISimulator from '@/components/AISimulator';
import Portfolio from '@/components/Portfolio';
import Leadership from '@/components/Leadership';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Services />
      <AISimulator />
      <Portfolio />
      <Leadership />
      <Contact />
      <Footer />
    </main>
  );
}
