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

export default function Home() {

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-15 md:py-6 space-y-8">
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

      <footer className="w-full bg-gray-100 py-6 text-center text-gray-600 mt-16 border-t border-gray-300">
        <p className="text-sm">&copy; {new Date().getFullYear()} Chiomzy Creations. All rights reserved.</p>
      </footer>
    </div>
  );
}
