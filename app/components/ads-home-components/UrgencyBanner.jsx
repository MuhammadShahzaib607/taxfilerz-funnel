"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiLightningBolt, HiFire, HiArrowRight } from 'react-icons/hi';
import Link from 'next/link';

const UrgencyBanner = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    // 5 Days Countdown
    const targetDate = new Date().getTime() + (5 * 24 * 60 * 60 * 1000);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative overflow-hidden bg-gradient-to-br from-[#1D2F52] to-[#111c31] rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-white/5"
      >
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F22A5C]/10 blur-[80px] rounded-full -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full -ml-20 -mb-20" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {/* Left Side: Content */}
          <div className="text-center lg:text-left flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F22A5C]/20 border border-[#F22A5C]/30 text-[#F22A5C] mb-6">
              <HiFire className="animate-bounce" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Flash Sale is Live</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
              Don't Miss Out! <br />
              <span className="text-[#F22A5C]">Flat 50% Off</span> on All Tax Services
            </h2>
            <p className="text-gray-400 font-medium text-sm md:text-base max-w-md mx-auto lg:mx-0">
              Get your business compliant and scale faster with our premium bookkeeping and tax filing solutions.
            </p>
          </div>

          {/* Right Side: Timer & CTA */}
          <div className="flex flex-col items-center gap-8 min-w-[320px]">
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Mins', value: timeLeft.minutes },
                { label: 'Secs', value: timeLeft.seconds },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 flex items-center justify-center mb-2 shadow-xl">
                    <span className="text-2xl md:text-3xl font-black text-white">
                      {item.value.toString().padStart(2, '0')}
                    </span>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{item.label}</span>
                </div>
              ))}
            </div>

            <a href="/" className="group w-full relative flex items-center justify-center gap-3 bg-[#F22A5C] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all hover:bg-[#d92351] hover:shadow-[0_20px_40px_-10px_rgba(242,42,92,0.4)] active:scale-95">
              Claim Offer Now
              <HiArrowRight className="text-lg transition-transform group-hover:translate-x-2" />
            </a>
            
            <p className="text-[9px] font-bold text-gray-600 uppercase tracking-[0.4em]">
              *Offer valid for new registrations only
            </p>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default UrgencyBanner;