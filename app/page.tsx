import Header from "@/components/header";
import AboutTracy from "@/components/modules/about-tracy";
import ClientReview from "@/components/modules/client-review";
import GroceryAssistant from "@/components/modules/grocery-assistant";
import HeroSection from "@/components/modules/hero";
import ServiceSection from "@/components/modules/service";
import PricingPlan from "@/components/pricing/pricing-plan";

export default function Page() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <ServiceSection />
      <GroceryAssistant />
      <AboutTracy />
      <PricingPlan />
      <ClientReview />
    </div>
  );
}
