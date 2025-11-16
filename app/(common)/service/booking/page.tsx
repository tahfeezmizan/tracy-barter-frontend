"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Step1 from "@/components/service/booking/step-1";
import Step2 from "@/components/service/booking/step-2";
import Step3 from "@/components/service/booking/step-3";
import Step4 from "@/components/service/booking/step-4";
import Step5 from "@/components/service/booking/step-5";

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
}

const TOTAL_STEPS = 5;

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
      router.push("/");
    }
  };

  const handleSubmit = async () => {
    console.log("Submitting booking:", formData);
    router.push("/service/booking/confirmation");
  };

  const progress = (currentStep / TOTAL_STEPS) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 pt-28">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <CardTitle>
                Step {currentStep} of {TOTAL_STEPS}
              </CardTitle>
              <span className="text-sm font-medium text-gray-600">
                {progress}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2 " />
          </CardHeader>

          <CardContent className="pt-6">
            {currentStep === 1 && (
              <Step1 formData={formData} updateFormData={updateFormData} />
            )}
            {currentStep === 2 && (
              <Step2 formData={formData} updateFormData={updateFormData} />
            )}
            {currentStep === 3 && (
              <Step3 formData={formData} updateFormData={updateFormData} />
            )}
            {currentStep === 4 && (
              <Step4 formData={formData} updateFormData={updateFormData} />
            )}
            {currentStep === 5 && (
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
