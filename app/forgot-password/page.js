import PasswordRecoveryForm from "@/components/password-recovery-form";
export const metadata={title:"Reset your password",robots:{index:false,follow:false}};
export default function ForgotPassword(){return <main id="main-content" className="wrap recovery-page"><PasswordRecoveryForm/></main>}
