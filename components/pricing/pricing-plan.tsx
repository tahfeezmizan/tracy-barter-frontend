"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

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
    description: `No monthly fee

Book what you need, when you need it.
Availability not promised.

Perfect for one-off help or first-time tryouts`,
    price: "$150",
    period: "Per visit",
    cta: "Book Now",
  },
  {
    name: "Concierge Essential",
    description: `Ideal for owners who visit occasionally and want reliable monthly touchpoints.

You can use sessions for:
1. Wellness Home Checks with photos (temp glance)
2. Vendor coordination/meet-ups (plumber, HVAC, deliveries)
3. Smart, Stocked Kitchen pickup & put-away (COGS extra)
4. Mail/package handling and plant care`,
    price: "$250",
    period: "/ month",
    cta: "Get started",
  },
  {
    name: "Concierge Tailor",
    description: `More touchpoints, faster turnaround—great for hands-off owners.

You can use sessions for:
1. Everything in Essential, plus:
2. Proactive seasonal checklists and reminders
3. Key/lockbox management & access notes kept on file`,
    price: "$400",
    period: "/ month",
    cta: "Get started",
  },
  {
    name: "Concierge Club (Unlimited)",
    description: `White-glove support for families who never want to think about logistics.

You can use sessions for:
1. Everything in Essential, plus:
2. Unlimited sessions for ongoing punch-lists
3. Storm/emergency visual check-ins when safe and accessible
4. Quarterly home overview summary with recommendations`,
    price: "$550",
    period: "/ month",
    cta: "Get started",
  },
];

export default function PricingPlan() {
  const pathname = usePathname();

  return (
    <div className="bg-white py-32 px-4 sm:px-6 lg:px-8 faq-gradient-bg">
      <div className="max-w-7xl mx-auto px-4">
        {pathname === "/" && (
          <div className="text-center mb-8 md:mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-3 md:mb-5">
              Pricing
            </h1>
            <p className="text-xl md:text-2xl text-neutral-700 max-w-3xl mx-auto leading-relaxed">
              Flexible plans that fit your needs—from occasional help to
              full-service care.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {plans.map((plan, idx) => (
            <Card
              key={idx}
              className="border border-primary/70 transition-all duration-300 flex flex-col bg-white rounded-2xl overflow-hidden "
            >
              <CardHeader className="flex flex-col h-full justify-between">
                <div className="flex flex-col items-center justify-center w-full border-b pb-3">
                  <CardTitle className="text-2xl font-semibold text-black mb-3 p-0">
                    {plan.name}
                  </CardTitle>

                  <div className="flex gap-4 items-center justify-center">
                    <span className="text-3xl font-bold text-neutral-900">
                      {plan.price}
                    </span>
                    <span className="text-neutral-600 text-lg">
                      {plan.period}
                    </span>
                  </div>
                </div>

                <div className="w-full">
                  <CardDescription className="text-lg text-neutral-600 leading-relaxed text-start my-6 p-0 whitespace-pre-line">
                    {plan.description}
                  </CardDescription>
                </div>

                <div className="w-full">
                  <Button
                    variant="outline"
                    className="border border-primary text-primary hover:bg-primary/15 font-semibold text-2xl py-6 rounded-xl transition-all duration-300"
                  >
                    {plan.cta}
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
