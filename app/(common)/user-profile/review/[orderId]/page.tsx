/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { 
  Star, 
  StarHalf, 
  Upload, 
  X, 
  Image as ImageIcon,
  MessageSquare,
  User
} from "lucide-react";
import Review from "@/components/review/Review";

const Page = () => {


  return (
     <div className="overflow-hidden max-w-7xl pt-24 lg:pt-16 mx-auto">
      <Review/>

    </div>
  );
};

export default Page;