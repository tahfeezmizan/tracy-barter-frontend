"use client";

import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";

export default function ReferralTable() {
  const referrals = [
    {
      name: "John Smith",
      email: "john@example.com",
      phone: "(555) 123-4567",
      referredBy: "john@example.com",
    },
    {
      name: "Sarah Davis",
      email: "sarah@example.com",
      phone: "(555) 234-5678",
      referredBy: "john@example.com",
    },
    {
      name: "Mike Wilson",
      email: "mike@example.com",
      phone: "(555) 345-6789",
      referredBy: "john@example.com",
    },
    {
      name: "Emily Brown",
      email: "emily@example.com",
      phone: "(555) 456-7890",
      referredBy: "john@example.com",
    },
    {
      name: "David Lee",
      email: "david@example.com",
      phone: "(555) 567-8901",
      referredBy: "john@example.com",
    },
  ];

  return (
    <div className="p-6 bg-white text-black rounded-xl">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">All Referral</h2>
        <p className="text-gray-500 text-lg">
          View and manage Referral information
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-sm mb-6">
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input placeholder="Search clients..." className="pl-10 bg-white" />
      </div>

      {/* Table */}
      <Card className="bg-white py-0">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 border-b">
                <TableHead className="p-4 font-medium">Name</TableHead>
                <TableHead className="p-4 font-medium">Email</TableHead>
                <TableHead className="p-4 font-medium">Phone</TableHead>
                <TableHead className="p-4 font-medium">Referred By</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {referrals.map((r, i) => (
                <TableRow key={i} className="border-b">
                  <TableCell className="p-4">{r.name}</TableCell>
                  <TableCell className="p-4">{r.email}</TableCell>
                  <TableCell className="p-4">{r.phone}</TableCell>
                  <TableCell className="p-4">{r.referredBy}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
