'use client';
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import AdminHeader from '../adminheader';
import toast, { Toaster } from 'react-hot-toast';

export default function ManageArtworksPage() {
  const [artworks, setArtworks] = useState([]);
  const [editArtwork, setEditArtwork] = useState(null);
  const [filters, setFilters] = useState({ title: "", category: "" });
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(8);
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const fetchArtworks = useCallback(async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({ page, limit, ...filters }).toString();
      const res = await fetch(`/api/admin/artworks?${query}`);
      const { artworks, total } = await res.json();
      setArtworks(artworks);
      setTotal(total);
    } catch (error) {
      toast.error("Failed to load artworks.");
    } finally {
      setLoading(false);
    }
  }, [filters, page, limit]);

  useEffect(() => {
    fetchArtworks();
  }, [fetchArtworks]);

  async function deleteArtwork(id) {
    if (!confirm("Are you sure?")) return;
    try {
      await fetch(`/api/admin/artworks/${id}`, { method: "DELETE" });
      toast.success("Artwork deleted.");
      fetchArtworks();
    } catch {
      toast.error("Failed to delete artwork.");
    }
  }

  async function handleEditSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', e.target.title.value);
    formData.append('description', e.target.description.value);
    formData.append('category', e.target.category.value);
    formData.append('price', e.target.price.value);
    if (imageFile) formData.append('image', imageFile);

    try {
      await fetch(`/api/admin/artworks/${editArtwork._id}`, {
        method: "PUT",
        body: formData,
      });

      toast.success("Artwork updated successfully!", { id: "edit-success" });
      setEditArtwork(null);
      fetchArtworks();
      setImageFile(null);
      setImagePreview(null);
    } catch {
      toast.error("Failed to update artwork.");
    }
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  return (
    <div className="min-h-screen bg-white text-orange-900 p-6">
      <Toaster position="top-right" />
      <AdminHeader />
      <h1 className="text-3xl font-bold mb-6 text-orange-700">Manage Artworks</h1>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4">
        <input
          placeholder="Search title"
          value={filters.title}
          onChange={(e) => setFilters((f) => ({ ...f, title: e.target.value }))}
          className="bg-orange-50 px-4 py-2 rounded border border-orange-300"
        />
        <input
          placeholder="Filter by category"
          value={filters.category}
          onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}
          className="bg-orange-50 px-4 py-2 rounded border border-orange-300"
        />
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="h-12 w-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {artworks.map((art) => (
            <div key={art._id} className="bg-orange-50 p-3 rounded shadow">
              <Image src={art.imageUrl} alt={art.title} width={300} height={200} className="w-full h-40 object-cover rounded" />
              <p className="mt-2 font-semibold">{art.title}</p>
              <p className="text-sm text-orange-600">{art.category}</p>
              <div className="flex justify-between mt-2 text-sm">
                <button onClick={() => { setEditArtwork(art); setImagePreview(null); setImageFile(null); }} className="text-orange-500 hover:underline">Edit</button>
                <button onClick={() => deleteArtwork(art._id)} className="text-red-600 hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex flex-wrap gap-2 mt-6 justify-center">
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1 || loading} className="px-3 py-1 bg-orange-100 text-orange-900 border border-orange-300 rounded disabled:opacity-50">Prev</button>
        {Array.from({ length: Math.ceil(total / limit) }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            disabled={page === i + 1 || loading}
            className={`px-3 py-1 rounded border ${
              page === i + 1 ? 'bg-orange-600 text-white' : 'bg-orange-100 border-orange-300'
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={() => setPage((p) => Math.min(p + 1, Math.ceil(total / limit)))} disabled={page === Math.ceil(total / limit) || loading} className="px-3 py-1 bg-orange-100 text-orange-900 border border-orange-300 rounded disabled:opacity-50">Next</button>
      </div>

      {/* Edit Modal */}
      {editArtwork && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <form onSubmit={handleEditSubmit} className="bg-white text-black p-6 rounded-lg max-w-md w-full space-y-4">
            <h2 className="text-xl font-bold text-orange-700">Edit Artwork</h2>
            <input name="title" defaultValue={editArtwork.title} className="border p-2 w-full" required />
            <input name="category" defaultValue={editArtwork.category} className="border p-2 w-full" required />
            <input name="price" type="number" step="0.01" defaultValue={editArtwork.price} className="border p-2 w-full" required />
            <textarea name="description" defaultValue={editArtwork.description} className="border p-2 w-full" required />

            {/* Image Uploader */}
            <div>
              <input type="file" accept="image/*" onChange={handleImageChange} className="border p-2 w-full" />
              {imagePreview ? (
                <Image src={imagePreview} alt="Preview" width={300} height={200} className="mt-2 rounded" />
              ) : (
                <Image src={editArtwork.imageUrl} alt="Current" width={300} height={200} className="mt-2 rounded" />
              )}
            </div>

            <div className="flex gap-2 justify-end">
              <button type="button" onClick={() => setEditArtwork(null)} className="bg-gray-600 text-white px-4 py-2 rounded hover:cursor-pointer">Cancel</button>
              <button type="submit" className="bg-orange-600 text-white px-4 py-2 rounded hover:cursor-pointer">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
