// import React from "react";

export interface ReferralStep {
  stepNumber: number;
  title: string;
  description: string;
}

const defaultSteps: ReferralStep[] = [
  {
    stepNumber: 1,
    title: "Send Us a Client",
    description:
      "Fill out the form on the bottom of this page to connect us with one of your clients.",
  },
  {
    stepNumber: 2,
    title: "We Reach Out",
    description:
      "We will touch base with your client, walk them through our sales process, and answer any questions.",
  },
  {
    stepNumber: 3,
    title: "We Pay You",
    description:
      "We’ll send you a gift card to a Happy Valley restaurant of your choice!",
  },
];

export function ReferralProgramWorks() {
  return (
    <section className="bg-white py-10 lg:py-20 pb-16 lg:pb-28">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <h2 className="text-4xl font-medium text-center text-primary mb-16">
          How Our Referral Program Works
        </h2>

        {/* Steps container with connecting line */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-8 left-0 right-0 h-1 hidden md:block" />

          {/* Steps grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            {defaultSteps.map((step) => (
              <div
                key={step?.stepNumber}
                className="relative text-center rounded-xl p-6 transition-all border border-gray-200 bg-white mb-4 lg:mb-0"
              >
                {/* Step number circle */}
                <div className="absolute -top-6 left-6 w-14 h-14 bg-slate-900 rounded-full flex items-center justify-center ">
                  <span className="text-2xl font-medium text-primary">
                    0{step?.stepNumber}
                  </span>
                </div>

                {/* Content */}
                <div className="mt-3">
                  <h3 className="text-3xl font-medium text-primary mb-4">
                    {step.title}
                  </h3>
                  <p className="text-xl text-secondary leading-tight">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
