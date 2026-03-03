// /* eslint-disable @typescript-eslint/no-explicit-any */

// "use client";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { StaffDetailsDialog } from "@/lib/modal/staff-details-dialog";
// import { useGetStaffQuery } from "@/redux/features/service/clientApis";
// import { useDeleteStaffMutation } from "@/redux/features/service/staffApis";
// import { CircleUser, Mail, Phone } from "lucide-react";
// import Swal from "sweetalert2";
// import Image from "next/image";
// import { useState } from "react";

// export default function StaffCards() {
//   const [open, setOpen] = useState(false);
//   const [staffId, setStaffId] = useState<string | null>(null);

//   const { data } = useGetStaffQuery();

//   const [deleteStaff] = useDeleteStaffMutation();

//   const handleDelete = async (id: string) => {
//     // Step 1: Ask for confirmation
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//       cancelButtonText: "Cancel",
//     });

//     if (result.isConfirmed) {
//       try {
//         // Step 2: Perform delete
//         const res: any = await deleteStaff(id);

//         // Step 3: Show success message
//         Swal.fire("Deleted!", "Staff has been deleted.", "success");
//       } catch (error) {
//         Swal.fire(
//           "Error!",
//           "Something went wrong while deleting staff.",
//           "error",
//         );
//       }
//     }
//   };

//   const openModal = (id: string) => {
//     setStaffId(id);
//     setOpen(true);
//   };

//   return (
//     <div className="">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {data?.data?.map((person: any, i: number) => (
//           <Card key={i} className="p-6 rounded-xl shadow-sm bg-white">
//             <CardContent className="p-0 space-y-4">
//               {/* Header */}
//               <div className="flex items-center justify-between mb-7">
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 rounded-full border text-white flex items-center justify-center font-semibold">
//                     {person?.profile ? (
//                       <Image
//                         src={person?.profile}
//                         alt={person?.name}
//                         width={200}
//                         height={200}
//                         className="w-full h-full rounded-full"
//                       />
//                     ) : (
//                       <CircleUser className="text-black size-12" />
//                     )}
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-lg text-black capitalize">
//                       {person?.name}
//                     </h3>
//                     <p className="text-gray-500 text-sm">
//                       {person?.service || person?.role}
//                     </p>
//                   </div>
//                 </div>

//                 <span className="px-3 py-1 text-sm bg-green-500 text-white rounded-full">
//                   Active
//                 </span>
//               </div>

//               {/* Rating + Completed */}
//               <div className="flex items-center justify-between text-sm">
//                 <div className="text-gray-600">Rating</div>
//                 <div className="flex items-center gap-1 text-gray-800">
//                   {person?.rating || 0} ⭐
//                 </div>
//               </div>

//               <div className="flex items-center justify-between text-sm">
//                 <div className="text-gray-600">Completed</div>
//                 <div className="text-gray-800">
//                   {person?.services?.length || 0} services
//                 </div>
//               </div>

//               {/* Contact Details */}
//               <div className="space-y-2 text-sm text-gray-700">
//                 <div className="flex items-center gap-2">
//                   <Mail size={16} className="text-gray-500" />
//                   {person?.email}
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Phone size={16} className="text-gray-500" />
//                   {person?.phone || "XXXXXXXXXX"}
//                 </div>
//               </div>

//               {/* Button */}
//               <div className="flex items-center justify-center gap-4 mt-2">
//                 <Button
//                   onClick={() => openModal(person?._id)}
//                   className="flex-1  bg-gray-100 text-gray-800 hover:bg-gray-200"
//                 >
//                   View Details
//                 </Button>
//                 <Button
//                   onClick={() => handleDelete(person?._id)}
//                   className="flex-1 bg-red-400 text-white hover:bg-red-500"
//                 >
//                   Delete Staff
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//       {staffId && (
//         <StaffDetailsDialog
//           open={open}
//           onOpenChange={setOpen}
//           staffId={staffId}
//         />
//       )}
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StaffDetailsDialog } from "@/lib/modal/staff-details-dialog";
import { useGetStaffQuery } from "@/redux/features/service/clientApis";
import { useDeleteStaffMutation } from "@/redux/features/service/staffApis";
import {
  ChevronLeft,
  ChevronRight,
  CircleUser,
  Mail,
  Phone,
} from "lucide-react";
import Swal from "sweetalert2";
import Image from "next/image";
import { useState } from "react";

export default function StaffCards() {
  const [open, setOpen] = useState(false);
  const [staffId, setStaffId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useGetStaffQuery({ page: currentPage, limit: 10 });

  const totalPages = data?.meta?.totalPages || 1;

  const [deleteStaff] = useDeleteStaffMutation();

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const res: any = await deleteStaff(id);
        Swal.fire("Deleted!", "Staff has been deleted.", "success");
      } catch (error) {
        Swal.fire(
          "Error!",
          "Something went wrong while deleting staff.",
          "error",
        );
      }
    }
  };

  const openModal = (id: string) => {
    setStaffId(id);
    setOpen(true);
  };

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data?.map((person: any, i: number) => (
          <Card key={i} className="p-6 rounded-xl shadow-sm bg-white">
            <CardContent className="p-0 space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-7">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full border text-white flex items-center justify-center font-semibold">
                    {person?.profile ? (
                      <Image
                        src={person?.profile}
                        alt={person?.name}
                        width={200}
                        height={200}
                        className="w-full h-full rounded-full"
                      />
                    ) : (
                      <CircleUser className="text-black size-12" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-black capitalize">
                      {person?.name}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {person?.service || person?.role}
                    </p>
                  </div>
                </div>

                <span className="px-3 py-1 text-sm bg-green-500 text-white rounded-full">
                  Active
                </span>
              </div>

              {/* Rating + Completed */}
              <div className="flex items-center justify-between text-sm">
                <div className="text-gray-600">Rating</div>
                <div className="flex items-center gap-1 text-gray-800">
                  {person?.rating || 0} ⭐
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="text-gray-600">Completed</div>
                <div className="text-gray-800">
                  {person?.services?.length || 0} services
                </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-gray-500" />
                  {person?.email}
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-gray-500" />
                  {person?.phone || "XXXXXXXXXX"}
                </div>
              </div>

              {/* Button */}
              <div className="flex items-center justify-center gap-4 mt-2">
                <Button
                  onClick={() => openModal(person?._id)}
                  className="flex-1 bg-gray-100 text-gray-800 hover:bg-gray-200"
                >
                  View Details
                </Button>
                <Button
                  onClick={() => handleDelete(person?._id)}
                  className="flex-1 bg-red-400 text-white hover:bg-red-500"
                >
                  Delete Staff
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-8">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <ChevronLeft className="size-5" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 rounded-full transition-colors duration-200 ${
                currentPage === page
                  ? "bg-primary text-white font-semibold"
                  : "border border-white text-white hover:bg-neutral-100"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      )}

      {staffId && (
        <StaffDetailsDialog
          open={open}
          onOpenChange={setOpen}
          staffId={staffId}
        />
      )}
    </div>
  );
}
