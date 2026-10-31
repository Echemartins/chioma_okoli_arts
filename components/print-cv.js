"use client";
import {Printer} from "lucide-react";
export default function PrintCV(){return <button className="arrow-link no-print" onClick={()=>window.print()}>Print this page<Printer size={18} aria-hidden="true"/></button>}
