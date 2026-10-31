import {createRequire} from "node:module";
import mongoose from "mongoose";
import {DEFAULT_HOMEPAGE_IMAGE} from "../lib/homepage-images.js";
const require=createRequire(import.meta.url);
require("@next/env").loadEnvConfig(process.cwd());
try{
  if(!process.env.MONGODB_URI)throw new Error("Database configuration missing");
  await mongoose.connect(process.env.MONGODB_URI,{serverSelectionTimeoutMS:10000});
  await mongoose.connection.collection("sitesettings").updateOne(
    {_id:"appearance"},
    {$set:{homepageImage:DEFAULT_HOMEPAGE_IMAGE,updatedAt:new Date()}},
    {upsert:true},
  );
  console.log("Homepage image set to the new colour landscape version. Logo preference preserved.");
}catch{
  console.error("Could not select the homepage image. Check database access or select it in Admin > Appearance.");
  process.exitCode=1;
}finally{await mongoose.disconnect();}
