"use client";
import {ArrowUpRight,ArrowLeft} from "lucide-react";
import {useState} from "react";
import PasswordInput from "@/components/password-input";
import SiteLogo from "@/components/site-logo";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {safeAdminDestination} from "@/lib/admin-session";
export default function LoginPage(){
 const router=useRouter(),[email,setEmail]=useState(""),[password,setPassword]=useState(""),[busy,setBusy]=useState(false),[error,setError]=useState("");
 async function login(e){e.preventDefault();setBusy(true);setError("");try{const r=await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,password})});const d=await r.json();if(!r.ok)throw Error(d.message||"Sign in failed");localStorage.removeItem("token");const destination=safeAdminDestination(new URLSearchParams(window.location.search).get("next"));router.replace(destination);router.refresh()}catch(err){setError(err.message||"Could not connect. Please try again.")}finally{setBusy(false)}}
 return <main id="main-content" className="admin-login-page"><div className="login-identity"><Link href="/" className="login-brand"><SiteLogo priority/><span className="wordmark">CHIOMA FAVOUR OKOLI<span>CONTEMPORARY ARTIST & CURATOR</span></span></Link><p>A space for the work.<br/><em>And everything behind it.</em></p><span>STUDIO ADMINISTRATION</span></div><div className="admin-login-card"><span className="small-label">THE ARTIST’S STUDIO</span><h1>Welcome back.</h1><p className="body-copy">Sign in with an authorised editor account to manage your portfolio and studio.</p><form className="contact-form" onSubmit={login}><label htmlFor="email">Email address<input id="email" type="email" autoComplete="username" required value={email} onChange={e=>setEmail(e.target.value)} disabled={busy}/></label><label htmlFor="password">Password<PasswordInput id="password" autoComplete="current-password" required value={password} onChange={e=>setPassword(e.target.value)} disabled={busy}/></label><Link className="login-recovery-link" href="/forgot-password">Forgot password? Reset by email code <ArrowUpRight size={15} aria-hidden="true"/></Link><button disabled={busy}>{busy?"Signing in…":"Sign in to your studio"}{!busy&&<ArrowUpRight size={18} aria-hidden="true"/>}</button><p role="alert" className="login-error">{error}</p></form><Link href="/" className="text-link login-back"><ArrowLeft size={16} aria-hidden="true"/> Back to the portfolio</Link></div></main>;
}


