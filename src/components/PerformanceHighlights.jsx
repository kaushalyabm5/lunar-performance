import React from "react";
import { Gauge, Zap, Trophy, Activity } from "lucide-react";
import { motion } from "framer-motion";

const highlights = [
  {
    label: "0–100 km/h",
    value: "2.6s",
    sub: "Lightning Acceleration",
    icon: Zap,
  },
  {
    label: "Top Speed",
    value: "299+ km/h",
    sub: "Electronically Limited",
    icon: Gauge,
  },
  {
    label: "Horsepower",
    value: "210+ HP",
    sub: "Track-Bred Power",
    icon: Activity,
  },
  {
    label: "Racing DNA",
    value: "MotoGP",
    sub: "Inspired Engineering",
    icon: Trophy,
  },
];

const PerformanceHighlights = () => {
  return (
    <motion.section 
    initial={{ opacity: 0, y: -80 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }} // animate only once, when 20% visible
  transition={{ duration: 0.8, ease: "easeOut" }}
    
    className="w-full py-20 ">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-white">
            Typical performance of modern liter-class superbikes
          </h2>
          <p className="text-neutral-400 mt-3 max-w-2xl mx-auto">
            Engineered for extreme performance, precision control, and pure adrenaline.
          </p>
        </div>

        {/* Highlights Grid */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-8
            justify-items-center
            lg:justify-items-stretch
          "
        >
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="
                  w-full
                  max-w-[280px]
                  bg-neutral-900
                  border border-neutral-800
                  rounded-xl
                  p-8
                  text-center
                  hover:border-neutral-600
                  transition-all
                  duration-300
                "
              >
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-neutral-800">
                    <Icon size={22} className="text-white" />
                  </div>
                </div>

                {/* Value */}
                <div className="text-4xl font-bold text-white">
                  {item.value}
                </div>

                {/* Label */}
                <div className="text-sm uppercase tracking-widest text-neutral-400 mt-2">
                  {item.label}
                </div>

                {/* Sub */}
                <p className="text-neutral-500 text-sm mt-3">
                  {item.sub}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </motion.section>
  );
};

export default PerformanceHighlights;
