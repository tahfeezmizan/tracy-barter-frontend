import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookingFormData } from "@/config/Types/serviceTypes";

interface Step4Props {
  formData: BookingFormData;
  updateFormData: <K extends keyof BookingFormData>(
    field: K,
    value: BookingFormData[K],
  ) => void;
}

export default function Step4({ formData, updateFormData }: Step4Props) {
  const updateAddressField = (
    field: keyof BookingFormData["address"],
    value: string,
  ) => {
    updateFormData("address", {
      ...formData.address,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      <div className="border p-5 rounded-lg border-gray-300">
        <h2 className="text-2xl font-bold mb-4">Address & ZIP Check</h2>

        <div className="mt-6">
          <Label className="mb-2 block text-lg font-semibold text-secondary">
            Service Address
          </Label>
          <Input
            value={formData.address.address}
            onChange={(e) => updateAddressField("address", e.target.value)}
            className="border-none bg-gray-200 text-black text-xl py-5"
          />
        </div>

        <div className="grid grid-cols-2 gap-6 mt-6">
          <div>
            <Label className="mb-2 block text-lg font-semibold text-secondary">
              City
            </Label>
            <Input
              value={formData.address.city}
              onChange={(e) => updateAddressField("city", e.target.value)}
              className="border-none bg-gray-200 text-black text-xl py-5"
            />
          </div>

          <div>
            <Label className="mb-2 block text-lg font-semibold text-secondary">
              State
            </Label>
            <Input
              value={formData.address.state}
              onChange={(e) => updateAddressField("state", e.target.value)}
              className="border-none bg-gray-200 text-black text-xl py-5"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-6 items-end">
          <div>
            <Label className="mb-2 block text-lg font-semibold text-secondary">
              Zip
            </Label>
            <Input
              value={formData.address.zipCode}
              onChange={(e) => updateAddressField("zipCode", e.target.value)}
              className="border-none bg-gray-200 text-black text-xl py-5"
            />
          </div>

          {/* <Button
            type="button"
            className="py-5 rounded-lg border border-primary text-secondary bg-white text-lg"
          >
            Check Availability
          </Button> */}
        </div>
      </div>
    </div>
  );
}
