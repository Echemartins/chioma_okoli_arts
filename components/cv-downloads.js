import {Download,ExternalLink} from "lucide-react";
import PrintCV from "@/components/print-cv";
export default function CVDownloads(){return <div className="cv-download-actions no-print"><a className="primary-button" href="/documents/chioma-favour-okoli-cv.pdf" download="Chioma-Favour-Okoli-CV.pdf">Download artist CV<Download size={18} aria-hidden="true"/></a><a className="arrow-link" href="/documents/chioma-favour-okoli-cv.pdf" target="_blank" rel="noopener noreferrer">View CV PDF<ExternalLink size={18} aria-hidden="true"/></a><PrintCV/></div>}
