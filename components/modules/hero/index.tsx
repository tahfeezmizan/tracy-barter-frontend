"use client";

import { Button } from "@/components/ui/button";
import { Camera, CreditCard, Shield, SquareCheck } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  const data = [
    {
      icon: Shield,
      label: "Background checked",
    },
    {
      icon: Camera,
      label: "Background checked",
    },
    {
      icon: CreditCard,
      label: "Background checked",
    },
    {
      icon: SquareCheck,
      label: "Background checked",
    },
  ];

  return (
    <div
      className="relative min-h-screen flex items-center overflow-hidden pt-20 lg:pt-10 "
      style={{
        background: `linear-gradient(to bottom, #fbf8f0 92%, #f0f1f5ad 80%)`,
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

      <div className="hidden md:block">
        <Image
          src={require("@/assets/abstract-blob.svg")}
          alt="hero"
          width={200}
          height={200}
          className="absolute bottom-0 -right-16 z-40  w-[189px] h-[151px]"
        />
        <Image
          src={require("@/assets/spiral.svg")}
          alt="hero"
          width={150}
          height={150}
          className="absolute bottom-6 right-56 z-40 w-14 h-14"
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-5">
          <div className="flex-1">
            <span className="text-2xl font-medium leading-10">
              Your Home, Handled.
            </span>
            <h2 className="text-5xl text-primary font-bold leading-tight tracking-tight py-1 mb-2">
              It's More Than A Service... <br className="" />{" "}
              It's A Lifestyle.
            </h2>
            <p className="text-2xl leading-snug ">
              Cleaning, landscaping, grocery stocking, and occasional check-ins
              by vetted locals. Or, join as a provider and get steady, well-paid
              work.
            </p>
            <Button className="bg-secondary py-6 text-2xl text-white mt-6">
              I need home services
            </Button>

            <div className="grid grid-cols-4 gap-6 mt-10 md:mt-20">
              {data.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center gap-2 text-center"
                  >
                    <div className="mb-2">
                      <Icon className="size-8" />
                    </div>
                    <span className="text-sm">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <Image
              src={require("@/assets/hero-img.png")}
              alt="here"
              width={1000}
              height={1000}
              className="w-full md:w-[495px] h-full md:h-[509px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
