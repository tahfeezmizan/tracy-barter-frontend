"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import authImg from "@/assets/auth-img.png";
import authImg2 from "@/assets/auth-img-2.png";
import Link from "next/link";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const pathname = usePathname();
  console.log(pathname);

  const image = pathname === "signup" ? authImg2 : authImg;

  return (
    <div className="min-h-screen flex gap-10 p-6  bg-secondary">
      <div className="flex-1 hidden lg:flex relative rounded-2xl overflow-hidden">
        <Image
          src={image}
          alt="Authentication background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-white rounded-2xl overflow-hidden">
        <div className="w-full max-w-lg ">
          <Link href={"/"}>
            <Image
              src={require("@/assets/logo-2.png")}
              alt="Auth Logo"
              width={500}
              height={500}
              className="w-full md:w-96 h-auto mx-auto mb-6"
            />
          </Link>
          {children}
        </div>
      </div>
    </div>
  );
}
