"use client";

import ServicesItem from "./services-item";

import LoadingSpinner from "@/lib/loading-spinner";
import { Service } from "@/lib/types/service.types";
import {
  useGetServiceHomeQuery
} from "@/redux/features/service/serviceApis";

export default function ServicesPage() {
  const { data, isLoading } = useGetServiceHomeQuery(undefined);
  const servicesData = data?.data;
  console.log("servicesData",servicesData);

  return (
    <main>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {servicesData && servicesData.length > 0 ? (
            servicesData.map((service: Service, index: number) => (
              <ServicesItem
                key={service?._id}
                service={service}
                imagePosition={index % 2 === 0 ? "left" : "right"}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-lg font-semibold text-neutral-700">No services available</p>
              <p className="text-sm text-neutral-500 mt-2">Please check back later for new services.</p>
            </div>
          )}
        </>
      )}
    </main>
  );
}
