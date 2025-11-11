"use client";

import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CircleUserRound, LogOut, Menu, User, X } from "lucide-react";
import path from "path";

export default function Header() {
  // Simulate user logged in or not
  const user = true;

  const pathname = usePathname();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Static navigation links
  const navigationLinks = [
    // { href: "/", label: "Home" },
    { href: "/service", label: "Services" },
    { href: "/Pricing", label: "Pricing" },
    { href: "/realtor-referrals", label: "Realtor Referrals" },
    { href: "/terms-conditions", label: "Terms & Conditions" },
  ];

  return (
    <header className="text-accent relative">
      <div
        className={cn(
          "fixed top-0 w-full z-50 transition duration-300 ease-in`",
          pathname === "/" && "lg:top-12 left-0 ",
          pathname === "/" && isScrolled && "bg-primary !top-0 border-b transition duration-300",
          pathname !== "/" && isScrolled &&  "bg-primary"
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
                "hidden lg:flex items-center space-x-2"
                // pathname === "/" ? "text-white" : "text-green-900",
                // pathname === "/" && isScrolled && "text-green-900"
              )}
            >
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-2 text-2xl font-bold"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop Right Side */}
            <div className="hidden lg:flex items-center space-x-4">
              {user ? (
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
                      <Button className="flex items-center space-x-2 p-1 rounded-full hover:bg-white/10 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                          <CircleUserRound className="size-9 text-white" />
                        </div>
                      </Button>
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

                      <DropdownMenuItem className="flex items-center space-x-2 data-[highlighted]:bg-primary data-[highlighted]:text-white cursor-pointer">
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
                    <Link href="/sign-up">Sign in</Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className={cn(
                      "bg-transparent px-4 py-2 text-base  rounded-lg border cursor-pointer text-secondary"
                      // isScrolled && "text-green-900 "
                    )}
                  >
                    <Link href="/" className="font-semibold">
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
                        pathname === "/" && isScrolled && "text-black "
                      )}
                    />
                  ) : (
                    <>
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

                          <DropdownMenuItem className="flex items-center space-x-2 data-[highlighted]:bg-primary data-[highlighted]:text-white cursor-pointer">
                            <LogOut className="h-4 w-4" />
                            <span>Logout</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      <Menu
                        className={cn(
                          "size-9",
                          pathname === "/" ? "text-white" : "text-black",
                          pathname === "/" && isScrolled && "text-black "
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
                      "px-3 py-2 text-base font-semibold transition-colors",
                      pathname === "/" ? "text-white" : "text-black",
                      pathname === "/" && isScrolled && "text-green-900"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}

                {!user && (
                  <div className="flex flex-col space-y-3">
                    <Button
                      asChild
                      className="bg-secondary text-primary hover:bg-secondary/90 px-6 py-2 text-base font-medium rounded-lg cursor-pointer"
                    >
                      <Link href="/sign-up">Sign up</Link>
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      className={cn(
                        "px-6 py-2 text-base text-secondary  font-medium rounded-lg border border-secondary cursor-pointer bg-transparent hover:bg-secondary hover:text-primary duration-300"
                        // pathname === "/"
                        //   ? "border-green-900  text-white hover:bg-white hover:border-white hover:text-black"
                        //   : "border-green-900 text-black hover:bg-green-900 hover:text-white",
                        // pathname === "/" && isScrolled && "text-green-900"
                      )}
                    >
                      <Link href="/login">Login</Link>
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
