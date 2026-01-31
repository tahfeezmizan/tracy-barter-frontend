import { AuthLayout } from "@/components/auth/auth-layout";
import SetNewPasswordForm from "@/components/auth/reset-password-form";
import ResetPasswordForm from "@/components/auth/reset-password-form";

export default function page() {
  return (
    <div>
      <AuthLayout>
        <SetNewPasswordForm />
      </AuthLayout>
    </div>
  );
}
