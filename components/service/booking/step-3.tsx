import { RadioGroup } from "@/components/ui/radio-group";
import LoadingSpinner from "@/lib/loading-spinner";
import { useGetStaffsbyServiceQuery } from "@/redux/features/staff/staffApis";
import { Star } from "lucide-react";
import { useParams } from "next/navigation";

interface Step2Props {
  formData: any;
  updateFormData: (field: keyof any, value: any) => void;
}

export default function Step3({ formData, updateFormData }) {
  const params = useParams();
  const id = params.booking;
  const { data: staffProvider, isLoading } = useGetStaffsbyServiceQuery({ id });

  console.log(staffProvider);

  return (
    <div className="space-y-6">
      {/* Service Provider */}
      <div className="border p-5 rounded-lg border-gray-300">
        <h3 className="text-lg font-semibold">Choose Your Service Provider</h3>
        <p className="text-base text-gray-600">
          Select your preferred concierge representative
        </p>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="">
            <RadioGroup
              value={formData.provider}
              onValueChange={(value) => updateFormData("provider", value)}
              className="mt-5 space-y-3"
            >
              {staffProvider?.staffs?.map((staff: any) => (
                <div
                  key={staff?.id}
                  onClick={() => updateFormData("provider", staff?._id)}
                  className={`
              flex items-center justify-between p-4 py-3 border rounded-lg cursor-pointer
              ${
                formData.provider === staff?._id
                  ? "border-[#155DFC] bg-[#CCE2FF]"
                  : "border-gray-400 hover:bg-gray-50"
              }
            `}
                >
                  <div>
                    <p className="text-base font-medium text-slate-900">
                      {staff?.name}
                    </p>
                    <p className="text-base text-gray-600">
                      {staff?.role} • 5 years experience
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-yellow-500">
                    <Star size={16} fill="currentColor" />
                    <span className="font-medium text-gray-700">
                      {staff?.avgRating}
                    </span>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}
      </div>
    </div>
  );
}
