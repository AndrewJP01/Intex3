import React, { useState } from 'react';

const faqData = [
  {
    question: 'What is CineNiche?',
    answer: 'CineNiche is a curated streaming platform for cult classics, indie films, and hard-to-find international cinema.',
  },
  {
    question: 'How much does it cost?',
    answer: 'Our pricing model is flexible with monthly and annual plans. More details are available after creating an account.',
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes, CineNiche allows you to cancel your subscription at any time with no penalties.',
  },
];

const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-black text-white py-20 px-6">
      <h2 className="text-4xl font-extrabold text-center mb-12 text-white drop-shadow-sm">Frequently Asked Questions</h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="border border-gray-700 rounded-lg shadow-sm bg-zinc-900">
            <button
              onClick={() => toggle(index)}
              className="w-full text-left p-5 font-extrabold text-lg text-blue-600 focus:outline-none hover:bg-cineBlue/90 hover:text-white transition-colors duration-200 rounded-t-lg"
            >
              {item.question}
            </button>
            {openIndex === index && (
              <div className="p-5 bg-zinc-800 text-white rounded-b-lg">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQAccordion;