"use client";
import {forwardRef,useState} from "react";
import {Eye,EyeOff} from "lucide-react";

const PasswordInput=forwardRef(function PasswordInput({visibilityLabel="password",...props},ref){
  const [visible,setVisible]=useState(false);
  return <div className="password-field"><input {...props} ref={ref} type={visible?"text":"password"}/><button className="password-visibility" type="button" aria-label={`${visible?"Hide":"Show"} ${visibilityLabel}`} aria-pressed={visible} disabled={props.disabled} onClick={()=>setVisible(v=>!v)}>{visible?<EyeOff size={19} aria-hidden="true"/>:<Eye size={19} aria-hidden="true"/>}</button></div>;
});
export default PasswordInput;
