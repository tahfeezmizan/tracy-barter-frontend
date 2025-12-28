"use client";

import Report from "@/components/report/Report";

/**
 * Report Page
 * Allows users to submit reports for specific orders
 *
 * @component
 */
export default function Page() {
  return (
    <div className="overflow-hidden max-w-7xl pt-24 lg:pt-16 mx-auto">
      <Report />
    </div>
  );
}