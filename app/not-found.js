"use client"

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiArrowLeft, HiHome, HiSearch, HiSupport } from 'react-icons/hi';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#F22A5C]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#1D2F52]/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-2xl w-full text-center relative z-10">
        {/* Animated 404 Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-[12rem] md:text-[18rem] font-black text-[#1D2F52] leading-none tracking-tighter opacity-10 select-none">
            404
          </h1>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h2 className="text-4xl md:text-6xl font-black text-[#1D2F52] mb-4">
                Lost in <span className="text-[#F22A5C]">Tax Space?</span>
              </h2>
              <p className="text-gray-500 font-bold text-sm md:text-lg max-w-md mx-auto leading-relaxed">
                The page you are looking for might have been moved, deleted, or perhaps never existed in our records.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-32 md:mt-48 flex flex-wrap items-center justify-center gap-4"
        >
          <Link 
            href="/home"
            className="flex items-center gap-2 bg-[#1D2F52] text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-[#1D2F52]/20 hover:scale-105 active:scale-95 transition-all"
          >
            <HiHome className="text-lg" />
            Back to Home
          </Link>
        </motion.div>

        {/* Quick Links Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-center gap-8"
        >
          <div className="flex items-center gap-2 text-gray-400 group cursor-pointer hover:text-[#F22A5C] transition-colors">
            <HiSupport className="text-xl" />
            <Link href="/contact" className="text-[10px] font-black uppercase tracking-widest">Contact Support</Link>
          </div>
        </motion.div>

      </div>

      {/* Floating Animated Circles */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[15%] w-12 h-12 border-4 border-[#F22A5C] rounded-xl opacity-20 hidden md:block"
      />
      <motion.div 
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -10, 0]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[20%] right-[15%] w-16 h-16 border-4 border-[#1D2F52] rounded-full opacity-20 hidden md:block"
      />
    </div>
  );
}