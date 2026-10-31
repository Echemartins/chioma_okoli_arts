import test from "node:test";
import assert from "node:assert/strict";
import { artworkInput, safeImage, videoEmbed } from "../lib/artwork-validation.js";
import { mergeArtworks, visibleArtworks, publicArtwork } from "../lib/artwork-records.js";
import { isContentEditor } from "../lib/content-editor.js";
import { signToken } from "../lib/auth.js";
import Artwork from "../models/Artwork.js";
import {works} from "../lib/portfolio.js";
import fs from "node:fs/promises";

const draft = { title:"Material study", imageUrl:"/Gaze.jpg" };
test("drafts need no price or invented metadata; publication needs a description", () => {
  assert.equal(artworkInput.safeParse(draft).success,true);
  assert.equal(artworkInput.safeParse({...draft,published:true}).success,false);
  const record=artworkInput.parse({...draft,published:true,description:"An investigation into colour and memory.",archived:true});
  assert.equal(record.archived,true);
  assert.equal(record.price,undefined);
});
test("image and video URLs reject active content and unrelated hosts", () => {
  for(const bad of ["javascript:alert(1)","//example.com/a.jpg","https://example.com/a.jpg","/../private","/\\evil"]) assert.equal(safeImage(bad),false);
  assert.equal(safeImage("https://res.cloudinary.com/demo/image/upload/test.jpg"),true);
  assert.equal(videoEmbed("https://youtu.be/dQw4w9WgXcQ"),"https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ");
  assert.equal(videoEmbed("https://vimeo.com/123456"),"https://player.vimeo.com/video/123456");
  assert.equal(videoEmbed("https://youtube.com.evil.test/watch?v=dQw4w9WgXcQ"),null);
});
test("invalid nested media, video, prices and publication flags are rejected", () => {
  for(const change of [{media:[{url:"javascript:alert(1)"}]},{videoUrls:["https://example.com/video"]},{price:-1},{published:"true"},{sortOrder:-1},{relatedWorks:["../private"]}]) assert.equal(artworkInput.safeParse({...draft,...change}).success,false);
});
test("saved curated edits replace the original including rename, draft and archive state", () => {
  const rows=mergeArtworks([{_id:"0123456789abcdef01234567",sourceKey:"4th-generation",title:"Revised title",imageUrl:"/Gaze.jpg",published:false,archived:true,sortOrder:50}]);
  assert.equal(rows.length,works.length);
  const edited=rows.find(w=>w.slug==="4th-generation");
  assert.equal(edited.title,"Revised title");assert.equal(edited.published,false);assert.equal(edited.archived,true);
  assert.equal(rows.some(w=>w.title==="4th Generation"),false);
});
test("legacy archive records merge by title without duplicates and preserve other works", () => {
  const rows=mergeArtworks([{_id:"0123456789abcdef01234567",title:"The Gathering",imageUrl:"/Gaze.jpg"},{_id:"1123456789abcdef01234567",title:"New work",imageUrl:"/Gaze.jpg",published:true}]);
  assert.equal(rows.length,works.length+1);
  assert.equal(rows.find(w=>w.slug==="the-gathering")._id,"0123456789abcdef01234567");
  assert.equal(rows.find(w=>w.title==="New work").slug,"1123456789abcdef01234567");
});
test("Mongoose schema retains the full portfolio payload without requiring a price", async () => {
  const data=artworkInput.parse({...draft,published:true,description:"A confirmed artist description.",year:"2026",medium:"Acrylic-dyed EVA foam",dimensions:"30 × 40 cm",theme:"Material & environment",isEva:true,media:[{url:"/Gaze.jpg",kind:"Process",alt:"Cutting foam",caption:"Studio process"}],videoUrls:["https://vimeo.com/123456"],relatedWorks:["4th-generation"],exhibitionHistory:"2026 — Confirmed exhibition",processNotes:"Layering observations",researchNotes:"Light study",acquisitionAvailable:true});
  const doc=new Artwork(data);await doc.validate();
  assert.equal(doc.isEva,true);assert.equal(doc.media[0].kind,"Process");assert.equal(doc.researchNotes,"Light study");assert.equal(doc.price,undefined);
});

test("public records exclude drafts, archives and private price fields", () => {
  const rows=[{title:"Published",published:true,price:100,sourceKey:"original",isStoreItem:true},{title:"Draft",published:false},{title:"Archive",published:true,archived:true}];
  const result=visibleArtworks(rows).map(publicArtwork);
  assert.equal(result.length,1);assert.equal(result[0].title,"Published");
  for(const key of ["price","sourceKey","isStoreItem"]) assert.equal(key in result[0],false);
});
test("editor access requires a signed token and explicit configured email", () => {
  const previousSecret=process.env.JWT_SECRET,previousEditors=process.env.CONTENT_EDITOR_EMAILS;
  process.env.JWT_SECRET="test-only-secret-not-used-by-the-application";
  const req=token=>new Request("http://localhost/api/admin/artworks",{headers:{Authorization:"Bearer "+token}});
  try {
    const allowed=signToken({_id:"test",email:"artist@example.test"});
    const other=signToken({_id:"other",email:"outsider@example.test"});
    process.env.CONTENT_EDITOR_EMAILS="";assert.equal(isContentEditor(req(allowed)),false);
    process.env.CONTENT_EDITOR_EMAILS=" artist@example.test ";assert.equal(isContentEditor(req(allowed)),true);
    assert.equal(isContentEditor(req(other)),false);assert.equal(isContentEditor(req("forged-token")),false);
  } finally {
    if(previousSecret===undefined)delete process.env.JWT_SECRET;else process.env.JWT_SECRET=previousSecret;
    if(previousEditors===undefined)delete process.env.CONTENT_EDITOR_EMAILS;else process.env.CONTENT_EDITOR_EMAILS=previousEditors;
  }
});

test("five supplied EVA images are published, editable seed records with accurate placement",async()=>{
  const rows=mergeArtworks([]).filter(w=>w.isEva);
  assert.equal(rows.length,5);
  for(const w of rows){
    assert.equal(w.category,"Mixed Media");assert.equal(w.isFeatured,false);assert.equal(w.isSelected,false);
    assert.ok(w._id.startsWith("seed-"));assert.ok(w.published);assert.match(w.description,/Working archive label/);
    assert.equal(w.year,undefined);assert.equal(w.dimensions,undefined);
    await fs.access("public"+w.imageUrl);
    const parsed=artworkInput.safeParse({...w,imageUrl:w.imageUrl});assert.equal(parsed.success,true);
  }
});
test("deleted EVA seed overrides never resurface in the research page",()=>{
  const seed=works.find(w=>w.slug==="eva-study-01");
  const rows=mergeArtworks([{_id:"0123456789abcdef01234567",sourceKey:seed.slug,title:"Confirmed EVA title",imageUrl:seed.image,deleted:true,published:false,isEva:true}]);
  assert.equal(rows.filter(w=>w.slug===seed.slug).length,1);
  assert.equal(visibleArtworks(rows).some(w=>w.slug===seed.slug),false);
  const restored=rows.map(w=>w.slug===seed.slug?{...w,deleted:false,published:false}:w);
  assert.equal(visibleArtworks(restored).some(w=>w.slug===seed.slug),false);
});
