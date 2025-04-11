import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import HeroBanner from '../components/HeroBanner';
import FeatureGrid from '../components/FeatureGrid';
import FAQAccordion from '../components/FAQAccordion';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  // ✅ Auto-redirect if user is already logged in
  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (role) {
      navigate('/moviesPage');
    }
  }, []);

  const handleGetStarted = () => {
    if (email.trim()) {
      navigate(`/create-account?email=${encodeURIComponent(email)}`);
    }
  };

  return (
    <>
      <Navbar />
      <HeroBanner
        email={email}
        setEmail={setEmail}
        onGetStarted={handleGetStarted}
      />
      <FeatureGrid />
      <FAQAccordion />
      <Footer />
    </>
  );
};

export default HomePage;
