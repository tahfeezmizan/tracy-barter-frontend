// "use client";

// import { Card, CardContent } from "@/components/ui/card";
// import { useGetStaffQuery } from "@/redux/features/service/clientApis";
// import { ImageOff } from "lucide-react";
// import Image from "next/image";

// export default function OurTeam() {
//   const { data } = useGetStaffQuery();

//   const teamMembers = data?.data || [];

//   console.log(data);

//   return (
//     <div className="bg-white py-16 px-4 lg:px-8">
//       <div className="max-w-7xl mx-auto space-y-4">
//         <div className="max-w-7xl mx-auto text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
//             Meet Our Team
//           </h2>
//           <p className="text-base md:text-lg text-neutral-600 mt-2">
//             Professionals dedicated to making your experience seamless
//           </p>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {teamMembers?.map((member) => (
//             <Card
//               key={member._id}
//               className="transition-all duration-500 ease-out hover:shadow-xl rounded-3xl overflow-hidden p-0"
//             >
//               <CardContent className="p-2 pb-0 text-center">
//                 <div className="relative">
//                   {member.image ? (
//                     <Image
//                       src={member?.image}
//                       alt={member.name}
//                       width={400}
//                       height={400}
//                       className="w-full rounded-2xl h-72 object-cover transition-transform duration-500 overflow-hidden"
//                     />
//                   ) : (
//                     <div className="w-full h-72 rounded-2xl bg-gray-200 flex items-center justify-center">
//                       <ImageOff className="text-gray-400 size-24" />
//                     </div>
//                   )}
//                 </div>
//                 <div className="p-4">
//                   <h3 className="text-2xl sm:text-2xl font-bold text-neutral-900 mb-1">
//                     {member.name}
//                   </h3>
//                   <p className="text-sm sm:text-base text-neutral-600">
//                     {member.role}
//                   </p>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useGetStaffQuery } from "@/redux/features/service/clientApis";
import { ImageOff, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function OurTeam() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useGetStaffQuery({ page: currentPage, limit: 10 });

  const teamMembers = data?.data || [];
  const meta = data?.meta;
  const totalPages = meta?.totalPages || 1;

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="bg-white py-16 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
            Meet Our Team
          </h2>
          <p className="text-base md:text-lg text-neutral-600 mt-2">
            Professionals dedicated to making your experience seamless
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {teamMembers?.map((member) => (
            <Card
              key={member._id}
              className="transition-all duration-500 ease-out hover:shadow-xl rounded-3xl overflow-hidden p-0"
            >
              <CardContent className="p-2 pb-0 text-center">
                <div className="relative">
                  {member.image ? (
                    <Image
                      src={member?.image}
                      alt={member.name}
                      width={400}
                      height={400}
                      className="w-full rounded-2xl h-72 object-cover transition-transform duration-500 overflow-hidden"
                    />
                  ) : (
                    <div className="w-full h-72 rounded-2xl bg-gray-200 flex items-center justify-center">
                      <ImageOff className="text-gray-400 size-24" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-2xl sm:text-2xl font-bold text-neutral-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-600">
                    {member.role}
                  </p>
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
                className={`w-10 h-10 rounded-full font-medium transition-colors duration-200 ${
                  currentPage === page
                    ? "bg-primary text-white"
                    : "border border-neutral-200 text-neutral-600 hover:bg-neutral-100"
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
      </div>
    </div>
  );
}
