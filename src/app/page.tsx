import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import Testimonials from './components/Testimonials';
import CallToAction from './components/CallToAction';

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <Testimonials />
      <CallToAction />
    </main>
  );
}
