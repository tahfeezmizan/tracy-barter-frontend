"use client";

import { BookingFormData } from "@/app/(common)/service/booking/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Step3Props {
  formData: BookingFormData;
  updateFormData: (field: keyof BookingFormData, value: any) => void;
}
export default function Step3({ formData, updateFormData }: Step3Props) {
  return (
    <div className="space-y-6">
      <div className="border p-5 rounded-lg border-gray-300">
        <h2 className="text-2xl font-bold mb-4">Address & ZIP Check</h2>

        {/* Service Address */}
        <div className="mt-6">
          <Label className="mb-2 block text-lg font-semibold text-secondary">
            Service Address
          </Label>
          <Input
            placeholder=""
            value={formData.address}
            onChange={(e) => updateFormData("address", e.target.value)}
            className="border-none bg-gray-200 text-black !text-xl py-5 focus:ring-2 focus:ring-primary/75 focus:outline-none"
          />
        </div>

        {/* City + State */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          <div>
            <Label className="mb-2 block text-lg font-semibold text-secondary">
              City
            </Label>
            <Input
              placeholder=""
              value={formData.city ?? ""}
              onChange={(e) => updateFormData("city" as any, e.target.value)}
              className="border-none bg-gray-200 text-black !text-xl py-5 focus:ring-2 focus:ring-primary/75 focus:outline-none"
            />
          </div>

          <div>
            <Label className="mb-2 block text-lg font-semibold text-secondary">
              State
            </Label>
            <Input
              placeholder=""
              value={formData.state ?? ""}
              onChange={(e) => updateFormData("state" as any, e.target.value)}
              className="border-none bg-gray-200 text-black !text-xl py-5 focus:ring-2 focus:ring-primary/75 focus:outline-none"
            />
          </div>
        </div>

        {/* ZIP + Check Availability */}
        <div className="grid grid-cols-2 gap-6 mt-6 items-end">
          <div>
            <Label className="mb-2 block text-lg font-semibold text-secondary">
              Zip
            </Label>
            <Input
              placeholder=""
              value={formData.zip ?? ""}
              onChange={(e) => updateFormData("zip" as any, e.target.value)}
              className="border-none bg-gray-200 text-black !text-xl py-5 focus:ring-2 focus:ring-primary/75 focus:outline-none"
            />
          </div>

          <Button
            type="button"
            className="py-5 rounded-lg border border-primary text-secondary bg-white text-lg"
          >
            Check Availability
          </Button>
        </div>
      </div>
    </div>
  );
}
