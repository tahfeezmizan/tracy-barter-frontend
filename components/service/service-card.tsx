"use client";

import { Service } from "@/lib/types/service.types";
import { getImageUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "@/redux/slice/userSlice";

interface ServicesItemProps {
  service: Service;
}

export default function ServicesItem({ service }: ServicesItemProps) {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const href =
    service?.name === "Grocery Restock"
      ? "/shopping-with-ai"
      : `/service/${service?._id}`;

  const linkHref = isLoggedIn
    ? href
    : `/signin?callbackUrl=${encodeURIComponent(href)}`;

  return (
    <section className="border border-yellow-500 bg-[#fefce894] rounded-lg p-6 flex items-center justify-center">
      <div className=" space-y-8 text-center">
        {/* <Image
          src={getImageUrl(service?.image)}
          alt={service?.name}
          width={600}
          height={400}
          className="rounded-xl object-cover w-full"
        /> */}

        <h3 className="text-2xl font-medium text-primary">{service?.name}</h3>

        <Link
          href={linkHref}
          className="text-white px-6 py-3 bg-secondary rounded-lg hover:bg-secondary/80"
        >
          Book Now
        </Link>
      </div>
    </section>
  );
}
