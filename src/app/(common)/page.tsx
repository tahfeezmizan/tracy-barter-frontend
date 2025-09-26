import HeroSection from "@/components/home/hero-section";

export default function page() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <div
        className="space-y-10 md:space-y-16 pt-20 md:pt-30 "
        style={{
          backgroundImage: "linear-gradient(135deg,  #FFD9C226, #fdd4ba66)",
        }}
      >
        {/* <CategorySlider />
        <PopularFoodSlider />
        <PopularRestaurent />
        <MobileApp />
        <Testimonial /> */}
      </div>
    </div>
  );
}
