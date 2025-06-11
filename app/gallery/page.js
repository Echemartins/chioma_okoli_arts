"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "../header";
import Link from "next/link";
import { ClipLoader } from "react-spinners";

export default function GalleryPage() {
  const [artworks, setArtworks] = useState([]);
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 12;

  useEffect(() => {
    const fetchArtworks = async () => {
      setLoading(true);
      try {
        let query = `/api/artworks?page=${page}&limit=${limit}`;
        if (category !== "all")
          query += `&category=${encodeURIComponent(category)}`;
        if (sort) query += `&sort=${encodeURIComponent(sort)}`;

        const res = await fetch(query);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const { artworks, total, pages } = await res.json();
        setArtworks(artworks);
        setTotal(total);
        setPages(pages);
      } catch (err) {
        console.error("Failed to fetch artworks", err);
        setArtworks([]);
        setTotal(0);
        setPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, [category, sort, page]);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < pages) setPage(page + 1);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 px-4 sm:px-6 lg:px-16 py-20">
      <Header />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-20 md:mt-2 mb-10">
        <select
          className="bg-white text-gray-800 border border-orange-400 px-4 py-2 rounded-md w-full sm:w-auto"
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
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
          className="bg-white text-gray-800 border border-orange-400 px-4 py-2 rounded-md w-full sm:w-auto"
          onChange={(e) => {
            setSort(e.target.value);
            setPage(1);
          }}
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
          <ClipLoader color="#f97316" size={60} />
        </div>
      ) : (
        <>
          {/* Artwork Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {artworks.map((artwork) => (
              <Link href={`/gallery/${artwork._id}`} key={artwork._id}>
                <div className="cursor-pointer bg-orange-50 rounded-xl overflow-hidden shadow-lg border border-orange-200 hover:shadow-xl transition-transform duration-300 hover:scale-[1.02]">
                  <div className="relative aspect-[2/2] flex items-center justify-center bg-white">
                    <Image
                      src={artwork.imageUrl}
                      alt={artwork.title}
                      fill
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL="/placeholder.jpg"
                      className="object-contain p-3"
                    />
                  </div>
                  <div className="p-4 grid">
                    <h2 className="text-lg font-semibold text-gray-800">{artwork.title}</h2>
                    <p className="text-orange-500 font-bold">${artwork.price}</p>
                    <p className="text-gray-600 text-sm mb-1">{artwork.category}</p>
                    <button className="mt-3 px-4 py-2 text-sm bg-orange-500 hover:bg-orange-600 text-white rounded-md">
                      View Artwork
                    </button>
                  </div>
                </div>
                {/* <div className="cursor-pointer border border-gray-300 rounded-xl overflow-hidden bg-white text-center hover:shadow-lg transition-transform duration-300 hover:scale-[1.02]">
                  <div className="w-full h-[200px] flex items-center justify-center overflow-hidden bg-white">
                    <Image
                      src={artwork.imageUrl}
                      alt={artwork.title}
                      width={400}
                      height={400}
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL="/placeholder.jpg"
                      className="object-contain max-h-full p-3"
                    />
                  </div>
                  <div className="px-4 pt-4 pb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-1">
                      {artwork.title}
                    </h2>
                    <p className="text-orange-500 font-bold mb-1">
                      ${artwork.price}
                    </p>
                    <p className="text-gray-500 text-sm mb-3">
                      {artwork.category}
                    </p>
                    <button className="px-4 py-2 text-sm bg-orange-500 hover:bg-orange-600 text-white rounded-md">
                      View Artwork
                    </button>
                  </div>
                </div> */}
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12 gap-4 text-gray-800">
            <button
              onClick={handlePrev}
              disabled={page === 1}
              className="px-4 py-2 bg-orange-100 border border-orange-300 hover:bg-orange-200 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="px-4 py-2">{`Page ${page} of ${pages}`}</span>
            <button
              onClick={handleNext}
              disabled={page === pages}
              className="px-4 py-2 bg-orange-100 border border-orange-300 hover:bg-orange-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
