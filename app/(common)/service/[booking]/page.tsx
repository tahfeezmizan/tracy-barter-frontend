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
import { usePurchaseSubscriptionMutation } from "@/redux/features/payments/paymentsApis";
import LoadingSpinner from "@/lib/loading-spinner";
import { useGetStaffsbyServiceQuery } from "@/redux/features/staff/staffApis";
import { Loader } from "lucide-react";

const TOTAL_STEPS = 5;

export default function BookingPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.booking as string;

  const { data: userData } = useGetStaffProfileQuery(undefined);

  const { data: serviceData } = useGetSingleServiceQuery<{
    data: ServiceResponse;
  }>({ id });

  const [createBooking, { isLoading: bookingLoading }] =
    useCreateBookingMutation();

  const [purchaseSubscription, { isLoading }] =
    usePurchaseSubscriptionMutation();

  // ✅ Fetch staff list here so we can validate in step 3
  const { data: staffProvider } = useGetStaffsbyServiceQuery({ id });

  const searchParams = useSearchParams();
  const initialStep = Number(searchParams.get("step")) || 1;
  const [currentStep, setCurrentStep] = useState(initialStep);

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
        }));

        if (serviceData?.serviceType?.length && !formData.serviceType) {
          const type = serviceData.serviceType[0];
          updateFormData("serviceType", {
            _id: type._id,
            title: type.title,
            description: type.description,
          });
        }

        localStorage.removeItem("pendingShoppingList");
      } catch (e) {
        console.error("Failed to parse pendingShoppingList", e);
      }
    }
  }, [serviceData]);

  useEffect(() => {
    if (!serviceData) return;

    const serviceDetails =
      serviceData?.fields?.map((field) => ({
        name: field.label,
        value: formData[field.name],
      })) || [];

    if (!formData.serviceDetails || formData.serviceDetails.length === 0) {
      updateFormData("serviceDetails", serviceDetails);
    }
  }, [currentStep, serviceData]);

  // ✅ STEP 1 VALIDATION
  const validateStep1 = () => {
    // Only validate serviceType if the serviceType list exists
    if (serviceData?.serviceType?.length) {
      if (!formData.serviceType) {
        toast.error("Please select a Service Type.");
        return false;
      }
    }

    if (serviceData?.fields?.length) {
      for (const field of serviceData.fields) {
        const value = formData[field.name];

        if (
          value === undefined ||
          value === null ||
          value === "" ||
          (field.type === "number" && value === 0)
        ) {
          toast.error(`Please enter ${field.label}.`);
          return false;
        }
      }
    }

    return true;
  };

  // ✅ STEP 2 VALIDATION
  const validateStep2 = () => {
    if (!formData.date) {
      toast.error("Please select a date before continuing.");
      return false;
    }

    return true;
  };

  // ✅ STEP 3 VALIDATION
  const validateStep3 = () => {
    const staffList = staffProvider?.staff || serviceData?.staff || [];

    // Only validate if the provider section exists (staff list has entries)
    if (staffList.length > 0 && !formData.provider) {
      toast.error("Please select a service provider before continuing.");
      return false;
    }

    return true;
  };

  // ✅ STEP 4 VALIDATION
  const validateStep4 = () => {
    if (!formData.address.address.trim()) {
      toast.error("Please enter a Service Address.");
      return false;
    }

    if (!formData.address.city.trim()) {
      toast.error("Please enter a City.");
      return false;
    }

    return true;
  };

  const handleContinue = () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;
    if (currentStep === 3 && !validateStep3()) return;
    if (currentStep === 4 && !validateStep4()) return;

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
    const staffList = staffProvider?.staff || serviceData?.staff || [];
    const hasStaffSection = staffList.length > 0;
    const hasServiceTypeSection = !!serviceData?.serviceType?.length;

    const payload = {
      service: id,
      // ✅ Only send staff if staff section exists and a provider is selected
      ...(hasStaffSection && formData.provider
        ? { staff: formData.provider }
        : {}),
      date: formData.date
        ? new Date(formData.date).toISOString().split("T")[0]
        : "",
      startTime: "10:00",
      endTime: "11:00",
      address: formData.address,
      // ✅ Only send serviceType if serviceType section exists
      ...(hasServiceTypeSection && formData.serviceType
        ? { serviceType: formData.serviceType }
        : {}),
      serviceDetails: formData.serviceDetails,
      notes: formData.note,
    };

    try {
      const res: any = await createBooking(payload);

      if (res?.data?.success) {
        toast.success(res?.data?.message || "Booking created successfully");

        router.push("/user-profile/my-order");

        // if (userData?.subscribe) {
        //   router.push("/service/booking/confirmation");
        // } else {
        //   const response = await purchaseSubscription(res?.data?.data?._id);
        //   router.push(`${response?.data?.data}`);
        // }
      } else {
        // ✅ Handle specific backend field errors
        const errorMessages =
          res?.error?.data?.errorMessages || res?.data?.errorMessages;

        if (errorMessages?.length) {
          errorMessages.forEach((err: { path: string; message: string }) => {
            if (err.path === "staff") {
              toast.error(
                "Service provider is invalid or missing. Please go back and select a valid provider.",
              );
            } else if (err.path === "serviceType") {
              toast.error(
                "Service type is invalid or missing. Please go back and select a valid service type.",
              );
            } else {
              toast.error(err.message || "An error occurred.");
            }
          });
        } else {
          const errorMessage =
            res?.error?.data?.message ||
            res?.data?.message ||
            "Failed to create booking";

          toast.error(errorMessage);
        }
      }
    } catch (error: any) {
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
              <Button
                onClick={handleContinue}
                className="flex-1"
                disabled={bookingLoading}
              >
                {currentStep === TOTAL_STEPS ? (
                  bookingLoading ? (
                    <>
                      <Loader className="animate-spin" /> Submitting{" "}
                    </>
                  ) : (
                    "Submit"
                  )
                ) : (
                  "Continue"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// {
//   currentStep === TOTAL_STEPS ? (
//     isLoading ? (
//       <LoadingSpinner />
//     ) : userData?.subscribe ? (
//       "Submit"
//     ) : (
//       "Pay your booking fee"
//     )
//   ) : (
//     "Continue"
//   );
// }
