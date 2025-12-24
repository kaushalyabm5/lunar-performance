import React from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const reviews = [
  {
    name: "Kasun Perera",
    bike: "BMW S1000RR",
    rating: 5,
    review:
      "The bike arrived in perfect condition. The entire process felt professional and premium from start to finish.",
  },
  {
    name: "Nimal Fernando",
    bike: "Yamaha R1",
    rating: 5,
    review:
      "Lunar Performance delivered exactly what they promised. Smooth communication, clean documentation, no stress.",
  },
  {
    name: "Sachin Silva",
    bike: "Ducati Panigale V4",
    rating: 4,
    review:
      "Insane machine. Inspection report and delivery were spot on. You can feel the trust factor here.",
  },

  {
    name: "Sachin Silva",
    bike: "Ducati Panigale V4",
    rating: 4,
    review:
      "Insane machine. Inspection report and delivery were spot on. You can feel the trust factor here.",
  },

  {
    name: "Sachin Silva",
    bike: "Ducati Panigale V4",
    rating: 4,
    review:
      "Insane machine. Inspection report and delivery were spot on. You can feel the trust factor here.",
  },

  {
    name: "Sachin Silva",
    bike: "Ducati Panigale V4",
    rating: 4,
    review:
      "Insane machine. Inspection report and delivery were spot on. You can feel the trust factor here.",
  },
];

const CustomerReviews = () => {
  return (
    <motion.section 

    initial={{ opacity: 0, y: -80 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }} // animate only once, when 20% visible
  transition={{ duration: 0.8, ease: "easeOut" }}
    
    id="reviews" className="w-full py-24 bg-black px-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-white">
            Trusted by Riders
          </h2>
          <p className="text-neutral-400 mt-3 max-w-2xl mx-auto">
            Real experiences from riders who found their dream machines with Lunar Performance.
          </p>
        </div>

        {/* Reviews Grid */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-8
            justify-items-center
            lg:justify-items-stretch
          "
        >
          {reviews.map((item, index) => (
            <div
              key={index}
              className="
                w-full
                max-w-[360px]
                bg-neutral-900
                border border-neutral-800
                rounded-xl
                p-6
                hover:border-neutral-600
                transition-all
                duration-300
              "
            >
              {/* Stars */}
              <div className="flex gap-1 mb-3">
                {[...Array(item.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-neutral-300 text-sm leading-relaxed mb-6">
                “{item.review}”
              </p>

              {/* User */}
              <div className="border-t border-neutral-800 pt-4">
                <p className="text-white font-medium">
                  {item.name}
                </p>
                <p className="text-neutral-400 text-sm">
                  Owner of {item.bike}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </motion.section>
  );
};

export default CustomerReviews;
