"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

interface ReferralFormData {
  name: string;
  brokerage: string;
  email: string;
  phone: string;
  referralName: string;
  notes?: string;
}

export function ReferralForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReferralFormData>({
    mode: "onBlur",
    defaultValues: {
      name: "",
      brokerage: "",
      email: "",
      phone: "",
      referralName: "",
      notes: "",
    },
  });

  const onSubmit = (data: ReferralFormData) => {
    console.log("Form submitted:", data);
    // Handle form submission here
    reset();
  };

  return (
    <section className="bg-[#f0f1f5ad]">
      <div className="max-w-2xl mx-automax-w-7xl mx-auto px-4 py-12 md:py-16 pb-16 md:pb-20">
        <h2 className="text-3xl font-semibold text-center text-gray-900 mb-8">
          Submit a Referral
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-xl border border-primary/40 p-8 space-y-6"
        >
          {/* Your name field */}
          <div>
            <label
              htmlFor="name"
              className="block text-xl font-semibold text-gray-900 mb-2"
            >
              Your name
            </label>
            <input
              {...register("name", {
                required: "Name is required",
              })}
              id="name"
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-3 bg-gray-200/70 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white transition"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Brokerage / Company field */}
          <div>
            <label
              htmlFor="brokerage"
              className="block text-xl font-semibold text-gray-900 mb-2"
            >
              Brokerage / Company<span className="text-red-500">*</span>
            </label>
            <input
              {...register("brokerage", {
                required: "Brokerage / Company is required",
              })}
              id="brokerage"
              type="text"
              placeholder="Enter your brokerage or company"
              className="w-full px-4 py-3 bg-gray-200/70 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white transition"
            />
            {errors.brokerage && (
              <p className="text-red-500 text-sm mt-1">
                {errors.brokerage.message}
              </p>
            )}
          </div>

          {/* Email and Phone fields - two columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="email"
                className="block text-xl font-semibold text-gray-900 mb-2"
              >
                Email<span className="text-red-500">*</span>
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                id="email"
                type="email"
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 bg-gray-200/70 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white transition"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-xl font-semibold text-gray-900 mb-2"
              >
                Phone
              </label>
              <input
                {...register("phone", {
                  pattern: {
                    value:
                      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                    message: "Invalid phone number format",
                  },
                })}
                id="phone"
                type="tel"
                placeholder="(123) 456-7890"
                className="w-full px-4 py-3 bg-gray-200/70 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white transition"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          {/* Referral name field */}
          <div>
            <label
              htmlFor="referralName"
              className="block text-xl font-semibold text-gray-900 mb-2"
            >
              Referral name
            </label>
            <input
              {...register("referralName", {
                required: "Referral name is required",
              })}
              id="referralName"
              type="text"
              placeholder="Enter the referral client's name"
              className="w-full px-4 py-3 bg-gray-200/70 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white transition"
            />
            {errors.referralName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.referralName.message}
              </p>
            )}
          </div>

          {/* Notes field */}
          <div>
            <label
              htmlFor="notes"
              className="block text-xl font-semibold text-gray-900 mb-2"
            >
              Notes (Optional)
            </label>
            <textarea
              {...register("notes")}
              id="notes"
              placeholder="Add any additional notes..."
              rows={6}
              className="w-full px-4 py-3 bg-gray-200/70 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white transition overflow-hidden resize-none"
            />
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            className="w-full text-xl bg-secondary hover:bg-slate-800 text-white font-medium py-6 rounded-md transition"
          >
            Submit a referral
          </Button>
        </form>
      </div>
    </section>
  );
}
