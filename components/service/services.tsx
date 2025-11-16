import React from "react";
import ServicesItem from "./services-item";

import serviceImg1 from "@/assets/serviceImg1.png";
import serviceImg2 from "@/assets/serviceImg2.png";
import serviceImg3 from "@/assets/serviceImg3.png";
import serviceImg4 from "@/assets/serviceImg4.png";
import serviceImg5 from "@/assets/serviceImg5.jpg";

export default function ServicesPage() {
  const services = [
    {
      title: "Home Cleaning",
      description:
        "Scheduled wellness checks for your property while you're away.",
      image: serviceImg1.src,
      whatWeDo: [
        "Exterior & interior walkthrough",
        "Doors/windows, thermostat & humidity check",
        "Leak, breaker, and appliance glance-over",
        "Quick photo report in your dashboard",
      ],
      whenToBook:
        "Travel days, after storms, before guests, or any time you want peace of mind.",
      buttonLabel: "Book Now",
      buttonLink: "/service/booking",
      reverse: false,
    },
    {
      title: "Grocery Assistant",
      description:
        "On-demand wellness checks for your property while you're away.",
      image: serviceImg2.src,
      whatWeDo: [
        "Exterior & interior walkthrough",
        "Doors/windows, thermostat & humidity check",
        "Leak, breaker, and appliance glance-over",
        "Quick photo report in your dashboard",
      ],
      whenToBook:
        "travel days, after storms, before guests, or any time you want peace of mind.",
      buttonLabel: "Book Now",
      buttonLink: "/service/booking",
      reverse: true,
    },
    {
      title: "Event & Stay Prep",
      description:
        "On-demand wellness checks for your property while you're away.",
      image: serviceImg3.src,
      whatWeDo: [
        "Exterior & interior walkthrough",
        "Doors/windows, thermostat & humidity check",
        "Leak, breaker, and appliance glance-over",
        "Quick photo report in your dashboard",
      ],
      whenToBook:
        "travel days, after storms, before guests, or any time you want peace of mind.",
      buttonLabel: "Book Now",
      buttonLink: "/service/booking",
      reverse: false,
    },
    {
      title: "Occasional Home Checking",
      description:
        "On-demand wellness checks for your property while you're away.",
      image: serviceImg4.src,
      whatWeDo: [
        "Exterior & interior walkthrough",
        "Doors/windows, thermostat & humidity check",
        "Leak, breaker, and appliance glance-over",
        "Quick photo report in your dashboard",
      ],
      whenToBook:
        "travel days, after storms, before guests, or any time you want peace of mind.",
      buttonLabel: "Book Now",
      buttonLink: "/service/booking",
      reverse: true,
    },
    {
      title: "Land Scaping",
      description:
        "On-demand wellness checks for your property while you're away.",
      image: serviceImg5.src,
      whatWeDo: [
        "Exterior & interior walkthrough",
        "Doors/windows, thermostat & humidity check",
        "Leak, breaker, and appliance glance-over",
        "Quick photo report in your dashboard",
      ],
      whenToBook:
        "travel days, after storms, before guests, or any time you want peace of mind.",
      buttonLabel: "Book Now",
      buttonLink: "/service/booking",
      reverse: false,
    },
  ];

  return (
    <main>
      {services.map((service, index) => (
        <ServicesItem key={index} {...service} />
      ))}
    </main>
  );
}
