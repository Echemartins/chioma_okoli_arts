import {notFound} from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {readArtworks} from "@/lib/artworks";
import {PageIntro,ArrowLink,WorkGrid} from "@/components/portfolio";
import ArtworkDocumentation from "@/components/artwork-documentation";
export const dynamic="force-dynamic";
export async function generateMetadata({params}){const{slug}=await params;const{artworks}=await readArtworks();const w=artworks.find(w=>w.slug===slug||w._id===slug);return{title:w?.title||"Artwork",description:w?.description?.slice(0,160)}}
export default async function Work({params}){
 const{slug}=await params;const{artworks,unavailable}=await readArtworks();
 if(unavailable)return <main id="main-content" className="wrap section"><h1>Portfolio temporarily unavailable</h1><p className="body-copy">Please try again shortly.</p><Link href="/contact" className="text-link">Contact the artist</Link></main>;
 const w=artworks.find(w=>w.slug===slug||w._id===slug);if(!w)notFound();
 const explicit=w.relatedWorks||[];const related=artworks.filter(x=>x._id!==w._id&&(explicit.length?explicit.includes(x.slug)||explicit.includes(x._id):w.series?x.series===w.series:!!w.theme&&x.theme===w.theme)).slice(0,6);
 return <main id="main-content" className="wrap page-space artwork-detail"><PageIntro index={w.series||"SELECTED WORK"} title={w.title}>{w.year}{w.medium?" · "+w.medium:""}</PageIntro><div className="detail-image"><Image src={w.imageUrl} alt={w.alt||w.title} width={1200} height={1100} sizes="90vw" priority/></div><div className="detail-meta"><dl><dt>Title</dt><dd>{w.title}</dd>{[["Year",w.year],["Medium",w.medium],["Dimensions",w.dimensions],["Series",w.series]].filter(([,v])=>v).map(([label,value])=><div className="metadata-pair" key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><div><p className="body-copy preserve-lines">{w.description||"For the artist’s commentary and further documentation, please get in touch."}</p>{w.acquisitionAvailable?<ArrowLink href={"/contact?work="+encodeURIComponent(w.title)}>Enquire about this work</ArrowLink>:<ArrowLink href={"/contact?work="+encodeURIComponent(w.title)}>Contact about this work</ArrowLink>}</div></div><ArtworkDocumentation work={w}/>{related.length>0&&<section className="section"><h2>In conversation with</h2><WorkGrid items={related}/></section>}</main>
}
