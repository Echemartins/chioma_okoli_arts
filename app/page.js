"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import Header from "./header";
import { ClipLoader } from 'react-spinners';
import FAQSection from './faqs'


export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lightModeOn, setLightModeOn] = useState(false);
  const [featuredArtworks, setFeaturedArtworks] = useState([]);
  const [loading, setLoading] = useState(true)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const fetchFeaturedArtworks = async () => {
      try {
        const res = await fetch("/api/artworks/featured");
        console.log('this is the res',res)
        const data = await res.json();
        console.log('this is the data',data)
        setFeaturedArtworks(data.artworks || []);
        setLoading(false)
      } catch (err) {
        console.error("Failed to fetch featured artworks:", err);
      }
    };

    fetchFeaturedArtworks();
  }, []);

  return (
    <div className="bg-black text-white">
      <Header />
      <main className="pt-26 mx-auto px-6 w-full max-w-7xl md:pt-2">
        {/* Hero Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 py-15">
          <Image
            className="object-cover w-full rounded-2xl"
            src="/chioma-in-museum.jpg"
            alt="chioma-home-image"
            width={400}
            height={300}
          />
          <div className="flex items-center justify-center">
            <p className="text-xl md:text-2xl leading-relaxed text-gray-400 text-center w-11/12 lg:w-10/12">
              Explore a world of creativity and passion through Chiomzy's exceptional art pieces. Each creation tells a unique story and reflects the artist's profound experiences.
            </p>
          </div>
        </section>

        {/* Featured Section */}
        <section className="flex flex-col items-center">
          <h2 className="text-3xl font-semibold mb-4">Featured Artwork</h2>
          <p className="text-lg text-gray-400 mb-6 text-center w-10/12 md:w-7/12">
            Immerse yourself in a collection of captivating artworks that showcase Chiomzy's talent and artistic flair. Each piece is a masterpiece waiting to be admired.
          </p>
        </section>

        {/* Scrolling Gallery */}
        <section>
          {loading? <div className="flex justify-center py-5">
                    <ClipLoader color="#2563eb" size={60} />
                    </div>:
                    (featuredArtworks.length > 0 ? (
            <div className="flex overflow-x-auto">
              <Marquee pauseOnHover speed={30} gradient={false} className="flex gap-6">
                {featuredArtworks.map((art) => (
                  <div key={art._id}  className="bg-gray-800 mx-3 rounded-xl overflow-hidden shadow-md hover:scale-105 transition transform duration-300 h-[350px] w-[250px] p-2">
                    <Image
                      src={art.imageUrl}
                      alt={art.title}
                      width={400}
                      height={300}
                      className="rounded-md object-cover h-[90%]"
                    />
                    <h3 className="text-lg font-medium text-gray-300 mt-2">
                      {art.title}
                    </h3>
                  </div>
                ))}
              </Marquee>
            </div>
          ) : (
            <p className="text-center text-gray-400 mb-6">No featured artworks available at the moment.</p>
          )) }
           

          <Link
            href="/featured-arts"
            className="block w-fit mx-auto mt-6 bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition duration-300 transform hover:scale-105"
          >
            View More
          </Link>
        </section>
      </main>
      <FAQSection />
      <footer className="w-full p-6 bg-white shadow-md text-center mt-20">
        <p className="text-gray-600 text-lg">&copy; 2025 Chiomzy Creations. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
