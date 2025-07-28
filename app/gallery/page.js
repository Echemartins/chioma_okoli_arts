"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "../header";
import Link from "next/link";
import { ClipLoader } from "react-spinners";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

export default function GalleryPage() {
  const [artworks, setArtworks] = useState([]);
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");
  const [currency, setCurrency] = useState("USD");
  const [rates, setRates] = useState({ USD: 1 });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const limit = 12;

  // Fetch artworks when filters change
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

        const { artworks, pages } = await res.json();
        setArtworks(artworks);
        setPages(pages);
      } catch (err) {
        console.error("Failed to fetch artworks", err);
        setArtworks([]);
        setPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, [category, sort, page]);

  // Fetch real-time exchange rates
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
        if (!res.ok) throw new Error("Failed to fetch exchange rates");
        const data = await res.json();
        setRates({ USD: 1, NGN: data.rates.NGN, GBP: data.rates.GBP });
      } catch (err) {
        console.error(err);
      }
    };

    fetchRates();
  }, []);

  const convertPrice = (usd) => {
    const rate = rates[currency] || 1;
    const converted = usd * rate;
    return currency === "USD"
      ? `$${converted.toFixed(2)}`
      : currency === "NGN"
        ? `₦${converted.toLocaleString()}`
        : `£${converted.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 pt-20">
      <Header />
      <main className=" flex flex-col mx-auto px-4 sm:px-6 lg:px-10">

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-20 md:mt-2 mb-10">
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

          <select
            className="bg-white text-gray-800 border border-orange-400 px-4 py-2 rounded-md w-full sm:w-fit"
            onChange={(e) => setCurrency(e.target.value)}
            value={currency}
          >
            <option value="USD"> USD</option>
            <option value="NGN"> NGN</option>
            <option value="GBP"> GBP</option>
          </select>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="flex justify-center py-10">
            <ClipLoader color="#f97316" size={60} />
          </div>
        ) : (
          <>
            {/* Artwork Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
              {artworks.map((artwork) => (
                <Link href={`/gallery/${artwork._id}`} key={artwork._id}>
                  <div className="cursor-pointer bg-orange-50 rounded-xl overflow-hidden shadow-lg border border-orange-200 hover:shadow-xl transition-transform duration-300 hover:scale-[1.02]">
                    <div className="relative aspect-[1/1] bg-white flex items-center justify-center">
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
                    <div className="p-4 grid gap-1">
                      <h2 className="text-lg font-semibold text-gray-800">
                        {artwork.title}
                      </h2>
                      <p className="text-orange-500 font-bold">
                        {convertPrice(artwork.price)}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {artwork.category}
                      </p>
                      <button className="mt-3 px-4 py-2 text-sm bg-orange-500 hover:bg-orange-600 text-white rounded-md">
                        View Artwork
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12 gap-4 text-gray-800">
              <button
                onClick={() => page > 1 && setPage(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 bg-orange-100 border border-orange-300 hover:bg-orange-200 rounded disabled:opacity-50"
              >
                Prev
              </button>
              <span className="px-4 py-2">{`Page ${page} of ${pages}`}</span>
              <button
                onClick={() => page < pages && setPage(page + 1)}
                disabled={page === pages}
                className="px-4 py-2 bg-orange-100 border border-orange-300 hover:bg-orange-200 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </main>

      <footer className="bg-white border-t border-orange-200 text-orange-900 mt-24">
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
