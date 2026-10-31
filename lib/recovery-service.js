import bcrypt from "bcryptjs";
import User from "@/models/User";
import PasswordReset from "@/models/PasswordReset";
import RecoveryLimit from "@/models/RecoveryLimit";
import { makeResetCode, recoveryHash, consumeReset, verifyResetCode } from "@/lib/password-recovery";
import { transporter } from "@/lib/email";

async function withinLimit(key,max) {
  const hour=Math.floor(Date.now()/3600000);
  const record=await RecoveryLimit.findOneAndUpdate({_id:recoveryHash(`${key}:${hour}`)},{$inc:{count:1},$setOnInsert:{expiresAt:new Date((hour+2)*3600000)}},{upsert:true,new:true});
  return record.count<=max;
}
export async function requestReset(email,ip) {
  const limits=await Promise.all([withinLimit(`email:${email}`,5),withinLimit(`ip:${ip}`,25)]);
  if(limits.some(ok=>!ok))return;
  const now=new Date();
  const reset=makeResetCode(email);
  const id=recoveryHash(email);
  let reserved;
  try {
    reserved=await PasswordReset.findOneAndUpdate({_id:id,$or:[{nextRequestAt:{$lte:now}},{nextRequestAt:{$exists:false}}]},{$set:{codeHash:reset.hash,nonce:reset.nonce,resetTokenHash:"",expiresAt:reset.expiresAt,attempts:0,nextRequestAt:new Date(Date.now()+60000)}},{upsert:true,new:true});
  }catch(error){if(error.code===11000)return;throw error}
  if(!reserved)return;
  const user=await User.findOne({email}).select("email").lean();
  if(!user)return;
  try {
    await transporter.sendMail({from:`"Chioma Favour Okoli Art" <${process.env.EMAIL_USER}>`,to:user.email,subject:"Your password reset code",text:`Your password reset code is ${reset.code}.\n\nIt expires in 10 minutes and can be used once. Never share this code. If you did not request it, you can ignore this email. Your password has not changed.`});
  }catch{
    // Remove only this failed delivery's code; do not erase a newer request.
    await PasswordReset.deleteOne({_id:id,codeHash:reset.hash});
    // Keep the same public response for registered and unregistered addresses.
    console.error("Password reset email delivery failed. Check mail configuration.");
  }
}
export async function verifyRecoveryCode(email,code) {
  return verifyResetCode({email,code,resets:PasswordReset});
}
export async function completeReset(email,token,password) {
  return consumeReset({email,token,password,resets:PasswordReset,users:User,hashPassword:value=>bcrypt.hash(value,12)});
}
