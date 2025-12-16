import { RadioGroup } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import { useParams } from "next/navigation";
import { useGetStaffsbyServiceQuery } from "@/redux/features/staff/staffApis";

interface Step2Props {
  formData: any;
  updateFormData: (field: keyof any, value: any) => void;
}

export default function Step3({ formData, updateFormData, data }: Step2Props) {
  const params = useParams();
  const id = params.booking;
  const { data: staffProvider, isLoading } = useGetStaffsbyServiceQuery({ id });

  console.log("get staffs by service id", staffProvider);

  return (
    <div className="space-y-6">
      {/* Service Provider */}
      <div className="border p-5 rounded-lg border-gray-300">
        <h3 className="text-lg font-semibold">Choose Your Service Provider</h3>
        <p className="text-base text-gray-600">
          Select your preferred concierge representative
        </p>

        <RadioGroup
          value={formData.provider}
          onValueChange={(value) => updateFormData("provider", value)}
          className="mt-5 space-y-3"
        >
          {/* Provider 1 */}
          <div
            onClick={() => updateFormData("provider", "standard")}
            className={`
              flex items-center justify-between p-4 py-3 border rounded-lg cursor-pointer
              ${
                formData.provider === "standard"
                  ? "border-[#155DFC] bg-[#CCE2FF]"
                  : "border-gray-400 hover:bg-gray-50"
              }
            `}
          >
            <div>
              <p className="text-base font-medium text-slate-900">Mike Chen</p>
              <p className="text-base text-gray-600">
                Grocery Shopping • 5 years experience
              </p>
            </div>

            <div className="flex items-center gap-2 text-yellow-500">
              <Star size={16} fill="currentColor" />
              <span className="font-medium text-gray-700">5.5</span>
            </div>
          </div>

          {/* Provider 2 */}
          <div
            onClick={() => updateFormData("provider", "move")}
            className={`
              flex items-center justify-between p-4 border rounded-lg cursor-pointer
              ${
                formData.provider === "move"
                  ? "border-[#155DFC] bg-[#CCE2FF]"
                  : "border-gray-400 hover:bg-gray-50"
              }
            `}
          >
            <div>
              <p className="text-base font-medium text-slate-900">Mike Chen</p>
              <p className="text-base text-gray-600">
                Grocery Shopping • 5 years experience
              </p>
            </div>

            <div className="flex items-center gap-2 text-yellow-500">
              <Star size={16} fill="currentColor" />
              <span className="font-medium text-gray-700">5.5</span>
            </div>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
