"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminHeader from "../adminheader";

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
  const [error, setError] = useState("");

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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setUploading(true);
  //   setError("");
  
  //   if (!imageFile) {
  //     setError("Please upload an image.");
  //     setUploading(false);
  //     return;
  //   }
  
  //   try {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(imageFile);
  //     reader.onloadend = async () => {
  //       const base64Image = reader.result;
  
  //       const body = {
  //         title: formData.title,
  //         description: formData.description,
  //         category: formData.category,
  //         price: formData.price,
  //         imageUrl: base64Image, // Using base64 image
  //         isStoreItem: formData.isStoreItem,
  //         isFeatured: formData.isFeatured,
  //       };
  
  //       const token = localStorage.getItem("token");
  //       if(!token){
  //         router.push("/login")
  //       }
  
  //       const res = await fetch("/api/artworks/upload", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify(body), // Send as JSON
  //       });
  
  //       if (!res.ok) {
  //         const errorText = await res.text();
  //         throw new Error(errorText);
  //         // router.push("/login");
  //       }else{
  //         router.push("/gallery");
  //       }
  
  //     };
  //   } catch (err) {
  //    console.log(err.message, 'an error has occured')
  //   } finally {
  //     setUploading(false);
  //   }
  // };
  

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (!imageFile) {
    setError("Please upload an image.");
    return;
  }

  // ✅ Validate image file type
  if (!imageFile.type.startsWith("image/")) {
    setError("Only image files are allowed.");
    return;
  }

  // ✅ Validate image file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  if (imageFile.size > maxSize) {
    setError("Image size should be under 5MB.");
    return;
  }

  try {
    const reader = new FileReader();

    reader.readAsDataURL(imageFile);
    reader.onloadend = async () => {
      setUploading(true);
      const base64Image = reader.result;

      const body = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        price: formData.price,
        imageUrl: base64Image,
        isStoreItem: formData.isStoreItem,
        isFeatured: formData.isFeatured,
      };

      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
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

        router.push("/gallery");
      } catch (err) {
        console.error(err.message, "an error has occurred");
        setError(err.message);
      } finally {
        setUploading(false);
      }
    };
  } catch (err) {
    console.error("Error during file read or upload", err);
    setError("An unexpected error occurred.");
    setUploading(false);
  }
};
  

  return (
    <div>
    <AdminHeader/>
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-3xl p-8 rounded-lg shadow-2xl bg-zinc-900">
        <h1 className="text-3xl font-bold mb-6 text-center">Upload New Artwork</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Artwork Title"
            required
            className="w-full px-4 py-2 bg-zinc-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Artwork Description"
            className="w-full px-4 py-2 bg-zinc-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-zinc-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
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
            placeholder="Price (NGN)"
            required
            className="w-full px-4 py-2 bg-zinc-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="isStoreItem"
              checked={formData.isStoreItem}
              onChange={handleChange}
              className="accent-blue-500"
            />
            <label>Available in Store</label>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              className="accent-blue-500"
              />
            <label>Feature on Homepage</label>
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />

          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white py-2 rounded-md font-semibold"
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
