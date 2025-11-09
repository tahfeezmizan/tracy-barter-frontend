"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
}

const services: Service[] = [
  {
    id: 1,
    title: "Cleaning",
    description: "Maintenance, deep cleans, and move-out detailing.",
    image:
      "https://images.pexels.com/photos/4099468/pexels-photo-4099468.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 2,
    title: "Grocery Assistant",
    description: "Scheduled wellness checks while you're away.",
    image:
      "https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 3,
    title: "Event & Stay Prep",
    description: "Guest-ready setup for parties, rentals, or family visits.",
    image:
      "https://images.pexels.com/photos/1738986/pexels-photo-1738986.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 4,
    title: "Occasional Check-Ins",
    description: "Scheduled wellness checks while you're away.",
    image:
      "https://images.pexels.com/photos/7640443/pexels-photo-7640443.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 5,
    title: "Lawn & Landscaping",
    description: "Lawn care, snow removal, and seasonal upkeep.",
    image:
      "https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export default function ServiceSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < 5; i++) {
      const index = (currentIndex + i) % services.length;
      cards.push(services[index]);
    }
    return cards;
  };

  const visibleCards = getVisibleCards();

  return (
    <div className="min-h-screen overflow-hidden bg-white py-16 md:px-4 pr-4 lg:px-8">
      <div className="max-w-full mx-auto ">
        <div className="text-center mb-16 text-black">
          <h1 className="text-3xl font-bold  mb-3">Service Highlights</h1>
          <p className="text-lg sm:text-xl w-full  md:max-w-80 mx-auto">
            Everything you need to keep your home ready for arrival whenever you
            need it.
          </p>
        </div>

        <div className="flex gap-4 sm:gap-6 justify-center items-stretch px-4 lg:px-12">
          {visibleCards.map((service, idx) => {
            const isCenter = idx === 2;
            const isEdge = idx === 0 || idx === 4;

            return (
              <Card
                key={`${service.id}-${idx}`}
                className={`
                      transition-all duration-500 ease-out border-yellow-500 !bg-[#fefce894] p-0
                      ${
                        isCenter
                          ? "scale-100 z-10 !w-full md:!w-96"
                          : "scale-90 "
                      }
                      ${isEdge ? "hidden lg:block" : ""}
                      ${idx === 1 || idx === 3 ? "hidden sm:block" : ""}
                      shrink-0 w-full sm:w-[280px] lg:w-96 hover:shadow-xl bg-white rounded-3xl overflow-hidden
                    `}
              >
                <CardContent className="p-3 text-center">
                  <div className="relative ">
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={400}
                      height={400}
                      className="w-full rounded-2xl h-80 object-cover transition-transform duration-500 overflow-hidden"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl sm:text-2xl font-bold text-neutral-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center items-center gap-3 mt-12">
        <Button
          onClick={prevSlide}
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full bg-primary hover:bg-primary/95 border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-white"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        {services.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`
                transition-all duration-300 rounded-full
                ${
                  index === currentIndex
                    ? "w-12 h-3 bg-neutral-800"
                    : "w-3 h-3 bg-neutral-400 hover:bg-neutral-600"
                }
              `}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
        <Button
          onClick={nextSlide}
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full bg-primary hover:bg-primary/95 border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-white"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
