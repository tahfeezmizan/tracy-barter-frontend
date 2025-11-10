import Footer from "@/components/footer/footer";
import Header from "@/components/header";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
