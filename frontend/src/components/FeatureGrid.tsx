import React from 'react';
import { FaFilm, FaShieldAlt, FaStar } from 'react-icons/fa';

const FeatureGrid: React.FC = () => {
  const features = [
    {
      icon: <FaFilm size={40} color="#00b0ff" />, // CineNiche Blue
      title: 'Curated Content',
      description:
        'Explore rare indie films, cult classics, and international cinema you won’t find anywhere else.',
    },
    {
      icon: <FaShieldAlt size={40} color="#ff9800" />, // Yellow for Privacy
      title: 'Privacy First',
      description:
        'We respect your data. Enjoy streaming with strong privacy protections and no surprises.',
    },
    {
      icon: <FaStar size={40} color="#ffdd00" />, // Gold for Smart Recommendations
      title: 'Smart Recommendations',
      description:
        'Get personalized movie picks based on what you love — powered by real user insights.',
    },
  ];

  return (
    <section className="bg-black text-white py-12 px-6">
      <h2 className="text-3xl font-bold text-center mb-10">Why CINENICHE?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="text-center p-6 bg-zinc-900 rounded-lg shadow-md"
          >
            <div className="flex justify-center mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureGrid;
