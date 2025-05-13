"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "../header";
import Link from "next/link";
import { ClipLoader } from 'react-spinners';

export default function GalleryPage() {
  const [artworks, setArtworks] = useState([]);
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtworks = async () => {
      let query = `/api/artworks?`;
      if (category !== "all") query += `category=${category}&`;
      if (sort) query += `sort=${sort}`;

      const res = await fetch(query);
      const data = await res.json();
      setArtworks(data);
      setLoading(false);
    };

    fetchArtworks();
  }, [category, sort]);

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-16 py-20">
      <Header />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
        <select
          className="bg-gray-900 text-white border border-gray-700 px-4 py-2 rounded-md w-full sm:w-auto"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        >
          <option value="all">All Categories</option>
          <option value="Painting">Painting</option>
          <option value="Sculpture">Sculpture</option>
          <option value="Digital Art">Digital Art</option>
          <option value="Photography">Photography</option>
          <option value="Mixed Media">Mixed Media</option>
          <option value="Other">Other</option>
        </select>

        <select
          className="bg-gray-900 text-white border border-gray-700 px-4 py-2 rounded-md w-full sm:w-auto"
          onChange={(e) => setSort(e.target.value)}
          value={sort}
        >
          <option value="newest">Sort by: Newest</option>
          <option value="oldest">Sort by: Oldest</option>
          <option value="lowPrice">Price: Low to High</option>
          <option value="highPrice">Price: High to Low</option>
        </select>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center py-10">
          <ClipLoader color="#2563eb" size={60} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
          {artworks.map((artwork) => (
            <Link href={`/gallery/${artwork._id}`} key={artwork._id}>
              <div className="cursor-pointer bg-gray-800 rounded-xl overflow-hidden shadow-lg  transition-transform duration-300">
                <div className="relative aspect-[2/2] flex items-center justify-center">
                  <Image
                    src={artwork.imageUrl}
                    alt={artwork.title}
                    fill
                    className="object-contain  p-3 hover:scale-105"
                  />
                </div>
                <div className="p-4 grid ">
                  <h2 className="text-lg font-semibold">{artwork.title}</h2>
                  <p className="text-yellow-400 font-bold">N{artwork.price}</p>
                  <p className="text-gray-400 text-sm mb-1">{artwork.category}</p>
                  <button className="mt-3 px-4 py-2 text-sm bg-purple-600 hover:bg-purple-700 text-white rounded-md">
                    View Artwork
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
