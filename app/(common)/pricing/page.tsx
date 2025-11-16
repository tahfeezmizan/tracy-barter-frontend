import { PricingComparisonTable } from "@/components/pricing/pricing-comparison-table";
import PricingHero from "@/components/pricing/pricing-hero";
import PricingPlan from "@/components/pricing/pricing-plan";

export default function page() {
  return (
    <div>
      <PricingHero />
      <PricingPlan />
      <PricingComparisonTable />
    </div>
  );
}
