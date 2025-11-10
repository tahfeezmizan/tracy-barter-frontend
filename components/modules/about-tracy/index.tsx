"use client";

import { Button } from "@/components/ui/button";
import { BookmarkMinus, Facebook, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function AboutTracy() {
  return (
    <div className="relative flex items-center overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="flex-1 flex justify-center w-auto md:w-[530px] h-auto md:h-[630px]">
            <Image
              src={require("@/assets/about-tracy.png")}
              alt="here"
              width={1000}
              height={1000}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl text-black font-bold leading-tight tracking-tight ">
              Tracy Barter
            </h2>
            <Button className="p-2.5 bg-primary/60 text-secondary text-base font-medium rounded-full my-3">
              Founder & Realtor®
            </Button>
            <p className="text-xl md:text-2xl leading-snug text-secondary ">
              With over two decades of experience in real estate, Tracy Barter
              has built her career on exceptional service, trusted
              relationships, and a deep love for helping clients feel at home in
              Happy Valley. As the founder of Happy Valley Home Concierge, Tracy
              combines her industry expertise with a genuine passion for
              simplifying homeownership—offering clients peace of mind through
              thoughtful, personalized care. <br />
              When she's not serving clients or managing the concierge team,
              you'll find Tracy with her husband and seven children, cheering at
              local sporting events or enjoying the outdoors. A former Division
              I volleyball player, she brings the same energy, dedication, and
              teamwork to her business that she once brought to the court.
            </p>
            <div className="flex flex-col md:flex-row gap-1  md:gap-5">
              <Button className="flex items-center gap-3 justify-center group hover:bg-primary/80 hover:text-secondary bg-secondary text-2xl text-white mt-6 py-6 ">
                <BookmarkMinus className="size-6 text-primary group-hover:text-secondary" />
                Contact Tracy
              </Button>
              <Link
                href={"#"}
                className="flex items-center gap-3 justify-center group hover:bg-primary/80 hover:text-secondary text-2xl border border-primary text-primary mt-6 px-4 py-2 rounded-lg"
              >
                Connect On Socials
                <Facebook className="size-6 text-primary group-hover:text-secondary" />
                <Instagram className="size-6 text-primary group-hover:text-secondary" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
