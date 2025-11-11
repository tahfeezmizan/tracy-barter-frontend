// import Image from "next/image";
// import Link from "next/link";

// export default function ServicesItem() {
//   return (
//     <div
//       style={{
//         background: `linear-gradient(to top, #fbf8f0 92%, #f0f1f5ad 80%)`,
//       }}
//     >
//       <div className="max-w-7xl mx-auto px-4 py-24">
//         <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
//           <div className="flex-1 w-[550px] h-[550px]">
//             <Image
//               src={require("@/assets/services-item.png")}
//               alt="services "
//               width={1000}
//               height={1000}
//               className=""
//             />
//           </div>
//           <div className="flex-1">
//             <h3 className="text-4xl font-semibold text-primary mb-4">
//               Home Cleaning
//             </h3>
//             <p className="text-lg text-gray-500">
//               Scheduled wellness checks for your property while you're away.
//             </p>

//             <div className="my-8">
//               <h3 className="text-2xl font-medium text-primary">What we do:</h3>
//               <ul className="mt-4 list-disc list-inside text-gray-500 space-y-1">
//                 <li>Exterior & interior walkthrough</li>
//                 <li>Doors/windows, thermostat & humidity check</li>
//                 <li>Leak, breaker, and appliance glance-over</li>
//                 <li>Quick photo report in your dashboard</li>
//               </ul>
//             </div>

//             <div className="pb-12">
//               <h3 className="text-2xl font-medium text-primary mb-4">
//                 When to book:
//               </h3>
//               <p className="text-base text-gray-500">
//                 travel days, after storms, before guests, or any time you want
//                 peace of mind.
//               </p>
//             </div>

//             <Link
//               href={"#"}
//               className="text-2xl text-white mt-6 px-4 py-2 bg-secondary rounded-lg hover:bg-secondary/80 "
//             >
//               Book Now
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import Image from "next/image";
import Link from "next/link";

interface ServicesItemProps {
  title: string;
  description: string;
  image: string;
  whatWeDo: string[];
  whenToBook: string;
  buttonLabel?: string;
  buttonLink?: string;
  reverse?: boolean;
}

export default function ServicesItem({
  title,
  description,
  image,
  whatWeDo,
  whenToBook,
  buttonLabel = "Book Now",
  buttonLink = "#",
  reverse = false,
}: ServicesItemProps) {
  return (
    <section
      style={{
        background: `linear-gradient(to top, #fbf8f0 92%, #f0f1f5ad 80%)`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-10 lg:py-24 lg:pb-36">
        <div
          className={`flex flex-col ${
            reverse ? "lg:flex-row-reverse" : "lg:flex-row"
          } items-center justify-between gap-10`}
        >
          <div className="flex-1 w-full md:w-[550px] h-auto md:h-[500px]">
            <Image
              src={image}
              alt={title}
              width={1000}
              height={1000}
              className="rounded-xl object-cover"
            />
          </div>

          <div className="flex-1">
            <h3 className="text-4xl font-medium text-primary mb-2 md:mb-4">
              {title}
            </h3>
            <p className="text-lg text-gray-500">{description}</p>

            <div className="my-6 md:my-8">
              <h4 className="text-2xl font-medium text-primary">What we do:</h4>
              <ul className="mt-4 list-disc list-inside text-gray-500 space-y-1">
                {whatWeDo.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="pb-2 lg:pb-12">
              <h4 className="text-2xl font-medium text-primary mb-2.5 md:mb-4">
                When to book:
              </h4>
              <p className="text-base text-gray-500">{whenToBook}</p>
            </div>

            <Link
              href={buttonLink}
              className="text-2xl text-white mt-6 px-4 py-2 bg-secondary rounded-lg hover:bg-secondary/80 inline-block"
            >
              {buttonLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
