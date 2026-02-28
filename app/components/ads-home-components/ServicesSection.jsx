"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineDocumentText, HiOutlineCalculator, HiOutlineShieldCheck } from 'react-icons/hi';

const ServicesSection = () => {
  const services = [
    {
      title: "Strategic Tax Filing",
      description: "Maximize your returns and stay compliant with our expert tax filing services tailored for modern businesses.",
      img: "serviceIcon-2.jpeg",
      accent: "bg-[#1D2F52]",
      shadow: "shadow-[#F22A5C]/10"
    },
    {
      title: "Expert Bookkeeping",
      description: "Keep your financial records flawless. Our proactive bookkeeping ensures your books are always ready for audits.",
      img: "serviceIcon-3.jpeg",
      accent: "bg-[#1D2F52]",
      shadow: "shadow-[#1D2F52]/10"
    },
    {
      title: "Digital Invoicing",
      description: "Automate your billing process with sleek digital invoicing solutions that ensure you get paid faster.",
      img: "serviceIcon-1.jpeg",
      accent: "bg-[#1D2F52]",
      shadow: "shadow-[#F22A5C]/10"
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-5xl font-black text-[#1D2F52] mb-4"
          >
            Our <span className="text-[#F22A5C]">Premium</span> Services
          </motion.h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#1D2F52] to-[#F22A5C] mx-auto rounded-full" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -15 }}
              transition={{ duration: 0.4 }}
              className={`group relative p-10 rounded-[2.5rem] bg-white border-2 border-gray-50 shadow-2xl ${service.shadow} overflow-hidden`}
            >
              {/* Top Highlight Line */}
              <div className={`absolute top-0 left-0 w-full h-2 ${service.accent}`} />

              {/* Icon with Glowing Background */}
              <div className="relative mb-8">
                <div className={`absolute inset-0 scale-150 blur-3xl opacity-20 rounded-full ${service.accent}`} />
                <img src={service.img} className='relative w-16 h-16 rounded-[50%] bg-gray-50 border border-gray-100 group-hover:scale-110 transition-transform duration-500 shadow-sm' alt="" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-[#1D2F52] mb-4 group-hover:text-[#F22A5C] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed font-medium mb-6">
                  {service.description}
                </p>
                
              </div>

              {/* Bottom Subtle Gradient Flare */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gray-50 rounded-full group-hover:bg-[#F22A5C]/5 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;