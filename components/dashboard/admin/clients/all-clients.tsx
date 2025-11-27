"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Eye, Pencil } from "lucide-react";

interface Client {
  name: string;
  email: string;
  phone: string;
  subscription: string;
  services: number;
  totalSpent: string;
}

const clients: Client[] = [
  {
    name: "John Smith",
    email: "john@example.com",
    phone: "(555) 123-4567",
    subscription: "Premium Monthly",
    services: 15,
    totalSpent: "$2450.00",
  },
  {
    name: "Sarah Davis",
    email: "sarah@example.com",
    phone: "(555) 234-5678",
    subscription: "Basic Monthly",
    services: 8,
    totalSpent: "$1200.00",
  },
  {
    name: "Mike Wilson",
    email: "mike@example.com",
    phone: "(555) 345-6789",
    subscription: "Annual Premium",
    services: 25,
    totalSpent: "$3800.00",
  },
  {
    name: "Emily Brown",
    email: "emily@example.com",
    phone: "(555) 456-7890",
    subscription: "Premium Monthly",
    services: 12,
    totalSpent: "$1850.00",
  },
  {
    name: "David Lee",
    email: "david@example.com",
    phone: "(555) 567-8901",
    subscription: "None",
    services: 3,
    totalSpent: "$425.00",
  },
];

export default function AllClientsTable() {
  const subscriptionColor = (type: string) => {
    if (type === "Premium Monthly" || type === "Annual Premium")
      return "bg-[#0a1a2f] text-white";
    if (type === "Basic Monthly") return "bg-blue-100 text-blue-800";
    return "bg-gray-100 text-gray-700"; // None
  };

  return (
    <Card className="w-full bg-white text-black">
      <CardHeader className="space-y-2">
        <CardTitle>All Clients</CardTitle>
        <CardDescription>View and manage client information</CardDescription>

        {/* Search Bar */}
        <div className="relative mt-2 w-full max-w-sm">
          <Input placeholder="Search clients..." className="pl-10" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 absolute left-3 top-3 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 105.65 5.65a7.5 7.5 0 0010.6 10.6z"
            />
          </svg>
        </div>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Subscription</th>
                <th className="p-4">Services</th>
                <th className="p-4">Total Spent</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {clients.map((client, index) => (
                <tr key={index} className="border-t">
                  <td className="p-4">{client.name}</td>
                  <td className="p-4">{client.email}</td>
                  <td className="p-4">{client.phone}</td>

                  {/* Subscription Badge */}
                  <td className="p-4">
                    <Badge
                      className={`${subscriptionColor(
                        client.subscription
                      )} px-3 py-1 rounded-full`}
                    >
                      {client.subscription}
                    </Badge>
                  </td>

                  <td className="p-4">{client.services}</td>
                  <td className="p-4">{client.totalSpent}</td>

                  <td className="p-4 text-center flex items-center justify-center gap-3">
                    <button>
                      <Eye className="h-5 w-5 text-gray-600 hover:text-black" />
                    </button>
                    <button>
                      <Pencil className="h-5 w-5 text-gray-600 hover:text-black" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
