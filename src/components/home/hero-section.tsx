"use client";
import { Heart, LocateFixed, StarIcon, TruckElectric } from "lucide-react";
import Image from "next/image";
import bannerImg from "@/assets/logo.jpg";
import FlavorImg from "@/assets/logo.jpg";
import man1 from "@/assets/logo.jpg";
import man2 from "@/assets/logo.jpg";
import man3 from "@/assets/logo.jpg";
import increment from "@/assets/logo.jpg";

export default function HeroSection() {
  return (
    <div
      style={{
        backgroundImage: "linear-gradient(135deg, #ffd9c2, #fff4ed)",
        height: "calc(100vh)",
      }}
      className="py-14 lg:py-20"
    >
      <div className="w-auto md:container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-10">
        <div className="flex-1">
          <h2 className="text-4xl md:text-8xl font-rancho text-[#ED6923] leading-14 md:leading-32 ">
            Hungry?
          </h2>
          <h2 className="text-5xl md:text-7xl font-bold font-poppins leading-14 md:leading-24 mb-4 tracking-[-2px]">
            Let Us{" "}
            <span className="text-[#ED6923]">
              Bring <br /> The Feast to You
            </span>
          </h2>
          <p className="text-lg font-poppins mb-7 md:pr-20 lg:pr-0">
            Explore hundreds of delicious options from top restaurants and Enjoy
            fast, reliable delivery right to you.
          </p>

          <div className="flex items-center ">
            <div className="flex items-center justify-between border border-[#ED6923] py-4 px-4 rounded-l-lg w-56 md:w-96 ">
              <input
                type="text"
                placeholder="Enter your location"
                className="border-0 outline-none text-base bg-transparent"
              />
              <span className="hidden md:flex items-center gap-2 text-sm font-poppins text-[#ED6923]">
                <LocateFixed className="text-black " /> Locate me
              </span>
            </div>
            <button className="bg-[#ED6923] text-white text-base md:text-xl font-semibold py-4 md:p-3.5 px-6 border border-[#ED6923] rounded-r-lg">
              Find Food
            </button>
          </div>
        </div>

        <div className="flex-1">
          <div className="relative">
            <div className="absolute hidden md:block bg-white p-5 w-56  rounded-2xl">
              <div className=" flex mb-3">
                <Image
                  src={man1}
                  alt="logo"
                  width={50}
                  height={50}
                  className="w-12 h-12 rounded-full "
                />
                <Image
                  src={man2}
                  alt="logo"
                  width={50}
                  height={50}
                  className="w-12 h-12 -ml-8 z-10 rounded-full border-2 border-white"
                />
                <Image
                  src={man3}
                  alt="logo"
                  width={50}
                  height={50}
                  className="w-12 h-12 -ml-8 z-10 rounded-full border-2 border-white"
                />
                <Image
                  src={increment}
                  alt="logo"
                  width={50}
                  height={50}
                  className="w-12 h-12 -ml-8 z-10 rounded-full border-2 border-gray-100 bg-gray-50"
                />
              </div>
              <h3 className="text-base font-poppins leading-6 pb-1">
                Satisfied Customer
              </h3>
              <p className="flex items-center gap-2">
                <StarIcon className="text-[#F4C700]" /> 5.0 (3K Reviews)
              </p>
            </div>

            <Image
              src={bannerImg}
              alt="logo"
              width={500}
              height={500}
              className="w-[600px] h-auto"
            />

            <div className="absolute -bottom-10 lg:-bottom-8 left-0 flex items-center justify-between bg-white/60 backdrop-blur-xl p-5 w-80  rounded-2xl">
              <div className="">
                <Image
                  src={FlavorImg}
                  alt="logo"
                  width={50}
                  height={50}
                  className="w-28 h-28 rounded-2xl"
                />
              </div>
              <div className="space-y-1 font-poppins ">
                <h3 className="text-base font-semibold font-poppins leading-6">
                  Flavor Fusion Bistro
                </h3>
                <p className="text-[12px] ">Kaliurang, Seleman</p>
                <p className="text-base font-poppins flex items-center gap-1">
                  4.9 <StarIcon className="size-4 " />
                </p>
                <div className="w-7 h-7 mr-auto p-1 flex items-center justify-center overflow-hidden rounded-full border border-gray-300">
                  {" "}
                  <Heart className="text-[#F4C700] " />
                </div>
              </div>
            </div>

            <div className="absolute -bottom-3 right-0 lg:right-20  w-40 px-6 py-4 hidden md:flex items-center justify-between gap-4 bg-white/60 backdrop-blur-xl rounded-2xl">
              <div className="bg-[#F5EAE3] p-2 rounded-full flex items-center justify-center">
                <TruckElectric className="size-8 text-[#ED6923]" />
              </div>
              <div className="space-y-1 font-poppins ">
                <h3 className="text-base font-semibold font-poppins leading-6">
                  F24/7
                </h3>
                <p className="text-base ">Delivery</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
