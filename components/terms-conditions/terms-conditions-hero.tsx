"use client";
import { BookmarkMinus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function TermsConditionsHero() {
  return (
    <div
      className="relative overflow-hidden pt-10"
      style={{
        background: `linear-gradient(to top, #fbf8f0 75%, #f0f1f5ad 25%)`,
      }}
    >
      <div className="hidden lg:block">
        <Image
          src={require("@/assets/abstract-blob.svg")}
          alt="hero"
          width={200}
          height={200}
          className="absolute -top-6 -left-8 z-40 rotate-180 w-[189px] h-[151px]"
        />
        <Image
          src={require("@/assets/spiral.svg")}
          alt="hero"
          width={150}
          height={150}
          className="absolute top-6 left-56 z-40 w-14 h-14"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-28">
        <div className="space-y-1.5">
          <p className="text-xl md:text-3xl font-medium leading-relaxed">
            Policies & Procedures
          </p>
          <p className="text-xl md:text-3xl font-medium leading-relaxed">
            Happy Valley Home Concierge Service Agreement
          </p>
          <p className="text-xl md:text-3xl font-medium leading-relaxed mb-6">
            Last updated: 2025-01-28
          </p>
          <Link
            href={"#"}
            className="w-96 text-2xl text-primary px-4 py-1.5 flex items-center gap-3 justify-center group hover:bg-primary/80 hover:text-secondary bg-secondary rounded-lg"
          >
            <BookmarkMinus className="size-6 text-primary group-hover:text-secondary" />
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
}
