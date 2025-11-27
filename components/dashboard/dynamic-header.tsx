"use client";

import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { usePathname } from "next/navigation";

export default function DynamicHeader() {
  const pathname = usePathname();

  console.log(pathname);
  return (
    <div className="mb-6 flex items-center gap-2">
      <SidebarTrigger className="lg:hidden " />
      <div className="border-l pl-3 lg:border-l-0 lg:pl-0">
        <h3 className="text-xl md:text-2xl font-semibold leading-snug">
          Admin Dashboard
        </h3>
        <p className="text-base md:text-xl text-slate-300">
          Overview of your concierge business
        </p>
      </div>
    </div>
  );
}
