import Link from "next/link";
import Image from "next/image";
import {ArrowUpRight} from "lucide-react";
export function ArrowLink({href,children}){return <Link className="arrow-link" href={href}>{children}<ArrowUpRight size={19} aria-hidden="true"/></Link>}
export function PageIntro({index,title,children}){return <div className="page-intro"><p className="eyebrow">{index}</p><h1>{title}</h1><div className="intro-copy">{children}</div></div>}
export function WorkGrid({items,titleOnly=false}){return <div className="work-grid">{items.map(w=><Link className="work" key={w.slug} href={"/selected-works/"+w.slug}><div className="work-image"><Image src={w.image} alt={w.alt||w.title} fill sizes="(max-width:600px) 45vw, 30vw"/></div><div className="work-caption"><h3>{w.title}</h3>{!titleOnly&&<span>{w.year}</span>}</div>{!titleOnly&&<p>{w.medium||w.series||"Selected work"}</p>}</Link>)}</div>}
