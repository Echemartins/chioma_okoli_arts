const fs=require("node:fs");
function edit(file,change){const before=fs.readFileSync(file,"utf8");const after=change(before);fs.writeFileSync(file,after,"utf8")}
function addImport(text,statement){return text.replace(/^(\uFEFF?"use client";)/,"$1\n"+statement).replace(/^(?!\uFEFF?"use client";)/,statement+"\n")}
edit("components/header.js",s=>s.replace('const links=[["Practice"','const links=[["Home","/"],["Practice"'));
edit("app/page.js",s=>{
  s='import {ArrowUpRight} from "lucide-react";\n'+s;
  s=s.replace('const hero=featured[0]||works.find(w=>w.isSelected)||works[0];','');
  const start=s.indexOf('{hero&&<>');
  const end=s.indexOf('</>}</section>',start);
  if(start<0||end<0)throw Error("Homepage hero not found");
  s=s.slice(0,start)+'<Link href="/about" className="hero-art homepage-portrait"><Image src="/chioma_okoli.jpg" alt="Chioma Favour Okoli with her artwork" width={1108} height={1280} priority sizes="90vw"/><span className="image-link">Meet the artist <ArrowUpRight size={17} aria-hidden="true"/></span></Link><div className="art-caption"><span>Chioma Favour Okoli</span><span>CONTEMPORARY ARTIST & CURATOR</span></div>'+s.slice(end+4);
  return s.replaceAll('EVA↗','EVA<ArrowUpRight className="research-symbol-icon" aria-hidden="true"/>').replaceAll('<span>↗</span>','<ArrowUpRight size={18} aria-hidden="true"/>');
});
edit("app/login/page.js",s=>{
  s=addImport(s,'import {ArrowUpRight,ArrowLeft} from "lucide-react";');
  return s.replace('Forgot password? Reset by email code ↗','Forgot password? Reset by email code <ArrowUpRight size={15} aria-hidden="true"/>').replace('{busy?"Signing in…":"Sign in to your studio ↗"}','{busy?"Signing in…":"Sign in to your studio"}{!busy&&<ArrowUpRight size={18} aria-hidden="true"/>}').replace('← Back to the portfolio','<ArrowLeft size={16} aria-hidden="true"/> Back to the portfolio');
});
edit("app/admin/page.js",s=>s.replaceAll('{action} ↗','{action} <ArrowUpRight size={14} aria-hidden="true"/>').replaceAll('Manage all works ↗','Manage all works <ArrowUpRight size={15} aria-hidden="true"/>').replaceAll('View messages ↗','View messages <ArrowUpRight size={15} aria-hidden="true"/>'));
edit("components/artwork-editor.js",s=>addImport(s,'import {ArrowUpRight} from "lucide-react";').replace('View saved public page ↗','View saved public page <ArrowUpRight size={16} aria-hidden="true"/>'));
edit("components/contact-form.js",s=>addImport(s,'import {ArrowUpRight} from "lucide-react";').replace('{busy?"Sending…":"Send enquiry ↗"}','{busy?"Sending…":"Send enquiry"}{!busy&&<ArrowUpRight size={18} aria-hidden="true"/>}'));
console.log("Updated Home navigation, portrait hero and page-link icons.");
