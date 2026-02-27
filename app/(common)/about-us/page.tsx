import OurMission from "@/components/about-us/our-mission";
import OurTeam from "@/components/about-us/OurTeam";
import AboutTracy from "@/components/modules/about-tracy";


export default function page() {
  return (
    <div className="py-10 md:py-16">
      <AboutTracy />
      <OurMission />
      <OurTeam />
    </div>
  );
}
