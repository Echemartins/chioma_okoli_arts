import { Schema, models, model } from "mongoose";

const VisitSchema = new Schema(
  {
    event: { type: String, default: "pageview" },
    path: { type: String, index: true },
    referrer: { type: String },
    sid: { type: String, index: true },
    ip: { type: String, index: true },
    country: { type: String, index: true },
    city: { type: String },
    userAgent: { type: String },
  },
  { timestamps: true }
);

// Time-based queries & common reports
VisitSchema.index({ createdAt: 1 });
VisitSchema.index({ path: 1, createdAt: -1 });
VisitSchema.index({ country: 1, createdAt: -1 });

export default models.Visit || model("Visit", VisitSchema);
