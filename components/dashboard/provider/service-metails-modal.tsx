import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import {
  Clock,
  MapPin,
  Phone,
  Navigation,
  PhoneCall,
  Play,
} from "lucide-react";

interface Props {
  children: React.ReactNode;
  data: any;
}

export function ServiceDetailsModal({ children, data }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-lg p-6">
        <DialogHeader>
          <DialogTitle>Service Details</DialogTitle>
          <DialogDescription>
            Complete information about this appointment
          </DialogDescription>
        </DialogHeader>

        <Card className="p-4 mt-2 flex justify-between items-start bg-gray-100">
          <div className="w-full">
            <div className="border flex items-center justify-between mb-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-semibold">
                  {data.initials}
                </div>
                <div className="">
                  <p className="font-semibold">{data.customer}</p>
                  <p className="text-sm text-gray-500">{data.service}</p>
                </div>
              </div>
              <p className="">Upcoming</p>
            </div>

            <div>
              <div className="mt-2 space-y-1 text-sm text-gray-700">
                <p className="flex items-center gap-2">
                  <Clock size={16} /> {data.time}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin size={16} /> {data.address}
                </p>
                <p className="flex items-center gap-2">
                  <Phone size={16} /> {data.phone}
                </p>
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-4">
          <p className="font-medium">Special Notes:</p>
          <div className="mt-2 p-3 bg-gray-100 rounded-lg text-sm text-gray-700">
            {data.notes}
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <button className="flex-1 border rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-100">
            <Navigation size={18} /> Directions
          </button>

          <button className="flex-1 border rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-100">
            <PhoneCall size={18} /> Call Client
          </button>
        </div>

        <button className="mt-4 w-full bg-gray-900 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-black">
          <Play size={18} /> Start Service Now
        </button>
      </DialogContent>
    </Dialog>
  );
}
