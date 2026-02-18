'use client';

import { Card } from '@/components/ui/card';
import { Invoice } from '@/lib/types/invoice.types';
import { DollarSign, FileText, CheckCircle, Clock } from 'lucide-react';

interface InvoiceStatsProps {
  invoices: Invoice[];
}

export default function InvoiceStats({ invoices }: InvoiceStatsProps) {
  const calculateStats = () => {
    const totalAmount = invoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
    const paidAmount = invoices
      .filter((inv) => inv.status === 'paid')
      .reduce((sum, inv) => sum + inv.totalAmount, 0);
    const pendingAmount = invoices
      .filter((inv) => inv.status === 'pending' || inv.status === 'overdue')
      .reduce((sum, inv) => sum + inv.totalAmount, 0);

    return {
      totalAmount,
      paidAmount,
      pendingAmount,
      totalInvoices: invoices.length,
      paidInvoices: invoices.filter((inv) => inv.status === 'paid').length,
      pendingInvoices: invoices.filter(
        (inv) => inv.status === 'pending' || inv.status === 'overdue'
      ).length,
    };
  };

  const stats = calculateStats();

  const statCards = [
    {
      label: 'Total Amount',
      value: `$${stats.totalAmount.toFixed(2)}`,
      icon: DollarSign,
      color: 'from-blue-500 to-blue-600',
      lightColor: 'bg-blue-100 dark:bg-blue-900',
    },
    {
      label: 'Total Invoices',
      value: stats.totalInvoices.toString(),
      icon: FileText,
      color: 'from-purple-500 to-purple-600',
      lightColor: 'bg-purple-100 dark:bg-purple-900',
    },
    {
      label: 'Paid',
      value: `$${stats.paidAmount.toFixed(2)}`,
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      lightColor: 'bg-green-100 dark:bg-green-900',
    },
    {
      label: 'Pending',
      value: `$${stats.pendingAmount.toFixed(2)}`,
      icon: Clock,
      color: 'from-amber-500 to-amber-600',
      lightColor: 'bg-amber-100 dark:bg-amber-900',
    },
  ];

  return (
    <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card
            key={stat.label}
            className="animate-fade-in border border-border overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <div className="p-3 sm:p-4 lg:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-2">
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">
                    {stat.label}
                  </p>
                  <p className="mt-1 sm:mt-2 text-xl sm:text-2xl font-bold text-foreground break-words">
                    {stat.value}
                  </p>
                </div>
                <div className={`rounded-lg ${stat.lightColor} p-2 sm:p-3 flex-shrink-0`}>
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" />
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
