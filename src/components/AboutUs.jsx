import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <motion.section 

   initial={{ opacity: 0, y: -80 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }} // animate only once, when 20% visible
  transition={{ duration: 0.8, ease: "easeOut" }}
    
    
    
    id="about" className="w-full py-24 bg-black mt-15 px-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-white">
            About Lunar Performance
          </h2>
          <p className="text-neutral-400 mt-3 max-w-2xl mx-auto">
            Driven by passion, precision, and an obsession with performance.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: Text */}
          <div className="space-y-6 text-neutral-300 leading-relaxed">
            <p>
              Lunar Performance was founded with a single vision — to deliver
              world-class superbikes to riders who demand more than just speed.
              We focus on machines that represent engineering excellence,
              cutting-edge technology, and raw emotion.
            </p>

            <p>
              Every bike we offer is carefully selected, professionally
              inspected, and prepared to meet the highest standards of
              performance and reliability. From documentation to delivery, we
              handle every detail with precision and transparency.
            </p>

            <p>
              We don’t chase volume. We curate machines that matter — bikes that
              inspire confidence, excitement, and pride of ownership.
            </p>
          </div>

          {/* Right: Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <h4 className="text-white font-semibold mb-2">
                Performance First
              </h4>
              <p className="text-neutral-400 text-sm">
                Only high-performance machines that meet our strict technical
                standards.
              </p>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <h4 className="text-white font-semibold mb-2">
                Trusted Process
              </h4>
              <p className="text-neutral-400 text-sm">
                Transparent inspections, verified history, and clean
                documentation.
              </p>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <h4 className="text-white font-semibold mb-2">
                Rider-Focused
              </h4>
              <p className="text-neutral-400 text-sm">
                Built for enthusiasts who value control, precision, and feel.
              </p>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <h4 className="text-white font-semibold mb-2">
                Premium Experience
              </h4>
              <p className="text-neutral-400 text-sm">
                From first contact to delivery — smooth, professional, and
                personal.
              </p>
            </div>
          </div>

        </div>

      </div>
    </motion.section>
  );
};

export default AboutUs;
