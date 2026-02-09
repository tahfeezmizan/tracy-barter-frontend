"use client";
import Image from "next/image";

export default function ServiceHero() {
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
           <h2 className="text-3xl md:text-4xl font-bold text-black">
            Our Services
          </h2>
          <h3 className="text-xl md:text-2xl md:px-24 lg:px-0 py-6 leading-relaxed">
            We keep your home running smoothly with the core services you ask
            for, nothing less.
          </h3>
          {/* <Link
            href={"#"}
            className="text-2xl text-white mt-6 px-4 py-2 bg-secondary rounded-lg hover:bg-secondary/80 "
          >
            Book a visit
          </Link> */}
        </div>
      </div>
    </div>
  );
}
