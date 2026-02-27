"use client";
import Image from "next/image";
import Link from "next/link";

export default function PricingHero() {
  return (
    <div
      className="relative flex items-center overflow-hidden pt-10"
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

      <div className="max-w-7xl mx-auto px-4 py-5 pt-28 lg:py-32 text-center">
        <div className="">
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            Pricing & Plans
          </h2>
          <p className="text-xl md:text-2xl md:px-24 lg:px-0 py-10 leading-relaxed">
            Choose a simple membership that fits how you use your second home.
            Every plan is handled by vetted, insured local professionals and
            includes clear communication throughout.
          </p>
        </div>
      </div>
    </div>
  );
}
