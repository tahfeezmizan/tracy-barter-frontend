"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";

const providers = [
  {
    initials: "MJ",
    name: "Maria Johnson",
    service: "Home Cleaning",
    rating: 4.9,
    completed: 156,
    email: "maria@concierge.com",
    phone: "(555) 111-2222",
  },
  {
    initials: "DL",
    name: "David Lee",
    service: "Grocery Shopping",
    rating: 4.8,
    completed: 203,
    email: "david@concierge.com",
    phone: "(555) 222-3333",
  },
  {
    initials: "SW",
    name: "Sarah Williams",
    service: "Home Maintenance",
    rating: 4.7,
    completed: 89,
    email: "sarah@concierge.com",
    phone: "(555) 333-4444",
  },
  {
    initials: "JB",
    name: "James Brown",
    service: "General Services",
    rating: 4.6,
    completed: 124,
    email: "james@concierge.com",
    phone: "(555) 444-5555",
  },
];

export default function StaffCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {providers.map((person, i) => (
        <Card key={i} className="p-6 rounded-xl shadow-sm bg-white">
          <CardContent className="p-0 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-7">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#0B1F3A] text-white flex items-center justify-center font-semibold">
                  {person.initials}
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-black">
                    {person.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{person.service}</p>
                </div>
              </div>

              <span className="px-3 py-1 text-sm bg-green-500 text-white rounded-full">
                Active
              </span>
            </div>

            {/* Rating + Completed */}
            <div className="flex items-center justify-between text-sm">
              <div className="text-gray-600">Rating</div>
              <div className="flex items-center gap-1 text-gray-800">
                {person.rating} ⭐
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="text-gray-600">Completed</div>
              <div className="text-gray-800">{person.completed} services</div>
            </div>

            {/* Contact Details */}
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-gray-500" />
                {person.email}
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-gray-500" />
                {person.phone}
              </div>
            </div>

            {/* Button */}
            <Button className="w-full mt-2 bg-gray-100 text-gray-800 hover:bg-gray-200">
              View Details
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
