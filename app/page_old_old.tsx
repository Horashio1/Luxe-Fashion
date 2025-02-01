import Carousel from './components/Carousel';
import FeaturedProducts from './components/FeaturedProducts';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Carousel />
      <FeaturedProducts />
      <Newsletter />
      <Footer />
    </>
  );
}