import test from "node:test";
import assert from "node:assert/strict";
import jwt from "jsonwebtoken";
import {verifySession,allowedEditor,requestToken,SESSION_COOKIE,safeAdminDestination,protectedAdminApi} from "../lib/admin-session.js";

const secret="test-only-admin-session-secret";
const user={userId:"0123456789abcdef01234567",email:"artist@example.test"};
test("middleware verifies real HS256 JWTs and rejects forged, expired and wrong-algorithm tokens",async()=>{
  const valid=jwt.sign(user,secret,{expiresIn:"1d"});
  assert.equal((await verifySession(valid,secret)).email,user.email);
  assert.equal(await verifySession(valid,"wrong-secret"),null);
  assert.equal(await verifySession(jwt.sign(user,secret,{expiresIn:-1}),secret),null);
  assert.equal(await verifySession(jwt.sign(user,secret,{algorithm:"HS384",expiresIn:"1d"}),secret),null);
  assert.equal(await verifySession(jwt.sign(user,secret),secret),null);
  assert.equal(await verifySession("forged-token",secret),null);
  assert.equal(await verifySession(valid,""),null);
});
test("only explicit authorised emails are accepted",()=>{
  assert.equal(allowedEditor("ARTIST@example.test"," artist@example.test , editor@example.test "),true);
  assert.equal(allowedEditor("outsider@example.test","artist@example.test"),false);
  assert.equal(allowedEditor(user.email),false);
});
test("server session cookie is preferred over legacy bearer headers",()=>{
  const req=new Request("https://example.test/api/admin/artworks",{headers:{cookie:`sid=abc; ${SESSION_COOKIE}=cookie-token; other=1`,authorization:"Bearer legacy-token"}});
  assert.equal(requestToken(req),"cookie-token");
  assert.equal(requestToken(new Request("https://example.test",{headers:{authorization:"Bearer legacy-token"}})),"legacy-token");
  assert.equal(requestToken(new Request("https://example.test")),null);
});
test("login return targets stay inside the admin area",()=>{
  assert.equal(safeAdminDestination("/admin/manageartworks?tab=drafts"),"/admin/manageartworks?tab=drafts");
  for(const value of [null,"https://evil.example/admin","//evil.example/admin","/administer","/admin/../../contact","/\\evil.example/admin","javascript:alert(1)"])assert.equal(safeAdminDestination(value),"/admin");
});
test("admin APIs and private data are gated while public submissions remain accessible",()=>{
  for(const[path,method,query]of [["/api/admin/contacts","GET",""],["/api/admin/artwork-media","POST",""],["/api/analytics","GET",""],["/api/visitors","GET",""],["/api/requests","GET",""],["/api/requests/123","PATCH",""],["/api/journal","GET","admin=1"],["/api/journal","POST",""]])assert.equal(protectedAdminApi(path,method,new URLSearchParams(query)),true);
  for(const[path,method]of [["/api/contact","POST"],["/api/requests","POST"],["/api/visitors","POST"],["/api/journal","GET"],["/api/artworks","GET"]])assert.equal(protectedAdminApi(path,method,new URLSearchParams()),false);
});
