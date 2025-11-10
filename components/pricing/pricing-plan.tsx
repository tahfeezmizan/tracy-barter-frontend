import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PricingPlan {
  name: string;
  description: string;
  price: string;
  period: string;
  cta: string;
}

const plans: PricingPlan[] = [
  {
    name: "À-la-carte",
    description:
      "Book what you need, when you need it. Availability not promised.",
    price: "$150",
    period: "Per visit",
    cta: "View detiels",
  },
  {
    name: "Concierge Essential",
    description:
      "Ideal for owners who visit occasionally and want reliable monthly touchpoints.",
    price: "$250",
    period: "/ month",
    cta: "View detiels",
  },
  {
    name: "Concierge Tailor",
    description:
      "More touchpoints, faster turnaround—great for hands-off owners.",
    price: "$400",
    period: "/ month",
    cta: "View detiels",
  },
  {
    name: "Concierge Club (Unlimited)",
    description:
      "White-glove support for families who never want to think about logistics.",
    price: "$550",
    period: "/ month",
    cta: "View detiels",
  },
];

export default function PricingPlan() {
  return (
    <div className="bg-white py-32 px-4 sm:px-6 lg:px-8 faq-gradient-bg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8 md:mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-3 md:mb-5">
            Pricing
          </h1>
          <p className="text-xl md:text-2xl text-neutral-700 max-w-3xl mx-auto leading-relaxed">
            Flexible plans that fit your needs—from occasional help to
            full-service care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {plans.map((plan, idx) => (
            <Card
              key={idx}
              className="border border-primary/70 transition-all duration-300 flex flex-col bg-white rounded-2xl overflow-hidden shadow-none"
            >
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-bold text-black mb-3">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-lg text-neutral-600 leading-relaxed">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <div className="flex flex-col justify-end px-6 gap-3 flex-grow">
                <div className="flex gap-4 items-center justify-center">
                  <span className="text-3xl font-bold text-neutral-900">
                    {plan.price}
                  </span>
                  <span className="text-neutral-600 text-lg">
                    {plan.period}
                  </span>
                </div>

                <Button
                  variant="outline"
                  className="border border-primary text-primary hover:bg-primary/15 font-semibold text-2xl py-6 rounded-xl transition-all duration-300"
                >
                  {plan.cta}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
