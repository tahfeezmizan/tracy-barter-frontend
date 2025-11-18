import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BookingFormData } from "@/app/(common)/service/booking/page";
import { Checkbox } from "@/components/ui/checkbox";

interface Step1Props {
  formData: BookingFormData;
  updateFormData: (field: keyof BookingFormData, value: any) => void;
}

export default function Step1({ formData, updateFormData }: Step1Props) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold mb-4">Service Type</h3>
        <RadioGroup
          value={formData.serviceType}
          onValueChange={(value) => updateFormData("serviceType", value)}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-5 p-4 py-3 border border-gray-400 rounded-lg hover:bg-gray-50 cursor-pointer">
              <Checkbox value="standard" id="standard" />
              <Label
                htmlFor="standard"
                className="flex-1 flex-col items-start cursor-pointer"
              >
                <p className="text-lg font-bold text-slate-900">Standard</p>
                <p className="text-base text-gray-600">
                  Regular maintenance Cleaning
                </p>
              </Label>
            </div>

            <div className="flex items-center justify-center gap-5 p-4 border border-gray-400 rounded-lg hover:bg-gray-50 cursor-pointer">
              <Checkbox value="deep" id="deep" />
              <Label
                htmlFor="deep"
                className="flex-1 flex-col items-start cursor-pointer"
              >
                <p className="text-lg font-bold text-slate-900">Deep clean</p>
                <p className="text-base text-gray-600">
                  Detailed cleaning including baseboards, cabinets
                </p>
              </Label>
            </div>

            <div className="flex items-center justify-center gap-5 p-4 border border-gray-400 rounded-lg hover:bg-gray-50 cursor-pointer">
              <Checkbox value="move" id="move" />
              <Label
                htmlFor="move"
                className="flex-1 flex-col items-start cursor-pointer"
              >
                <p className="text-lg font-bold text-slate-900">
                  Move-in / Move out
                </p>
                <p className="text-base text-gray-600">
                  Complete deep cleaning for transitions
                </p>
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
            className="border-none bg-gray-200 text-black !text-xl py-5 focus:ring-2 focus:ring-primary/75 focus:outline-none"
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
            className="border-none bg-gray-200 text-black !text-xl py-5 focus:ring-2 focus:ring-primary/75 focus:outline-none"
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
          className="border-none bg-gray-200 text-black !text-xl py-5 focus:ring-2 focus:ring-primary/75 focus:outline-none"
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
          className="w-full h-20 border-none bg-gray-200 text-black !text-lg py-2 focus:ring-2 focus:ring-primary/75 focus:outline-none"
        />
      </div>
    </div>
  );
}
