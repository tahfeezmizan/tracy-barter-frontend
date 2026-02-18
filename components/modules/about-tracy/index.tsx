"use client";

import { Button } from "@/components/ui/button";
import { BookmarkMinus, Facebook, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
            <h2 className="text-3xl md:text-4xl text-black font-bold leading-tight tracking-tight ">
              Tracy Barter
            </h2>
            <Button className="p-2.5 bg-primary/60 text-secondary text-base font-medium rounded-full my-3">
              Founder & Realtor®
            </Button>
            <p className="text-lg md:text-xl leading-snug text-secondary ">

With over two decades of experience in real estate, Tracy Barter has built her career on exceptional
service, trusted relationships, and a deep love for helping clients feel at home in Happy Valley. As the
founder of Happy Valley Home Concierge, Tracy combines her industry expertise with a genuine
passion for simplifying homeownership offering clients peace of mind through thoughtful,
personalized care. <br />
When she's not serving her clients or managing the concierge team, you'll find Tracy spending time
with her husband and 7 children, cheering on her kids at local sporting events, or enjoying the
outdoors. A former Division I volleyball player, she brings the same energy, dedication, and teamwork
to her business that she once brought to the court. <br />
I'll need to learn how to update this section as I hire more employees in the future.
            </p>
            <div className="flex flex-col md:flex-row gap-1  md:gap-5">
              <Link href="tel:8148835114"  >

              <Button                        
              className="flex items-center gap-3 justify-center group hover:bg-primary/80 hover:text-secondary bg-secondary text-2xl text-white mt-6 py-6 ">
                
                <BookmarkMinus className="size-6 text-primary group-hover:text-secondary" />

                Contact Tracy
              </Button>
                </Link>
              <Link
                href={"https://www.instagram.com/happyvalleyconcierge"}
                target="_blank"
                className="flex items-center gap-3 justify-center font-medium group hover:bg-primary/80 hover:text-secondary text-2xl border border-primary text-primary mt-6 px-4 py-2 rounded-lg"
              >
                Connect On Socials
                <Link href={"https://www.facebook.com/happyvalleyconcierge"} target="_blank">
                <Facebook className="size-6 text-primary group-hover:text-secondary" />
                </Link>
                <Link href={"https://www.instagram.com/happyvalleyconcierge"} target="_blank">
                <Instagram className="size-6 text-primary group-hover:text-secondary" />
                </Link>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
