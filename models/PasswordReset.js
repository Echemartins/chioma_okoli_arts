import mongoose from "mongoose";
const schema = new mongoose.Schema({
  _id: String, codeHash: String, nonce: String, expiresAt: Date, resetTokenHash: String,
  attempts: {type:Number,default:0}, nextRequestAt: Date,
});
schema.index({expiresAt:1},{expireAfterSeconds:0});
export default mongoose.models.PasswordReset || mongoose.model("PasswordReset",schema);
