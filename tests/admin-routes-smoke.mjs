// Run against a local production preview. Tokens stay in process memory.
import assert from "node:assert/strict";
import {createRequire} from "node:module";
import jwt from "jsonwebtoken";
const require=createRequire(import.meta.url);
require("@next/env").loadEnvConfig(process.cwd());
const base=process.argv[2]||"http://localhost:3103";
const routes=["/admin","/admin/manageartworks","/admin/upload","/admin/journal","/admin/contacts","/admin/subscribers","/admin/requests","/admin/visitors","/admin/analytics"];
const get=(path,options={})=>fetch(base+path,{redirect:"manual",signal:AbortSignal.timeout(15000),...options});
for(const path of routes){const r=await get(path);assert.equal(r.status,307,path);const location=new URL(r.headers.get("location"),base);assert.equal(location.pathname,"/login");assert.equal(location.searchParams.get("next"),path)}
console.log("All 9 admin pages redirect unauthenticated visitors to login.");
for(const path of ["/api/admin/dashboard","/api/admin/contacts","/api/admin/subscribers","/api/admin/requests","/api/admin/artworks","/api/analytics","/api/visitors","/api/requests","/api/journal?admin=1"]){const r=await get(path);assert.equal(r.status,401,path)}
console.log("All 9 private API reads reject unauthenticated requests.");
const email=process.env.CONTENT_EDITOR_EMAILS.split(",")[0].trim();
const claims={userId:"000000000000000000000001",email};
const cookie=token=>({cookie:"chioma_session="+token});
for(const token of ["forged-token",jwt.sign(claims,process.env.JWT_SECRET,{expiresIn:-1}),jwt.sign({...claims,email:"not-an-editor@example.test"},process.env.JWT_SECRET,{expiresIn:60})]){const r=await get("/admin/manageartworks",{headers:cookie(token)});assert.equal(r.status,307)}
console.log("Forged, expired and non-editor sessions cannot enter admin.");
const token=jwt.sign(claims,process.env.JWT_SECRET,{expiresIn:60});
const r=await get("/admin/manageartworks",{headers:cookie(token)});assert.equal(r.status,200);const html=await r.text();assert.ok(html.includes("admin-sidebar"));assert.ok(html.includes("admin-workspace"));assert.ok(html.includes(email));assert.ok(!html.includes('class="site-footer"'));
const session=await get("/api/auth/session",{headers:cookie(token)});assert.equal(session.status,200);
const crossOrigin=await get("/api/admin/artworks",{method:"POST",headers:{...cookie(token),Origin:"https://unrelated.example"}});assert.equal(crossOrigin.status,403);
const logout=await get("/api/auth/logout",{method:"POST",headers:cookie(token)});assert.equal(logout.status,200);assert.match(logout.headers.get("set-cookie"),/chioma_session=;.*Max-Age=0/i);assert.match(logout.headers.get("set-cookie"),/HttpOnly/i);
for(const path of ["/login","/forgot-password"]){assert.equal((await get(path)).status,200)}
console.log("Authorised session renders the sidebar; session check, origin protection, logout and login/recovery pages passed.");

