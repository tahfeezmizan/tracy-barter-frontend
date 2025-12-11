"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  useResendOTPMutation,
  useVerifyUserMutation,
} from "@/redux/features/auth/authApi";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { setUser } from "@/redux/slice/userSlice";

export default function OtpVerify() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const authType = searchParams.get("authType");
  const dispatch = useDispatch();

  const [verifyOTP] = useVerifyUserMutation();
  const [resendOTP] = useResendOTPMutation({});

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // ⭐ ADDED PASTE HANDLER (NO CHANGES TO YOUR EXISTING CODE)
  const handlePaste = (index: number, e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasted) return;

    const newOtp = [...otp];
    pasted
      .slice(0, 6 - index)
      .split("")
      .forEach((v, i) => (newOtp[index + i] = v));

    setOtp(newOtp);

    const nextIndex = Math.min(index + pasted.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    if (value.length > 1) {
      value
        .slice(0, 6 - index)
        .split("")
        .forEach((v, i) => (newOtp[index + i] = v));
      setOtp(newOtp);
      inputRefs.current[Math.min(index + value.length, 5)]?.focus();
      return;
    }

    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    // console.log("Verifying OTP:", otp.join(""));

    try {
      const res = await verifyOTP({
        email: email || "",
        oneTimeCode: otp.join(""),
      });
      const responseData = res?.data;

      if (responseData?.data?.token) {
        const token = responseData.data.token;
        // ✅ Forgot password flow
        toast.success(
          responseData?.message || "OTP verified, please reset your password"
        );
        router.push(`/set-new-password?token=${token}`);
      } else if (responseData?.data?.accessToken) {
        // ✅ Normal login flow
        dispatch(
          setUser({
            data: {
              accessToken: responseData?.data?.accessToken,
              role: responseData?.data?.role,
            },
          })
        );

        toast.success("OTP verification successful");
        router.push("/");
      } else {
        const err = res as any;
        toast.error(err?.data?.message || "Something went wrong");
      }

      console.log("API Res", res);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  const handleResend = async () => {
    setOtp(Array(6).fill(""));
    setCountdown(60);
    inputRefs.current[0]?.focus();

    try {
      const res = await resendOTP({
        email: email || "",
        authType: authType || "createAccount",
      });

      console.log(res);

      if (res?.data?.success) {
        toast.success(res?.data?.message || "OTP resent sucessfully");
      } else if (res?.error) {
        console.log("error", res?.error?.data?.message);
        toast.error(res?.error?.data?.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }

    console.log("Resending OTP...");
  };

  const isComplete = otp.every(Boolean);

  return (
    <div className="w-full text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Please check your email
      </h1>
      <p className="text-gray-600 mb-6">
        A 6-digit code has been sent to your email
      </p>

      <div className="flex justify-center gap-3 mb-6">
        {otp.map((digit, i) => (
          <Input
            key={i}
            ref={(el) => {
              inputRefs.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={(e) => handlePaste(i, e)} // ⭐ ADDED (NO CHANGES TO YOUR CODE)
            className="w-12 h-12 text-center text-xl font-semibold  border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-primary"
          />
        ))}
      </div>

      <Button
        onClick={handleVerify}
        disabled={!isComplete || isLoading}
        className="w-full bg-secondary text-xl text-white mt-6 py-5 duration-300 rounded-lg font-medium mb-4"
      >
        {isLoading ? "Verifying..." : "Verify OTP"}
      </Button>

      {countdown > 0 ? (
        <p className="text-gray-500">Resend in {countdown}s</p>
      ) : (
        <>
          <p className="text-gray-600 mb-2">Don’t receive any code</p>
          <Button
            onClick={handleResend}
            className="bg-transparent text-green-900 hover:bg-transparent hover:border font-medium"
          >
            Resend Code
          </Button>
        </>
      )}
    </div>
  );
}
