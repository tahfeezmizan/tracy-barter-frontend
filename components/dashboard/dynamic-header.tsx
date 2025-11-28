"use client";
import Link from "next/link";
import { ElementType } from "react";
import { SidebarTrigger } from "../ui/sidebar";

interface headerType {
  title: string;
  des: string;
  button?: string;
  link?: string;
  icon?: ElementType; // icon component
}

export default function DynamicHeader({
  title,
  des,
  button,
  link,
  icon: Icon,
}: headerType) {
  return (
    <div className="mb-6 flex items-center justify-between gap-2">
      <div>
        <SidebarTrigger className="lg:hidden" />
        <div className="border-l pl-3 lg:border-l-0 lg:pl-0">
          <h3 className="text-xl md:text-2xl font-semibold leading-snug capitalize">
            {title || "Dashboard"}
          </h3>
          <p className="text-base md:text-xl text-slate-300">
            {des || "Overview of your concierge business"}
          </p>
        </div>
      </div>

      {button && link && (
        <Link
          href={link}
          className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 flex items-center gap-2"
        >
          {Icon && <Icon className="text-white size-6" />}
          {button}
        </Link>
      )}
    </div>
  );
}
