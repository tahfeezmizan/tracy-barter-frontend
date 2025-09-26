"use client";
import React, { useEffect, useState } from "react";
import NavMenu from "./navmenu";

export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      <div
        className={`transition-all ease-in-out duration-300 z-50 ${
          isSticky ? "fixed top-0 left-0 w-full shadow-md bg-white" : "relative"
        }`}
      >
        <NavMenu />
      </div>
    </div>
  );
}
