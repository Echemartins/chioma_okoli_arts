// models/Artwork.js

import mongoose from "mongoose";

const artworkSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String, required: true },
    // userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // New fields
    category: {
      type: String,
      enum: ["Painting", "Sculpture", "Digital Art", "Photography", "Mixed Media", "Other"],
      default: "Other",
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    isStoreItem: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Artwork = mongoose.models.Artwork || mongoose.model("Artwork", artworkSchema);

export default Artwork;
