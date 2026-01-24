"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Step1 from "@/components/service/booking/step-1";
import Step2 from "@/components/service/booking/step-2";
import Step3 from "@/components/service/booking/step-3";
import Step4 from "@/components/service/booking/step-4";
import Step5 from "@/components/service/booking/step-5";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { BookingFormData, ServiceResponse } from "@/config/Types/serviceTypes";
import { useCreateBookingMutation, useGetSingleServiceQuery } from "@/redux/features/service/serviceApis";
import { CloudCog } from "lucide-react";
import { toast } from "sonner";

const TOTAL_STEPS = 5;

export default function BookingPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.booking as string;

  const { data: serviceData } = useGetSingleServiceQuery<{
    data: ServiceResponse;
  }>({ id });

  const [createBooking] = useCreateBookingMutation();

  const [currentStep, setCurrentStep] = useState(1);

  // Single Source of Truth
  const [formData, setFormData] = useState<BookingFormData>({
    serviceType: null,
    note: "",
    isOutdoor: false,

    providerName: "",
    provider: "",
    date: undefined,

    address: {
      address: "",
      city: "",
      state: "",
      zipCode: "",
    },

    name: "",
    email: "",
    phone: "",
    serviceDetails: [],
  });

  const updateFormData = <K extends keyof BookingFormData>(
    field: K,
    value: BookingFormData[K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Live console for all form data
  useEffect(() => {
    console.log("📦 FULL BOOKING FORM DATA:", formData);
  }, [formData]);

  useEffect(() => {
    if (!serviceData) return;
    const serviceDetails =
      serviceData?.fields?.map((field) => ({
        name: field.label,
        value: formData[field.name],
      })) || [];
    formData.serviceDetails = serviceDetails;
  }, [currentStep, serviceData, formData]);

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
    // console.log("📦 FULL BOOKING FORM DATA:", formData);

    const payload = {
      service: id, // From URL params
      staff: formData.provider, // Mapped from provider
      date: formData.date ? new Date(formData.date).toISOString().split('T')[0] : "", // Format YYYY-MM-DD
      startTime: "10:00", // Defaulting for now as requested by user's example, or check requirements
      endTime: "11:00",
      address: formData.address,
      serviceType: formData.serviceType,
      serviceDetails: formData.serviceDetails,
      notes: formData.note, // Mapped from note
    };

    console.log("🚀 Payload to be sent:", payload);

    try {
      const res: any = await createBooking(payload);
      // console.log("Booking api response", res);
      if (res?.data?.success) {
        toast.success(res?.data?.message || "Booking created successfully");
        // Handle success (e.g., redirect)
         router.push("/service/booking/confirmation");
      } else {
        // Handle RTK Query error response
        const errorMessage = res?.error?.data?.message || res?.data?.message || "Failed to create booking";
        toast.error(errorMessage);
        console.log("Error response:", res);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  const progress = (currentStep / TOTAL_STEPS) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 pt-28">
      <div className="max-w-3xl mx-auto">
        <Card className="border-none shadow-none">
          <CardHeader className="border p-5 rounded-lg border-gray-300">
            <div className="flex items-center justify-between mb-2">
              <CardTitle>
                Step {currentStep} of {TOTAL_STEPS}
              </CardTitle>
              <span className="text-sm text-gray-600">
                {progress}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardHeader>

          <CardContent className="p-0">
            {currentStep === 1 && (
              <Step1
                formData={formData}
                data={serviceData}
                updateFormData={updateFormData}
              />
            )}

            {currentStep === 2 && (
              <Step2 formData={formData} updateFormData={updateFormData} />
            )}

            {currentStep === 3 && (
              <Step3
                formData={formData}
                data={serviceData}
                updateFormData={updateFormData}
              />
            )}

            {currentStep === 4 && (
              <Step4 formData={formData} updateFormData={updateFormData} />
            )}

            {currentStep === 5 && <Step5 formData={formData} />}

            <div className="flex gap-4 mt-8">
              <Button variant="outline" onClick={handleBack} className="flex-1">
                Back
              </Button>
              <Button onClick={handleContinue} className="flex-1">
                {currentStep === TOTAL_STEPS ? "Submit" : "Continue"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
