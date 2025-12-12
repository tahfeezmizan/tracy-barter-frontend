"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PricingPlanType } from "@/config/Types/types";

import LoadingSpinner from "@/lib/loading-spinner";
import { useGetPricingPlansQuery } from "@/redux/features/pricing/pricingApis";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PricingPlan() {
  const pathname = usePathname();

  const { data, isLoading } = useGetPricingPlansQuery(undefined);

  // console.log(data);

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

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {data?.map((plan: PricingPlanType) => (
              <Card
                key={plan._id}
                className="border border-primary/70 transition-all duration-300 flex flex-col bg-white rounded-2xl overflow-hidden "
              >
                <CardHeader className="flex flex-col h-full justify-between">
                  <div className="flex flex-col items-center justify-center w-full border-b pb-3">
                    <CardTitle className="text-2xl font-semibold text-black mb-3 p-0">
                      {plan.title}
                    </CardTitle>

                    <div className="flex gap-4 items-center justify-center">
                      <span className="text-3xl font-bold text-neutral-900">
                        {plan.price}
                      </span>
                      <span className="text-neutral-600 text-lg">
                        / {plan.paymentType}
                      </span>
                    </div>
                  </div>

                  <div className="w-full">
                    <CardDescription className="text-lg text-center text-neutral-600 leading-relaxed my-6 p-0 whitespace-pre-line">
                      {plan.description}
                    </CardDescription>
                    <CardDescription className="text-lg text-neutral-600 leading-relaxed text-start my-6 p-0 whitespace-pre-line">
                      {/* {plan.features.join("\n")}
                       */}
                      {plan.features.map((item, index) => (
                        <div key={index}>
                          {index + 1}. {item}
                        </div>
                      ))}
                    </CardDescription>
                  </div>

                  <Link href={"/"} className="w-full">
                    <Button
                      variant="outline"
                      className="border border-primary text-primary hover:bg-primary/15 font-semibold text-2xl py-6 rounded-xl transition-all duration-300"
                    >
                      Get started
                    </Button>
                  </Link>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}

        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
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
        </div> */}
      </div>
    </div>
  );
}
