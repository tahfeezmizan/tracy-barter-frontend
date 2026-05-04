"use client";

import { Card } from "@/components/ui/card";
import { XCircle } from "lucide-react";
import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function PaymentCancelContent() {
  return (
    <div className="min-h-screen bg-background p-3 sm:p-6 lg:p-8 flex items-center justify-center">
      <div className="w-full max-w-3xl animate-fade-in">
        <Card className="border border-border overflow-hidden p-0">
          <div className="bg-destructive/10 p-8 text-center min-h-[60vh] flex flex-col justify-center">
            <div className="flex justify-center mb-6">
              <div className="animate-in zoom-in duration-300">
                <XCircle className="h-16 w-16 text-destructive" />
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Payment Cancelled
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mb-8">
              Your payment process was cancelled and no charges were made.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild variant="outline" className="min-w-[140px]">
                <Link href="/">Back to Home</Link>
              </Button>
              <Button asChild className="min-w-[140px]">
                <Link href="/pricing">Try Again</Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function PaymentCancelPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <PaymentCancelContent />
    </Suspense>
  );
}
