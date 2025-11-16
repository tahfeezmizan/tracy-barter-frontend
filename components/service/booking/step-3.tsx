'use client';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookingFormData } from '@/app/(common)/service/booking/page';


interface Step3Props {
  formData: BookingFormData;
  updateFormData: (field: keyof BookingFormData, value: any) => void;
}

const providers = [
  { id: '1', name: 'Mike Chen', service: 'House Cleaning', experience: '5 years experience', rating: 4.8 },
  { id: '2', name: 'Sarah Johnson', service: 'House Cleaning', experience: '3 years experience', rating: 4.9 },
];

export default function Step3({ formData, updateFormData }: Step3Props) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Choose Your Service Provider</h3>
        <p className="text-sm text-gray-600 mb-4">Select your preferred concierge representative</p>
      </div>

      <RadioGroup value={formData.provider} onValueChange={(value) => updateFormData('provider', value)}>
        <div className="space-y-3">
          {providers.map((provider) => (
            <div key={provider.id} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-blue-50 cursor-pointer data-[state=checked]:bg-blue-50 data-[state=checked]:border-blue-500">
              <RadioGroupItem value={provider.id} id={provider.id} />
              <Label htmlFor={provider.id} className="flex-1 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-900">{provider.name}</div>
                    <div className="text-sm text-gray-600">{provider.service} • {provider.experience}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="font-medium">{provider.rating}</span>
                  </div>
                </div>
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Select Date & Time</h3>
        <p className="text-sm text-gray-600 mb-4">Choose when you'd like the service</p>

        <div className="space-y-4">
          <div>
            <Label htmlFor="date" className="mb-2 block font-medium">Select Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date ? formData.date.toISOString().split('T')[0] : ''}
              onChange={(e) => updateFormData('date', e.target.value ? new Date(e.target.value) : undefined)}
              className="w-full"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startTime" className="mb-2 block font-medium">Starting Time</Label>
              <Select value={formData.startTime} onValueChange={(value) => updateFormData('startTime', value)}>
                <SelectTrigger id="startTime">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 14 }, (_, i) => i + 6).map(hour => (
                    <SelectItem key={hour} value={`${hour}:00`}>{hour}:00</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="endTime" className="mb-2 block font-medium">End Time</Label>
              <Select value={formData.endTime} onValueChange={(value) => updateFormData('endTime', value)}>
                <SelectTrigger id="endTime">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 14 }, (_, i) => i + 7).map(hour => (
                    <SelectItem key={hour} value={`${hour}:00`}>{hour}:00</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
