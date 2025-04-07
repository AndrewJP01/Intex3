import React from 'react';
import Navbar from '../components/Navbar';
import HeroBanner from '../components/HeroBanner';
import TrendingCarousel from '../components/TrendingCarousel';
import FeatureGrid from '../components/FeatureGrid';
import FAQAccordion from '../components/FAQAccordion';
import Footer from '../components/Footer';


const HomePage: React.FC = () => {
  return (
    <>
      <Navbar />
      <HeroBanner />
      <TrendingCarousel />
      <FeatureGrid />
      <FAQAccordion />
      <Footer />
    </>
  );
};

export default HomePage;