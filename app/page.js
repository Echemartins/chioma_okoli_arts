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
  // const [featuredArtworks, setFeaturedArtworks] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchFeaturedArtworks = async () => {
  //     try {
  //       const res = await fetch("/api/artworks/featured");
  //       const data = await res.json();
  //       setFeaturedArtworks(data.artworks || []);
  //     } catch (err) {
  //       console.error("Failed to fetch featured artworks:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchFeaturedArtworks();
  // }, []);

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-16 space-y-24">
        {/* Hero Section */}
        <section className="grid md:grid-cols-2 items-center gap-12">
          <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/chioma-in-museum.jpg"
              alt="Chioma viewing her artwork"
              width={500}
              height={600}
              className="object-cover w-full h-full"
              priority
            />
          </div>

          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-orange-500">
              Welcome to Chiomzy&apos;s World of Art
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto md:mx-0">
              Explore a world of creativity and passion through Chiomzy&apos;s exceptional art pieces.
              Each creation tells a unique story and reflects the artist&apos;s profound experiences.
            </p>
          </div>
        </section>

        {/* Featured Section */}

        <section className="bg-orange-50 py-16 px-6">
          <FeaturedArtworksSection/>
        </section>

        <section className="text-center px-4 md:px-6 lg:px-8 py-20 bg-white">
          <TestimonialsSection />
         </section>

        {/* <section className="text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-orange-500">Featured Artworks</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
            Discover a curated selection of Chiomzy’s most captivating pieces. Every work is a window
            into a creative soul.
          </p>

          {loading ? (
            <div className="flex justify-center py-10">
              <ClipLoader color="#f97316" size={60} />
            </div>
          ) : featuredArtworks.length > 0 ? (
            <Marquee
              pauseOnHover
              speed={30}
              gradient={false}
              className="space-x-6"
            >
              {featuredArtworks.map((art) => (
                <div
                  key={art._id}
                  className="bg-gray-100 rounded-2xl shadow-md overflow-hidden p-3 w-[280px] mx-2 border border-orange-200"
                >
                  <div className="h-[200px] flex items-center justify-center overflow-hidden rounded-xl bg-white">
                    <Image
                      src={art.imageUrl}
                      alt={art.title}
                      width={260}
                      height={200}
                      className="object-contain h-full"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mt-3 text-center">
                    {art.title}
                  </h3>
                </div>
              ))}
            </Marquee>
          ) : (
            <p className="text-gray-500">No featured artworks available at the moment.</p>
          )}

          <Link
            href="/gallery"
            className="mt-10 inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl transition-transform transform hover:scale-105"
          >
            View Full Gallery
          </Link>
        </section> */}
        

        {/* FAQ Section */}
        <section>
          <FAQSection />
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-100 py-6 text-center text-gray-600 mt-16 border-t border-gray-300">
        <p className="text-sm">&copy; {new Date().getFullYear()} Chiomzy Creations. All rights reserved.</p>
      </footer>
    </div>
  );
}
