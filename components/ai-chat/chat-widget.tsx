"use client";

import { MessageCircle } from "lucide-react";
import Link from "next/link";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useRef, useState } from "react";

export function ChatWidget() {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Set scrolling state to true
      setIsScrolling(true);

      // Close tooltip immediately when scrolling starts
      setIsTooltipOpen(false);

      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set a timeout to mark scrolling as ended after scrolling stops
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150); // Adjust this value for sensitivity (150ms after scroll stops)
    };

    // Show tooltip after 3 seconds only if not scrolling
    const showTooltipTimer = setTimeout(() => {
      if (!isScrolling) {
        setIsTooltipOpen(true);

        // Auto-hide after 5 seconds
        const hideTimer = setTimeout(() => {
          setIsTooltipOpen(false);
        }, 5000);

        return () => clearTimeout(hideTimer);
      }
    }, 2000);

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(showTooltipTimer);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolling]);

  // Handle mouse enter - only open if not scrolling
  const handleMouseEnter = () => {
    if (!isScrolling) {
      setIsTooltipOpen(true);
    }
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    setIsTooltipOpen(false);
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div className="fixed bottom-6 right-6 z-50">
        <Tooltip open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
          <TooltipTrigger asChild>
            <Link
              href="https://wa.me/447883156028"
              target="_blank"
              rel="noopener noreferrer"
              className="
                block
                bg-white rounded-full p-2
                animate-float
                hover:scale-110 hover:rotate-6
                transition-transform duration-500
              "
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >              
              <MessageCircle
                className="
                  size-8
                  animate-pulse          
                  drop-shadow-lg
                  cursor-pointer
                "
              />
            </Link>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            className="text-2xl bg-primary text-white px-4 py-2"
          >
            <p className="font-medium">Need Help?</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
