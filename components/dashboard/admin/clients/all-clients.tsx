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
import { Eye, Pencil, Search } from "lucide-react";
import { useGetClientsQuery } from "@/config/Types/admin/clientApis";
import LoadingSpinner from "@/lib/loading-spinner";

export default function AllClientsTable() {
  const { data, isLoading } = useGetClientsQuery(undefined);
  console.log(data?.data);

  return (
    <Card className="w-full bg-white text-black">
      <CardHeader className="space-y-2">
        <CardTitle className="text-xl leading-1">All Clients</CardTitle>
        <CardDescription>View and manage client information</CardDescription>

        {/* Search Bar */}
        <div className="relative mt-2 w-full max-w-sm">
          <Input placeholder="Search clients..." className="pl-10" />
          <Search className="size-5 absolute left-3 top-2 text-gray-400" />
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
                <th className="p-4">Subscribe</th>
                <th className="p-4">Services</th>
                <th className="p-4">Total Spent</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <tbody>
                {data?.data?.map((client, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-4 capitalize">{client.name || "-"}</td>
                    <td className="p-4">{client.email || "-"}</td>
                    <td className="p-4">{client.phone || "-"}</td>

                    {/* subscribe Badge */}
                    <td className="p-4">
                      <Badge
                        className={`px-3 py-1 rounded-full ${
                          client.subscribe === ""
                        }`}
                      >
                        {client.subscribe}
                      </Badge>
                    </td>

                    <td className="p-4">jpasdjhp</td>
                    <td className="p-4">{client.totalSpent || "0"}</td>

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
            )}
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
