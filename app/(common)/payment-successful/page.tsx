'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle2, Download, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

function PaymentSuccessContent() {


  return (
    <div className="min-h-screen bg-background p-3 sm:p-6 lg:p-8 flex items-center justify-center">
      <div className="w-full max-w-3xl animate-fade-in">
        <Card className="border border-border overflow-hidden p-0"> 
          <div className="bg-primary/20 p-8 text-center min-h-[60vh] flex flex-col justify-center">
            <div className="flex justify-center mb-6">
              <div className="animate-bounce">
                <CheckCircle2 className="h-16 w-16 text-green-600 dark:text-green-400" />
              </div>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Payment Successful!
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mb-8">
              Your payment has been processed successfully
            </p>
          </div>

          
        </Card>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
