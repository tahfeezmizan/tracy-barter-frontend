import { PricingComparison } from "@/components/pricing/pricing-comparison";
import PricingHero from "@/components/pricing/pricing-hero";
import PricingPlan from "@/components/pricing/pricing-plan";
import React from "react";

export default function page() {
  return (
    <div>
      <PricingHero />
      <PricingPlan />
      <PricingComparison />
    </div>
  );
}
