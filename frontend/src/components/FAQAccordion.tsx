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
    <section className="bg-gray-950 text-white py-12 px-6">
      <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="border border-gray-700 rounded-md">
            <button
              onClick={() => toggle(index)}
              className="w-full text-left p-4 font-semibold focus:outline-none hover:bg-gray-800"
            >
              {item.question}
            </button>
            {openIndex === index && (
              <div className="p-4 text-gray-300 bg-gray-900 border-t border-gray-700">
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