'use client';
import { useState } from 'react';

const faqs = [
  {
    question: 'How can I purchase an artwork?',
    answer: 'You can click the "Request to Buy" button on any artwork and fill in your details. We will contact you to finalize the purchase.',
  },
  {
    question: 'Do you offer custom art commissions?',
    answer: 'Yes! You can request a custom artwork by contacting us through the contact page or via the "Commission a Piece" option.',
  },
  {
    question: 'How are artworks delivered?',
    answer: 'Once your purchase is confirmed, we carefully package and ship your artwork using a trusted courier service.',
  },
  {
    question: 'Can I visit a physical gallery?',
    answer: 'Currently, we operate online only. We occasionally host pop-up exhibitions—subscribe to our newsletter to stay updated.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept bank transfers, major credit/debit cards, and mobile payments. Payment instructions are provided after your request is confirmed.',
  },
];

const FAQSection = ()=> {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-md shadow-sm overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200"
            >
              <span className="font-medium text-left text-gray-800">{faq.question}</span>
              <span className="text-lg text-gray-600">{activeIndex === index ? '−' : '+'}</span>
            </button>
            {activeIndex === index && (
              <div className="p-4 bg-white text-gray-700 border-t border-gray-200 transition-all">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default FAQSection;
//       <div className="flex flex-col items-center space-y-6">
