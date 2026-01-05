// "use client";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { ReferralItem } from "@/lib/types/referral.types";
// import { useGetReferralQuery } from "@/redux/features/referral/referralApis";
// import { Search } from "lucide-react";

// export default function ReferralTable() {
//   const { data } = useGetReferralQuery(undefined);

//   console.log(data);

//   return (
//     <div className="p-6 bg-white text-black rounded-xl">
//       {/* Header */}
//       <div className="mb-6">
//         <h2 className="text-2xl font-semibold">All Referral</h2>
//         <p className="text-gray-500 text-lg">
//           View and manage Referral information
//         </p>
//       </div>

//       {/* Search */}
//       <div className="relative max-w-sm mb-6">
//         <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//         <Input placeholder="Search clients..." className="pl-10 bg-white" />
//       </div>

//       {/* Table */}
//       <Card className="bg-white py-0">
//         <CardContent className="p-0">
//           <Table>
//             <TableHeader>
//               <TableRow className="bg-gray-50 border-b">
//                 <TableHead className="p-4 font-medium">Name</TableHead>
//                 <TableHead className="p-4 font-medium">Email</TableHead>
//                 <TableHead className="p-4 font-medium">Phone</TableHead>
//                 <TableHead className="p-4 font-medium">Referred By</TableHead>
//               </TableRow>
//             </TableHeader>

//             <TableBody>
//               {data?.data?.map((referral: ReferralItem) => (
//                 <TableRow key={referral?._id} className="border-b">
//                   <TableCell className="p-4">{referral?.yourName}</TableCell>
//                   <TableCell className="p-4">
//                     {referral?.referralEmail}
//                   </TableCell>
//                   <TableCell className="p-4">
//                     {referral?.referralPhone || "N/A"}
//                   </TableCell>
//                   <TableCell className="p-4">
//                     {referral?.referralName}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//         <div className="flex justify-end gap-2 p-4">
//           <Button>Prev</Button>
//           <Button>Next</Button>
//         </div>
//       </Card>
//     </div>
//   );
// }


"use client";

import { Button } from "@/components/ui/button";
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
import { ReferralItem } from "@/lib/types/referral.types";
import { useGetReferralQuery } from "@/redux/features/referral/referralApis";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function ReferralTable() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // You can make this configurable if needed
  
  const { data, isLoading, isFetching } = useGetReferralQuery({ page, limit });
  console.log(data)

  const handlePrevPage = () => {
    if (data?.meta?.page && data.meta.page > 1) {
      setPage(data.meta.page - 1);
    }
  };

  const handleNextPage = () => {
    if (data?.meta?.page && data?.meta?.totalPages && data.meta.page < data.meta.totalPages) {
      setPage(data.meta.page + 1);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber);
  };

  // Calculate page numbers to show
  const getPageNumbers = () => {
    if (!data?.meta?.totalPages) return [];
    
    const totalPages = data.meta.totalPages;
    const currentPage = data.meta.page;
    const pageNumbers = [];
    
    // Always show first page
    pageNumbers.push(1);
    
    // Calculate range around current page
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);
    
    // Adjust if we're near the beginning
    if (currentPage <= 3) {
      endPage = Math.min(totalPages - 1, 4);
    }
    
    // Adjust if we're near the end
    if (currentPage >= totalPages - 2) {
      startPage = Math.max(2, totalPages - 3);
    }
    
    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pageNumbers.push('...');
    }
    
    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pageNumbers.push('...');
    }
    
    // Add last page if there's more than one page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  return (
    <div className="p-6 bg-white text-black rounded-xl">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">All Referral</h2>
        <p className="text-gray-500 text-lg">
          View and manage Referral information
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-sm mb-6">
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input placeholder="Search clients..." className="pl-10 bg-white" />
      </div>

      {/* Table */}
      <Card className="bg-white py-0">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 border-b">
                <TableHead className="p-4 font-medium">Name</TableHead>
                <TableHead className="p-4 font-medium">Email</TableHead>
                <TableHead className="p-4 font-medium">Phone</TableHead>
                <TableHead className="p-4 font-medium">Referred By</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading || isFetching ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center p-8">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : data?.data?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center p-8">
                    No referrals found
                  </TableCell>
                </TableRow>
              ) : (
                data?.data?.map((referral: ReferralItem) => (
                  <TableRow key={referral?._id} className="border-b">
                    <TableCell className="p-4">{referral?.yourName}</TableCell>
                    <TableCell className="p-4">
                      {referral?.referralEmail}
                    </TableCell>
                    <TableCell className="p-4">
                      {referral?.referralPhone || "N/A"}
                    </TableCell>
                    <TableCell className="p-4">
                      {referral?.referralName}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
        
        {/* Pagination */}
        {data?.meta && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t">
            <div className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-medium">
                {(data.meta.page - 1) * data.meta.limit + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(data.meta.page * data.meta.limit, data.meta.total)}
              </span>{" "}
              of <span className="font-medium">{data.meta.total}</span> results
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrevPage}
                disabled={data.meta.page === 1 || isLoading || isFetching}
                className="h-8 w-8"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex items-center gap-1">
                {getPageNumbers().map((pageNum, index) => (
                  pageNum === '...' ? (
                    <span key={`ellipsis-${index}`} className="px-2">...</span>
                  ) : (
                    <Button
                      key={pageNum}
                      variant={data.meta.page === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageClick(Number(pageNum))}
                      disabled={isLoading || isFetching}
                      className="h-8 w-8 p-0"
                    >
                      {pageNum}
                    </Button>
                  )
                ))}
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={handleNextPage}
                disabled={data.meta.page === data.meta.totalPages || isLoading || isFetching}
                className="h-8 w-8"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}