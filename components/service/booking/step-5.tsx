import { BookingFormData } from "@/app/(common)/service/booking/page";

interface Step5Props {
  formData: BookingFormData;
  updateFormData: (field: keyof BookingFormData, value: any) => void;
}

export default function Step5({ formData }: Step5Props) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Review Your Booking</h3>
        <p className="text-sm text-gray-600 mb-4">
          Please confirm all details are correct
        </p>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2">Service Details</h4>
          <div className="space-y-1 text-sm">
            <p>
              <span className="text-gray-600">Type:</span>{" "}
              <span className="font-medium">
                {formData.serviceType || "Not selected"}
              </span>
            </p>
            <p>
              <span className="text-gray-600">Bedrooms:</span>{" "}
              <span className="font-medium">{formData.bedrooms || "N/A"}</span>
            </p>
            <p>
              <span className="text-gray-600">Bathrooms:</span>{" "}
              <span className="font-medium">{formData.bathrooms || "N/A"}</span>
            </p>
            <p>
              <span className="text-gray-600">Home Size:</span>{" "}
              <span className="font-medium">
                {formData.homeSize ? `${formData.homeSize} sq ft` : "N/A"}
              </span>
            </p>
          </div>
        </div>

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
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2">Contact Details</h4>
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
          </div>
        </div>
      </div>
    </div>
  );
}
