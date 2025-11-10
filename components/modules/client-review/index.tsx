"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Service {
  id: number;
  title: string;
  review: string;
  image: string;
}

const services: Service[] = [
  {
    id: 1,
    title: "It was a very good experience",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim arcu. Elementum felis magna pretium in tincidunt. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu.",
    image:
      "https://images.pexels.com/photos/4099468/pexels-photo-4099468.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 2,
    title: "It was a very good experience",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim arcu. Elementum felis magna pretium in tincidunt. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu.",
    image:
      "https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 3,
    title: "It was a very good experience",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim arcu. Elementum felis magna pretium in tincidunt. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu.",
    image:
      "https://images.pexels.com/photos/1738986/pexels-photo-1738986.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 4,
    title: "It was a very good experience",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim arcu. Elementum felis magna pretium in tincidunt. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu.",
    image:
      "https://images.pexels.com/photos/7640443/pexels-photo-7640443.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 5,
    title: "It was a very good experience",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim arcu. Elementum felis magna pretium in tincidunt. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu.",
    image:
      "https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export default function ClientReview() {
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
    <div className="overflow-hidden bg-secondary py-16 md:px-4 pr-4 lg:px-8">
      <div className="max-w-7xl mx-auto pl-4 lg:px-4 overflow-hidden">
        <h1 className="text-4xl md:text-5xl text-white text-center font-bold mb-9">
          What Our Clients <br className="lg:hidden" /> Say About Us
        </h1>

        <div className="flex gap-2 justify-center items-stretch px-0 lg:px-12">
          {visibleCards.map((service, idx) => {
            const isCenter = idx === 2;
            const isEdge = idx === 0 || idx === 4;

            return (
              <Card
                key={`${service.id}-${idx}`}
                className={`
                      flex items-center justify-center transition-all duration-500 ease-out p-0
                      ${
                        isCenter
                          ? "scale-100 z-10 w-full md:!w-[500px] md:h-96 h-auto"
                          : "scale-75 "
                      }
                      ${isEdge ? "hidden lg:block" : ""}
                      ${idx === 1 || idx === 3 ? "hidden sm:block" : ""}
                      md:h-96 lg:h-auto shrink-0 w-full sm:w-[280px] lg:w-[400px] hover:shadow-xl bg-white rounded-3xl overflow-hidden
                    `}
              >
                <CardContent className="p-5">
                  <div className="relative flex items-center gap-4 mb-4">
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={400}
                      height={400}
                      className="w-12 h-12 object-center rounded-full"
                    />
                    <div className="flex-1">
                      <h4 className="text-lg font-bold">Tracy Barter</h4>
                      <div className="flex items-center justify-between">
                        <p className="">Founder & Realtor</p>
                        <p className="">⭐⭐⭐⭐⭐</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl sm:text-2xl font-bold text-neutral-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-base text-neutral-600 leading-relaxed">
                      {service.review}
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
          className="h-12 w-12 rounded-full bg-white text-secondary"
        >
          <ChevronLeft className="size-7" />
        </Button>
        {services.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`
                transition-all duration-300 rounded-full bg-white
                ${index === currentIndex ? "w-12 h-3 " : "w-3 h-3"}
              `}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
        <Button
          onClick={nextSlide}
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full bg-white text-secondary"
        >
          <ChevronRight className="size-7" />
        </Button>
      </div>
    </div>
  );
}
