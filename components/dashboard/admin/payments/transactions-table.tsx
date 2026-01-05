"use client";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Download, Search } from "lucide-react";
import { useGetAllPaymentQuery } from "@/redux/features/payments/paymentsApis";
import { Booking } from "@/lib/types/payment.types";

const transactions = [
  {
    date: "2025-10-20",
    client: "John Smith",
    service: "Home Cleaning",
    method: "Credit Card",
    amount: "$125.00",
    status: "completed",
  },
  {
    date: "2025-10-20",
    client: "Sarah Davis",
    service: "Grocery Shopping",
    method: "Credit Card",
    amount: "$45.50",
    status: "completed",
  },
  {
    date: "2025-10-19",
    client: "Mike Wilson",
    service: "Maintenance",
    method: "Credit Card",
    amount: "$175.00",
    status: "completed",
  },
  {
    date: "2025-10-19",
    client: "Emily Brown",
    service: "Premium Subscription",
    method: "Credit Card",
    amount: "$49.99",
    status: "completed",
  },
  {
    date: "2025-10-18",
    client: "David Lee",
    service: "Snow Removal",
    method: "Credit Card",
    amount: "$75.00",
    status: "pending",
  },
];

export default function TransactionsTable() {
  const { data } = useGetAllPaymentQuery(undefined);
  console.log("useGetAllPaymentQuery", data);

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
      <Tabs defaultValue="all" className="w-full text-black">
        <TabsList className="bg-gray-100 rounded-full p-1">
          <TabsTrigger
            value="all"
            className="rounded-full px-4 py-1 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            All Payments
          </TabsTrigger>
          <TabsTrigger value="completed" className="rounded-full px-4 py-1">
            Completed
          </TabsTrigger>
          <TabsTrigger value="pending" className="rounded-full px-4 py-1">
            Pending
          </TabsTrigger>
          <TabsTrigger value="failed" className="rounded-full px-4 py-1">
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
        />
      </div>

      {/* Table */}
      <CardContent className="p-0 border text-black rounded-md">
        <Table>
          <TableHeader className="bg-gray-100 ">
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Email</TableHead>
              {/* <TableHead>Service</TableHead> */}
              <TableHead>Payment Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.data?.map((payment: Booking) => (
              <TableRow key={payment?._id } className="hover:bg-gray-50">
                <TableCell>{payment?.createdAt}</TableCell>
                <TableCell>{payment?.user?.email}</TableCell>
                {/* <TableCell>{payment?.services || "0"}</TableCell> */}
                <TableCell>{payment?.paymentType}</TableCell>
                <TableCell>{payment?.amount}</TableCell>

                <TableCell>
                  {payment.status === "completed" ? (
                    <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm">
                      completed
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-gray-200 text-gray-600 rounded-full text-sm">
                      pending
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
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
