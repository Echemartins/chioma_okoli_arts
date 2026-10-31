// This module also runs in Edge middleware: use Web Crypto, not Node APIs.
export const SESSION_COOKIE = "chioma_session";
export const SESSION_SECONDS = 60 * 60 * 24;
export function allowedEditor(email, allowlist = "") {
  return typeof email === "string" && allowlist.split(",").map(v=>v.trim().toLowerCase()).filter(Boolean).includes(email.toLowerCase());
}
export function requestToken(req) {
  const cookie = req.headers.get("cookie")?.split(";").map(v=>v.trim()).find(v=>v.startsWith(SESSION_COOKIE+"="));
  if(cookie) return cookie.slice(SESSION_COOKIE.length+1);
  const auth=req.headers.get("authorization")||"";
  return auth.startsWith("Bearer ") ? auth.slice(7) : null;
}
function decodeBase64Url(value) {
  const str=value.replace(/-/g,"+").replace(/_/g,"/");
  return Uint8Array.from(atob(str.padEnd(Math.ceil(str.length/4)*4,"=")),c=>c.charCodeAt(0));
}
export async function verifySession(token, secret, now=Date.now()) {
  try {
    if(!secret || !token || token.length>4096)return null;
    const parts=token.split(".");if(parts.length!==3)return null;
    const decoder=new TextDecoder();
    const header=JSON.parse(decoder.decode(decodeBase64Url(parts[0])));
    if(header.alg!=="HS256")return null;
    const key=await crypto.subtle.importKey("raw",new TextEncoder().encode(secret),{name:"HMAC",hash:"SHA-256"},false,["verify"]);
    const valid=await crypto.subtle.verify("HMAC",key,decodeBase64Url(parts[2]),new TextEncoder().encode(parts[0]+"."+parts[1]));
    if(!valid)return null;
    const claims=JSON.parse(decoder.decode(decodeBase64Url(parts[1])));
    if(!Number.isFinite(claims.exp)||claims.exp<=now/1000||!claims.userId||typeof claims.email!=="string"||claims.nbf>now/1000)return null;
    return claims;
  }catch{return null;}
}
export function safeAdminDestination(value) {
  if(typeof value!=="string" || /[\\\x00-\x1f]/.test(value))return "/admin";
  try {const u=new URL(value,"https://local.invalid");return u.origin==="https://local.invalid"&&(u.pathname==="/admin"||u.pathname.startsWith("/admin/"))?u.pathname+u.search:"/admin";}catch{return "/admin";}
}
export function protectedAdminApi(path,method,search) {
  return path==="/api/admin"||path.startsWith("/api/admin/")||
    (path==="/api/analytics"&&method==="GET")||
    (path==="/api/visitors"&&method==="GET")||
    (path==="/api/requests"&&method==="GET")||
    (path.startsWith("/api/requests/")&&method!=="GET")||
    (path==="/api/journal"&&(method!=="GET"||search.get("admin")==="1"));
}
