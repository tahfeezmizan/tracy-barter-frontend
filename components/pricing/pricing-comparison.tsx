// "use client";

// import { Check, X } from "lucide-react";

// // Define the plan data structure
// interface Plan {
//   name: string;
//   features: Feature[];
// }

// interface Feature {
//   name: string;
//   plans: (string | boolean | number | null)[];
// }

// export function PricingComparison() {
//   // Plans and features data
//   const plans: Plan[] = [
//     { name: "À-la-carte", features: [] },
//     { name: "Essential", features: [] },
//     { name: "Tailor", features: [] },
//     { name: "Club", features: [] },
//   ];

//   const features: Feature[] = [
//     {
//       name: "Monthly price",
//       plans: ["-", "$250", "$400", "$550"],
//     },
//     {
//       name: "Sessions included",
//       plans: ["-", "2 / mo", "4 / mo", true],
//     },
//     {
//       name: "Time-stamped photo report",
//       plans: [true, true, true, true],
//     },
//     {
//       name: "Vendor coordination / meet-ups",
//       plans: [true, true, true, true],
//     },
//     {
//       name: "Priority booking window",
//       plans: [false, "Standard", "Standard plus", "Priority"],
//     },
//     {
//       name: "Seasonal reminders & checklists",
//       plans: [false, true, true, true],
//     },
//     {
//       name: "Key/lockbox management",
//       plans: [true, true, true, true],
//     },
//   ];

//   return (
//     <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
//       {/* Header Section */}
//       <div className="mb-8 text-center md:mb-12">
//         <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
//           Compare Plans
//         </h2>
//       </div>

//       {/* Mobile Card View - Hidden on tablet and up */}
//       <div className="space-y-6 md:hidden">
//         {plans.map((plan, planIndex) => (
//           <div
//             key={plan.name}
//             className="overflow-hidden rounded-lg border border-border bg-card"
//           >
//             <div className="bg-muted px-4 py-3">
//               <h3 className="font-semibold text-foreground">{plan.name}</h3>
//             </div>
//             <div className="divide-y divide-border">
//               {features.map((feature, featureIndex) => (
//                 <div
//                   key={feature.name}
//                   className="flex items-center justify-between px-4 py-3"
//                 >
//                   <span className="text-sm font-medium text-foreground">
//                     {feature.name}
//                   </span>
//                   <FeatureCell value={feature.plans[planIndex]} />
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Desktop Table View - Hidden on mobile */}
//       <div className="hidden overflow-x-auto md:block">
//         <table className="w-full border border-gray-200">
//           <thead> 
//             <tr className="border-b border-gray-200 bg-muted">
//               <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
//                 Feature
//               </th>
//               {plans.map((plan) => (
//                 <th
//                   key={plan.name}
//                   className="px-4 py-3 text-center text-sm font-semibold text-foreground"
//                 >
//                   {plan.name}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-border divide-gray-200">
//             {features.map((feature, featureIndex) => (
//               <tr
//                 key={feature.name}
//                 className={
//                   featureIndex % 2 === 0 ? "bg-background" : "bg-muted/30"
//                 }
//               >
//                 <td className="px-4 py-4 text-sm font-medium text-foreground">
//                   {feature.name}
//                 </td>
//                 {feature.plans.map((value, planIndex) => (
//                   <td
//                     key={`${feature.name}-${planIndex}`}
//                     className="px-4 py-4 text-center text-sm text-muted-foreground"
//                   >
//                     <FeatureCell value={value} />
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Disclaimer */}
//       <p className="mt-8 text-xs text-muted-foreground md:mt-10">
//         *When conditions are safe and access is available.
//       </p>
//     </div>
//   );
// }

// /**
//  * FeatureCell Component
//  * Renders the appropriate display for each feature value:
//  * - Checkmark for true
//  * - X mark for false
//  * - Text for strings and numbers
//  */
// interface FeatureCellProps {
//   value: string | boolean | number | null;
// }

// function FeatureCell({ value }: FeatureCellProps) {
//   if (value === true) {
//     return (
//       <div className="flex justify-center">
//         <Check className="h-5 w-5 text-green-600" aria-label="Included" />
//       </div>
//     );
//   }

//   if (value === false) {
//     return (
//       <div className="flex justify-center">
//         <X className="h-5 w-5 text-red-500" aria-label="Not included" />
//       </div>
//     );
//   }

//   if (value === null || value === undefined) {
//     return <span>—</span>;
//   }

//   return <span>{value}</span>;
// }



'use client'

import { Check, X } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// Define the plan data structure
interface Plan {
  name: string
}

interface Feature {
  name: string
  plans: (string | boolean | number | null)[]
}

export function PricingComparison() {
  const plans: Plan[] = [
    { name: 'À-la-carte' },
    { name: 'Essential' },
    { name: 'Tailor' },
    { name: 'Club' },
  ]

  const features: Feature[] = [
    {
      name: 'Monthly price',
      plans: ['-', '$250', '$400', '$550'],
    },
    {
      name: 'Sessions included',
      plans: ['-', '2 / mo', '4 / mo', true],
    },
    {
      name: 'Time-stamped photo report',
      plans: [true, true, true, true],
    },
    {
      name: 'Vendor coordination / meet-ups',
      plans: [true, true, true, true],
    },
    {
      name: 'Priority booking window',
      plans: [false, 'Standard', 'Standard plus', 'Priority'],
    },
    {
      name: 'Seasonal reminders & checklists',
      plans: [false, true, true, true],
    },
    {
      name: 'Key/lockbox management',
      plans: [true, true, true, true],
    },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-8 text-center md:mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Compare Plans
        </h2>
      </div>

      {/* Mobile Card View - Hidden on tablet and up */}
      <div className="space-y-6 md:hidden">
        {plans.map((plan, planIndex) => (
          <div
            key={plan.name}
            className="overflow-hidden rounded-lg border border-border bg-card"
          >
            <div className="bg-muted px-4 py-3">
              <h3 className="font-semibold text-foreground">{plan.name}</h3>
            </div>
            <div className="divide-y divide-border">
              {features.map((feature) => (
                <div
                  key={feature.name}
                  className="flex items-center justify-between px-4 py-3"
                >
                  <span className="text-sm font-medium text-foreground">
                    {feature.name}
                  </span>
                  <FeatureCell value={feature.plans[planIndex]} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View using shadcn Table - Hidden on mobile */}
      <div className="hidden overflow-x-auto md:block rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead className="text-left">Feature</TableHead>
              {plans.map((plan) => (
                <TableHead key={plan.name} className="text-center">
                  {plan.name}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {features.map((feature, featureIndex) => (
              <TableRow
                key={feature.name}
                className={
                  featureIndex % 2 === 0 ? 'bg-background' : 'bg-muted/30'
                }
              >
                <TableCell className="text-left font-medium">
                  {feature.name}
                </TableCell>
                {feature.plans.map((value, planIndex) => (
                  <TableCell
                    key={`${feature.name}-${planIndex}`}
                    className="text-center"
                  >
                    <FeatureCell value={value} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Disclaimer */}
      <p className="mt-8 text-xs text-muted-foreground md:mt-10">
        *When conditions are safe and access is available.
      </p>
    </div>
  )
}

/**
 * FeatureCell Component
 * Renders the appropriate display for each feature value:
 * - Checkmark for true
 * - X mark for false
 * - Text for strings and numbers
 */
interface FeatureCellProps {
  value: string | boolean | number | null
}

function FeatureCell({ value }: FeatureCellProps) {
  if (value === true) {
    return (
      <div className="flex justify-center">
        <Check className="h-5 w-5 text-green-600" aria-label="Included" />
      </div>
    )
  }

  if (value === false) {
    return (
      <div className="flex justify-center">
        <X className="h-5 w-5 text-red-500" aria-label="Not included" />
      </div>
    )
  }

  if (value === null || value === undefined) {
    return <span>—</span>
  }

  return <span>{value}</span>
}
