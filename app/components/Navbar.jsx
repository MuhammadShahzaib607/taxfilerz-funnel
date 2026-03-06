"use client"

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { HiMenuAlt3, HiX, HiLightningBolt } from 'react-icons/hi'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Timer State
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    // 5 din ka timer (ms mein)
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

  const navLinks = [
    { name: 'Home', href: '/home' },
    { name: 'Form', href: '/home' },
    { name: 'AI Assistant', href: '/chatbot' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="w-full z-[100]">
      {/* 1. URGENCY TIMER BAR */}
      <div className="bg-[#F22A5C] text-white py-2 px-4 shadow-md overflow-hidden border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6">
          <div className="flex items-center gap-2 animate-pulse">
            <HiLightningBolt className="text-yellow-300" />
            <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">
              Limited Time Offer: 50% OFF ON ALL PACKAGES
            </span>
          </div>
          
          {/* Countdown Display */}
          <div className="flex items-center gap-3">
            {[
              { label: 'D', value: timeLeft.days },
              { label: 'H', value: timeLeft.hours },
              { label: 'M', value: timeLeft.minutes },
              { label: 'S', value: timeLeft.seconds },
            ].map((unit, idx) => (
              <div key={idx} className="flex items-center gap-1">
                <span className="bg-[#1D2F52] text-white px-2 py-0.5 rounded text-[11px] font-black min-w-[24px] text-center shadow-inner">
                  {unit.value.toString().padStart(2, '0')}
                </span>
                <span className="text-[9px] font-bold opacity-80">{unit.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVBAR */}
      <nav className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo Section */}
            <Link href="/home" className="flex items-center gap-3 shrink-0">
              <div className="relative w-10 h-10">
                <img 
                  src="/logo.png" 
                  alt="Logo" 
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-[#1D2F52]">
                Tax Filerz & Co.
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-[#1D2F52] font-semibold hover:text-[#F22A5C] transition-colors duration-300 text-[14px] uppercase tracking-wider"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Desktop Button */}
            <div className="hidden md:block">
              <a href="/home" className="bg-[#1D2F52] hover:bg-[#F22A5C] text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-lg hover:shadow-[#F22A5C]/20 active:scale-95">
                Request Proposal
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-[#1D2F52] p-2 focus:outline-none bg-gray-50 rounded-lg border border-gray-100"
              >
                {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          className={`md:hidden absolute top-[calc(100%)] left-0 w-full bg-white shadow-2xl transition-all duration-300 ease-in-out border-b border-gray-100 overflow-hidden ${
            isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-6 py-8 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-sm font-black uppercase tracking-widest text-[#1D2F52] hover:text-[#F22A5C] border-b border-gray-50 pb-4 transition-all"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-6">
              <button className="w-full bg-[#1D2F52] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-xl">
                Request Proposal
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;