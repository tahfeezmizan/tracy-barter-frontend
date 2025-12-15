"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function ConfirmationPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 flex items-center justify-center">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <CardTitle className="text-3xl">Booking Confirmed!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <p className="text-gray-600 text-lg">
            Thank you for booking with SparkleClean. Your cleaning appointment
            has been successfully scheduled.
          </p>

          <div className="bg-blue-50 p-6 rounded-lg">
            <p className="text-sm text-gray-700">
              A confirmation email has been sent to your email address with all
              the booking details. Our team will contact you shortly to confirm
              the appointment.
            </p>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              variant="outline"
              onClick={() => router.push("/")}
              className="flex-1"
            >
              Back to Home
            </Button>
            <Button
              onClick={() => router.push("/service")}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Book Another Service
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
