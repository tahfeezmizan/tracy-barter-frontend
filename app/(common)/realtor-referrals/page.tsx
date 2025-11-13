import { ReferralProgramWorks } from "@/components/realtor-referrals/referral-program-works";
import ReferralsHero from "@/components/realtor-referrals/referrals-hero";
import { WhyPartnerSection } from "@/components/realtor-referrals/why-partner-section";

export default function page() {
  return (
    <div>
      <ReferralsHero />
      <ReferralProgramWorks />
      <WhyPartnerSection />
    </div>
  );
}
