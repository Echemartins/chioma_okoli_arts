import mongoose from "mongoose";

const BuyRequestSchema = new mongoose.Schema(
  {
    artworkId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artwork",
      required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String },
    status: {
      type: String,
      enum: ["pending", "settled", "declined"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.BuyRequest || mongoose.model("BuyRequest", BuyRequestSchema);
