/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignUpUserMutation } from "@/redux/features/auth/authApi";
import { Eye, EyeOff, Loader } from "lucide-react";
import Link from "next/link";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type SignupFormData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
};

interface SignUpErrorMessage {
  path: string;
  message: string;
}

interface SignUpError {
  data?: {
    success: boolean;
    message: string;
    errorMessages?: SignUpErrorMessage[];
  };
  status?: number;
  message?: string;
}

export function SignupForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [signUpUser, { isLoading }] = useSignUpUserMutation({});

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>({
    defaultValues: {
      agreeToTerms: false,
    },
  });

  const password = watch("password");

  const onSubmit = async (data: SignupFormData) => {
    try {
      const res = await signUpUser({
        name: data.fullName,
        email: data.email,
        password: data.password,
      });

      if (res?.data?.success) {
        toast.success("User created successfully");
        router.push(
          `/otp-verify?email=${encodeURIComponent(
            data.email,
          )}&authType=createAccount`,
        );
      } else if (res?.error) {
        const error = res.error as SignUpError;
        toast.error(
          error?.data?.message ||
            error?.message ||
            "Something went wrong during signup",
        );
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Sign up</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <div className="space-y-2">
          <Label className="text-md font-semibold" htmlFor="fullName">
            Full Name
          </Label>
          <Input
            id="fullName"
            placeholder="John"
            className="border-none bg-gray-200 text-black !text-xl py-5 focus:ring-2 focus:ring-primary/75 focus:outline-none"
            {...register("fullName", {
              required: "First name is required",
            })}
          />
          {errors.fullName && (
            <p className="text-sm text-red-500">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label className="text-md font-semibold" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            placeholder="example@gmail.com"
            className="border-none bg-gray-200 text-black !text-xl py-5 focus:ring-2 focus:ring-primary/75 focus:outline-none"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label className="text-md font-semibold" htmlFor="password">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="border-none bg-gray-200 text-black !text-xl py-5 focus:ring-2 focus:ring-primary/75 focus:outline-none"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label className="text-md font-semibold" htmlFor="confirmPassword">
            Confirm Password
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="border-none bg-gray-200 text-black !text-xl py-5 focus:ring-2 focus:ring-primary/75 focus:outline-none"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Terms */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            onCheckedChange={(checked) =>
              checked && checked !== "indeterminate"
            }
          />
          <Label className="text-sm" htmlFor="terms">
            I have read and agree to happy valley{" "}
            <Link
              href="/terms-conditions"
              className="text-primary hover:underline"
            >
              Terms and conditions
            </Link>
          </Label>
        </div>
        {errors.agreeToTerms && (
          <p className="text-sm text-red-500">{errors.agreeToTerms.message}</p>
        )}

        {/* Submit */}
        <Button
          type="submit"
          className="w-full bg-secondary text-2xl text-white mt-6 py-6 duration-300"
          disabled={isLoading}
        >
          {isLoading ? <Loader className="animate-spin size-8" /> : "Sign Up"}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-primary font-bold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
