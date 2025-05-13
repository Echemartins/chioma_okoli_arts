"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Header from "../../header";

export default function ArtworkDetail() {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    const fetchArtwork = async () => {
      const res = await fetch(`/api/artworks/${id}`);
      const data = await res.json();
      setArtwork(data);
    };

    fetchArtwork();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, artworkId: id }),
    });

    if (res.ok) {
      alert("Request sent successfully!");
      setShowForm(false);
      setFormData({ email: "", phone: "", message: "" });
    } else {
      alert("Something went wrong.");
    }
  };

  if (!artwork)
    return <div className="text-center text-white mt-10">Loading...</div>;

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">  
          <div className="w-full relative aspect-[3/2] max-h-[60vh] overflow-hidden rounded-lg">
            <Image
              src={artwork.imageUrl}
              alt={artwork.title}
              fill
              className="w-full h-auto object-contain rounded-lg"
              priority
            />
          </div>

          <div className="flex flex-col mt-6">
            <h1 className="text-3xl font-bold">{artwork.title}</h1>
            <p className="text-lg mt-2">Price: ${artwork.price}</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-6 px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg"
            >
              Request to Buy
            </button>
          </div>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <form
              onSubmit={handleSubmit}
              className="bg-purple-200 text-black p-8 rounded-lg w-[80%] max-w-lg"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-600">
                Purchase Request
              </h2>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="w-full mb-3 px-4 py-2 border border-gray-400 rounded outline-0"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                required
                className="w-full mb-3 px-4 py-2 border border-gray-400 rounded outline-0 "
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                className="w-full mb-4 px-4 py-2 border border-gray-400 rounded outline-0"
              />
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
