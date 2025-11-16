import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BookingFormData } from "@/app/(common)/service/booking/page";

interface Step1Props {
  formData: BookingFormData;
  updateFormData: (field: keyof BookingFormData, value: any) => void;
}

export default function Step1({ formData, updateFormData }: Step1Props) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Service Type</h3>
        <RadioGroup
          value={formData.serviceType}
          onValueChange={(value) => updateFormData("serviceType", value)}
        >
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <RadioGroupItem value="standard" id="standard" className="mt-1" />
              <Label htmlFor="standard" className="flex-1 cursor-pointer">
                <div className="font-semibold text-slate-900">Standard</div>
                <div className="text-sm text-gray-600">
                  Regular maintenance Cleaning
                </div>
              </Label>
            </div>

            <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <RadioGroupItem value="deep" id="deep" className="mt-1" />
              <Label htmlFor="deep" className="flex-1 cursor-pointer">
                <div className="font-semibold text-slate-900">Deep clean</div>
                <div className="text-sm text-gray-600">
                  Detailed cleaning including baseboards, cabinets
                </div>
              </Label>
            </div>

            <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <RadioGroupItem value="move" id="move" className="mt-1" />
              <Label htmlFor="move" className="flex-1 cursor-pointer">
                <div className="font-semibold text-slate-900">
                  Move-in / Move out
                </div>
                <div className="text-sm text-gray-600">
                  Complete deep cleaning for transitions
                </div>
              </Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="bedrooms" className="mb-2 block font-medium">
            Bedroom
          </Label>
          <Input
            id="bedrooms"
            type="number"
            placeholder="Number of bedrooms"
            value={formData.bedrooms}
            onChange={(e) => updateFormData("bedrooms", e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <Label htmlFor="bathrooms" className="mb-2 block font-medium">
            Bathroom
          </Label>
          <Input
            id="bathrooms"
            type="number"
            placeholder="Number of bathrooms"
            value={formData.bathrooms}
            onChange={(e) => updateFormData("bathrooms", e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="homeSize" className="mb-2 block font-medium">
          Home size (Square feet)
        </Label>
        <Input
          id="homeSize"
          type="number"
          placeholder="Enter home size"
          value={formData.homeSize}
          onChange={(e) => updateFormData("homeSize", e.target.value)}
          className="w-full"
        />
      </div>

      <div>
        <Label htmlFor="note" className="mb-2 block font-medium">
          Note (optional)
        </Label>
        <Textarea
          id="note"
          placeholder="Any special requests or notes"
          value={formData.note}
          onChange={(e) => updateFormData("note", e.target.value)}
          className="w-full min-h-[100px]"
        />
      </div>
    </div>
  );
}
