// 'use client';

// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { Label } from '@/components/ui/label';
// import { Input } from '@/components/ui/input';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { BookingFormData } from '@/app/(common)/service/booking/page';

// interface Step3Props {
//   formData: BookingFormData;
//   updateFormData: (field: keyof BookingFormData, value: any) => void;
// }

// const providers = [
//   { id: '1', name: 'Mike Chen', service: 'House Cleaning', experience: '5 years experience', rating: 4.8 },
//   { id: '2', name: 'Sarah Johnson', service: 'House Cleaning', experience: '3 years experience', rating: 4.9 },
// ];

// export default function Step3({ formData, updateFormData }: Step3Props) {
//   return (
//     <div className="space-y-6">
//       <div>
//         <h3 className="text-lg font-semibold mb-2">Choose Your Service Provider</h3>
//         <p className="text-sm text-gray-600 mb-4">Select your preferred concierge representative</p>
//       </div>

//       <RadioGroup value={formData.provider} onValueChange={(value) => updateFormData('provider', value)}>
//         <div className="space-y-3">
//           {providers.map((provider) => (
//             <div key={provider.id} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-blue-50 cursor-pointer data-[state=checked]:bg-blue-50 data-[state=checked]:border-blue-500">
//               <RadioGroupItem value={provider.id} id={provider.id} />
//               <Label htmlFor={provider.id} className="flex-1 cursor-pointer">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <div className="font-semibold text-slate-900">{provider.name}</div>
//                     <div className="text-sm text-gray-600">{provider.service} • {provider.experience}</div>
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <span className="text-yellow-500">★</span>
//                     <span className="font-medium">{provider.rating}</span>
//                   </div>
//                 </div>
//               </Label>
//             </div>
//           ))}
//         </div>
//       </RadioGroup>

//       <div className="mt-8">
//         <h3 className="text-lg font-semibold mb-4">Select Date & Time</h3>
//         <p className="text-sm text-gray-600 mb-4">Choose when you'd like the service</p>

//         <div className="space-y-4">
//           <div>
//             <Label htmlFor="date" className="mb-2 block font-medium">Select Date</Label>
//             <Input
//               id="date"
//               type="date"
//               value={formData.date ? formData.date.toISOString().split('T')[0] : ''}
//               onChange={(e) => updateFormData('date', e.target.value ? new Date(e.target.value) : undefined)}
//               className="w-full"
//             />
//           </div>

//           <div className="grid md:grid-cols-2 gap-4">
//             <div>
//               <Label htmlFor="startTime" className="mb-2 block font-medium">Starting Time</Label>
//               <Select value={formData.startTime} onValueChange={(value) => updateFormData('startTime', value)}>
//                 <SelectTrigger id="startTime">
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {Array.from({ length: 14 }, (_, i) => i + 6).map(hour => (
//                     <SelectItem key={hour} value={`${hour}:00`}>{hour}:00</SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             <div>
//               <Label htmlFor="endTime" className="mb-2 block font-medium">End Time</Label>
//               <Select value={formData.endTime} onValueChange={(value) => updateFormData('endTime', value)}>
//                 <SelectTrigger id="endTime">
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {Array.from({ length: 14 }, (_, i) => i + 7).map(hour => (
//                     <SelectItem key={hour} value={`${hour}:00`}>{hour}:00</SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { RadioGroup } from "@/components/ui/radio-group";
import { BookingFormData } from "@/app/(common)/service/booking/page";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

interface Step2Props {
  formData: BookingFormData;
  updateFormData: (field: keyof BookingFormData, value: any) => void;
}

export default function Step2({ formData, updateFormData }: Step2Props) {
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
