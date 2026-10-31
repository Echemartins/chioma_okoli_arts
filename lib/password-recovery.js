import { createHmac, randomInt, randomBytes, timingSafeEqual } from "node:crypto";
import { z } from "zod";

export const recoveryEmail = z.string().trim().toLowerCase().email().max(254);
export const verifyCodeInput = z.object({email:recoveryEmail,code:z.string().regex(/^\d{6}$/, "Enter the six-digit code")});
export const resetInput = z.object({
  email: recoveryEmail,
  token: z.string().regex(/^[a-f0-9]{64}$/, "Verify your email code first"),
  password: z.string().min(10, "Use at least 10 characters").max(72, "Use at most 72 characters"),
}).refine(data => Buffer.byteLength(data.password, "utf8") <= 72, {message:"Password must be at most 72 bytes",path:["password"]});
export const CODE_LIFETIME = 10 * 60 * 1000;
export const MAX_ATTEMPTS = 5;
export const REQUEST_MESSAGE = "If this email has a registered account, a reset code will be sent. Check your inbox and spam folder.";
function secret() {
  const value = process.env.PASSWORD_RESET_SECRET || process.env.JWT_SECRET;
  if (!value) throw Error("Recovery secret is not configured");
  return value;
}
export function recoveryHash(value) { return createHmac("sha256", secret()).update(value).digest("hex"); }
export function codeHash(email, nonce, code) { return recoveryHash(`${email}:${nonce}:${code}`); }
export function makeResetCode(email, now = Date.now()) {
  const code = String(randomInt(100000, 1000000));
  const nonce = randomBytes(24).toString("hex");
  return {code, nonce, hash:codeHash(email, nonce, code), expiresAt:new Date(now + CODE_LIFETIME)};
}
export function matchesCode(email, record, code) {
  const actual = Buffer.from(codeHash(email,record.nonce,code),"hex");
  const expected = Buffer.from(record.codeHash || "","hex");
  return expected.length === actual.length && timingSafeEqual(actual,expected);
}

export async function verifyResetCode({email,code,resets}) {
  const id=recoveryHash(email),now=new Date();
  const record=await resets.findOneAndUpdate({_id:id,expiresAt:{$gt:now},attempts:{$lt:MAX_ATTEMPTS}},{$inc:{attempts:1}},{new:true}).lean();
  if(!record||!matchesCode(email,record,code))return null;
  const token=randomBytes(32).toString("hex");
  const verified=await resets.findOneAndUpdate({_id:id,codeHash:record.codeHash,expiresAt:{$gt:new Date()},attempts:{$lte:MAX_ATTEMPTS}},{$set:{codeHash:"",resetTokenHash:recoveryHash(token),expiresAt:new Date(Date.now()+5*60*1000)}},{new:true}).lean();
  return verified?token:null;
}

export async function consumeReset({email,token,password,resets,users,hashPassword}) {
  if(!/^[a-f0-9]{64}$/.test(token||""))return false;
  const id=recoveryHash(email);
  const record=await resets.findOne({_id:id,resetTokenHash:recoveryHash(token),expiresAt:{$gt:new Date()}}).lean();
  if(!record)return false;
  const hash=await hashPassword(password);
  const consumed=await resets.findOneAndDelete({_id:id,resetTokenHash:recoveryHash(token),expiresAt:{$gt:new Date()}});
  if(!consumed)return false;
  const result=await users.updateOne({email},{$set:{password:hash}});
  return result.matchedCount===1;
}
