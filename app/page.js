"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import Header from "./header";
import { ClipLoader } from "react-spinners";
import FAQSection from "./faqs";
import TestimonialsSection from "./testimonials";
import FeaturedArtworksSection from "./featuredArtworks"; 
import { FaInstagram, FaLinkedin } from "react-icons/fa"; 

export default function Home() {

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-6 pt-15 md:py-6 space-y-8">
        {/* Hero Section */}
        <section className="grid md:grid-cols-2 items-center mt-12 mb-30 gap-12">
          <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/chioma_okoli.jpg"
              alt="Chioma viewing her artwork"
              width={500}
              height={600}
              className="object-cover w-full h-full"
              priority
            />
          </div>

          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-orange-500">
              Welcome to Chioma&apos;s World of Art
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto md:mx-0">
              Explore a world of creativity and passion through Chioma&apos;s exceptional art pieces.
              Each creation tells a unique story and reflects the artist&apos;s profound experiences.
            </p>
          </div>
        </section>

        <section className="bg-orange-50 py-6 px-4">
          <FeaturedArtworksSection/>
        </section>

        <section className="text-center px-4 py-6 bg-white">
          <TestimonialsSection />
         </section>
        
        <section>
          <FAQSection />
        </section>
      </main>

      <footer className="bg-white border-t border-orange-200 text-orange-900 mt-15">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 text-center md:text-left">
        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-orange-600">Contact</h3>
          <p className="text-sm">261 Zik Avenue, Awka, Anambra State</p>
          <p className="text-sm mt-2">Email: <a href="mailto:Favourchomzy69@gmail.com" className="hover:underline text-orange-500">Favourchomzy69@gmail.com</a></p>
          <p className="text-sm mt-1">
            Phone: <a href="tel:+2347089277261" className="hover:underline text-orange-500">+2347089277261</a>,{" "}
            <a href="tel:+2348165685370" className="hover:underline text-orange-500">+2348165685370</a>
          </p>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-orange-600">Connect With Me</h3>
          <div className="flex justify-center md:justify-start items-center gap-4 text-2xl text-orange-600">
            <a href="https://instagram.com/chomzyart_" target="_blank" rel="noopener noreferrer" className="hover:text-orange-800 transition">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com/in/chioma-favour-7631791a2?trk=contact-info" target="_blank" rel="noopener noreferrer" className="hover:text-orange-800 transition">
              <FaLinkedin />
            </a>
          </div>
          <p className="text-sm mt-3 text-orange-700">Instagram: @chomzyart_</p>
          <p className="text-sm text-orange-700">LinkedIn: Chioma Okoli</p>
        </div>
      </div>

      <div className="bg-orange-100 text-center text-sm text-orange-800 py-4">
        &copy; {new Date().getFullYear()} Chioma-Okoli Arts. All rights reserved.
      </div>
    </footer>
    </div>
  );
}
