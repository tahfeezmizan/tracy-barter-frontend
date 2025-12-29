import { AuthLayout } from "@/components/auth/auth-layout";
import OtpVerify from "@/components/auth/otp-verify-form";
import React, { Suspense } from "react";

export default function page() {
  return (
    <div>
      <AuthLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <OtpVerify />
        </Suspense>
      </AuthLayout>
    </div>
  );
}
