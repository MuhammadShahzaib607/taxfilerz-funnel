"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineClipboardCheck, HiOutlinePresentationChartBar, HiOutlineBadgeCheck } from 'react-icons/hi';

const StepProcess = () => {
  const steps = [
 {
  id: "01",
  title: "Discovery Call",
  desc: "We analyze your business's current financial health and specific tax requirements to identify key needs.",
  icon: <HiOutlineClipboardCheck size={32} />,
  color: "from-[#1D2F52]/20 to-transparent"
},
{
  id: "02",
  title: "Strategy Setup",
  desc: "We design a custom bookkeeping roadmap and tax planning strategy tailored specifically for your success.",
  icon: <HiOutlinePresentationChartBar size={32} />,
  color: "from-[#F22A5C]/10 to-transparent"
},
{
  id: "03",
  title: "Seamless Growth",
  desc: "Focus entirely on scaling your business while we take full responsibility for your financial compliance.",
  icon: <HiOutlineBadgeCheck size={32} />,
  color: "from-[#1D2F52]/20 to-transparent"
}
  ];

  return (
    <section className="py-24 bg-white relative">
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-gray-50/50 to-white -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-[#1D2F52] mb-6 tracking-tight"
          >
            How We <span className="text-[#F22A5C]">Simplify</span> Your Finance
          </motion.h2>
          <div className="w-24 h-1.5 bg-[#1D2F52] mx-auto rounded-full" />
        </div>

        {/* 3 Steps Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          
          {/* Connector Line (Desktop Only) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 -z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative z-10 group"
            >
              {/* Card Container */}
              <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-[0_20px_50px_rgba(29,47,82,0.08)] group-hover:shadow-[0_40px_80px_rgba(242,42,92,0.15)] transition-all duration-500 h-full flex flex-col items-center text-center">
                
                {/* Step ID Bubble */}
                <div className="absolute -top-6 bg-[#1D2F52] text-white w-12 h-12 rounded-2xl flex items-center justify-center font-black shadow-lg group-hover:bg-[#F22A5C] transition-colors duration-300">
                  {step.id}
                </div>

                {/* Icon with Gradient BG */}
                <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${step.color} flex items-center justify-center text-[#1D2F52] mb-8 group-hover:scale-110 transition-transform duration-500`}>
                  {step.icon}
                </div>

                <h3 className="text-2xl font-extrabold text-[#1D2F52] mb-4 group-hover:text-[#F22A5C] transition-colors">
                  {step.title}
                </h3>
                
                <p className="text-gray-500 font-medium leading-relaxed">
                  {step.desc}
                </p>

                {/* Bottom Accent */}
                <div className="mt-8 w-10 h-1 bg-gray-100 rounded-full group-hover:w-20 group-hover:bg-[#1D2F52] transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepProcess;