import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { BookingFormData, ServiceResponse } from "@/config/Types/serviceTypes";

interface Step1Props {
  formData: BookingFormData;
  data: ServiceResponse;
  updateFormData: <K extends keyof BookingFormData>(
    field: K,
    value: BookingFormData[K],
  ) => void;
}

export default function Step1({ formData, updateFormData, data }: Step1Props) {
  if (data?.fields) {
    const serviceDetails = data.fields.map((field, index) => {
      return {
        name: field.label,
        value: "",
      };
    });
  }

  // ✅ Only show Service Type section if serviceType list exists and has items
  const hasServiceType = !!data?.serviceType?.length;

  return (
    <div className="space-y-6 border p-5 rounded-lg border-gray-300">
      {/* ✅ SERVICE TYPE — hidden if not provided by API */}
      {hasServiceType && (
        <div>
          <h3 className="text-2xl font-bold mb-4">Service Type</h3>

          <RadioGroup value={formData.serviceType?.title || ""}>
            {data?.serviceType?.map((type: any) => (
              <div
                key={type._id}
                onClick={() => {
                  updateFormData("serviceType", {
                    _id: type._id,
                    title: type?.title,
                    description: type.description,
                  });
                }}
                className={`flex items-center gap-5 p-4 py-3 border rounded-lg cursor-pointer
                  ${
                    formData.serviceType?.title === type.title
                      ? "border-primary bg-gray-100"
                      : "border-gray-400 hover:bg-gray-50"
                  }`}
              >
                <Checkbox
                  checked={formData.serviceType?.title === type.title}
                  className="border-black"
                />

                <div className="flex-1">
                  <p className="text-lg font-bold text-slate-900">
                    {type.title}
                  </p>
                  <p className="text-base text-gray-600">{type.description}</p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}

      {/* dynamic input fields */}
      <div className="grid grid-cols-2 gap-4">
        {data?.fields?.map((field) => (
          <div key={field.name}>
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
                value={formData[field?.name] ?? ""}
                onChange={(e) =>
                  updateFormData(
                    field?.name as keyof BookingFormData,
                    field.type === "number"
                      ? Number(e.target.value)
                      : e.target.value,
                  )
                }
                className="border-none bg-gray-200 text-black text-xl! py-5 focus:ring-2 focus:ring-primary/75 focus:outline-none"
              />
            )}

            {field.type === "boolean" && (
              <RadioGroup
                value={
                  formData[field.name] === true
                    ? "yes"
                    : formData[field.name] === false
                      ? "no"
                      : ""
                }
                onValueChange={(value) =>
                  updateFormData(
                    field.name as keyof BookingFormData,
                    value === "yes",
                  )
                }
                className="flex gap-6 mt-2"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem
                    className="bg-secondary size-5"
                    value="yes"
                    id={`${field.name}-yes`}
                  />
                  <Label htmlFor={`${field.name}-yes`}>Yes</Label>
                </div>

                <div className="flex items-center gap-2">
                  <RadioGroupItem
                    className="bg-secondary size-5"
                    value="no"
                    id={`${field.name}-no`}
                  />
                  <Label htmlFor={`${field.name}-no`}>No</Label>
                </div>
              </RadioGroup>
            )}
          </div>
        ))}
      </div>

      <div>
        <Label
          htmlFor="note"
          className="mb-2 block text-lg font-semibold text-secondary"
        >
          Specific service details
        </Label>
        <Textarea
          id="note"
          placeholder="Please provide any specific details about the service you need"
          value={formData.note}
          onChange={(e) => updateFormData("note", e.target.value)}
          className="w-full h-20 border-none bg-gray-200 text-black text-lg! py-2 focus:ring-2 focus:ring-primary/75 focus:outline-none"
        />
      </div>
    </div>
  );
}
