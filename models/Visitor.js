import mongoose from "mongoose";

const VisitorSchema = new mongoose.Schema(
  {
    artworkId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artwork",
      required: true,
    },
    ip: String,
    userAgent: String,
    location: {
      country: String,
      city: String,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // if logged in
  },
  { timestamps: true }
);

export default mongoose.models.Visitor || mongoose.model("Visitor", VisitorSchema);