import mongoose from "mongoose";
const schema=new mongoose.Schema({_id:String,homepageImage:{type:String,enum:["colour","monochrome"],default:"colour"},logoTheme:{type:String,enum:["olive","original"],default:"olive"}},{timestamps:true});
export default mongoose.models.SiteSettings||mongoose.model("SiteSettings",schema);
