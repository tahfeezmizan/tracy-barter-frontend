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
        { name: "Monthly price", value: "$150 booking fee" },
        { name: "Property visits", value: "One-time check" },
        { name: "Vendor coordination", value: "check" },
        { name: "Storm check", value: "check" },
        { name: "Mail/package handling", value: "x" },
        { name: "Routine maintenance coordination", value: "x" },
        { name: "Seasonal home preparation", value: "x" },
        { name: "Interior refresh before arrival", value: "check" },
        { name: "Grocery/home stocking coordination", value: "x" },
        { name: "Minor project management", value: "Project-based" },
        { name: "Full vendor management & oversight", value: "check" },
        { name: "Emergency response coordination", value: "x" },
        { name: "Priority vendor scheduling", value: "x" },
      ],
    },
    {
      name: "Essential",
      features: [
        { name: "Monthly price", value: "$250/month" },
        { name: "Property visits", value: "1 / month" },
        { name: "Vendor coordination", value: "check" },
        { name: "Storm check", value: "check" },
        { name: "Mail/package handling", value: "check" },
        { name: "Routine maintenance coordination", value: "check" },
        { name: "Seasonal home preparation", value: "x" },
        { name: "Interior refresh before arrival", value: "check" },
        { name: "Grocery/home stocking coordination", value: "x" },
        { name: "Minor project management", value: "x" },
        { name: "Full vendor management & oversight", value: "check" },
        { name: "Emergency response coordination", value: "check" },
        { name: "Priority vendor scheduling", value: "Standard" },
      ],
    },
    {
      name: "Tailor",
      features: [
        { name: "Monthly price", value: "$350/month" },
        { name: "Property visits", value: "Bi-weekly" },
        { name: "Vendor coordination", value: "check" },
        { name: "Storm check", value: "check" },
        { name: "Mail/package handling", value: "check" },
        { name: "Routine maintenance coordination", value: "check" },
        { name: "Seasonal home preparation", value: "check" },
        { name: "Interior refresh before arrival", value: "check" },
        { name: "Grocery/home stocking coordination", value: "check" },
        { name: "Minor project management", value: "check" },
        { name: "Full vendor management & oversight", value: "check" },
        { name: "Emergency response coordination", value: "check" },
        { name: "Priority vendor scheduling", value: "Priority" },
      ],
    },
    {
      name: "Club",
      features: [
        { name: "Monthly price", value: "$550/month" },
        { name: "Property visits", value: "Unlimited" },
        { name: "Vendor coordination", value: "check" },
        { name: "Storm check", value: "check" },
        { name: "Mail/package handling", value: "check" },
        { name: "Routine maintenance coordination", value: "check" },
        { name: "Seasonal home preparation", value: "check" },
        { name: "Interior refresh before arrival", value: "check" },
        { name: "Grocery/home stocking coordination", value: "check" },
        { name: "Minor project management", value: "check" },
        { name: "Full vendor management & oversight", value: "check" },
        { name: "Emergency response coordination", value: "check" },
        { name: "Priority vendor scheduling", value: "Priority placement" },
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
                        plan.features[featureIndex]?.value || "",
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
