"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { HiCheckCircle } from 'react-icons/hi';
import Link from 'next/link';

const DashboardFeature = () => {
  const points = [
    "Seamless Digital Tax Submissions",
    "Real-time Bookkeeping & Ledger Tracking",
    "Automated Smart Invoicing System",
    "Advanced Financial Growth Analytics",
    "Multi-user Access & Role Management"
  ];

  return (
    <section className="bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Content: Text & Points */}
          <div className="flex-1 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black text-[#1D2F52] leading-tight mb-6">
                Revolutionize Your <br />
                <span className="bg-gradient-to-r from-[#1D2F52] via-[#F22A5C] to-[#1D2F52] bg-clip-text text-transparent">
                  Financial Control
                </span>
              </h2>
              
              <p className="text-gray-700 text-lg mb-10 max-w-xl font-medium leading-relaxed">
                Take command of your business with our all-in-one dashboard. From complex tax filings to daily bookkeeping, manage everything under one powerful interface designed for speed and precision.
              </p>

              {/* Feature Checklist */}
              <div className="space-y-4 mb-10">
                {points.map((point, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <HiCheckCircle className="text-[#F22A5C] w-6 h-6 shrink-0" />
                    <span className="text-[#1D2F52] font-semibold text-[17px]">{point}</span>
                  </motion.div>
                ))}
              </div>

              {/* Action Button */}
              <button className="px-10 py-4 bg-[#1D2F52] text-white rounded-2xl font-bold text-lg hover:bg-[#F22A5C] transition-all duration-300 shadow-xl shadow-[#1D2F52]/20 group">
                <a href="/home">Start Your Free Trial <span className="inline-block group-hover:translate-x-1 transition-transform ml-2">→</span></a>
              </button>
            </motion.div>
          </div>

          {/* Right Content: Laptop Image with Floating Effect */}
          <div className="flex-1 order-1 lg:order-2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              {/* Main Image with Shadow & Border */}
              <div className="relative p-2 rounded-[2rem]">
                <img 
                  src="/laptop-dashboard.jpeg" 
                  alt="Financial Dashboard" 
                  className="w-full h-auto rounded-[1.5rem] object-cover shadow-inner"
                />
              </div>

              {/* Background Glow Decorations */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#F22A5C]/10 rounded-full blur-[80px] -z-10 animate-pulse" />
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#1D2F52]/10 rounded-full blur-[80px] -z-10 animate-pulse" />
            </motion.div>

            {/* Floating Card Detail */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 right-10 bg-white p-5 rounded-2xl shadow-2xl border border-gray-100 z-20 hidden md:block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center text-green-600 font-bold">
                  98%
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Efficiency Boost</p>
                  <p className="text-sm font-bold text-[#1D2F52]">System Automated</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DashboardFeature;