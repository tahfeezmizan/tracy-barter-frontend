import { ChatWidget } from "@/components/ai-chat/chat-widget";
import Footer from "@/components/footer/footer";
import Header from "@/components/header";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-50">
      <Header />
      
      {children}

      {/* <ChatWidget /> */}
      <Footer />
    </div>
  );
}
