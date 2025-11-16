import { BookingFormData } from "@/app/(common)/service/booking/page";

interface Step2Props {
  formData: BookingFormData;
  updateFormData: (field: keyof BookingFormData, value: any) => void;
}

export default function Step2({ formData, updateFormData }: Step2Props) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Additional Details</h3>
        <p className="text-sm text-gray-600 mb-4">
          Tell us more about your cleaning needs
        </p>
      </div>
      <div className="text-center py-12 text-gray-500">
        Step 2 content goes here
      </div>
    </div>
  );
}
