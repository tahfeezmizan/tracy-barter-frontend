"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Booking } from "@/lib/types/payment.types";
import { useGetAllPaymentQuery } from "@/redux/features/payments/paymentsApis";
import { Download, Search } from "lucide-react";
import { useState, useMemo } from "react";

export default function TransactionsTable() {
  const { data } = useGetAllPaymentQuery(undefined);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter payments based on active tab
  const filteredPayments = useMemo(() => {
    if (!data?.data) return [];

    let payments = data.data;

    // Filter by tab
    if (activeTab === "completed") {
      payments = payments.filter(
        (payment: Booking) => payment?.status === "completed",
      );
    } else if (activeTab === "pending") {
      payments = payments.filter(
        (payment: Booking) => payment?.status === "pending",
      );
    } else if (activeTab === "failed") {
      payments = payments.filter(
        (payment: Booking) => payment?.status === "cancelled",
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      payments = payments.filter(
        (payment: Booking) =>
          payment.user?.email?.toLowerCase().includes(query) ||
          payment.paymentType?.toLowerCase().includes(query) ||
          payment._id?.toLowerCase().includes(query),
      );
    }

    return payments;
  }, [data, activeTab, searchQuery]);

  return (
    <Card className="bg-white shadow-sm rounded-xl p-6">
      {/* Title */}
      <div className="text-black">
        <h2 className="text-xl font-semibold">Transactions</h2>
        <p className="text-gray-500 text-sm">
          View and manage all payment transactions
        </p>
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full text-black"
      >
        <TabsList className="bg-gray-100 rounded-full p-1">
          <TabsTrigger
            value="all"
            className="rounded-full px-4 py-1 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            All Payments
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="rounded-full px-4 py-1 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Completed
          </TabsTrigger>
          <TabsTrigger
            value="pending"
            className="rounded-full px-4 py-1 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Pending
          </TabsTrigger>
          <TabsTrigger
            value="failed"
            className="rounded-full px-4 py-1 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Failed
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search by client or service..."
          className="pl-9 bg-gray-100 border-none text-black"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Table */}
      <CardContent className="p-0 border text-black rounded-md">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Payment Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment: Booking) => (
                <TableRow key={payment?._id} className="hover:bg-gray-50">
                  <TableCell>
                    {new Date(payment?.createdAt).toISOString().slice(0, 10)}
                  </TableCell>
                  <TableCell>{payment?.user?.email}</TableCell>
                  <TableCell>{payment?.paymentType}</TableCell>
                  <TableCell>{payment?.amount}</TableCell>
                  <TableCell>
                    {payment.status === "completed" ? (
                      <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm">
                        completed
                      </span>
                    ) : payment.status === "pending" ? (
                      <span className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full text-sm">
                        pending
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-red-200 text-red-800 rounded-full text-sm">
                        failed
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Download
                      size={20}
                      className="cursor-pointer text-gray-600 hover:text-black"
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-gray-500"
                >
                  No payments found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
