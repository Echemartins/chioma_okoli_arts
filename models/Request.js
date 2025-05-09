import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
    artworkId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artwork",
      required: true,
    },
  },
  { timestamps: true }
);

const Request = mongoose.models.Request || mongoose.model("Request", requestSchema);

export default Request;
