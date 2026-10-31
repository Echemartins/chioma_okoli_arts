import mongoose from "mongoose";
import {DEFAULT_HOMEPAGE_IMAGE,homepageImages} from "../lib/homepage-images.js";
const schema=new mongoose.Schema({_id:String,homepageImage:{type:String,enum:Object.keys(homepageImages),default:DEFAULT_HOMEPAGE_IMAGE},logoTheme:{type:String,enum:["olive","original"],default:"olive"}},{timestamps:true});
export default mongoose.models.SiteSettings||mongoose.model("SiteSettings",schema);
