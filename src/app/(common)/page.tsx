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

        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-600 h-64 rounded-lg"></div>
                </div>
              ))
            ) : transformedTalents && transformedTalents.length > 0 ? (
              transformedTalents.map((talent: any) => (
                <TalentCards key={talent.id} talent={talent} />
              ))
            ) : (
              <div className="col-span-2 text-center py-12">
                <div className="text-gray-500 text-lg mb-2">
                  No talents found matching your criteria
                </div>
                <p className="text-gray-400">
                  Try adjusting your filters or search terms
                </p>
              </div>
            )}
          </div> */}
      </div>
    </div>
  );
}
