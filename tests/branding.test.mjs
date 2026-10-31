import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import sharp from "sharp";
import {DEFAULT_LOGO_THEME,logoOptions} from "../lib/brand-options.js";
import SiteSettings from "../models/SiteSettings.js";
test("the original logo is byte-identical to the retained source",async()=>{
  const source=await fs.readFile("public/IMG-20250610-WA0017_1_-removebg-preview (1).png");
  const current=await fs.readFile("public/chioma-okoli-logo.png");
  assert.ok(source.equals(current));
});
test("the olive variant preserves logo dimensions and every alpha pixel",async()=>{
  const original=await sharp("public/chioma-okoli-logo.png").ensureAlpha().raw().toBuffer({resolveWithObject:true});
  const variant=await sharp("public/branding/chioma-okoli-olive.png").ensureAlpha().raw().toBuffer({resolveWithObject:true});
  assert.equal(original.info.width,variant.info.width);assert.equal(original.info.height,variant.info.height);
  let changed=0;
  for(let i=0;i<original.data.length;i+=4){assert.equal(original.data[i+3],variant.data[i+3]);if(original.data[i+3]&&original.data[i]!==variant.data[i])changed++}
  assert.ok(changed>1000);
});
test("appearance choices reference both retained assets and reject unsupported settings",async()=>{
  assert.equal(DEFAULT_LOGO_THEME,"olive");
  for(const theme of ["olive","original"]){await fs.access("public"+logoOptions[theme].src);await new SiteSettings({_id:"appearance",logoTheme:theme}).validate()}
  await assert.rejects(new SiteSettings({_id:"appearance",logoTheme:"unknown"}).validate());
});
