import { AuthLayout } from "@/components/auth/auth-layout";
import { SignInForm } from "@/components/auth/login-form";

export default function page() {
  return (
    <div>
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </div>
  );
}
