import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

interface Step1Props {
  formData: any;
  updateFormData: (field: keyof any, value: any) => void;
}

export default function Step1({ formData, updateFormData, data }: Step1Props) {
  console.log("From Step 1", data);

  return (
    <div className="space-y-6 border p-5 rounded-lg border-gray-300">
      <div>
        <h3 className="text-2xl font-bold mb-4">Service Type</h3>
        <RadioGroup
          value={formData.serviceType}
          onValueChange={(value) => updateFormData("serviceType", value)}
        >
          {data?.serviceType?.map((type) => (
            <div className="flex items-center justify-center gap-5 p-4 py-3 border border-gray-400 rounded-lg hover:bg-gray-50 cursor-pointer">
              <Checkbox
                value={type?._id}
                id={type?._id}
                className="border-black"
              />
              <Label
                htmlFor={type?._id}
                className="flex-1 flex-col items-start cursor-pointer"
              >
                <p className="text-lg font-bold text-slate-900">
                  {type?.title}
                </p>
                <p className="text-base text-gray-600">{type?.description}</p>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {data?.fields?.map((field) => (
          <div>
            <Label
              htmlFor={field?.name}
              className="mb-2 block text-lg font-semibold text-secondary capitalize"
            >
              {field?.label}
            </Label>
            {(field?.type === "number" || field?.type === "string") && (
              <Input
                id={field?.name}
                type={field?.type === "number" ? "number" : "text"}
                placeholder={`Enter ${field?.label.toLowerCase()}`}
                value={formData[field?.name] as string}
                onChange={(e) => updateFormData(field?.name, e.target.value)}
                className="border-none bg-gray-200 text-black !text-xl py-5 focus:ring-2 focus:ring-primary/75 focus:outline-none"
              />
            )}

            {field?.type === "boolean" && (
              <div className="flex items-center gap-3">
                <Checkbox id={field?.name} className="border-black" />
                <Label htmlFor={field?.name}>Yes</Label>
              </div>
            )}
          </div>
        ))}
      </div>
      <div>
        <Label
          htmlFor="note"
          className="mb-2 block text-lg font-semibold text-secondary"
        >
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
