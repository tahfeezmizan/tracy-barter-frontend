import Header from "@/components/header";
import HeroSection from "@/components/modules/hero";
import ServiceSection from "@/components/modules/service";

export default function Page() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <ServiceSection />
    </div>
  );
}
