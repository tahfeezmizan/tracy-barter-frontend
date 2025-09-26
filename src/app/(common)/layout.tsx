import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/shared/footer";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
