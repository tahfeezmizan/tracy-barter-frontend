"use client";

import Step1 from "@/components/service/booking/step-1";
import Step2 from "@/components/service/booking/step-2";
import Step3 from "@/components/service/booking/step-3";
import Step4 from "@/components/service/booking/step-4";
import Step5 from "@/components/service/booking/step-5";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
import { useState } from "react";

export interface BookingFormData {
  serviceType: string;
  bedrooms: string;
  bathrooms: string;
  homeSize: string;
  note: string;
  provider: string;
  date: Date | undefined;
  startTime: string;
  endTime: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

const TOTAL_STEPS = 4;

export default function BookingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BookingFormData>({
    serviceType: "",
    bedrooms: "",
    bathrooms: "",
    homeSize: "",
    note: "",
    provider: "",
    date: undefined,
    startTime: "8:00",
    endTime: "9:00",
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const updateFormData = (field: keyof BookingFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleContinue = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo(0, 0);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo(0, 0);
    } else {
      router.push("/service");
    }
  };

  const handleSubmit = async () => {
    console.log("Submitting booking:", formData);
    router.push("/service/booking/confirmation");
  };
  const progress = (currentStep / TOTAL_STEPS) * 100;

  
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 pt-28">
      <div className="max-w-3xl mx-auto ">
        <Card className="border-none shadow-none">
          <CardHeader className="border p-5 rounded-lg border-gray-300">
            <div className="flex items-center justify-between mb-2">
              <CardTitle>
                Step {currentStep} of {TOTAL_STEPS}
              </CardTitle>
              <span className="text-sm font-medium text-gray-600">
                {progress}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2 " />
          </CardHeader>

          <CardContent className="p-0">
            {currentStep === 1 && (
              <Step1 formData={formData} updateFormData={updateFormData} />
            )}
            {currentStep === 2 && (
              <Step2 formData={formData} updateFormData={updateFormData} />
            )}
            {currentStep === 3 && (
              <Step3 formData={formData} updateFormData={updateFormData} />
            )}
            {/* {currentStep === 4 && (
              <Step4 formData={formData} updateFormData={updateFormData} />
            )} */}
            {currentStep === 4 && (
              <Step5 formData={formData} updateFormData={updateFormData} />
            )}

            <div className="flex gap-4 mt-8">
              <Button variant="outline" onClick={handleBack} className="flex-1">
                Back
              </Button>
              <Button
                onClick={handleContinue}
                className="flex-1 text-white bg-secondary hover:bg-slate-800"
              >
                {currentStep === TOTAL_STEPS ? "Submit" : "Continue"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
