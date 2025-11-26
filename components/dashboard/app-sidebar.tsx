"use client";
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { menuItems, useUserRole } from "@/config/menuConfig";

export function AppSidebar() {
  const pathname = usePathname();
  const { role } = useUserRole();
  const items = menuItems[role];

  return (
    <Sidebar className="border-none flex flex-col h-screen px-6">
      <div className="bg-[#0F233F] flex flex-col h-full">
        {/* Fixed Logo Section */}
        <div className="pt-6 mb-20 flex justify-center shrink-0">
          <Link href="/">
            <Image
              src={require("@/assets/logo.png")}
              alt="Dashboard Logo"
              height={44}
              width={226}
              className="block"
            />
          </Link>
        </div>

        {/* Scrollable Menu */}
        <SidebarContent
          className="flex-1 max-h-[800px] overflow-y-auto p-0 !scrollbar-thin !scrollbar-thumb-[#0096FF] !scrollbar-track-transparent"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#0096FF transparent",
          }}
        >
          <SidebarGroup className="p-0">
            <SidebarGroupContent>
              <SidebarMenu className="gap-4">
                {items?.map((item) => (
                  <SidebarMenuItem
                    key={item.title}
                    className={`relative  p-2 px-4 transition-colors rounded-xl  ${
                      (
                        item.url === "/dashboard"
                          ? pathname === "/dashboard" ||
                            (pathname.startsWith("/dashboard/") &&
                              !items.some(
                                (i) =>
                                  i.url !== "/dashboard" &&
                                  pathname.startsWith(i.url)
                              ))
                          : pathname === item.url
                      )
                        ? "bg-primary text-white hover:text-white before:block"
                        : "text-primary hover:bg-primary hover:text-white before:hidden hover:before:block"
                    }`}
                  >
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className="flex items-center gap-3 hover:text-white p-0! bg-transparent! !hover:bg-transparent focus-visible:shadow-none active:text-white"
                      >
                        <item.icon className="!size-6" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </div>
    </Sidebar>
  );
}
