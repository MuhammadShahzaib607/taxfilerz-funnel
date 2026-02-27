"use client"

import Link from 'next/link';
import React, { useState } from 'react';
import { HiMenuAlt3, HiX } from 'react-icons/hi'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Form', href: '/lead-form' },
    { name: 'AI Assistant', href: '/chatbot' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    // Fixed position and high Z-index is crucial
    <nav className="relative top-0 left-0 w-full z-[100] bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
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
                className="text-[#1D2F52] font-medium hover:text-[#F22A5C] transition-colors duration-300 text-[15px]"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop Button */}
          <div className="hidden md:block">
            <Link href="/lead-form" className="bg-gradient-to-r from-[#1D2F52] to-[#F22A5C] text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:shadow-lg transition-all">
              Request Proposal
            </Link>
          </div>

          {/* Mobile Menu Button - Visible on Mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#1D2F52] p-2 focus:outline-none bg-gray-50 rounded-lg"
            >
              {isOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay - Updated for Visibility */}
      <div 
        className={`md:hidden fixed top-20 left-0 w-full bg-white shadow-2xl transition-all duration-300 ease-in-out border-b border-gray-100 overflow-hidden ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-8 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)} // Menu closes when a link is clicked
              className="block text-lg font-semibold text-[#1D2F52] hover:text-[#F22A5C] border-b border-gray-50 pb-2 transition-all"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-6">
            <button className="w-full bg-gradient-to-r from-[#1D2F52] to-[#F22A5C] text-white py-4 rounded-2xl font-bold shadow-lg shadow-[#F22A5C]/20">
              Request Proposal
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;