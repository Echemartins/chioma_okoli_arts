import test from "node:test";
import assert from "node:assert/strict";
import bcrypt from "bcryptjs";
import {makeResetCode,matchesCode,recoveryHash,recoveryEmail,resetInput,verifyCodeInput,verifyResetCode,consumeReset,MAX_ATTEMPTS} from "../lib/password-recovery.js";
process.env.PASSWORD_RESET_SECRET="test-only-recovery-secret";
const email="artist@example.test";
function memoryStore(reset){
 let record={_id:recoveryHash(email),codeHash:reset.hash,nonce:reset.nonce,expiresAt:reset.expiresAt,attempts:0},password,writes=0;
 function matches(q){return record&&record._id===q._id&&(!q.expiresAt||record.expiresAt>q.expiresAt.$gt)&&(q.codeHash===undefined||record.codeHash===q.codeHash)&&(q.resetTokenHash===undefined||record.resetTokenHash===q.resetTokenHash)&&(!q.attempts||(q.attempts.$lt===undefined||record.attempts<q.attempts.$lt)&&(q.attempts.$lte===undefined||record.attempts<=q.attempts.$lte))}
 const resets={
  findOneAndUpdate(q,u){return{async lean(){if(!matches(q))return null;if(u.$inc)record.attempts+=u.$inc.attempts;if(u.$set)Object.assign(record,u.$set);return{...record}}}},
  findOne(q){return{async lean(){return matches(q)?{...record}:null}}},
  async findOneAndDelete(q){if(!matches(q))return null;const old=record;record=null;return old},
 };
 const users={async updateOne(q,u){assert.equal(q.email,email);password=u.$set.password;writes++;return{matchedCount:1}}};
 return{resets,users,get password(){return password},get writes(){return writes},expire(){record.expiresAt=new Date(0)}};
}
const verify=(store,code)=>verifyResetCode({email,code,resets:store.resets});
const finish=(store,token)=>consumeReset({email,token,password:"a strong new password",resets:store.resets,users:store.users,hashPassword:value=>bcrypt.hash(value,4)});
test("codes are salted, email-bound, six digits and expire in ten minutes",()=>{
 const now=Date.now(),a=makeResetCode(email,now),b=makeResetCode(email,now);assert.match(a.code,/^\d{6}$/);assert.notEqual(a.nonce,b.nonce);assert.equal(a.expiresAt.getTime()-now,600000);
 assert.equal(matchesCode(email,{nonce:a.nonce,codeHash:a.hash},a.code),true);assert.equal(matchesCode("other@example.test",{nonce:a.nonce,codeHash:a.hash},a.code),false);
});
test("code verification and password change have separate validation",()=>{
 assert.equal(recoveryEmail.parse(" Artist@Example.test "),email);
 assert.equal(verifyCodeInput.safeParse({email,code:"123456"}).success,true);
 assert.equal(verifyCodeInput.safeParse({email,code:"123"}).success,false);
 assert.equal(resetInput.safeParse({email,code:"123456",password:"a strong password"}).success,false);
 assert.equal(resetInput.safeParse({email,token:"a".repeat(64),password:"a strong password"}).success,true);
 assert.equal(resetInput.safeParse({email,token:"a".repeat(64),password:"é".repeat(40)}).success,false);
});
test("five wrong codes prevent verification without changing a password",async()=>{
 const reset=makeResetCode(email),store=memoryStore(reset),wrong=reset.code==="111111"?"222222":"111111";
 for(let i=0;i<MAX_ATTEMPTS;i++)assert.equal(await verify(store,wrong),null);
 assert.equal(await verify(store,reset.code),null);assert.equal(store.writes,0);
});
test("an expired code is rejected before TTL cleanup",async()=>{
 const reset=makeResetCode(email,Date.now()-700000),store=memoryStore(reset);assert.equal(await verify(store,reset.code),null);assert.equal(store.writes,0);
});
test("verification grants a single-use reset token without changing a password",async()=>{
 const reset=makeResetCode(email),store=memoryStore(reset),token=await verify(store,reset.code);
 assert.match(token,/^[a-f0-9]{64}$/);assert.equal(store.writes,0);assert.equal(await verify(store,reset.code),null);
 assert.equal(await finish(store,token),true);assert.equal(await bcrypt.compare("a strong new password",store.password),true);assert.equal(await finish(store,token),false);assert.equal(store.writes,1);
});
test("raw OTP and forged grants cannot skip verification",async()=>{
 const reset=makeResetCode(email),store=memoryStore(reset);assert.equal(await finish(store,reset.code),false);assert.equal(await finish(store,"a".repeat(64)),false);assert.equal(store.writes,0);
});
test("expired verified grants cannot reset a password",async()=>{
 const reset=makeResetCode(email),store=memoryStore(reset),token=await verify(store,reset.code);store.expire();assert.equal(await finish(store,token),false);assert.equal(store.writes,0);
});
test("simultaneous OTP verifications issue only one grant",async()=>{
 const reset=makeResetCode(email),store=memoryStore(reset),results=await Promise.all([verify(store,reset.code),verify(store,reset.code)]);assert.equal(results.filter(Boolean).length,1);
});
test("simultaneous password submissions consume a grant only once",async()=>{
 const reset=makeResetCode(email),store=memoryStore(reset),token=await verify(store,reset.code);const results=await Promise.all([finish(store,token),finish(store,token)]);assert.deepEqual(results.sort(),[false,true]);assert.equal(store.writes,1);
});

