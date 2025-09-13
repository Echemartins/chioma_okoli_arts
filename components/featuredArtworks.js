"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ClipLoader } from "react-spinners";

const FeaturedArtworksSection = () => {
  const [featuredArtworks, setFeaturedArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedArtworks = async () => {
      try {
        const res = await fetch("/api/artworks/featured");
        const data = await res.json();
        setFeaturedArtworks(data.artworks || []);
      } catch (err) {
        console.error("Failed to fetch featured artworks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedArtworks();
  }, []);

  return (
    <section className="text-center px-1 md:px-6 lg:px-8 bg-orange-50 py-16">
      <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-orange-500">
        Featured Artworks
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
        Discover a curated selection of Chioma's most captivating pieces. Every
        work is a window into a creative soul.
      </p>

      {loading ? (
        <div className="flex justify-center py-10">
          <ClipLoader color="#f97316" size={60} />
        </div>
      ) : featuredArtworks.length > 0 ? (
        // <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        //   {featuredArtworks.map((art) => (
        //     <div
        //       key={art._id}
        //       className="bg-gray-100 rounded-2xl shadow-md overflow-hidden border border-orange-200 transition-transform hover:scale-105"
        //     >
        //       <div className="h-[220px] flex items-center justify-center overflow-hidden rounded-t-2xl bg-white">
        //         <Image
        //           src={art.imageUrl}
        //           alt={art.title}
        //           width={300}
        //           height={220}
        //           className="object-contain h-full"
        //         />
        //       </div>
        //       <h3 className="text-lg font-semibold text-gray-800 mt-3 mb-4 text-center px-2">
        //         {art.title}
        //       </h3>
        //     </div>
        //   ))}
        // </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {featuredArtworks.map((art) => (
            <Link href={`/gallery/${art._id}`} key={art._id}>
            <div
              key={art._id}
              className="border border-gray-300 p-4 text-center hover:shadow-lg transition-shadow rounded"
            >
              <div className="w-full h-[180px] flex items-center justify-center overflow-hidden">
                <Image
                  src={art.imageUrl}
                  alt={art.title}
                  width={200}
                  height={180}
                  className="object-contain max-h-full"
                />
              </div>
              <h3 className="text-lg font-medium text-gray-900">{art.title}</h3>
              <p className="text-sm text-gray-500">{art.category}</p>
            </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">
          No featured artworks available at the moment.
        </p>
      )}

      <Link
        href="/gallery"
        className="mt-12 inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl transition-transform transform hover:scale-105"
      >
        View Full Gallery
      </Link>
    </section>
  );
};

export default FeaturedArtworksSection;
