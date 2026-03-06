"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { HiArrowRight, HiOutlineShieldCheck, HiOutlineBadgeCheck } from 'react-icons/hi';
import Link from 'next/link';

const FinalCTA = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Subtle Background Gradient - Using Brand Colors with Low Opacity */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1D2F52]/5 via-white to-[#F22A5C]/5 -z-10" />
      
      {/* Decorative Circles */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-[#F22A5C]/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-[#1D2F52]/5 rounded-full blur-[100px]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-[#1D2F52] rounded-[3rem] p-8 md:p-16 text-center relative overflow-hidden shadow-[0_40px_100px_-15px_rgba(29,47,82,0.4)]"
        >
          {/* Internal Decorative Pattern */}
          <div className="absolute top-0 right-0 p-10 opacity-10">
            <HiOutlineShieldCheck size={200} className="text-white" />
          </div>

          <div className="relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight"
            >
              Ready to Transform Your <br />
              <span className="text-[#F22A5C]">Financial Operations?</span>
            </motion.h2>
            
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium">
              Join 500+ Pakistani businesses using our Tax, Bookkeeping, and Digital Invoicing solutions to scale faster.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href="/home" className="w-full sm:w-auto px-10 py-5 bg-[#F22A5C] text-white rounded-2xl font-black text-lg hover:shadow-[0_20px_40px_-10px_rgba(242,42,92,0.5)] transition-all active:scale-95 flex items-center justify-center gap-3 group">
                Get Started Now
                <HiArrowRight className="group-hover:translate-x-2 transition-transform" />
              </a>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 opacity-60">
              <div className="flex items-center gap-2 text-white">
                <HiOutlineBadgeCheck className="text-[#F22A5C]" size={20} />
                <span className="text-sm font-bold tracking-widest uppercase">FBR Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <HiOutlineBadgeCheck className="text-[#F22A5C]" size={20} />
                <span className="text-sm font-bold tracking-widest uppercase">Secure Data</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <HiOutlineBadgeCheck className="text-[#F22A5C]" size={20} />
                <span className="text-sm font-bold tracking-widest uppercase">24/7 Support</span>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Bottom Small Text */}
        <p className="text-center mt-10 text-gray-400 font-medium text-sm">
          No credit card required. Start your 14-day free trial today.
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;