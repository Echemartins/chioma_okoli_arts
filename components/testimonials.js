'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Amaka N.",
    title: "Art Collector",
    feedback:
      "Chioma's work is both captivating and soulful. Every piece I own tells a deep, personal story.",
  },
  {
    name: "Tunde A.",
    title: "Gallery Curator",
    feedback:
      "Her use of color and texture is unmatched. Our audience loves her exhibitions!",
  },
  {
    name: "Ify O.",
    title: "Interior Designer",
    feedback:
      "Chioma's art has transformed my clients’ spaces — warm, vibrant, and full of life!",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const TestimonialsSection = () => {
  return (
    <section className="bg-orange-50 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-orange-500 mb-4">What Clients Say</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Hear from art collectors, curators, and interior designers who have experienced the impact of Chiomzy’s work.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="bg-white border border-orange-200 rounded-xl p-6 shadow hover:shadow-lg transition-shadow"
            >
              <Quote className="text-orange-400 mb-4" size={32} />
              <p className="text-gray-700 italic mb-4">“{testimonial.feedback}”</p>
              <h4 className="text-lg font-semibold text-gray-800">{testimonial.name}</h4>
              <span className="text-sm text-gray-500">{testimonial.title}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
