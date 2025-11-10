"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function GroceryAssistant() {
  return (
    <div
      className="relative flex items-center overflow-hidden "
      style={{
        background: `linear-gradient(to bottom,
      #f0f1f5ad 0%,
      #f0f1f5ad 5%,
      #ffffff 5%,
      #ffffff 92%,
      #f0f1f5ad 92%,
      #f0f1f5ad 100%)`,
      }}
    >
      <div className="hidden md:block">
        <Image
          src={require("@/assets/abstract-blob.svg")}
          alt="hero"
          width={200}
          height={200}
          className="absolute top-4 -left-8 z-40 rotate-180 w-[189px] h-[151px]"
        />
        <Image
          src={require("@/assets/spiral.svg")}
          alt="hero"
          width={150}
          height={150}
          className="absolute top-10 left-56 rotate-180 z-40 w-14 h-14"
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
      <div className="max-w-7xl mx-auto px-4 pb-14 md:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-5 md:gap-10 pt-14 pb-10 md:pt-0 lg:py-0">
          <div className="flex-1 flex justify-center">
            <Image
              src={require("@/assets/grocery-assistant-img.png")}
              alt="here"
              width={1000}
              height={1000}
              className="w-full md:w-[495px] h-full md:h-[509px]"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl text-black font-bold leading-tight tracking-tight py-1 mb-2">
              Smart, Stocked Kitchen
            </h2>
            <p className="text-xl md:text-2xl leading-snug ">
              Tell our Grocery Assistant what you want (“3-day stay, breakfast +
              snacks”) and arrive to a filled fridge
            </p>
            <Button className="bg-secondary text-2xl text-white mt-6 py-6">
              Try Grocery
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
