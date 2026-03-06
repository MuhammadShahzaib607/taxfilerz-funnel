"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from "../../components/Navbar.jsx"
import Footer from "../../components/Footer.jsx"
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiOutlineGlobeAlt } from 'react-icons/hi';

const ContactPage = () => {
  const contactDetails = [
    {
      id: 1,
      title: "Email Us",
      value: "info@taxfilerz.com",
      subText: "Online support 24/7",
      icon: <HiOutlineMail />,
      color: "text-[#F22A5C]",
      bg: "bg-[#F22A5C]/5"
    },
    {
      id: 2,
      title: "Call Us",
      value: "+92-3272338939",
      subText: "Mon-Sat, 10am - 6pm",
      icon: <HiOutlinePhone />,
      color: "text-[#1D2F52]",
      bg: "bg-[#1D2F52]/5"
    },
    {
      id: 3,
      title: "Office Address",
      value: "Elegant Tower Office # 604, Clifton Block # 5",
      subText: "Near UBL Bank Clifton Branch, Karachi",
      icon: <HiOutlineLocationMarker />,
      color: "text-[#F22A5C]",
      bg: "bg-[#F22A5C]/5"
    }
  ];

  return (
    <>
    <Navbar />
    <div className="bg-white min-h-screen">
      {/* 1. Header Section with Subtle Gradient BG */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Decorative Gradients */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#1D2F52]/5 blur-[120px] rounded-full -z-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#F22A5C]/5 blur-[120px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-black tracking-[0.4em] text-[#F22A5C] uppercase mb-4"
          >
            Get In Touch
          </motion.h2>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-[#1D2F52] leading-tight"
          >
            Let's Start a <br />
            <span className="bg-gradient-to-r from-[#1D2F52] to-[#F22A5C] bg-clip-text text-transparent italic font-serif">Successful</span> Conversation
          </motion.h1>
        </div>
      </section>

      {/* 2. Contact Details Cards */}
      <section className="pb-32 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactDetails.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group p-10 bg-white border border-gray-100 rounded-[2.5rem] shadow-[0_15px_40px_rgba(99,99,99,0.08)] hover:shadow-[0_40px_80px_rgba(29,47,82,0.12)] transition-all duration-500 text-center"
            >
              {/* Icon Circle */}
              <div className={`w-20 h-20 mx-auto rounded-3xl ${item.bg} ${item.color} flex items-center justify-center text-4xl mb-8 group-hover:scale-110 transition-transform duration-500`}>
                {item.icon}
              </div>

              <h3 className="text-gray-400 font-black uppercase tracking-widest text-xs mb-3">
                {item.title}
              </h3>
              
              <p className="text-[#1D2F52] text-xl font-bold mb-2 leading-relaxed">
                {item.value}
              </p>
              
              <p className="text-gray-500 font-medium">
                {item.subText}
              </p>

              {/* Decorative Accent Line */}
              <div className="mt-8 w-12 h-1 bg-gray-100 mx-auto rounded-full group-hover:w-24 group-hover:bg-[#1D2F52] transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </section>

    </div>
    <Footer />
    </>
  );
};

export default ContactPage;