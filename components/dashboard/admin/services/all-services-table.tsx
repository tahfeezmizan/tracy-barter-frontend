// /* eslint-disable @typescript-eslint/no-explicit-any */

// "use client";

// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { useGetServiceQuery } from "@/redux/features/service/serviceApis";
// import { Pencil, Trash2 } from "lucide-react";

// export default function AllServicesTable() {
//   const { data, isLoading } = useGetServiceQuery(undefined);

//   console.log("All SErvice", data);

//   return (
//     <Card className="bg-white shadow-sm rounded-xl p-6 w-full text-black">
//       {/* Title */}
//       <div className="">
//         <h2 className="text-xl font-semibold">All Services</h2>
//         <p className="text-gray-500 text-sm">
//           View and manage your service catalog
//         </p>
//       </div>

//       <CardContent className="p-0 border rounded-md">
//         <Table>
//           <TableHeader className="bg-gray-100 ">
//             <TableRow>
//               <TableHead className="text-gray-700 font-semibold">
//                 Service Name
//               </TableHead>
//               <TableHead className="text-gray-700 font-semibold">
//                 Description
//               </TableHead>
//               <TableHead className="text-gray-700 font-semibold">
//                 Price
//               </TableHead>
//               {/* <TableHead className="text-gray-700 font-semibold">
//                 Duration
//               </TableHead> */}
//               <TableHead className="text-gray-700 font-semibold">
//                 Bookings
//               </TableHead>
//               <TableHead className="text-gray-700 font-semibold">
//                 Status
//               </TableHead>
//               <TableHead className="text-gray-700 font-semibold text-right">
//                 Actions
//               </TableHead>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {data?.data?.map((service) => (
//               <TableRow key={service?._id} className="">
//                 <TableCell>{service?.name}</TableCell>
//                 <TableCell>{service?.description}</TableCell>
//                 <TableCell>${service?.price || "0"}</TableCell>
//                 <TableCell>{service?.bookings || "0"}</TableCell>
//                 <TableCell>
//                   {service?.status === "active" ? (
//                     <span className="px-3 py-1 text-sm bg-green-500 text-white rounded-full">
//                       Active
//                     </span>
//                   ) : (
//                     <span className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-full">
//                       Inactive
//                     </span>
//                   )}
//                 </TableCell>
//                 <TableCell className="text-right">
//                   <div className="flex items-center justify-end gap-3">
//                     <Pencil
//                       size={18}
//                       className="cursor-pointer text-gray-700 hover:text-black"
//                     />
//                     <Trash2
//                       size={18}
//                       className="cursor-pointer text-red-500 hover:text-red-600"
//                     />
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetServiceQuery } from "@/redux/features/service/serviceApis";
import { ChevronLeft, ChevronRight, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

export default function AllServicesTable() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  const { data, isLoading } = useGetServiceQuery({
    page,
    limit: pageSize,
  });

  console.log("All Service", data);

  // Pagination handlers
  const handlePrevPage = () => {
    if (data?.meta?.page && data.meta.page > 1) {
      setPage(data.meta.page - 1);
    }
  };

  const handleNextPage = () => {
    if (
      data?.meta?.page &&
      data?.meta?.totalPages &&
      data.meta.page < data.meta.totalPages
    ) {
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
      pageNumbers.push("...");
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pageNumbers.push("...");
    }

    // Add last page if there's more than one page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <Card className="bg-white shadow-sm rounded-xl p-6 w-full text-black">
      {/* Title */}
      <div className="">
        <h2 className="text-xl font-semibold">All Services</h2>
        <p className="text-gray-500 text-sm">
          View and manage your service catalog
        </p>
      </div>

      <CardContent className="p-0">
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="text-gray-700 font-semibold">
                  Service Name
                </TableHead>
                <TableHead className="text-gray-700 font-semibold">
                  Description
                </TableHead>
                <TableHead className="text-gray-700 font-semibold">
                  Price
                </TableHead>
                <TableHead className="text-gray-700 font-semibold">
                  Bookings
                </TableHead>
                <TableHead className="text-gray-700 font-semibold">
                  Status
                </TableHead>
                <TableHead className="text-gray-700 font-semibold text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center p-8">
                    Loading services...
                  </TableCell>
                </TableRow>
              ) : data?.data?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center p-8">
                    No services found
                  </TableCell>
                </TableRow>
              ) : (
                data?.data?.map((service) => (
                  <TableRow key={service?._id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      {service?.name}
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {service?.description}
                    </TableCell>
                    <TableCell>${service?.price || "0"}</TableCell>
                    <TableCell>{service?.bookings || "0"}</TableCell>
                    <TableCell>
                      {service?.status === "active" ? (
                        <span className="px-3 py-1 text-sm bg-green-500 text-white rounded-full">
                          Active
                        </span>
                      ) : (
                        <span className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-full">
                          Inactive
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Pencil
                          size={18}
                          className="cursor-pointer text-gray-700 hover:text-black"
                        />
                        <Trash2
                          size={18}
                          className="cursor-pointer text-red-500 hover:text-red-600"
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

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
                disabled={data.meta.page === 1 || isLoading}
                className="h-8 w-8"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="flex items-center gap-1">
                {getPageNumbers().map((pageNum, index) =>
                  pageNum === "..." ? (
                    <span key={`ellipsis-${index}`} className="px-2">
                      ...
                    </span>
                  ) : (
                    <Button
                      key={pageNum}
                      variant={
                        data.meta.page === pageNum ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => handlePageClick(Number(pageNum))}
                      disabled={isLoading}
                      className="h-8 w-8 p-0"
                    >
                      {pageNum}
                    </Button>
                  )
                )}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={handleNextPage}
                disabled={data.meta.page === data.meta.totalPages || isLoading}
                className="h-8 w-8"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
