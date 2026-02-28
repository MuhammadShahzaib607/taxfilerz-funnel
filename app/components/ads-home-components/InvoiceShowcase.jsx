"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineLightningBolt } from 'react-icons/hi';
import Link from 'next/link';

const InvoiceShowcase = () => {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-20">
          
          {/* Left Side: Invoice Preview Image */}
          <div className="flex-1 relative order-2 lg:order-1">
            {/* Decorative Background Shape (Aapki theme color ka gradient) */}
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-gradient-to-tr from-[#F22A5C]/20 to-transparent rounded-full blur-3xl -z-10" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              {/* Desktop Dashboard Image */}
              <div className="rounded-3xl overflow-hidden p-2">
                <img 
                  src="/invoicing.jpeg" 
                  alt="Financial Dashboard" 
                  className="w-full h-auto rounded-2xl"
                />
              </div>

              {/* Floating Success Indicator */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-6 -right-6 bg-white py-4 px-6 rounded-2xl shadow-xl border border-gray-50 flex items-center gap-3 hidden md:flex"
              >
                <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center text-green-600">
                  <HiOutlineLightningBolt size={24} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Payment Status</p>
                  <p className="text-sm font-bold text-[#1D2F52]">Successfully Received</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Side: Content */}
          <div className="flex-1 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Icon / Small Tag */}
              <div className="w-12 h-12 bg-[#1D2F52]/5 rounded-xl flex items-center justify-center text-[#1D2F52] mb-6">
                <HiOutlineLightningBolt size={28} />
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-[#1D2F52] leading-[1.1] mb-6 tracking-tight">
                Send Smart <span className="text-[#F22A5C]">Digital Invoices</span> & Get Paid 2x Faster
              </h2>
              
              <p className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed mb-8">
                Take the friction out of billing. Create professional, branded invoices on the go and send automated reminders for late payments. Our system tracks every penny so you don't have to.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <a href="/" className="px-8 py-4 bg-[#1D2F52] text-white rounded-2xl font-bold hover:bg-[#1D2F52]/90 transition-all shadow-lg shadow-[#1D2F52]/20 active:scale-95">
                  Start Invoicing Now
                </a>
                <a href="/" className="px-8 py-4 border-2 border-gray-100 text-[#1D2F52] rounded-2xl font-bold hover:bg-gray-50 transition-all active:scale-95">
                  See How It Works
                </a>
              </div>

              {/* Feature Trust Badges */}
              <div className="mt-10 pt-10 border-t border-gray-100 flex items-center gap-8">
                <div>
                  <p className="text-2xl font-black text-[#1D2F52]">99.9%</p>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Accuracy Rate</p>
                </div>
                <div className="w-px h-10 bg-gray-100" />
                <div>
                  <p className="text-2xl font-black text-[#F22A5C]">Instant</p>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tax Calculations</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default InvoiceShowcase;