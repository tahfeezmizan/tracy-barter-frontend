"use client";

import trancy from "@/assets/about-tracy.png";
import nicole from "@/assets/Nicole Hoover.webp";
import { Card, CardContent } from "@/components/ui/card";
import { CircleUserRound } from "lucide-react";
import Image from "next/image";

const teamMembers = [
  {
    _id: "1",
    name: "Tracy Barter",
    role: "Founder & Realtor®",
    image: trancy,
  },
  {
    _id: "2",
    name: "Nicole Hoover",
    role: "Senior Realtor",
    image: nicole,
  },
  {
    _id: "3",
    name: "Ava Smith",
    role: "Realtor",
    image: trancy,
  },
  {
    _id: "4",
    name: "Cali Barter Hoover",
    role: "Realtor & Concierge Specialist",
    image: nicole,
  },
];

export default function OurTeam() {
  return (
    <div className="bg-white py-16 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
            Meet Our Team
          </h2>
          <p className="text-base md:text-lg text-neutral-600 mt-2">
            Professionals dedicated to making your experience seamless
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers?.map((member) => (
            <Card
              key={member._id}
              className="transition-all duration-500 ease-out hover:shadow-xl rounded-3xl overflow-hidden p-0"
            >
              <CardContent className="p-3 text-center">
                <div className="relative">
                  {member.image ? (
                    <Image
                      src={member?.image}
                      alt={member.name}
                      width={400}
                      height={400}
                      className="w-full rounded-2xl h-96 object-cover transition-transform duration-500 overflow-hidden"
                    />
                  ) : (
                    <div className="w-full h-96 rounded-2xl bg-gray-200 flex items-center justify-center">
                      <CircleUserRound className="text-gray-400 size-24" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-2xl sm:text-2xl font-bold text-neutral-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-600">
                    {member.role}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
