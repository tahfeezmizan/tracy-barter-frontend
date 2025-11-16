"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

export default function TermsConditionsHero() {
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

      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <div className="">
          <Link
            href={"#"}
            className="text-2xl border border-primary text-primary mt-6 px-4 py-2 rounded-lg hover:bg-primary/80 hover:text-secondary "
          >
            Our Services
          </Link>
          <h3 className="text-xl md:text-2xl md:px-24 lg:px-0 py-10 leading-relaxed">
            We keep your home running smoothly with the core services you ask
            for, nothing less.
          </h3>
          <Link
            href={"#"}
            className="text-2xl text-white mt-6 px-4 py-2 bg-secondary rounded-lg hover:bg-secondary/80 "
          >
            Book a visit
          </Link>
        </div>
      </div>
    </div>
  );
}
