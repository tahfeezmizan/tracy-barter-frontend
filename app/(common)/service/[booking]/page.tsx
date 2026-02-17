"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
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
import {
  useCreateBookingMutation,
  useGetSingleServiceQuery,
} from "@/redux/features/service/serviceApis";
import { toast } from "sonner";
import { useGetStaffProfileQuery } from "@/redux/features/staffdashboard/staffStatsApis";

const TOTAL_STEPS = 5;

export default function BookingPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.booking as string;

const { data } = useGetStaffProfileQuery(undefined);

console.log("data",data);
  
  const { data: serviceData } = useGetSingleServiceQuery<{
    data: ServiceResponse;
  }>({ id });

  const [createBooking] = useCreateBookingMutation();

  const searchParams = useSearchParams();
  const initialStep = Number(searchParams.get("step")) || 1;
  const [currentStep, setCurrentStep] = useState(initialStep);

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

  // Load shopping list from localStorage if redirected from AI shopping
  useEffect(() => {
    const list = localStorage.getItem("pendingShoppingList");
    if (list) {
      try {
        const items = JSON.parse(list);
        const serviceDetails = items.map((item: any) => ({
          name: item.name,
          value: item.quantity,
        }));

        setFormData((prev) => ({
          ...prev,
          serviceDetails: serviceDetails,
          // Pre-populate fields if they exist in serviceData
        }));

        // Select the first service type if we are jumping into step 2
        if (serviceData?.serviceType?.length && !formData.serviceType) {
          const type = serviceData.serviceType[0];
          updateFormData("serviceType", {
            _id: type._id,
            title: type.title,
            description: type.description,
          });
        }

        // Clean up
        localStorage.removeItem("pendingShoppingList");
      } catch (e) {
        console.error("Failed to parse pendingShoppingList", e);
      }
    }
  }, [serviceData]);

  // Live console for all form data
  useEffect(() => {
    // console.log("📦 FULL BOOKING FORM DATA:", formData);
  }, [formData]);

  useEffect(() => {
    if (!serviceData) return;
    const serviceDetails =
      serviceData?.fields?.map((field) => ({
        name: field.label,
        value: formData[field.name],
      })) || [];

    // Merge or set service details
    if (formData.serviceDetails && formData.serviceDetails.length > 0) {
      // If we already have details (e.g. from shopping list), we might want to keep them or merge
      // For now, let's just log and see. The user asked to "pass the shopping list data".
    } else {
      updateFormData("serviceDetails", serviceDetails);
    }
  }, [currentStep, serviceData]);

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
      service: id,
      staff: formData.provider,
      date: formData.date
        ? new Date(formData.date).toISOString().split("T")[0]
        : "",
      startTime: "10:00",
      endTime: "11:00",
      address: formData.address,
      serviceType: formData.serviceType,
      serviceDetails: formData.serviceDetails,
      notes: formData.note, // Mapped from note
    };

    // console.log("🚀 Payload to be sent:", payload);

    try {
      const res: any = await createBooking(payload);
      // console.log("Booking api response", res);
      if (res?.data?.success) {
        toast.success(res?.data?.message || "Booking created successfully");
        // Handle success (e.g., redirect)
        router.push("/service/booking/confirmation");
      } else {
        // Handle RTK Query error response
        const errorMessage =
          res?.error?.data?.message ||
          res?.data?.message ||
          "Failed to create booking";
        toast.error(errorMessage);
        // console.log("Error response:", res);
      }
    } catch (error: any) {
      // console.log(error);
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
