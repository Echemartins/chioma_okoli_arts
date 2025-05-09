'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import AdminHeader from '../adminheader';

export default function ManageArtworksPage() {
  const [artworks, setArtworks] = useState([]);
  const [editArtwork, setEditArtwork] = useState(null);
  const [filters, setFilters] = useState({ title: "", category: "" });
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(8);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetchArtworks();
  // }, [filters, page]);

  // async function fetchArtworks() {
  //   const query = new URLSearchParams({
  //     page,
  //     limit,
  //     ...filters,
  //   }).toString();

  //   const res = await fetch(`/api/admin/artworks?${query}`);
  //   const { artworks, total } = await res.json();
  //   setArtworks(artworks);
  //   setTotal(total);
  //   setLoading(false);

  //   // window.scrollTo({ top: 0, behavior: 'smooth' });
  // }
  
  const fetchArtworks = useCallback(async () => {
    const query = new URLSearchParams({
      page,
      limit,
      ...filters,
    }).toString();

    const res = await fetch(`/api/admin/artworks?${query}`);
    const { artworks, total } = await res.json();
    setArtworks(artworks);
    setTotal(total);
    setLoading(false);
  }, [filters, page, limit]);

  // ✅ useEffect with correct dependency
  useEffect(() => {
    fetchArtworks();
  }, [fetchArtworks]);

  async function deleteArtwork(id) {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/admin/artworks/${id}`, { method: "DELETE" });
    fetchArtworks();
  }

  async function handleEditSubmit(e) {
    e.preventDefault();

    const body = {
      title: e.target.title.value,
      description: e.target.description.value,
      category: e.target.category.value,
      price: parseFloat(e.target.price.value),
      imageUrl: e.target.imageUrl.value || editArtwork.imageUrl,
    };

    await fetch(`/api/admin/artworks/${editArtwork._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setEditArtwork(null);
    fetchArtworks();
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <AdminHeader />
      <h1 className="text-3xl font-bold mb-6">Manage Artworks</h1>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-wrap gap-4">
        <input
          placeholder="Search title"
          value={filters.title}
          onChange={(e) => setFilters((f) => ({ ...f, title: e.target.value }))}
          className="bg-gray-800 px-4 py-2 rounded"
        />
        <input
          placeholder="Filter by category"
          value={filters.category}
          onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}
          className="bg-gray-800 px-4 py-2 rounded"
        />
      </div>

      {/* Artworks Grid */}
      {loading ? (
  <div className="w-full flex justify-center items-center min-h-4/6 py-10">
    <div className="h-20 w-20 border-4 border-purple-800 border-t-transparent rounded-full animate-spin" />
  </div>
) : (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
    {artworks.map((art) => (
      <div key={art._id} className="bg-gray-800 p-3 rounded">
        <Image src={art.imageUrl} alt={art.title} width={300} height={200} className="w-full h-40 object-cover rounded" />
        <p className="mt-2 text-sm font-semibold">{art.title}</p>
        <p className="text-xs text-gray-400">{art.category}</p>
        <div className="flex justify-between mt-2 text-sm">
          <button onClick={() => setEditArtwork(art)} className="text-yellow-400 hover:underline">Edit</button>
          <button onClick={() => deleteArtwork(art._id)} className="text-red-500 hover:underline">Delete</button>
        </div>
      </div>
    ))}
  </div>
)}
      

      {/* Pagination */}
        <div className="flex flex-wrap gap-2 mt-6 items-center justify-center">
            <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1 || loading}
                className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
            >
                Prev
            </button>

            {Array.from({ length: Math.ceil(total / limit) }, (_, i) => {
                const pageNumber = i + 1;
                return (
                <button
                    key={pageNumber}
                    onClick={() => setPage(pageNumber)}
                    disabled={page === pageNumber || loading}
                    className={`px-3 py-1 rounded ${
                    page === pageNumber
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                >
                    {pageNumber}
                </button>
                );
            })}

            <button
                onClick={() => setPage((prev) => Math.min(prev + 1, Math.ceil(total / limit)))}
                disabled={page === Math.ceil(total / limit) || loading}
                className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
            >
                Next
            </button>
        </div>

      {/* Edit Modal */}
      {editArtwork && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <form onSubmit={handleEditSubmit} className="bg-white text-black p-6 rounded-lg max-w-md w-full space-y-4">
            <h2 className="text-xl font-bold">Edit Artwork</h2>
            <input name="title" defaultValue={editArtwork.title} className="border p-2 w-full" required />
            <input name="category" defaultValue={editArtwork.category} className="border p-2 w-full" required />
            <input name="price" type="number" step="0.01" defaultValue={editArtwork.price} className="border p-2 w-full" required />
            <textarea name="description" defaultValue={editArtwork.description} className="border p-2 w-full" required />
            <input name="imageUrl" placeholder="Image URL (optional)" className="border p-2 w-full" />
            <div className="flex gap-2 justify-end">
              <button type="button" onClick={() => setEditArtwork(null)} className="bg-gray-600 text-white px-4 py-2 rounded">Cancel</button>
              <button type="submit" className="bg-purple-700 text-white px-4 py-2 rounded">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
