"use client";

import ServicesItem from "./services-item";

import { ServiceItem } from "@/config/Types/types";
import LoadingSpinner from "@/lib/loading-spinner";
import { useGetServiceQuery } from "@/redux/features/service/serviceApis";

export default function ServicesPage() {
  const { data, isLoading } = useGetServiceQuery(undefined);
  const servicesData = data?.data;
  console.log(servicesData);

  return (
    <main>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {servicesData?.map((service: ServiceItem, index: number) => (
            <ServicesItem
              key={service?._id}
              service={service}
              imagePosition={index % 2 === 0 ? "left" : "right"}
            />
          ))}
        </>
      )}
    </main>
  );
}
