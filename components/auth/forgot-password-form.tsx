"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForgetPasswordSendOTPMutation } from "@/redux/features/auth/authApi";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type ForgotPasswordValues = {
  email: string;
};

export function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordValues>();
  const router = useRouter()

const [forgetPassword, { isLoading }] = useForgetPasswordSendOTPMutation({});

 const onSubmit = async (data: ForgotPasswordValues) => {
  try {
    const res = await forgetPassword({
      email: data.email,
    }).unwrap();

    if (res?.success) {
      toast.success("Reset email sent successfully");
      router.push(
          `/otp-verify?email=${encodeURIComponent(
            data.email
          )}&authType=forgotPassword`
        );
    }
  } catch (error: any) {
    const message =
      error?.data?.message || "Something went wrong";
    toast.error(message);
  }
};


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <label className="text-sm font-semibold">Email Address *</label>
        <Input
          type="email"
          placeholder="you@example.com"
          className="border-none bg-gray-200 text-black !text-xl py-5 focus:ring-2 focus:ring-primary/75 focus:outline-none"
          {...register("email", {
            required: "Email is required",
          })}
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-secondary text-2xl text-white mt-6 py-6 duration-300"
      >
{isLoading ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : "Send Reset Link"}
      </Button>

      <p className="text-center text-sm text-gray-600">
        Remember your password?{" "}
        <Link
          href="/signin"
          className="text-blue-600 hover:text-blue-700 font-semibold"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
}
