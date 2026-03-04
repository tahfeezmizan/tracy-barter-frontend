import { AuthLayout } from "@/components/auth/auth-layout";
import { SignInForm } from "@/components/auth/login-form";
import { Suspense } from "react";

export default function page() {
  return (
    <div>
      <AuthLayout>
        <Suspense>
          <SignInForm />
        </Suspense>
      </AuthLayout>
    </div>
  );
}
