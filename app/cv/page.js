import {PageIntro} from "@/components/portfolio";
import CVDownloads from "@/components/cv-downloads";
import {ArrowUpRight} from "lucide-react";
export const metadata={title:"CV & Exhibitions"};
const groups=[
 ["Education",[
  ["2025","MFA in Visual Communications — in view, as listed in the supplied CV","Nnamdi Azikiwe University, Awka"],
  ["2019–2023","Postgraduate Diploma in Fine Art (Painting)","Nnamdi Azikiwe University, Awka"],
  ["2014–2016","Higher National Diploma in Fine & Applied Arts","Institute of Management and Technology, Enugu"],
  ["2009–2011","Ordinary National Diploma in Fine & Applied Arts","Institute of Management and Technology, Enugu"]
 ]],
 ["Selected exhibitions",[
  ["2026","9th edition, Art Connects Women","ZeeArts Gallery, Dubai, UAE"],
  ["2025","Things Fall Apart","Center for Memories, Enugu"],
  ["2025","Life in My City Art Exhibition",""],
  ["2025","Society of Nigerian Artists Exhibition",""],
  ["2023–2024","XX Art Exhibition — International Women’s Day",""],
  ["2023","Infiltration of Blue","African Artists’ Foundation, Lagos"],
  ["2023","Art Arising Festival","National Museum, Onikan, Lagos"],
  ["2023","Anambra State Art and Craft Exhibition","Ministry of Art, Culture and Tourism"],
  ["2022","5th edition, Art Connects Women","ZeeArts Gallery, Dubai, UAE"],
  ["2020","Art Is Everywhere","COVID-19 exhibition"],
  ["2019","National Gallery of Arts Annual Exhibition",""],
  ["2018","National Gallery of Arts Exhibition","Igboukwu"]
 ]],
 ["Professional & curatorial experience",[
  ["2025","Studio Assistant, Tunji Adeniyi-Jones Residency","Museum of West African Art (MOWAA)"],
  ["2025","Consultant on museum affairs","Awka Museum Foundation"],
  ["2024","Curator","Nnewi Museum"],
  ["From 2022","Co-Curator, XX Art Exhibition",""],
  ["2019–2025","Conservation and community artefact restoration projects","Awka Museum Foundation"],
  ["From 2018","Resident artist experience","Awka Museum Foundation"],
  ["2018–2019","Artist & Trainee Curator","National Gallery of Arts, Anambra"],
  ["2012","Industrial Trainee, Department of Fine Arts","Institute of Management and Technology, Enugu"]
 ]],
 ["Research & cultural documentation",[
  ["2024–2025","Research assistant, cultural book project on the Awka people","Awka Museum Foundation"],
  ["2023","Painting as a tool for political statement: the Nigerian experience",""],
  ["2023","Nigerian Women and Their Wrapper","Cultural documentation, Awka Museum Foundation"],
  ["2023","Traditional celebrations and inclusion","Visual documentary on Imoka Festival, Awka"],
  ["2021","South Eastern Icons","Documentary on Ikolo as a medium of communication, Awka Museum Foundation"],
  ["2014","Mkpokiti dance troupe","Research project through painting"]
 ]],
 ["Selected recognition & professional development",[
  ["2022","Nigeria Art Ambassador representative award","5th edition, Art Connects Women, Dubai"],
  ["2019","Maiden exhibition organising-team award","Awka Museum Foundation"],
  ["2022–2023","Painting and printmaking workshops","Bruce Onobrakpeya Foundation, Delta State"],
  ["2024","Product Design, Cohort 3","LM Tech Hub"]
 ]]
];
const press=[
 ["When Young Artists Deconstruct Concept of Blue","https://guardian.ng/art/when-young-artists-deconstruct-concept-of-blue/"],
 ["13 Young Artists Deepen Infiltration of the Blues","https://guardian.ng/art/13-young-artists-deepen-infiltration-of-the-blues/"],
 ["Awka Onslaught of Female Artists","https://thisage.com.ng/awka-onslaught-of-female-artists/"],
 ["I Use My Artwork to Inspire the African Girl Child","https://tribuneonlineng.com/i-use-my-artwork-to-inspire-african-girl-child-female-artist/"],
 ["Curated Group Exhibition Document","https://drive.google.com/file/d/145_frIEm0Ez8KC7bq4OByH6iDstNBtaj/view"]
];
export default function CV(){return <main id="main-content" className="wrap page-space"><PageIntro index="PROFESSIONAL JOURNEY" title="CV & exhibitions.">Chioma Favour Okoli · Contemporary Artist & Curator</PageIntro><CVDownloads/><p className="note no-print cv-source-note">Selected information below follows the artist’s supplied CV. Download the original PDF for the full record. Years are reproduced as listed; exact event dates and completion status are not otherwise specified.</p>{groups.map(([title,rows])=><section className="cv-section section" key={title}><h2>{title}</h2>{rows.map(([date,event,place])=><div className="cv-row" key={event}><span>{date}</span><div><p>{event}</p>{place&&<p className="note">{place}</p>}</div></div>)}</section>)}<section className="cv-section"><h2>Publications & press</h2>{press.map(([title,url])=><p key={url}><a className="text-link" href={url} target="_blank" rel="noopener noreferrer">{title}<ArrowUpRight size={16} aria-hidden="true"/></a></p>)}</section></main>}

