"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, getImageUrl } from "@/lib/utils";
import { useGetStaffProfileQuery } from "@/redux/features/staffdashboard/staffStatsApis";
import { removeUser, selectUserRole } from "@/redux/slice/userSlice";
import Cookies from "js-cookie";
import {
  CircleUserRound,
  LogOut,
  Menu,
  RotateCcwKey,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "../ui/avatar";

export default function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const role = useSelector(selectUserRole);
  const { data } = useGetStaffProfileQuery(undefined);

  console.log("User profile", data);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [token, setToken] = useState<boolean>(false);

  useEffect(() => {
    // setIsMounted(true);
    setToken(!!Cookies.get("token"));
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Static navigation links
  const navigationLinks = [
    // { href: "/", label: "Home" },
    { href: "/service", label: "Services" },
    { href: "/about-us", label: "About Us" },
    { href: "/pricing", label: "Pricing" },
    // { href: "/realtor-referrals", label: "Realtor Referrals" },
    { href: "/terms-conditions", label: "Terms & Conditions" },
  ];

  const handleLogout = () => {
    Cookies.remove("token");
    dispatch(removeUser());
    setToken(false);
    router.push("/");
  };

  return (
    <header className="text-accent relative">
      <div
        className={cn(
          "fixed top-0 w-full z-50 transition duration-300 ease-in`",
          pathname === "/" && "lg:top-12 left-0 ",
          pathname === "/" &&
            isScrolled &&
            "bg-primary top-0! border-b transition duration-300",
          pathname !== "/" && isScrolled && "bg-primary",
        )}
      >
        <div className="max-w-7xl mx-auto px-3 py-1 lg:rounded-lg bg-primary">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Link href={"/"}>
                <Image
                  src={require("@/assets/logo.png")}
                  alt="Logo"
                  width={165}
                  height={40}
                  className="w-40 h-auto"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div
              className={cn(
                "hidden lg:flex items-center space-x-2",
                // pathname === "/" ? "text-white" : "text-green-900",
                // pathname === "/" && isScrolled && "text-green-900"
              )}
            >
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-2 text-2xl font-bold rounded-lg transition-all duration-300 py-1",
                    pathname === link.href && "bg-secondary text-white",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop Right Side */}
            <div className="hidden lg:flex items-center space-x-4">
              {token ? (
                <>
                  {/* <Link
                    href="/messages"
                    className={cn(
                      "p-2 rounded-full hover:bg-white/10 transition-colors",
                      pathname === "/" ? "text-white" : "text-black",
                      pathname === "/" && isScrolled && "text-green-900"
                    )}
                  >
                    <MessageCircle className="h-6 w-6" />
                  </Link> */}

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Avatar className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                        {data?.profile ? (
                          <Image
                            src={getImageUrl(data?.profile)}
                            width={200}
                            height={200}
                            alt={data?.name || "Profile"}
                            className="w-full h-full object-cover rounded-full"
                          />
                        ) : (
                          <User className="h-6 w-6 text-white" />
                        )}
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-48 bg-secondary text-white border-none"
                    >
                      <DropdownMenuItem
                        asChild
                        className="data-highlighted:bg-primary data-highlighted:text-white hover:bg-primary cursor-pointer"
                      >
                        {role === "client" ? (
                          <DropdownMenuItem
                            asChild
                            className=" data-highlighted:bg-primary data-highlighted:text-white hover:bg-primary cursor-pointer"
                          >
                            <Link
                              href="/user-profile"
                              className="flex items-center space-x-2"
                            >
                              <User className="h-4 w-4" />
                              <span>Profile</span>
                            </Link>
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            asChild
                            className="data-highlighted:bg-primary data-highlighted:text-white hover:bg-primary cursor-pointer"
                          >
                            <Link
                              href="/dashboard"
                              className="flex items-center space-x-2"
                            >
                              <User className="h-4 w-4" />
                              Dashboard
                            </Link>
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuItem>

                      {role === "client" && (
                        <div>
                          <DropdownMenuItem
                            asChild
                            className="data-highlighted:bg-primary data-highlighted:text-white hover:bg-primary cursor-pointer"
                          >
                            <Link
                              href="/user-profile/my-order"
                              className="flex items-center space-x-2"
                            >
                              <ShoppingBag className="h-4 w-4" />
                              <span>My Order</span>
                            </Link>
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            asChild
                            className="data-highlighted:bg-primary data-highlighted:text-white hover:bg-primary cursor-pointer"
                          >
                            <Link
                              href="/user-profile/invoice"
                              className="flex items-center space-x-2"
                            >
                              <ShoppingBag className="h-4 w-4" />
                              <span>Invoice</span>
                            </Link>
                          </DropdownMenuItem>
                        </div>
                      )}

                      <DropdownMenuItem
                        asChild
                        className="data-highlighted:bg-primary data-highlighted:text-white hover:bg-primary cursor-pointer"
                      >
                        <Link
                          href="/user-profile/change-password"
                          className="flex items-center space-x-2"
                        >
                          <RotateCcwKey className="h-4 w-4" />
                          <span>Change Password</span>
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="flex items-center space-x-2 data-highlighted:bg-primary data-highlighted:text-white cursor-pointer"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <div className="flex items-center space-x-3">
                  <Button
                    asChild
                    className="bg-secondary hover:bg-secondary/80 text-white px-4 py-2 text-base font-medium rounded-lg cursor-pointer"
                  >
                    <Link href="/signin">Sign in</Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className={cn(
                      "bg-transparent px-4 py-2 text-base  rounded-lg border cursor-pointer text-secondary",
                      // isScrolled && "text-green-900 "
                    )}
                  >
                    <Link href="/signup" className="font-semibold">
                      Get Started
                    </Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <Button
                asChild
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 !bg-transparent"
              >
                <div>
                  {isMobileMenuOpen ? (
                    <X
                      className={cn(
                        "size-9",
                        pathname === "/" ? "text-white" : "text-black",
                        pathname === "/" && isScrolled && "text-black ",
                      )}
                    />
                  ) : (
                    <>
                      {token ? (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="flex items-center space-x-2 p-1 rounded-full hover:bg-white/10 transition-colors">
                              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                                <CircleUserRound className="size-9 text-white" />
                              </div>
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="w-48 bg-secondary text-white border-none"
                          >
                            <DropdownMenuItem
                              asChild
                              className="data-[highlighted]:bg-primary data-[highlighted]:text-white hover:bg-primary cursor-pointer"
                            >
                              <Link
                                href="/profile"
                                className="flex items-center space-x-2"
                              >
                                <User className="h-4 w-4" />
                                <span>Profile</span>
                              </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={handleLogout}
                              className="flex items-center space-x-2 data-[highlighted]:bg-primary data-[highlighted]:text-white cursor-pointer"
                            >
                              <LogOut className="h-4 w-4" />
                              <span>Logout</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      ) : (
                        ""
                      )}
                      <Menu
                        className={cn(
                          "size-9",
                          pathname === "/" ? "text-white" : "text-black",
                          pathname === "/" && isScrolled && "text-black ",
                        )}
                      />
                    </>
                  )}
                </div>
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 py-4">
              <div className="flex flex-col space-y-3">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-3 py-2 text-base font-semibold transition-colors rounded-lg",
                      pathname === "/" ? "text-white" : "text-black",
                      pathname === "/" && isScrolled && "text-green-900",
                      pathname === link.href && "bg-secondary text-white",
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}

                {!token && (
                  <div className="flex flex-col space-y-3">
                    <Button
                      asChild
                      className="bg-secondary text-primary hover:bg-secondary/90 px-6 py-2 text-base font-medium rounded-lg cursor-pointer"
                    >
                      <Link href="/signin">Sign In</Link>
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      className={cn(
                        "px-6 py-2 text-base text-secondary  font-medium rounded-lg border border-secondary cursor-pointer bg-transparent hover:bg-secondary hover:text-primary duration-300",
                      )}
                    >
                      <Link href="/signup">Get Started</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
