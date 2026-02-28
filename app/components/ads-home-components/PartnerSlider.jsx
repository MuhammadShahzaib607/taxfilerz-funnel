"use client"

import React from 'react';
import { motion } from 'framer-motion';

const PartnerSlider = () => {
  // 1. Partners Images Array (Generated logically from 1 to 10)
  const partners = Array.from({ length: 10 }, (_, i) => `/partner_${i + 1}.jfif`);

  // 2. Animation settings for seamless scrolling
  const sliderVariants = {
    animate: {
      x: ["0%", "-50%"], // Moves from start to halfway (one full set of images)
      transition: {
        x: {
          repeat: Infinity, // Keeps looping forever
          repeatType: "loop",
          duration: 20, // Adjust this number to make it faster (lower) or slower (higher)
          ease: "linear", // Crucial for smooth constant speed
        },
      },
    },
  };

  return (
    <section className="py-20 bg-gray-50 overflow-hidden relative">
      {/* Background Decorative Gradient */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[#1D2F52]/5 blur-[100px] rounded-full -ml-40 -mt-40" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1D2F52]/10 border border-[#1D2F52]/20 text-[#1D2F52] mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1D2F52] animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Our Trusted Network</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-[#1D2F52] tracking-tighter uppercase mb-2">
          Valued <span className="text-[#F22A5C]">Partners</span>
        </h2>
        <p className="text-gray-400 font-medium text-sm md:text-base max-w-md mx-auto">
          We collaborate with industry leaders to deliver the best financial and technical solutions for your business.
        </p>
      </div>

      {/* 3. INFINITE SLIDER CONTAINER */}
      <div className="relative w-full flex items-center">
        {/* Gradient Overlays for Fade Effect (Crucial for premium look) */}
        <div className="absolute left-0 top-0 w-20 md:w-40 h-full bg-gradient-to-r from-gray-50 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 w-20 md:w-40 h-full bg-gradient-to-l from-gray-50 to-transparent z-20 pointer-events-none" />

        {/* Framer Motion Animated Div */}
        <motion.div
          className="flex items-center shrink-0"
          variants={sliderVariants}
          animate="animate"
          // This ensures the width is exactly 200% of the content
          style={{ width: "fit-content" }}
        >
          {/* Render the images TWICE for the infinite effect */}
          {[...partners, ...partners].map((logo, index) => (
            <div 
              key={index} 
              className="w-[150px] h-[100px] md:w-[200px] md:h-[120px] flex items-center justify-center mx-6 md:mx-10 shrink-0 group"
            >
              <img
                src={logo}
                alt={`Partner Logo ${index + 1}`}
                className="max-w-full max-h-full object-contain transition-all duration-500 scale-95 group-hover:scale-100"
                // Loading lazy for performance, but the duplicate set might need eager
                loading={index < 10 ? "lazy" : "eager"} 
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PartnerSlider;