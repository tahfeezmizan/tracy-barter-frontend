import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { BookingFormData } from '@/app/(common)/service/booking/page';

interface Step4Props {
  formData: BookingFormData;
  updateFormData: (field: keyof BookingFormData, value: any) => void;
}

export default function Steps4({ formData, updateFormData }: Step4Props) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
        <p className="text-sm text-gray-600 mb-4">How can we reach you?</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="mb-2 block font-medium">Full Name</Label>
          <Input
            id="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => updateFormData('name', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="email" className="mb-2 block font-medium">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="phone" className="mb-2 block font-medium">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="(123) 456-7890"
            value={formData.phone}
            onChange={(e) => updateFormData('phone', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="address" className="mb-2 block font-medium">Service Address</Label>
          <Textarea
            id="address"
            placeholder="Enter your complete address"
            value={formData.address}
            onChange={(e) => updateFormData('address', e.target.value)}
            className="min-h-[100px]"
          />
        </div>
      </div>
    </div>
  );
}
