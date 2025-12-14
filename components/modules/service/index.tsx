"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ServiceItem } from "@/config/Types/types";
import LoadingSpinner from "@/lib/loading-spinner";
import { getImageUrl } from "@/lib/utils";
import { useGetServiceQuery } from "@/redux/features/service/serviceApis";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function ServiceSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data, isLoading } = useGetServiceQuery(undefined);
  const servicesCards = data?.data || [];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % servicesCards.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + servicesCards.length) % servicesCards.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < 5; i++) {
      const index = (currentIndex + i) % servicesCards.length;
      cards.push(servicesCards[index]);
    }
    return cards;
  };

  const visibleCards = getVisibleCards();

  // console.log(servicesCards);

  return (
    <div className="overflow-hidden bg-white py-12 lg:py-16 md:px-4 pr-4 lg:px-8">
      <div className="max-w-full mx-auto ">
        <div className="text-center mb-10 lg:mb-16 text-black">
          <h1 className="text-3xl font-bold  mb-3">Service Highlights</h1>
          <p className="text-lg w-full md:max-w-80 mx-auto px-8 md:px-0">
            Everything you need to keep your home ready for arrival whenever you
            need it.
          </p>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="flex gap-4 sm:gap-6 justify-center items-stretch pl-4 md:px-4 lg:px-12">
            {visibleCards?.map((service: ServiceItem, idx: number) => {
              const isCenter = idx === 2;
              const isEdge = idx === 0 || idx === 4;

              return (
                <Card
                  key={`${service._id}-${idx}`}
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
                        src={getImageUrl(service?.image)}
                        alt={service?.name}
                        width={400}
                        height={400}
                        className="w-full rounded-2xl h-80 object-cover transition-transform duration-500 overflow-hidden"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl sm:text-2xl font-bold text-neutral-900 mb-2">
                        {service?.name}
                      </h3>
                      <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                        {service?.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex justify-center items-center gap-3 mt-12">
        <Button
          onClick={prevSlide}
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full bg-primary hover:bg-primary/95 border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-white"
        >
          <ChevronLeft className="size-7" />
        </Button>
        {servicesCards.map(
          ({ _, index }: { _: ServiceItem; index: number }) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`
                transition-all duration-300 rounded-full
                ${
                  index === currentIndex
                    ? "w-12 h-3 bg-secondary"
                    : "w-3 h-3 bg-neutral-400"
                }
              `}
              aria-label={`Go to slide ${index + 1}`}
            />
          )
        )}
        <Button
          onClick={nextSlide}
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full bg-primary hover:bg-primary/95 border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-white"
        >
          <ChevronRight className="size-7" />
        </Button>
      </div>
    </div>
  );
}
