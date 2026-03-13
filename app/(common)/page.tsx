import AboutTracy from "@/components/modules/about-tracy";
import ClientReview from "@/components/modules/client-review";
import HeroSection from "@/components/modules/hero";
import ServiceSection from "@/components/modules/service";

export default function Page() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ServiceSection />
      <AboutTracy />
      <ClientReview />
    </div>
  );
}
