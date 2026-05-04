import { TermsAndConditionsPage } from "@/components/terms-conditions/terms-conditions";
import TermsConditionsHero from "@/components/terms-conditions/terms-conditions-hero";

export default function page() {
  return (
    <div>
      <TermsConditionsHero />
      <TermsAndConditionsPage />
    </div>
  );
}
