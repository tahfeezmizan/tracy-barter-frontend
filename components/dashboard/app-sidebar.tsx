"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { menuItems } from "@/config/menuConfig";
import { useGetStaffProfileQuery } from "@/redux/features/staffdashboard/staffStatsApis";
import { removeUser, selectUserRole } from "@/redux/slice/userSlice";
import Cookies from "js-cookie";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "../ui/badge";

export function AppSidebar() {
  const dispatch = useDispatch();
  const role = useSelector(selectUserRole);
  const pathname = usePathname();
  const items = menuItems[role];
  const router = useRouter();
  const [token, setToken] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  const { data } = useGetStaffProfileQuery(undefined);
  const user = data?.data;

  console.log("Staff profile", data);

  useEffect(() => {
    setToken(!!Cookies.get("token"));
    setMounted(true);
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    dispatch(removeUser());
    setToken(false); // instant UI update
    router.push("/");
  };

  if (!mounted || !role) {
    return null;
  }

  return (
    <Sidebar className="border-none flex flex-col h-screen px-4 overflow-hidden">
      <div className="bg-[#0F233F] flex flex-col h-full">
        {/* Fixed Logo Section */}
        <div className="pt-3 mb-5 flex justify-center shrink-0">
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

        <div className="text-white mb-8 ">
          <Image
            src={
              user?.profile ||
              "https://scontent.fdac207-1.fna.fbcdn.net/v/t39.30808-6/571188182_10107312777622138_146878389789160457_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=MsKx_yNEBQMQ7kNvwHvDLCx&_nc_oc=Ado2dGIln1GuRWhxXfeMkOJK7ID3zFQIH0G8CFbLugZihscK4Wd4qwjvLj-jTfqFMfc&_nc_zt=23&_nc_ht=scontent.fdac207-1.fna&_nc_gid=TNfu6H99rhC5N_BNFqYE_g&_nc_ss=7b2a8&oh=00_Af6mSdUoQdlIxPATTCp8I9mwYDzcUiFnkOElgngibvUlZw&oe=69FEEC01"
            }
            alt="User Profile"
            width={200}
            height={200}
            className="w-16 h-16 rounded-lg mb-2"
          />
          <p className="text-xl font-semibold capitalize ">{user?.name}</p>
          <p className="text-sm my-1">{user?.email}</p>
          <Badge className="bg-blue-100 text-blue-700 font-semibold border-blue-200 capitalize ">
            {user?.role}
          </Badge>
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
              <SidebarMenu className="gap-2">
                {items?.map((item) => (
                  <SidebarMenuItem
                    key={item.title}
                    className={`relative p-2 px-4 transition-colors rounded-xl  ${
                      (
                        item.url === "/dashboard"
                          ? pathname === "/dashboard" ||
                            (pathname.startsWith("/dashboard/") &&
                              !items.some(
                                (i) =>
                                  i.url !== "/dashboard" &&
                                  pathname.startsWith(i.url),
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
                        <item.icon className="size-6!" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="mb-6 px-0">
          <div
            onClick={handleLogout}
            className="flex items-center justify-start gap-4 px-4 py-2 font-medium text-white rounded-xl hover:bg-primary hover:text-red-500 cursor-pointer"
          >
            <LogOut />
            Logout
          </div>
        </SidebarFooter>
      </div>
    </Sidebar>
  );
}
