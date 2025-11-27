"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Star,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  FilePlus2,
} from "lucide-react";

// -----------------------------
// FEEDBACK DATA
// -----------------------------
const feedbackData = [
  {
    name: "John Smith",
    status: "Approved",
    service: "Home Cleaning",
    provider: "Maria Johnson",
    date: "2025-10-20",
    rating: 5,
    comment: "Excellent service! Very thorough and professional.",
    actions: false,
  },
  {
    name: "Sarah Davis",
    status: "Pending",
    service: "Grocery Shopping",
    provider: "David Lee",
    date: "2025-10-20",
    rating: 4,
    comment: "Good service, but forgot one item.",
    actions: true,
  },
  {
    name: "Mike Wilson",
    status: "Approved",
    service: "Home Maintenance",
    provider: "Sarah Williams",
    date: "2025-10-19",
    rating: 5,
    comment: "Fixed the issue perfectly. Very skilled!",
    actions: false,
  },
  {
    name: "Emily Brown",
    status: "Under Review",
    service: "Home Cleaning",
    provider: "Maria Johnson",
    date: "2025-10-19",
    rating: 3,
    comment: "Service was okay, but some areas were missed.",
    actions: false,
  },
];

const statusColor = (status: string) => {
  switch (status) {
    case "Approved":
      return "bg-blue-100 text-blue-700";
    case "Pending":
      return "bg-yellow-100 text-yellow-700";
    case "Under Review":
      return "bg-gray-200 text-gray-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

// -----------------------------
// ISSUES & REPORTS DATA
// -----------------------------
const issuesData = [
  {
    name: "Jane Cooper",
    priority: "high priority",
    status: "open",
    service: "Home Cleaning",
    provider: "Maria Johnson",
    date: "2025-10-18",
    issue: "Client reported damaged vase during cleaning",
    actions: true,
  },
  {
    name: "Robert Taylor",
    priority: "medium priority",
    status: "resolved",
    service: "Grocery Shopping",
    provider: "David Lee",
    date: "2025-10-17",
    issue: "Wrong items purchased",
    actions: false,
  },
];

const priorityStyle = (priority: string) => {
  switch (priority) {
    case "high priority":
      return "bg-red-100 text-red-700";
    case "medium priority":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const statusStyle = (status: string) => {
  switch (status) {
    case "open":
      return "bg-gray-100 text-gray-600";
    case "resolved":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-200 text-gray-700";
  }
};

// -----------------------------
// MAIN COMPONENT
// -----------------------------
export default function ClientFeedback() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="feedback" className="w-full space-y-2">
        <TabsList className="bg-gray-200 rounded-lg ">
          <TabsTrigger value="feedback">Client Feedback</TabsTrigger>
          <TabsTrigger value="issues">Issues & Reports</TabsTrigger>
        </TabsList>

        {/* CLIENT FEEDBACK TAB */}
        <TabsContent value="feedback" className="bg-white p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-black">Service Feedback</h2>
          <p className="text-sm text-gray-500 mb-6">
            Review and respond to client feedback
          </p>

          <div className="space-y-6">
            {feedbackData.map((item, index) => (
              <Card key={index} className="border rounded-xl bg-gray-50">
                <CardContent className="p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">
                          {item.name}
                        </h3>
                        <Badge className={statusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {item.service} by {item.provider}
                      </p>
                      <p className="text-xs text-gray-400">{item.date}</p>
                    </div>

                    {/* rating */}
                    <div className="flex text-yellow-500">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-500" />
                      ))}
                    </div>
                  </div>

                  {/* comment */}
                  <div className="text-sm bg-gray-200/70 p-3 rounded-lg text-gray-700">
                    {item.comment}
                  </div>

                  {/* actions */}
                  {item.actions && (
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm" className="text-black">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Respond
                      </Button>

                      <Button size="sm">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ISSUES & REPORTS TAB */}

        <TabsContent value="issues" className="bg-white p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-black">Issues & Reports</h2>
          <p className="text-sm text-gray-500 mb-6">
            Track and resolve client complaints
          </p>

          <div className="space-y-6">
            {issuesData.map((item, index) => (
              <Card key={index} className="border rounded-xl bg-gray-50">
                <CardContent className="p-6 space-y-4">
                  {/* Header */}
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-gray-900">
                        {item.name}
                      </h3>

                      <Badge className={priorityStyle(item.priority)}>
                        {item.priority}
                      </Badge>

                      <Badge className={statusStyle(item.status)}>
                        {item.status}
                      </Badge>
                    </div>

                    <p className="text-sm text-gray-600">
                      {item.service} by {item.provider}
                    </p>
                    <p className="text-xs text-gray-400">{item.date}</p>
                  </div>

                  {/* Issue description */}
                  <div className="flex items-start gap-2 text-sm text-gray-700 bg-gray-200/60 p-3 rounded-lg">
                    <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
                    {item.issue}
                  </div>

                  {/* Action buttons */}
                  {item.actions && (
                    <div className="flex gap-3 pt-2">
                      <Button variant="outline" size="sm" className="text-black">
                        <FilePlus2 className="h-4 w-4 mr-1" />
                        Add Note
                      </Button>

                      <Button size="sm" className="text-white bg-black">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Resolve
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
