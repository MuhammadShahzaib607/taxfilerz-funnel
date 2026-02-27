"use client"
import React from 'react';
import { motion } from 'framer-motion';
// Lucide aur Pi icons zyada detailed aur professional lagte hain
import { 
  BsFillHospitalFill, BsFillCartFill, BsBuildingsFill 
} from 'react-icons/bs';
import { 
  MdFastfood, MdPrecisionManufacturing, MdOutlineScience 
} from 'react-icons/md';
import { 
  FaSyringe, FaUserTie, FaPrint, FaTools, FaTruckLoading 
} from 'react-icons/fa';
import { 
  GiOilDrum, GiFactory, GiAmpleDress 
} from 'react-icons/gi';
import { ImSpoonKnife } from "react-icons/im";
import { PiPipeFill } from 'react-icons/pi';
import { LuPaintbrush } from 'react-icons/lu';

const SolutionSection = () => {
  const industries = [
    { name: "Textile Industry", icon: <GiFactory /> },
    { name: "Chemicals", icon: <MdOutlineScience /> },
    { name: "Mobile Oil", icon: <GiOilDrum /> },
    { name: "Food Industries", icon: <MdFastfood /> },
    { name: "General Store", icon: <BsFillCartFill /> },
    { name: "RESTAURANTS", icon: <ImSpoonKnife /> },
    { name: "Garments Industries", icon: <GiAmpleDress /> },
    { name: "Hospital", icon: <BsFillHospitalFill /> },
    { name: "Pharmaceuticals", icon: <FaSyringe /> },
    { name: "Powder Coating", icon: <LuPaintbrush /> },
    { name: "Chartered Accountants", icon: <FaUserTie /> },
    { name: "Clinics", icon: <BsBuildingsFill /> },
    { name: "Auto Parts Mfr.", icon: <MdPrecisionManufacturing /> },
    { name: "PVC & Iron Pipe", icon: <PiPipeFill /> }, // Specific Pipe Icon
    { name: "Printing Press", icon: <FaPrint /> },
    { name: "Auto Parts Shop", icon: <FaTools /> },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 text-center">
        {/* Heading with Gradient - Brand Identity */}
        <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
          <span className="bg-gradient-to-r from-[#1D2F52] to-[#F22A5C] bg-clip-text text-transparent uppercase">
            Business Ready Solutions
          </span>
        </h2>
        <div className="w-20 h-1.5 bg-[#F22A5C] mx-auto mb-8 rounded-full"></div>
        
        <p className="text-gray-500 mb-16 max-w-2xl mx-auto font-medium text-lg">
          TaxFilerz & Co. is a business ready solution which specializes in a broad range of industries.
        </p>

        {/* 16 Perfect Square Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {industries.map((item, index) => (
            <motion.div 
              key={index}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 20px 40px -10px rgba(29, 47, 82, 0.3)" 
              }}
              className="aspect-square bg-white border border-gray-100 flex flex-col items-center justify-center p-6 transition-all duration-300 group rounded-2xl shadow-[0_10px_25px_rgba(29,47,82,0.1)]"
            >
              {/* Icon Container with specific color #1d2f52 */}
              <div className="text-6xl text-[#1D2F52] mb-6 group-hover:text-[#F22A5C] transition-colors duration-300 drop-shadow-md">
                {item.icon}
              </div>
              
              <h3 className="font-bold text-[#1D2F52] uppercase text-[13px] md:text-[14px] tracking-widest text-center leading-tight px-2">
                {item.name}
              </h3>

              {/* Decorative line on hover */}
              <div className="w-0 group-hover:w-10 h-1 bg-[#F22A5C] mt-4 transition-all duration-500 rounded-full"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;