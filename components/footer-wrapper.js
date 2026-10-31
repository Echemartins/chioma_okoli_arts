"use client";
import {usePathname} from "next/navigation";
import Footer from "@/components/footer";
export default function FooterWrapper(){const path=usePathname();return path==="/admin"||path.startsWith("/admin/")?null:<Footer/>}
