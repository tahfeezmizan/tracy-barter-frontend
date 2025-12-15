interface Benefit {
  title: string;
  description: string;
}

interface WhyPartnerSectionProps {
  title?: string;
  benefits?: Benefit[];
}

const defaultBenefits: Benefit[] = [
  {
    title: "Happier clients, stronger reviews",
    description:
      'We solve the "who will take care of it?" problem for second-homeowners.',
  },
  {
    title: "Hands-off for you",
    description: "We manage onboarding, scheduling, and billing.",
  },
  {
    title: "Reliable vendor network",
    description: "Vetted, insured pros; transparent communication.",
  },
  {
    title: "Happier clients, stronger reviews",
    description:
      'We solve the "who will take care of it?" problem for second-homeowners.',
  },
];

export function WhyPartnerSection() {
  return (
    <section className="bg-secondary py-10 lg:py-20 pb-16 lg:pb-28">
      <div className="max-w-7xl mx-auto px-3">
        <h2 className="mb-12 text-center text-3xl font-medium text-primary">
          Why Partner with Us?
        </h2>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:gap-28">
          {defaultBenefits.map((benefit, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center rounded-xl bg-white p-8 text-center w-full lg:w-[430px] h-52 mx-auto"
            >
              <h3 className="mb-4 text-2xl font-semibold text-primary">
                {benefit.title}
              </h3>
              <p className="text-base md:text-lg text-secondary">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
