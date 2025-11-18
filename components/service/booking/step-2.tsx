import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { BookingFormData } from "@/app/(common)/service/booking/page";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Star } from "lucide-react";

interface Step2Props {
  formData: BookingFormData;
  updateFormData: (field: keyof BookingFormData, value: any) => void;
}

export default function Step2({ formData, updateFormData }: Step2Props) {
  return (
    <div className="space-y-6">
      <div>
        <div>
          <h3 className="text-lg font-semibold">
            Choose Your Service Provider
          </h3>
          <p className="text-base text-gray-600">
            Select your preferred concierge representative
          </p>
          <RadioGroup
            value={formData.serviceType}
            onValueChange={(value) => updateFormData("serviceType", value)}
            className="mt-5"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 py-3 border border-gray-400 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="">
                  <p className="text-base font-medium text-slate-900">
                    Standard
                  </p>
                  <p className="text-base text-gray-600">
                    Regular maintenance Cleaning
                  </p>
                </div>

                <div className="flex items-center gap-2 text-yellow-500">
                  <Star size={16} fill="currentColor" />
                  <span className="font-medium text-gray-700">5.5</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-400 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="">
                  <p className="text-base font-medium text-slate-900">
                    Move-in / Move out
                  </p>
                  <p className="text-base text-gray-600">
                    Complete deep cleaning for transitions
                  </p>
                </div>

                <div className="flex items-center gap-2 text-yellow-500">
                  <Star size={16} fill="currentColor" />
                  <span className="font-medium text-gray-700">5.5</span>
                </div>
              </div>
            </div>
          </RadioGroup>
        </div>
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
                selected={date}
                onSelect={setDate}
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
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="bg-gray-50 border rounded-lg h-11"
                />
              </div>

              {/* End Time */}
              <div className="space-y-2">
                <Label className="text-sm">End Time</Label>
                <Input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="bg-gray-50 border rounded-lg h-11"
                />
              </div>
            </div>

            <div className="">
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
                      selected={date}
                      onSelect={setDate}
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
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="bg-gray-50 border rounded-lg h-11"
                      />
                    </div>

                    {/* End Time */}
                    <div className="space-y-2">
                      <Label className="text-sm">End Time</Label>
                      <Input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="bg-gray-50 border rounded-lg h-11"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center py-12 text-gray-500">
        Step 2 content goes here
      </div>
    </div>
  );
}
