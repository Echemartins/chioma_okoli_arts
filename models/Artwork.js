
import mongoose from "mongoose";

const artworkSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String, required: true },
    sourceKey: { type: String, index: { unique: true, sparse: true } },
    year: String,
    medium: String,
    dimensions: String,
    series: String,
    theme: String,
    alt: String,
    exhibitionHistory: String,
    processNotes: String,
    researchNotes: String,
    relatedWorks: [String],
    media: [{ url: String, alt: String, caption: String, kind: String }],
    videoUrls: [String],
    isSelected: { type: Boolean, default: false },
    isEva: { type: Boolean, default: false },
    published: { type: Boolean, default: false },
    archived: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
    acquisitionAvailable: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },


    category: {
      type: String,
      enum: ["Painting", "Sculpture", "Digital Art", "Photography", "Mixed Media", "Other"],
      default: "Other",
    },
    price: {
      type: Number,
      required: false,
      min: 0,
    },
    views: {
      type: Number,
      default: 0,
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

artworkSchema.index({ createdAt: -1 });
artworkSchema.index({ price: 1 });



const Artwork = mongoose.models.Artwork || mongoose.model("Artwork", artworkSchema);

export default Artwork;
