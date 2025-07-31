"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../../components/header";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function ContactPage() {
  const [success, setSuccess] = useState("");
  const [subEmail, setSubEmail] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(contactSchema) });

  const handleContactSubmit = async (formData) => {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      setSuccess("Message sent!");
      reset();
    }
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: subEmail }),
    });
    if (res.ok) {
      setSuccess("Subscribed successfully!");
      setSubEmail("");
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-white text-orange-900 pt-28 md:pt-10 mx-4">
        <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>

        <div className="max-w-4xl mx-auto grid gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <form onSubmit={handleSubmit(handleContactSubmit)} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              {...register("name")}
              className="w-full p-3 rounded border border-orange-300"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full p-3 rounded border border-orange-300"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

            <textarea
              placeholder="Message"
              {...register("message")}
              className="w-full p-3 rounded border border-orange-300"
            ></textarea>
            {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}

            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded w-full"
            >
              Send Message
            </button>

            <AnimatePresence>
              {success && (
                <motion.p
                  className="text-green-600 text-center mt-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {success}
                </motion.p>
              )}
            </AnimatePresence>
          </form>

          {/* Map & Info Block */}
          <div className="space-y-6 text-center lg:text-left">
            <iframe
              title="location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.434122380433!2d7.076147374992794!3d6.103489028042312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1043830d72a1a161%3A0xd87c80200bb403e7!2s261%20Zik%20Ave%2C%20Awka%2C%20Anambra!5e0!3m2!1sen!2sng!4v1718800000000!5m2!1sen!2sng"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="rounded border border-orange-300"
            ></iframe>
            <div>
              <h2 className="text-xl font-bold mb-2">Our Address</h2>
              <p>261 Zik Avenue, Awka, Anambra State, Nigeria</p>
              <p>Email: contact@chiomaokoli.art</p>
              <p>Phone: +2347089277261</p>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-orange-300 pt-10 mt-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-center">Subscribe to our Newsletter</h2>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Your email"
              value={subEmail}
              onChange={(e) => setSubEmail(e.target.value)}
              required
              className="flex-1 p-3 rounded border border-orange-300"
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded"
            >
              Subscribe
            </button>
          </form>
          <AnimatePresence>
            {success && (
              <motion.p
                className="text-green-600 mt-4 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {success}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
