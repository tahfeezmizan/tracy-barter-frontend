import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Step2Props {
  formData: any;
  updateFormData: (field: keyof any, value: any) => void;
}

export default function Step2({ formData, updateFormData }) {
  // console.log(data);
  return (
    <div className="space-y-6">
      {/* Service Provider */}
      {/* Date & Time */}
      <div className="border p-5 rounded-lg border-gray-300">
        <div className="space-y-1 mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Select Date & Time
          </h2>
          <p className="text-sm text-gray-500">
            Choose when you'd like the service
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10">
          {/* Left: Calendar */}
          <div>
            <Label className="text-sm font-medium">Select Date</Label>
            <div className="mt-3 border rounded-xl p-3">
              <Calendar
                mode="single"
                selected={formData.date}
                onSelect={(value) => updateFormData("date", value)}
                className="rounded-md"
              />
            </div>
          </div>

          {/* Right: Time Selection */}
          <div>
            <Label className="text-sm font-medium">Select Time</Label>

            <div className="grid grid-cols-2 gap-6 mt-4">
              {/* Start Time */}
              <div className="space-y-2">
                <Label className="text-sm">Starting Time</Label>
                <Input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => updateFormData("startTime", e.target.value)}
                  className="bg-gray-50 border rounded-lg h-11"
                />
              </div>

              {/* End Time */}
              <div className="space-y-2">
                <Label className="text-sm">End Time</Label>
                <Input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => updateFormData("endTime", e.target.value)}
                  className="bg-gray-50 border rounded-lg h-11"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
