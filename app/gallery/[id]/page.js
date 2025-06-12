"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Header from "../../header";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-hot-toast";

const formSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(10).max(15),
  message: z.string().optional(),
});

export default function ArtworkDetail() {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const res = await fetch(`/api/artworks/${id}`);
        const data = await res.json();
        setArtwork(data);
      } catch (error) {
        console.error("Error fetching artwork:", error);
      }
    };

    fetchArtwork();
  }, [id]);

  const onSubmit = async (formData) => {
    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, artworkId: id }),
      });

      if (res.ok) {
        toast.success("Request sent successfully!");
        setShowForm(false);
        reset();
      } else {
        toast.error("Something went wrong.");
      }
    } catch {
      toast.error("Network error.");
    }
  };

  if (!artwork)
    return <div className="text-center text-orange-600 mt-20">Loading...</div>;

  return (
    <div>full
      <Header />
      <div className=" bg-white text-orange-800 mt-32 md:mt-2">
        <div className="max-w-2xl mx-auto bg-orange-50 rounded-lg shadow-lg">
          <div className="relative w-full aspect-[3/2] max-h-[60vh] overflow-hidden rounded-lg">
            <Image
              src={artwork.imageUrl}
              alt={artwork.title}
              fill
              className="object-contain rounded-lg p-4"
              placeholder="blur"
              blurDataURL="/placeholder.jpg"
              loading="lazy"
            />
          </div>

          <div className="flex flex-col space-y-1 bg-orange-100 p-4 rounded-b-lg">
            <h1 className="text-2xl font-bold text-orange-500">{artwork.title}</h1>
            <p className="text-sm font-medium">Price: ${artwork.price}</p>
            <button
              onClick={() => setShowForm(true)}
              className=" w-fit px-6 py-2 bg-orange-400 hover:bg-orange-500 text-white rounded-lg transition"
            >
              Request to Buy
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50 px-4"
            >
              <motion.form
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white text-orange-800 p-8 rounded-lg w-full max-w-lg shadow-xl"
              >
                <h2 className="text-2xl font-semibold mb-6 text-center text-orange-600">
                  Purchase Request
                </h2>
                <input
                  type="email"
                  placeholder="Your Email"
                  {...register("email")}
                  className="w-full mb-2 px-4 py-2 border border-orange-300 rounded focus:outline-orange-500"
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mb-2">{errors.email.message}</p>
                )}

                <input
                  type="tel"
                  placeholder="Phone Number"
                  {...register("phone")}
                  className="w-full mb-2 px-4 py-2 border border-orange-300 rounded focus:outline-orange-500"
                />
                {errors.phone && (
                  <p className="text-sm text-red-500 mb-2">{errors.phone.message}</p>
                )}

                <textarea
                  placeholder="Message (Optional)"
                  {...register("message")}
                  className="w-full mb-4 px-4 py-2 border border-orange-300 rounded focus:outline-orange-500"
                />
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
                  >
                    Submit
                  </button>
                </div>
              </motion.form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
