"use client";
import {
    Briefcase,
    Calendar,
    ClipboardCheck,
    ClipboardList,
    CreditCard,
    LayoutDashboard,
    UserCircle,
    UserCog,
    Users
} from "lucide-react";
import { useEffect, useState } from "react";

export interface MenuItem {
  title: string;
  url: string;
  icon: React.ComponentType<any>;
}

export const menuItems: Record<string, MenuItem[]> = {
  admin: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Clients",
      url: "/dashboard/clients",
      icon: Users,
    },
    {
      title: "Staff",
      url: "/dashboard/staff",
      icon: UserCog,
    },
    {
      title: "Services",
      url: "/dashboard/services",
      icon: Briefcase,
    },
    {
      title: "Payments",
      url: "/dashboard/payments",
      icon: CreditCard,
    },
    {
      title: "Quality Control",
      url: "/dashboard/quality-control",
      icon: ClipboardCheck,
    },
    {
      title: "Referral",
      url: "/dashboard/referral",
      icon: Users,
    },
  ],
  provider: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Schedule",
      url: "/dashboard/schedule",
      icon: Calendar,
    },
    {
      title: "My Services",
      url: "/dashboard/my-services",
      icon: ClipboardList,
    },
    {
      title: "Profile",
      url: "/dashboard/profile",
      icon: UserCircle,
    },
  ],
  user: [],
};

export const useUserRole = () => {
  const [role, setRole] = useState<string>("admin");

  useEffect(() => {
    // Load role from localStorage on client side
    const savedRole = localStorage.getItem("userRole");
    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  const setUserRole = (newRole: string) => {
    setRole(newRole);
    localStorage.setItem("userRole", newRole);
  };

  return { role, setUserRole };
};

// Default role fallback
export const getDefaultRole = (): string => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("userRole") || "admin";
  }
  return "admin";
};
