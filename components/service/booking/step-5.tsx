import { BookingFormData } from "@/config/Types/serviceTypes";

interface Step5Props {
  formData: BookingFormData;
  serviceData?: any;
}

export default function Step5({ formData, serviceData }: Step5Props) {
  // Get dynamic field definitions
  const dynamicFields = serviceData?.fields || [];

  // Build serviceDetails array for review (name: label, value: value)
  const serviceDetails = dynamicFields.map((field: any) => ({
    name: field.label,
    value: formData[field.name],
  }));


  // For debugging: show the array structure and main form data
  console.log("serviceDetails for review:", serviceDetails);
  console.log("Main formData for review:", formData);

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
                {formData.serviceType || "Not selected"}
              </span>
            </p>

            {/* Display Dynamic Fields as name/value pairs */}
            {serviceDetails.map((detail) => (
              <p key={detail.name}>
                <span className="text-gray-600 capitalize">{detail.name}:</span>{" "}
                <span className="font-medium">{detail.value !== undefined && detail.value !== null && detail.value !== "" ? String(detail.value) : "N/A"}</span>
              </p>
            ))}

            <p>
              <span className="text-gray-600">Note:</span>{" "}
              <span className="font-medium">{formData.note || "N/A"}</span>
            </p>
          </div>
        </div>

        {/* Appointment */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2">Appointment</h4>
          <div className="space-y-1 text-sm">
            <p>
              <span className="text-gray-600">Date:</span>{" "}
              <span className="font-medium">
                {formData.date?.toLocaleDateString() || "Not selected"}
              </span>
            </p>
            <p>
              <span className="text-gray-600">Time:</span>{" "}
              <span className="font-medium">
                {formData.startTime} - {formData.endTime}
              </span>
            </p>
            <p>
              <span className="text-gray-600">Provider:</span>{" "}
              <span className="font-medium">
                {formData.provider || "Not selected"}
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
              <span className="font-medium">{formData.address || "N/A"}</span>
            </p>
            <p>
              <span className="text-gray-600">City:</span>{" "}
              <span className="font-medium">{formData.city || "N/A"}</span>
            </p>
            <p>
              <span className="text-gray-600">State:</span>{" "}
              <span className="font-medium">{formData.state || "N/A"}</span>
            </p>
            <p>
              <span className="text-gray-600">ZIP:</span>{" "}
              <span className="font-medium">{formData.zip || "N/A"}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
