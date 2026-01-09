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
  console.log(servicesData);

  return (
    <main>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {servicesData?.map((service: Service, index: number) => (
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
