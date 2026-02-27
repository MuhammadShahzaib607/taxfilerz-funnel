"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { HiShieldCheck, HiLightningBolt, HiUsers, HiCurrencyDollar } from 'react-icons/hi';

const TrustBenefits = () => {
  const benefits = [
    {
      title: "FBR & Tax Compliance",
      desc: "Stay worry-free with our 100% legal compliance and timely filing guarantee.",
      icon: <HiShieldCheck />,
      tag: "Secure"
    },
    {
      title: "Real-time Reporting",
      desc: "Get instant access to your P&L and balance sheets with our digital systems.",
      icon: <HiLightningBolt />,
      tag: "Fast"
    },
    {
      title: "Dedicated Advisor",
      desc: "Every client gets a dedicated financial expert for personalized guidance.",
      icon: <HiUsers />,
      tag: "Expert"
    },
    {
      title: "Cost Optimization",
      desc: "We don't just record data; we find ways to save you money on taxes and expenses.",
      icon: <HiCurrencyDollar />,
      tag: "Value"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-[#F22A5C] font-black uppercase tracking-[0.3em] text-xs mb-4"
            >
              The Byte Digital Standard
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-black text-[#1D2F52] leading-tight"
            >
              Why Businesses Trust Our <br />
              <span className="bg-gradient-to-r from-[#1D2F52] to-[#F22A5C] bg-clip-text text-transparent">
                Financial Expertise
              </span>
            </motion.h2>
          </div>
          <div className="hidden lg:block h-px flex-grow mx-10 bg-gray-100" />
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group p-8 bg-white border border-gray-100 rounded-[2.5rem] shadow-[0_15px_40px_rgba(99,99,99,0.12)] hover:shadow-[0_30px_60px_rgba(29,47,82,0.15)] transition-all duration-500"
            >
              {/* Icon & Tag */}
              <div className="flex justify-between items-start mb-10">
                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-[#1D2F52] text-3xl group-hover:bg-[#1D2F52] group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-300 group-hover:text-[#F22A5C]">
                  {item.tag}
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-[#1D2F52] mb-4">
                {item.title}
              </h3>
              <p className="text-gray-500 font-medium text-sm leading-relaxed">
                {item.desc}
              </p>

              {/* Decorative Dot */}
              <div className="mt-8 flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1D2F52]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#F22A5C]/30 group-hover:bg-[#F22A5C] transition-colors" />
                <div className="w-1.5 h-1.5 rounded-full bg-gray-100" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Trust Line */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 p-8 rounded-[2rem] bg-gray-50/50 border border-dashed border-gray-200 flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left"
        >
          <p className="text-[#1D2F52] font-bold text-lg">
            Ready to experience professional finance management?
          </p>
          <div className="h-6 w-px bg-gray-300 hidden md:block" />
          <p className="text-gray-500 font-medium">
            Join <span className="text-[#F22A5C] font-black">500+</span> satisfied clients across Pakistan.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBenefits;