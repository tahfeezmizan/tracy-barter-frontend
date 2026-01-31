import { AuthLayout } from "@/components/auth/auth-layout";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export default function ForgotPassword(){
    return(
        <AuthLayout>
            <ForgotPasswordForm/>
            
        </AuthLayout>
    )
}