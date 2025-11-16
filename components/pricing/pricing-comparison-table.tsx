"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, X } from "lucide-react";

interface PricingPlan {
  name: string;
  features: {
    name: string;
    value: "check" | "x" | "dash" | string;
  }[];
}

interface PricingComparisonTableProps {
  plans?: PricingPlan[];
  title?: string;
  note?: string;
}

export function PricingComparisonTable({
  title = "Compare Plans",
  note = "*When conditions are safe and access is available.",
  plans = [
    {
      name: "À-la-carte",
      features: [
        { name: "Monthly price", value: "dash" },
        { name: "Sessions included", value: "dash" },
        { name: "Time-stamped photo report", value: "check" },
        { name: "Vendor coordination / meet-ups", value: "check" },
        { name: "Priority booking window", value: "x" },
        { name: "Seasonal reminders & checklists", value: "x" },
        { name: "Key/lockbox management", value: "check" },
      ],
    },
    {
      name: "Essential",
      features: [
        { name: "Monthly price", value: "$250" },
        { name: "Sessions included", value: "2 / mo" },
        { name: "Time-stamped photo report", value: "check" },
        { name: "Vendor coordination / meet-ups", value: "check" },
        { name: "Priority booking window", value: "Standard" },
        { name: "Seasonal reminders & checklists", value: "check" },
        { name: "Key/lockbox management", value: "check" },
      ],
    },
    {
      name: "Tailor",
      features: [
        { name: "Monthly price", value: "$400" },
        { name: "Sessions included", value: "4 / mo" },
        { name: "Time-stamped photo report", value: "check" },
        { name: "Vendor coordination / meet-ups", value: "check" },
        { name: "Priority booking window", value: "Standard plus" },
        { name: "Seasonal reminders & checklists", value: "check" },
        { name: "Key/lockbox management", value: "check" },
      ],
    },
    {
      name: "Club",
      features: [
        { name: "Monthly price", value: "$550" },
        { name: "Sessions included", value: "check" },
        { name: "Time-stamped photo report", value: "check" },
        { name: "Vendor coordination / meet-ups", value: "check" },
        { name: "Priority booking window", value: "Priority" },
        { name: "Seasonal reminders & checklists", value: "check" },
        { name: "Key/lockbox management", value: "check" },
      ],
    },
  ],
}: PricingComparisonTableProps) {
  const renderCellValue = (value: string) => {
    if (value === "check") {
      return <Check className="h-5 w-5 text-green-500" strokeWidth={3} />;
    }
    if (value === "x") {
      return <X className="h-5 w-5 text-red-500" strokeWidth={3} />;
    }
    if (value === "dash") {
      return <span className="text-gray-400">-</span>;
    }
    return <span className="text-gray-700">{value}</span>;
  };

  return (
    <div className="w-full pb-20 px-4 sm:px-6 lg:px-8 bg-[#f6faff]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
          Compare Plans
        </h2>

        <div className="overflow-x-auto rounded-lg overflow-hidden">
          <Table className="bg-white border border-gray-300 rounded-lg">
            <TableHeader>
              <TableRow className="text-base bg-gray-200/80 border border-gray-400/70">
                <TableHead className="w-1/4 font-semibold text-gray-600 py-3 px-4">
                  Feature
                </TableHead>
                {plans.map((plan) => (
                  <TableHead
                    key={plan.name}
                    className="w-1/4 font-semibold text-gray-600 py-3 px-4 text-center"
                  >
                    {plan.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {plans[0]?.features.map((_, featureIndex) => (
                <TableRow
                  key={featureIndex}
                  className={"bg-white border-gray-300 text-base text-gray-500"}
                >
                  <TableCell className="font-medium text-gray-500 py-3 px-4">
                    {plans[0].features[featureIndex]?.name}
                  </TableCell>
                  {plans.map((plan) => (
                    <TableCell
                      key={`${plan.name}-${featureIndex}`}
                      className="text-center py-3 px-4"
                    >
                      {renderCellValue(
                        plan.features[featureIndex]?.value || ""
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {note && <p className="text-xl text-gray-600 mt-4">{note}</p>}
      </div>
    </div>
  );
}
