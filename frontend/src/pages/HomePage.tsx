import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import {Navbar} from '../components/Navbar';
import HeroBanner from '../components/HeroBanner';
import TrendingCarousel from '../components/TrendingCarousel';
import FeatureGrid from '../components/FeatureGrid';
import FAQAccordion from '../components/FAQAccordion';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (email.trim()) {
      navigate(`/create-account?email=${encodeURIComponent(email)}`);
    }
  };

  return (
    <>
      <Navbar />
      <HeroBanner email={email} setEmail={setEmail} onGetStarted={handleGetStarted} />
      <TrendingCarousel />
      <FeatureGrid />
      <FAQAccordion />
      <Footer />
    </>
  );
};

export default HomePage;