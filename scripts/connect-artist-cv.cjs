const fs=require("node:fs");
const file="app/cv/page.js";
let text=fs.readFileSync(file,"utf8").replace(/\uFEFF/g,"");
text=text.replace('import PrintCV from "@/components/print-cv";','import CVDownloads from "@/components/cv-downloads";import {ArrowUpRight} from "lucide-react";').replace('<PrintCV/>','<CVDownloads/>').replace('Selected information retained from the existing website. A current, artist-approved CV PDF will be added when supplied.','Download the artist’s supplied CV above for the full professional record. Selected education, exhibitions, and experience are listed below.').replace('{t} ↗','{t} <ArrowUpRight size={16} aria-hidden="true"/>');
fs.writeFileSync(file,text,"utf8");
