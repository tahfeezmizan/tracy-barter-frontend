import { BookingFormData } from "@/config/Types/serviceTypes";

interface Step5Props {
  formData: BookingFormData;
  serviceData?: any;
}

export default function Step5({ formData }: Step5Props) {
  console.log("formData", formData);

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
                {formData?.serviceType?.title}
              </span>
            </p>

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
              <span className="font-medium">{formData?.providerName}</span>
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
