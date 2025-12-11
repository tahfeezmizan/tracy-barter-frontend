"use client";

import type React from "react";

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

export function SignupForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const [signUpUser, { isLoading }] = useSignUpUserMutation({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreeToTerms: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup form data:", formData);

    try {
      const res = await signUpUser({
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      if (res?.data?.success) {
        toast.success("User created successfully");
        router.push(
          `/otp-verify?email=${encodeURIComponent(
            formData.email
          )}&authType=createAccount`
        );
      } else if (res?.error) {
        console.log("error", res?.error?.data?.message);
        toast.error(res?.error?.data?.message || "Something went wrong");
      }

      console.log(res);
    } catch (error: any) {
      console.log(error);

      // Extract backend message safely
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";

      toast.error(errorMessage);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Sign up</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label className="text-md font-semibold" htmlFor="fullName">
            First name
          </Label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="John"
            value={formData.fullName}
            onChange={handleInputChange}
            className="border-none bg-gray-200 text-black !text-xl py-5 focus:ring-2 focus:ring-primary/75 focus:outline-none"
            required
          />
        </div>

        <div className="space-y-2">
          <Label className="text-md font-semibold" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={handleInputChange}
            className="border-none bg-gray-200 text-black !text-xl py-5 focus:ring-2 focus:ring-primary/75 focus:outline-none"
            required
          />
        </div>

        <div className="space-y-2">
          <Label className="text-md font-semibold" htmlFor="password">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInputChange}
              className="border-none bg-gray-200 text-black !text-xl py-5 focus:ring-2 focus:ring-primary/75 focus:outline-none"
              required
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
        </div>

        <div className="space-y-2">
          <Label className="text-md font-semibold" htmlFor="password">
            Change Password
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="border-none bg-gray-200 text-black !text-xl py-5 focus:ring-2 focus:ring-primary/75 focus:outline-none"
              required
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
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={formData.agreeToTerms}
            onCheckedChange={handleCheckboxChange}
          />
          <Label
            className="text-md font-semibold"
            htmlFor="terms"
            className="text-sm font-normal"
          >
            I have read and agree to roqit's Terms and conditions
          </Label>
        </div>

        <Button
          type="submit"
          className="w-full bg-secondary text-2xl text-white mt-6 py-6 duration-300"
        >
          {isLoading ? <Loader className="animate-spin size-8" /> : "Sign Up"}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/signin" className="text-green-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
