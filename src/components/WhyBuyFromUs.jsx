import React from "react";
import {
  ShieldCheck,
  Wrench,
  Truck,
  Headset,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Certified Superbikes",
    description:
      "Every bike is thoroughly inspected and verified for performance, safety, and authenticity.",
    icon: ShieldCheck,
  },
  {
    title: "Expert Inspection",
    description:
      "Our technicians perform detailed mechanical and electronic checks before delivery.",
    icon: Wrench,
  },
  {
    title: "Secure Delivery",
    description:
      "Handled with care and delivered safely to your doorstep with full protection.",
    icon: Truck,
  },
  {
    title: "Dedicated Support",
    description:
      "Our support team is available to guide you before and after your purchase.",
    icon: Headset,
  },
];

const WhyBuyFromUs = () => {
  return (
    <motion.section 
    initial={{ opacity: 0, y: -80 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }} // animate only once, when 20% visible
  transition={{ duration: 0.8, ease: "easeOut" }}
    
    
    className="w-full py-30 px-10">
      {/* ⬇️ THIS flex wrapper is the key */}
      <div className="flex justify-center px-4">
        <div className="w-full max-w-7xl">

          {/* Heading */}
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-semibold text-white">
              Why Buy From Us
            </h2>
            <p className="text-neutral-400 mt-3 max-w-2xl mx-auto">
              We don’t just sell superbikes — we deliver performance, trust, and peace of mind.
            </p>
          </div>

          {/* Cards */}
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-4
              gap-6
              justify-items-center
              lg:justify-items-stretch
            "
          >
            {features.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="
                    w-full
                    max-w-[320px]
                    bg-neutral-900
                    border border-neutral-800
                    p-6
                    rounded-xl
                    hover:border-neutral-600
                    transition-all duration-300
                  "
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-neutral-800 mb-4">
                    <Icon size={22} className="text-white" />
                  </div>

                  <h3 className="text-lg font-medium text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </motion.section>
  );
};

export default WhyBuyFromUs;
