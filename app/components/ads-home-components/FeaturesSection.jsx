"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineLightBulb, HiOutlineBadgeCheck, HiOutlineTrendingUp, HiOutlineArrowNarrowRight } from 'react-icons/hi';

const FeaturesSection = () => {
  const features = [
    {
      title: "Real-Time Financial Insights",
      description: "Get a crystal-clear view of your cash flow in real-time. No more waiting for end-of-month reports.",
      icon: <HiOutlineTrendingUp className="w-7 h-7 text-[#F22A5C]" />,
      size: "md:col-span-2",
      bg: "bg-white"
    },
    {
      title: "Compliant Taxes",
      description: "100% compliant filings with maximum deductions.",
      icon: <HiOutlineBadgeCheck className="w-7 h-7 text-[#1D2F52]" />,
      size: "md:col-span-1",
      bg: "bg-gray-50"
    },
    {
      title: "Smart Automation",
      description: "Reduce manual data entry by 70% with our integrated digital systems.",
      icon: <HiOutlineLightBulb className="w-7 h-7 text-[#1D2F52]" />,
      size: "md:col-span-1",
      bg: "bg-gray-50"
    },
    {
      title: "Fuel Your Business Growth",
      description: "We don't just manage money; we provide the strategy you need to scale beyond limits with data-driven precision.",
      icon: <HiOutlineArrowNarrowRight className="w-7 h-7 text-white" />,
      size: "md:col-span-2",
      bg: "bg-[#1D2F52]",
      textColor: "text-white",
      descColor: "text-gray-300"
    }
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Modern Minimal Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 mb-6 rounded-full bg-[#F22A5C]/5 border border-[#F22A5C]/10"
          >
            <span className="text-xs font-bold tracking-widest text-[#F22A5C] uppercase">
              The Tax Filerz Advantage
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-[#1D2F52] tracking-tight">
            Precision in every <br />
            <span className="bg-gradient-to-r from-[#1D2F52] to-[#F22A5C] bg-clip-text text-transparent italic font-serif">
              financial move.
            </span>
          </h2>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className={`${feature.size} ${feature.bg} p-10 rounded-[2.5rem] border border-gray-100 flex flex-col justify-between min-h-[300px] shadow-sm hover:shadow-2xl hover:shadow-[#1D2F52]/10 transition-all duration-500`}
            >
              <div>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${feature.textColor === 'text-white' ? 'bg-white/10' : 'bg-white shadow-sm border border-gray-50'}`}>
                  {feature.icon}
                </div>
                <h4 className={`text-2xl font-bold mb-4 ${feature.textColor || 'text-[#1D2F52]'}`}>
                  {feature.title}
                </h4>
                <p className={`${feature.descColor || 'text-gray-600'} text-lg leading-relaxed`}>
                  {feature.description}
                </p>
              </div>

              {/* Minimal Action Link */}
              <div className={`mt-8 flex items-center gap-2 font-bold text-sm ${feature.textColor || 'text-[#1D2F52] opacity-50'}`}>
                Learn More <HiOutlineArrowNarrowRight />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Decorative Stats */}
        <div className="mt-16 text-[20px] flex flex-wrap gap-8 justify-center items-center py-10 border-y border-gray-50">
           <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#F22A5C]" />
              <span className="font-bold text-[#1D2F52]">No Hidden Fees</span>
           </div>
           <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#1D2F52]" />
              <span className="font-bold text-[#1D2F52]">Expert Support</span>
           </div>
           <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#F22A5C]" />
              <span className="font-bold text-[#1D2F52]">Secure Processing</span>
           </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;