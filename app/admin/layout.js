import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {verifyToken} from "@/lib/auth";
import {SESSION_COOKIE,allowedEditor} from "@/lib/admin-session";
import AdminShell from "@/components/admin-shell";
export const dynamic="force-dynamic";
export const metadata={title:"Studio Administration",robots:{index:false,follow:false}};
export default async function AdminLayout({children}){
 const jar=await cookies();let user;
 try{user=verifyToken(jar.get(SESSION_COOKIE)?.value)}catch{redirect("/login")}
 if(!allowedEditor(user.email,process.env.CONTENT_EDITOR_EMAILS))redirect("/login?reason=access");
 return <AdminShell email={user.email}>{children}</AdminShell>;
}
