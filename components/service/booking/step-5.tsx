// import { BookingFormData } from "@/config/Types/serviceTypes";

// interface Step5Props {
//   formData: BookingFormData;
//   serviceData?: any;
// }

// export default function Step5({ formData, serviceData }: Step5Props) {
//   // Get dynamic field definitions
//   const dynamicFields = serviceData?.fields || [];

//   // Build serviceDetails array for review (name: label, value: value)
//   const serviceDetails = dynamicFields.map((field: any) => ({
//     name: field.label,
//     value: formData[field.name],
//   }));

//   // For debugging: show the array structure and main form data
//   console.log("serviceDetails for review:", serviceDetails);
//   console.log("Main formData for review:", formData);

//   return (
//     <div className="space-y-6">
//       <div>
//         <h3 className="text-lg font-semibold mb-2">Review Your Booking</h3>
//         <p className="text-sm text-gray-600 mb-4">
//           Please confirm all details are correct
//         </p>
//       </div>

//       <div className="space-y-4">
//         {/* Service Details */}
//         <div className="p-4 bg-gray-50 rounded-lg">
//           <h4 className="font-semibold mb-2">Service Details</h4>
//           <div className="space-y-1 text-sm">
//             <p>
//               <span className="text-gray-600">Service Type:</span>{" "}
//               <span className="font-medium">
//                 {formData.serviceType || "Not selected"}
//               </span>
//             </p>

//             {/* Display Dynamic Fields as name/value pairs */}
//             {serviceDetails.map((detail) => (
//               <p key={detail.name}>
//                 <span className="text-gray-600 capitalize">{detail.name}:</span>{" "}
//                 <span className="font-medium">{detail.value !== undefined && detail.value !== null && detail.value !== "" ? String(detail.value) : "N/A"}</span>
//               </p>
//             ))}

//             <p>
//               <span className="text-gray-600">Note:</span>{" "}
//               <span className="font-medium">{formData.note || "N/A"}</span>
//             </p>
//           </div>
//         </div>

//         {/* Appointment */}
//         <div className="p-4 bg-gray-50 rounded-lg">
//           <h4 className="font-semibold mb-2">Appointment</h4>
//           <div className="space-y-1 text-sm">
//             <p>
//               <span className="text-gray-600">Date:</span>{" "}
//               <span className="font-medium">
//                 {formData.date?.toLocaleDateString() || "Not selected"}
//               </span>
//             </p>
//             <p>
//               <span className="text-gray-600">Time:</span>{" "}
//               <span className="font-medium">
//                 {formData.startTime} - {formData.endTime}
//               </span>
//             </p>
//             <p>
//               <span className="text-gray-600">Provider:</span>{" "}
//               <span className="font-medium">
//                 {formData.provider || "Not selected"}
//               </span>
//             </p>
//           </div>
//         </div>

//         {/* Contact & Address */}
//         <div className="p-4 bg-gray-50 rounded-lg">
//           <h4 className="font-semibold mb-2">Contact & Address</h4>
//           <div className="space-y-1 text-sm">
//             <p>
//               <span className="text-gray-600">Name:</span>{" "}
//               <span className="font-medium">{formData.name || "N/A"}</span>
//             </p>
//             <p>
//               <span className="text-gray-600">Email:</span>{" "}
//               <span className="font-medium">{formData.email || "N/A"}</span>
//             </p>
//             <p>
//               <span className="text-gray-600">Phone:</span>{" "}
//               <span className="font-medium">{formData.phone || "N/A"}</span>
//             </p>
//             <p>
//               <span className="text-gray-600">Address:</span>{" "}
//               <span className="font-medium">{formData.address || "N/A"}</span>
//             </p>
//             <p>
//               <span className="text-gray-600">City:</span>{" "}
//               <span className="font-medium">{formData.city || "N/A"}</span>
//             </p>
//             <p>
//               <span className="text-gray-600">State:</span>{" "}
//               <span className="font-medium">{formData.state || "N/A"}</span>
//             </p>
//             <p>
//               <span className="text-gray-600">ZIP:</span>{" "}
//               <span className="font-medium">{formData.zip || "N/A"}</span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { BookingFormData } from "@/config/Types/serviceTypes";

interface Step5Props {
  formData: BookingFormData;
  serviceData?: any;
}

export default function Step5({ formData, serviceData }: Step5Props) {
  // Find selected service type by ID
  const selectedServiceType = serviceData?.serviceType?.find(
    (type: any) => type._id === formData.serviceType,
  );

  // Get dynamic field definitions and map to actual values from formData
  const dynamicFields = serviceData?.fields || [];

  // Build serviceDetails array for review - FIXED THIS PART
  const serviceDetails = dynamicFields.map((field: any) => {
    const fieldValue = formData[field.name as keyof BookingFormData];

    // Handle different value types properly
    let displayValue = "N/A";
    if (fieldValue !== undefined && fieldValue !== null && fieldValue !== "") {
      if (typeof fieldValue === "boolean") {
        displayValue = fieldValue ? "Yes" : "No";
      } else if (typeof fieldValue === "number") {
        displayValue = fieldValue.toString();
      } else {
        displayValue = String(fieldValue);
      }
    }

    return {
      name: field.label,
      value: displayValue,
    };
  });

  // Debug log to verify serviceDetails
  console.log("Service Details for Review:", serviceDetails);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Review Your Booking</h3>
        <p className="text-sm text-gray-600 mb-4">
          Please confirm all details are correct
        </p>
      </div>

      <div className="space-y-4">
        {/* Service Details */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2">Service Details</h4>
          <div className="space-y-1 text-sm">
            <p>
              <span className="text-gray-600">Service Type:</span>{" "}
              <span className="font-medium">
                {selectedServiceType?.title || "Not selected"}
              </span>
            </p>

            {/* Fixed service details rendering */}
            {serviceDetails.length > 0 ? (
              serviceDetails.map((detail) => (
                <p key={detail.name}>
                  <span className="text-gray-600 capitalize">
                    {detail.name}:
                  </span>{" "}
                  <span className="font-medium">{detail.value}</span>
                </p>
              ))
            ) : (
              <p className="text-gray-500 italic">
                No additional service details provided
              </p>
            )}

            {formData.note && (
              <p>
                <span className="text-gray-600">Note:</span>{" "}
                <span className="font-medium">{formData.note}</span>
              </p>
            )}
          </div>
        </div>

        {/* Appointment */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2">Appointment</h4>
          <div className="space-y-1 text-sm">
            <p>
              <span className="text-gray-600">Date:</span>{" "}
              <span className="font-medium">
                {formData.date
                  ? formData.date.toLocaleDateString()
                  : "Not selected"}
              </span>
            </p>

            <p>
              <span className="text-gray-600">Provider:</span>{" "}
              <span className="font-medium">
                {formData.provider
                  ? serviceData?.staff?.find(
                      (s: any) => s._id === formData.provider,
                    )?.name || "Assigned automatically"
                  : "Will be assigned automatically"}
              </span>
            </p>
          </div>
        </div>

        {/* Contact & Address */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2">Contact & Address</h4>
          <div className="space-y-1 text-sm">
            <p>
              <span className="text-gray-600">Name:</span>{" "}
              <span className="font-medium">{formData.name || "N/A"}</span>
            </p>
            <p>
              <span className="text-gray-600">Email:</span>{" "}
              <span className="font-medium">{formData.email || "N/A"}</span>
            </p>
            <p>
              <span className="text-gray-600">Phone:</span>{" "}
              <span className="font-medium">{formData.phone || "N/A"}</span>
            </p>
            <p>
              <span className="text-gray-600">Address:</span>{" "}
              <span className="font-medium">
                {formData.address?.address || "N/A"}
              </span>
            </p>
            <p>
              <span className="text-gray-600">City:</span>{" "}
              <span className="font-medium">
                {formData.address?.city || "N/A"}
              </span>
            </p>
            <p>
              <span className="text-gray-600">State:</span>{" "}
              <span className="font-medium">
                {formData.address?.state || "N/A"}
              </span>
            </p>
            <p>
              <span className="text-gray-600">ZIP:</span>{" "}
              <span className="font-medium">
                {formData.address?.zipCode || "N/A"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
