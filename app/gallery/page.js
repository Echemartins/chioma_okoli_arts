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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArtworks = async () => {
      let query = `/api/artworks?`;

      if (category !== "all") query += `category=${category}&`;
      if (sort) query += `sort=${sort}`;

      const res = await fetch(query);
      const data = await res.json();
      setArtworks(data);
      setLoading(false)
    };

    fetchArtworks();
  }, [category, sort]);

  return (
    
    <div className="min-h-screen bg-black text-white px-4 md:px-16 py-20">
      <Header />

      {/* Filters */}
      <div className="flex flex-col mt-5 md:flex-row items-center justify-between gap-4 mb-10">
        <select
          className="bg-gray-900 text-white border border-gray-700 px-4 py-2 rounded-md w-full md:w-auto"
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
          className="bg-gray-900 text-white border border-gray-700 px-4 py-2 rounded-md w-full md:w-auto"
          onChange={(e) => setSort(e.target.value)}
          value={sort}
        >
          <option value="newest">Sort by: Newest</option>
          <option value="oldest">Sort by: Oldest</option>
          <option value="lowPrice">Price: Low to High</option>
          <option value="highPrice">Price: High to Low</option>
        </select>
      </div>

      {/* Artworks Grid */}
      {loading? <div className="flex justify-center py-10">
      <ClipLoader color="#2563eb" size={60} />
    </div>:<div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-8">
        {artworks.map((artwork) => (
          <Link href={`/gallery/${artwork._id}`} key={artwork._id}>
            <div className="cursor-pointer bg-gray-800 rounded-xl overflow-hidden shadow-md hover:scale-105 transition transform duration-300">
              <Image
                src={artwork.imageUrl}
                alt={artwork.title}
                width={500}
                height={300}
                className="object-cover w-full h-64 rounded-2xl p-2"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-1">{artwork.title}</h2>
                <p className="text-gray-400 text-sm mb-2">{artwork.category}</p>
                {/* <p className="text-gray-300 text-sm mb-2">{artwork.description}</p> */}
                <p className="text-yellow-400 font-bold">${artwork.price}</p>
                {/* <p className="text-gray-500 text-xs mt-2">
                  Uploaded on: {new Date(artwork.createdAt).toLocaleDateString()}
                </p> */}
                <button className="mt-3 px-4 py-2 text-sm bg-purple-600 hover:bg-purple-700 text-white rounded-md">
                  View Artwork
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>}
      
    </div>
  );
}
