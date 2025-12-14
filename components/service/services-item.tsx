"use client";

import { ServiceItem } from "@/config/Types/types";
import { getImageUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function ServicesItem({ service, imagePosition }: ServiceItem) {
  return (
    <section
      style={{
        background: `linear-gradient(to top, #fbf8f0 92%, #f0f1f5ad 80%)`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-10 lg:py-24 lg:pb-36">
        <div
          className={`flex flex-col ${
            imagePosition === "right" ? "flex-row-reverse" : "flex-row"
          } items-center justify-between gap-10`}
        >
          <div className="flex-1 w-full md:w-[550px] h-auto md:h-[600px] overflow-hidden">
            <Image
              src={getImageUrl(service?.image)}
              alt={service?.name}
              width={1000}
              height={1000}
              className="rounded-xl object-cover w-full h-full"
            />
          </div>

          <div className="flex-1">
            <h3 className="text-4xl font-medium text-primary mb-2 md:mb-4">
              {service?.name}
            </h3>
            <p className="text-lg text-gray-500">{service?.description}</p>

            <div className="my-6 md:my-8">
              <h4 className="text-2xl font-medium text-primary">What we do:</h4>
              <ul className="mt-4 list-disc list-inside text-gray-500 space-y-1">
                {service?.servicesProvided?.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="pb-2 lg:pb-12">
              <h4 className="text-2xl font-medium text-primary mb-2.5 md:mb-4">
                When to book:
              </h4>
              <ul className="mt-4 list-disc list-inside text-gray-500 space-y-1">
                {service?.occasions?.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <Link
              href={"#"}
              className="text-2xl text-white mt-6 px-4 py-2 bg-secondary rounded-lg hover:bg-secondary/80 inline-block"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
