'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

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

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-8 text-orange-500">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = activeIndex === index;

          return (
            <div
              key={index}
              className="border border-orange-300 rounded-lg shadow-sm overflow-hidden bg-white"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-4 bg-orange-100 hover:bg-orange-200 transition-colors"
              >
                <span className="font-medium text-left text-gray-800">{faq.question}</span>
                {isOpen ? <ChevronUp className="text-orange-600" /> : <ChevronDown className="text-orange-600" />}
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 pb-4 text-gray-700 bg-orange-50"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQSection;
