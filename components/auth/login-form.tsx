"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Loader } from "lucide-react";
import Link from "next/link";
import { useLoginUserMutation } from "@/redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slice/userSlice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function SignInForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const [loginUser, { isLoading }] = useLoginUserMutation({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await loginUser({
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
      });

      if (res?.data?.success) {
        toast.success(res?.data?.message || "Login successful");

        dispatch(
          setUser({
            data: {
              accessToken: res?.data?.data?.accessToken,
              role: res?.data?.data?.role,
            },
          })
        );

        if (["admin", "staff"].includes(res?.data?.data?.role)) {
          router.push("/dashboard");
        } else {
          router.push("/user-profile");
        }
      } else if (res?.error) {
        const errorData = res?.error as any;
        const errorMessage =
          errorData?.data?.message ||
          errorData?.data?.errorMessages?.[0]?.message ||
          "Something went wrong";
        toast.error(errorMessage);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlerememberMeChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      rememberMe: checked,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">
          Login to your account.
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            className="border-none bg-gray-200 text-black !text-xl py-5 focus:ring-2 focus:ring-primary/75 focus:outline-none"
            required
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInputChange}
              minLength={8}
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

        {/* Remember & Forgot */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={formData.rememberMe}
              onCheckedChange={handlerememberMeChange}
            />
            <Label htmlFor="remember" className="text-sm">
              Remember me
            </Label>
          </div>
          <Link href="/forgot-password">Forgot password ?</Link>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={!formData.rememberMe || isLoading}
          className="w-full bg-secondary text-2xl text-white mt-6 py-6 duration-300"
        >
          {isLoading ? <Loader className="animate-spin size-8" /> : "Login"}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">Dont have an account? </p>
        <Link
          href="/signup"
          className="text-primary font-bold hover:text-secondary"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
