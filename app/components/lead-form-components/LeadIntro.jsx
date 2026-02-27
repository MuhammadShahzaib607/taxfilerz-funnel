"use client"
import React from 'react';
import { motion } from 'framer-motion';

const LeadIntro = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-sm font-black tracking-[0.4em] text-[#F22A5C] uppercase mb-4">
            Take the First Step
          </h2>
          <h1 className="text-4xl md:text-6xl font-black text-[#1D2F52] leading-tight mb-6">
            Expert Financial Guidance <br /> 
            <span className="text-gray-400">Tailored for Your Business</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto font-medium leading-relaxed">
            Whether you need FBR compliance, streamlined bookkeeping, or professional digital invoicing, 
            our team of experts is ready to help you navigate the complexities of finance.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default LeadIntro;