import mongoose from "mongoose";
const schema=new mongoose.Schema({_id:String,logoTheme:{type:String,enum:["olive","original"],default:"olive"}},{timestamps:true});
export default mongoose.models.SiteSettings||mongoose.model("SiteSettings",schema);
