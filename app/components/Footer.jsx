"use client"
import React from 'react';
import { 
  HiOutlineMail, 
  HiOutlinePhone, 
  HiOutlineLocationMarker,
  HiChevronRight 
} from 'react-icons/hi';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import Link from 'next/link';

const socialLinks =  [
  {
    name: 'Home',
    link: '/'
  },
  {
    name: 'Services',
    link: '/'
  },
  {
    name: 'Form',
    link: '/lead-form'
  },
  {
    name: 'AI Assistant',
    link: '/chatbot'
  },
  {
    name: 'Contact',
    link: '/contact'
  },
  {
    name: 'Dashboard',
    link: '/lead-dashboard'
  },
  
      ]

const Footer = () => {
  return (
    <footer className="relative bg-[#1D2F52] text-white pt-24 pb-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Section 1: Branding */}
          <div className="space-y-6">
            <a href="https://taxfilerz.com" target='_blank' className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-xl shadow-lg">
                 <img src="/bg-remove-logo.png" className="h-10 w-10 object-contain" alt="Tax Filerz Logo" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight">
                Tax Filerz <span className="text-[#F22A5C]">& Co.</span>
              </h3>
            </a>
            <p className="text-gray-300 text-sm leading-relaxed">
              Founder of Tax Filerz & Co. is an experienced professional having expertise in Accounts, Taxation & Digital Invoicing. Our mission is to convert complex financial concepts into soft, manageable solutions.
            </p>
          </div>

          {/* Section 2: Useful Links (Column 1) */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-gray-600 pb-2 uppercase tracking-wider text-sm">Useful Links</h4>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.name} className="group flex items-center gap-2 text-gray-300 hover:text-[#F22A5C] transition-colors cursor-pointer text-sm">
                  <HiChevronRight className="text-[#F22A5C]" />
                  <Link href={link.link}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: Useful Links (Column 2) */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-gray-600 pb-2 uppercase tracking-wider text-sm">Services</h4>
            <ul className="space-y-3">
              {['Tax Compliance', 'Bookkeeping', 'Online Accounting', 'Digital Invoicing', 'Reporting', 'Consultancy'].map((link) => (
                <li key={link} className="group flex items-center gap-2 text-gray-300 hover:text-[#F22A5C] transition-colors cursor-pointer text-sm">
                  <HiChevronRight className="text-[#F22A5C]" />
                  <span>{link}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 4: Contact Details */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold mb-6 border-b border-gray-600 pb-2 uppercase tracking-wider text-sm">Contact Details</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-4 text-sm">
                <HiOutlineMail className="text-xl text-[#F22A5C] shrink-0" />
                <span className="text-gray-300">info@taxfilerz.com</span>
              </div>
              <div className="flex items-start gap-4 text-sm">
                <HiOutlinePhone className="text-xl text-[#F22A5C] shrink-0" />
                <span className="text-gray-300">+92-3272338939</span>
              </div>
              <div className="flex items-start gap-4 text-sm">
                <HiOutlineLocationMarker className="text-xl text-[#F22A5C] shrink-0" />
                <span className="text-gray-300 leading-relaxed">
                  Elegant Tower Office # 604, Clifton Block # 5 Near UBL Bank Clifton Branch, Karachi.
                </span>
              </div>
            </div>

            {/* Social Icons - As seen in your image */}
            {/* <div className="flex gap-4 pt-4">
              {[FaFacebookF, FaInstagram, FaLinkedinIn].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-white/10 hover:bg-[#F22A5C] rounded flex items-center justify-center transition-all duration-300">
                  <Icon className="text-white" />
                </a>
              ))}
            </div> */}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400 text-xs tracking-widest uppercase">
            Copyright © 2026 <span className="text-white font-bold">Tax Filerz & Co.</span> All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;