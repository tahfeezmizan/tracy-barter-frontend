// "use client";

// import { useParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// import Step1 from "@/components/service/booking/step-1";
// import Step2 from "@/components/service/booking/step-2";
// import Step3 from "@/components/service/booking/step-3";
// import Step4 from "@/components/service/booking/step-4";
// import Step5 from "@/components/service/booking/step-5";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";

// import { BookingFormData, ServiceResponse } from "@/config/Types/serviceTypes";
// import { useGetSingleServiceQuery } from "@/redux/features/service/serviceApis";

// const TOTAL_STEPS = 5;

// export default function BookingPage() {
//   const router = useRouter();
//   const params = useParams();
//   const id = params.booking as string;

//   const { data: serviceData } = useGetSingleServiceQuery<{
//     data: ServiceResponse;
//   }>({ id });

//   // console.log(serviceData);

//   const [currentStep, setCurrentStep] = useState(1);

//   // 🔑 Single Source of Truth
//   const [formData, setFormData] = useState<BookingFormData>({
//     serviceType: "",
//     note: "",
//     isOutdoor: false,

//     provider: "",
//     date: undefined,
//     startTime: "8:00",
//     endTime: "9:00",

//     address: "",
//     city: "",
//     state: "",
//     zip: "",

//     name: "",
//     email: "",
//     phone: "",
//   });

//   const updateFormData = <K extends keyof BookingFormData>(
//     field: K,
//     value: BookingFormData[K],
//   ) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   // 🟢 LIVE CONSOLE (ALL DATA)
//   useEffect(() => {
//     console.log("📦 FULL BOOKING FORM DATA:", formData);
//   }, [formData]);

//   // 🟢 API DATA CONSOLE
//   useEffect(() => {
//     if (serviceData) {
//       // console.log("🛠 SERVICE API DATA:", serviceData);
//     }
//   }, [serviceData]);

//   const handleContinue = () => {
//     if (currentStep < TOTAL_STEPS) {
//       setCurrentStep((prev) => prev + 1);
//       window.scrollTo(0, 0);
//     } else {
//       handleSubmit();
//     }
//   };

//   const handleBack = () => {
//     if (currentStep > 1) {
//       setCurrentStep((prev) => prev - 1);
//       window.scrollTo(0, 0);
//     } else {
//       router.push("/service");
//     }
//   };

//   const handleSubmit = () => {
//     const payload = {
//       serviceId: id,
//       ...formData,
//     };

//     console.log("🚀 FINAL BOOKING PAYLOAD:", payload);

//     router.push("/service/booking/confirmation");
//   };

//   const progress = (currentStep / TOTAL_STEPS) * 100;

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 pt-28">
//       <div className="max-w-3xl mx-auto">
//         <Card className="border-none shadow-none">
//           <CardHeader className="border p-5 rounded-lg border-gray-300">
//             <div className="flex items-center justify-between mb-2">
//               <CardTitle>
//                 Step {currentStep} of {TOTAL_STEPS}
//               </CardTitle>
//               <span className="text-sm text-gray-600">
//                 {progress}% Complete
//               </span>
//             </div>
//             <Progress value={progress} className="h-2" />
//           </CardHeader>

//           <CardContent className="p-0">
//             {currentStep === 1 && (
//               <Step1
//                 formData={formData}
//                 data={serviceData}
//                 updateFormData={updateFormData}
//               />
//             )}

//             {currentStep === 2 && (
//               <Step2 formData={formData} updateFormData={updateFormData} />
//             )}

//             {currentStep === 3 && (
//               <Step3
//                 formData={formData}
//                 data={serviceData}
//                 updateFormData={updateFormData}
//               />
//             )}

//             {currentStep === 4 && (
//               <Step4 formData={formData} updateFormData={updateFormData} />
//             )}

//             {currentStep === 5 && <Step5 formData={formData} />}

//             <div className="flex gap-4 mt-8">
//               <Button variant="outline" onClick={handleBack} className="flex-1">
//                 Back
//               </Button>
//               <Button onClick={handleContinue} className="flex-1">
//                 {currentStep === TOTAL_STEPS ? "Submit" : "Continue"}
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

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
import { useGetSingleServiceQuery } from "@/redux/features/service/serviceApis";

const TOTAL_STEPS = 5;

export default function BookingPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.booking as string;

  const { data: serviceData } = useGetSingleServiceQuery<{
    data: ServiceResponse;
  }>({ id });

  const [currentStep, setCurrentStep] = useState(1);

  // Single Source of Truth
  const [formData, setFormData] = useState<BookingFormData>({
    serviceType: null,
    note: "",
    isOutdoor: false,

    provider: "",
    date: undefined,
    startTime: "8:00",
    endTime: "9:00",

    address: "",
    city: "",
    state: "",
    zip: "",

    name: "",
    email: "",
    phone: "",
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

  // Log serviceDetails and main formData on every step change (Continue click)
  useEffect(() => {
    if (!serviceData) return;
    const serviceDetails =
      serviceData?.fields?.map((field) => ({
        name: field.label,
        value: formData[field.name],
      })) || [];
      formData.serviceDetails = serviceDetails
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

  const handleSubmit = () => {
    // Map dynamic fields into serviceDetails array
    const serviceDetails =
      serviceData?.fields?.map((field) => ({
        name: field.label, // label instead of name
        value: formData[field.name], // value from formData
      })) || [];

    const payload = {
      serviceId: id,
      serviceType: formData.serviceType,
      note: formData.note,
      serviceDetails,
      // other formData fields
      provider: formData.provider,
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    };

    console.log("🚀 FINAL BOOKING PAYLOAD:", payload);

    router.push("/service/booking/confirmation");
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

            {currentStep === 5 && <Step5 formData={formData} serviceData={serviceData} />}

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
