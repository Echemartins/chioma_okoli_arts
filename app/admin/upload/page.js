"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AdminHeader from "../../../components/adminheader";

const UploadArtworkPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Other",
    price: "",
    isStoreItem: false,
    isFeatured: false,
  });
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const showError = (message) => toast.error(message, { position: "top-center" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) return showError("Please upload an image.");

    const fileType = imageFile.type;
    const fileName = imageFile.name.toLowerCase();
    const validTypes = [
      "image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp",
      "image/svg+xml", "image/bmp", "image/tiff", "image/heif", "image/heic"
    ];
    const validExtensions = [".jpeg", ".jpg", ".png", ".gif", ".webp", ".svg", ".bmp", ".tiff", ".heif", ".heic"];

    const hasValidMimeType = validTypes.includes(fileType);
    const hasValidExtension = validExtensions.some(ext => fileName.endsWith(ext));

    if (!hasValidMimeType && !hasValidExtension)
      return showError("Unsupported image format.");

    const maxSize = 5 * 1024 * 1024;
    if (imageFile.size > maxSize)
      return showError("Image size should be under 5MB.");

    try {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onloadend = async () => {
        setUploading(true);
        const base64Image = reader.result;

        const body = {
          ...formData,
          imageUrl: base64Image,
        };

        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        const res = await fetch("/api/artworks/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          const errorJson = await res.json();
          throw new Error(errorJson.message || "Failed to upload artwork.");
        }

        toast.success("Artwork uploaded successfully!", {
          position: "top-center",
          onClose: () => router.push("/admin"),
        });
      };
    } catch (err) {
      console.error("Upload error:", err);
      showError("An unexpected error occurred.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <ToastContainer />
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-3xl p-8 rounded-xl shadow-xl bg-orange-50 border border-orange-200">
          <h1 className="text-3xl font-bold mb-6 text-center text-orange-500">Upload New Artwork</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Artwork Title"
              required
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Artwork Description"
              rows={3}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="Painting">Painting</option>
              <option value="Sculpture">Sculpture</option>
              <option value="Digital Art">Digital Art</option>
              <option value="Photography">Photography</option>
              <option value="Mixed Media">Mixed Media</option>
              <option value="Other">Other</option>
            </select>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price (USD)"
              required
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="isStoreItem"
                checked={formData.isStoreItem}
                onChange={handleChange}
                className="accent-orange-400"
              />
              <label>Available in Store</label>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="accent-orange-400"
              />
              <label>Feature on Homepage</label>
            </div>

            <div>
              <label className="block mb-1 font-medium">Artwork Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
                className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:font-semibold file:bg-orange-400 file:text-white hover:file:bg-orange-500"
              />
              {imageFile && (
                <p className="mt-1 text-sm text-gray-500">Selected: {imageFile.name}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="w-full bg-orange-400 hover:bg-orange-500 transition duration-300 text-white py-2 rounded-md font-semibold"
            >
              {uploading ? "Uploading..." : "Upload Artwork"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadArtworkPage;
