"use client";

import AdminDash from "@/components/dashboard/dash-home/admin-dash";
import ProviderDash from "@/components/dashboard/dash-home/provider-dash";
import { useEffect, useState } from "react";

const Page = () => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole") || "admin";
    setRole(storedRole);
  }, []);

  if (!role) return null;

  return <>{role === "admin" ? <AdminDash /> : <ProviderDash />}</>;
};

export default Page;
