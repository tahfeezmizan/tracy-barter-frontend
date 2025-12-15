"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQTypes } from "@/config/Types/types";
import LoadingSpinner from "@/lib/loading-spinner";
import { useGetFaqQuery } from "@/redux/features/faq/faqApis";
import Image from "next/image";

export default function FAQSection() {
  const { data, isLoading } = useGetFaqQuery(undefined);
  console.log("Faq Data", data);

  return (
    <div className="relative flex items-center overflow-hidden py-16 md:py-32 faq-gradient-bg">
      <div className="hidden lg:block">
        <Image
          src={require("@/assets/abstract-blob.svg")}
          alt="hero"
          width={200}
          height={200}
          className="absolute top-12 -right-34 z-40  w-64 h-6w-64"
        />
        <Image
          src={require("@/assets/spiral.svg")}
          alt="hero"
          width={150}
          height={150}
          className="absolute bottom-9 -left-5 z-40 w-20 h-2w-20"
        />
      </div>
      <div className="max-w-7xl mx-auto px-3 overflow-hidden ">
        <h1 className="text-4xl md:text-5xl font-bold text-black text-center mb-10 md:mb-16">
          Frequently asked questions
        </h1>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Accordion type="single" collapsible className="space-y-4">
            {data?.map((item: FAQTypes) => (
              <AccordionItem
                key={item._id}
                value={item._id}
                className="w-full md:w-3xl lg:w-6xl !border border-neutral-200 rounded-2xl px-3 md:px-6 py-0 md:py-2 hover:border-neutral-300 transition data-[state=open]:border-neutral-300 duration-700"
              >
                <AccordionTrigger className="text-lg md:text-xl font-semibold text-black hover:no-underline py-4 ">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className=" text-neutral-600 pb-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
}
