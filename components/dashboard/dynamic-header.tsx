"use client";

import React, { useEffect, useState } from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { usePathname } from "next/navigation";

export default function DynamicHeader() {
  const pathname = usePathname();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    setRole(storedRole);
  }, []);

  // Extract clean page name
  const page = pathname.replace("/", "").toLowerCase();

  let title = "";

  if (page === "dashboard") {
    title = `${role ?? ""} Dashboard`;
  } else if (page === "client") {
    title = "Client Management";
  } else if (page === "staff") {
    title = "Staff Management";
  } else {
    // Default: "PageName Management"
    const pretty = page.replace("-", " "); // convert dashes to spaces
    title = `${pretty} Management`;
  }
  return (
    <div className="mb-6 flex items-center gap-2">
      <SidebarTrigger className="lg:hidden " />
      <div className="border-l pl-3 lg:border-l-0 lg:pl-0">
        <h3 className=" text-xl md:text-2xl font-semibold leading-snug capitalize">
          {title}
        </h3>
        <p className="text-base md:text-xl text-slate-300">
          Overview of your concierge business
        </p>
      </div>
    </div>
  );
}
