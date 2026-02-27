"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCheckCircle, HiInformationCircle, HiStar, HiChevronDown } from 'react-icons/hi';
import { RiShieldCheckFill, RiDashboardFill, RiToolsFill, RiGovernmentFill } from 'react-icons/ri';
import Link from 'next/link';
import { serviceData } from '../../utils/packages.js';

const PricingFunnel = () => {
  const [activeCategory, setActiveCategory] = useState('bookkeeping');

  const categories = [
    { id: 'bookkeeping', label: 'Bookkeeping Virtual Assistant', icon: <RiDashboardFill /> },
    { id: 'software', label: 'Accounting Software Packages', icon: <RiToolsFill /> },
    { id: 'bundles', label: 'All-in-One Packages', icon: <RiShieldCheckFill /> },
    { id: 'taxlegal', label: 'TaxFilerz Legal Consultancy', icon: <RiGovernmentFill /> }
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-[#F22A5C]/5 to-transparent blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-[#1D2F52]/5 to-transparent blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tighter mb-4"
          >
            <span className="bg-gradient-to-r from-[#1D2F52] via-[#F22A5C] to-[#1D2F52] bg-clip-text text-transparent uppercase">
              {categories.find(c => c.id === activeCategory)?.label}
            </span>
          </motion.h2>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Transparent Pricing for Professional Growth</p>
        </div>

        {/* Category Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-6 py-4 rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-tight transition-all border-2 
                ${activeCategory === cat.id ? "bg-[#1D2F52] border-[#1D2F52] text-white shadow-2xl scale-105" : "bg-white border-gray-100 text-gray-400 hover:border-[#F22A5C]/30"}`}
            >
              {cat.icon} {cat.label} 
              {/* Dropdown icon added here as requested */}
              <HiChevronDown className={`ml-1 transition-transform ${activeCategory === cat.id ? 'rotate-180' : ''}`} />
            </button>
          ))}
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          <AnimatePresence mode="wait">
            {serviceData[activeCategory].map((plan, i) => {
              const originalPrice = plan.monthly || plan.price || 0;
              const salePrice = plan.discounted || plan.discountedPrice;
              const hasDiscount = !!salePrice;
              
              // Logic to check if plan is "Premium/Advanced" for the Bonus Badge
              const isPremium = plan.name.toLowerCase().includes('premium') || 
                               plan.name.toLowerCase().includes('enterprise') || 
                               plan.name.toLowerCase().includes('advanced');

              return (
                <motion.div
                  key={plan.id + plan.name}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-[3rem] p-8 border border-gray-100 shadow-xl shadow-gray-200/40 flex flex-col hover:border-[#F22A5C]/30 transition-all group relative overflow-hidden pt-13"
                >
                  {/* HUGE BONUS Badge for Premium Plans */}
                  {isPremium && (
                    <div className="absolute top-0 left-0 w-full bg-[#F22A5C] text-white py-4 text-center font-black text-[10px] tracking-[0.3em] z-20 shadow-lg">
                      <HiStar className="inline mr-1 mb-1" /> HUGE BONUS INCLUDED <HiStar className="inline ml-1 mb-1" />
                    </div>
                  )}

                  <h3 className={`text-2xl font-black text-[#1D2F52] uppercase tracking-tighter mb-1 pr-16 ${isPremium ? 'mt-6' : ''}`}>{plan.name}</h3>
                  <p className="text-gray-400 text-[10px] font-bold uppercase mb-6 tracking-widest leading-relaxed">{plan.subtitle}</p>
                  
                  <div className="mb-8">
                    {/* 2x Amount overline display */}
                    <div className="text-gray-400 text-sm font-bold line-through decoration-[#F22A5C] decoration-2 opacity-60 mb-1">
                      Rs {((salePrice || originalPrice) * 2).toLocaleString()}
                    </div>
                    
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black text-[#1D2F52]">
                        Rs {(salePrice || originalPrice).toLocaleString()}
                      </span>
                      {originalPrice > 0 && <span className="text-gray-400 text-sm font-bold">/mo</span>}
                    </div>

                    {plan.setup && (
                      <p className="text-[#F22A5C] text-[10px] font-black mt-2 uppercase tracking-widest bg-[#F22A5C]/5 inline-block px-2 py-1 rounded">
                        Setup: Rs {plan.setup.toLocaleString()}
                      </p>
                    )}
                  </div>

                  {/* Feature Lists */}
                  <div className="space-y-6 mb-10 flex-grow">
                    <div>
                      <p className="text-[10px] font-black text-[#1D2F52] opacity-30 uppercase border-b pb-2 mb-4">Core Services</p>
                      <div className="space-y-3">
                        {plan.features?.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <HiCheckCircle className="text-[#F22A5C] mt-0.5 shrink-0" size={16} />
                            <span className="text-gray-600 font-bold text-xs leading-tight">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {(plan.clientBenefit || plan.featureCategory) && (
                      <div className="bg-gray-50 p-4 rounded-2xl">
                        <p className="text-[9px] font-black text-[#1D2F52] uppercase mb-3 flex items-center gap-1">
                          <HiStar className="text-[#F22A5C]" /> Key Benefits
                        </p>
                        <ul className="space-y-2">
                          {(plan.clientBenefit || plan.featureCategory).map((benefit, idx) => (
                            <li key={idx} className="text-gray-500 text-[11px] font-medium leading-tight">
                              • {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {(plan.extra || plan.financialServices) && (
                      <div className="pt-4 border-t border-dashed border-gray-200">
                         <p className="text-[9px] font-black text-gray-400 uppercase mb-3 tracking-widest">Add-ons & Advisory</p>
                         <div className="space-y-2">
                            {(plan.extra || plan.financialServices).map((ex, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-[9px] font-black text-gray-500 uppercase tracking-tight leading-snug">
                                <HiInformationCircle className="text-[#1D2F52] shrink-0" /> {ex}
                              </div>
                            ))}
                         </div>
                      </div>
                    )}
                  </div>

                  <Link href="/lead-form" className="mt-auto">
                    <button className="w-full py-5 bg-[#1D2F52] text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] group-hover:bg-[#F22A5C] transition-all shadow-xl shadow-gray-200 cursor-pointer">
                      Get Started
                    </button>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default PricingFunnel;