import DynamicHeader from "@/components/dashboard/dynamic-header";
import PricingPlan from "@/components/pricing/pricing-plan";

export default function PricingPlansPage() {
  return (
    <div>
        <DynamicHeader
                title={"Pricing Plans"}
                des="Create the right plan for your customers"
              />
      <PricingPlan />
    </div>
  );
}