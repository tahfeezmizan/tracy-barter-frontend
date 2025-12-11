"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    id: "item-1",
    question: "The expense windows adapted sir. Wrong widen drawn. ",
    answer:
      "Offending belonging promotion provision an be oh consulted ourselves it. Blessing welcomed ladyship she met humoured sir breeding her.",
  },
  {
    id: "item-2",
    question: "Six curiosity day assurance bed necessary?",
    answer:
      "Extensive delight say polite cousin she still wonder talent. Introduce of outweigh project arriving conveying so in. She exposed painted before so in multi..",
  },
  {
    id: "item-3",
    question: "Produce say the ten moments parties?",
    answer:
      "Certainty determine at of arranging perceived situation or has he. Afar sympathy sister however spoil simple boy. Inquiry justice country old lady civilly.",
  },
  {
    id: "item-4",
    question: "Simple innate summer fat appear basket his desire joy?",
    answer:
      "Improve him believe opinion offered met and end cheered forbade. Flower demand share every age far advancing her estimable. Repeated as attempted drawing..",
  },
  {
    id: "item-5",
    question: "Outward clothes promise at gravity do excited?",
    answer:
      "Simplicity gay son estimable put piqued daughter settling you his. Up or well must less rent room so. His plenty cannot get folly rooms..",
  },
];

export default function FAQSection() {
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

        <Accordion type="single" collapsible className="space-y-4">
          {faqItems.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
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
      </div>
    </div>
  );
}
