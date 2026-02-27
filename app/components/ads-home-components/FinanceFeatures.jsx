"use client"
import React from 'react';
import { motion } from 'framer-motion';

const FinanceFeatures = () => {
  // 9 Cards Data Array based on your uploaded images
  const financeData = [
    {
      title: "Invoicing & Quotes",
      desc: "Create professional invoices and quotes in seconds. Send via email and track payments.",
      image: "serviceImg-5.jpg"
    },
    {
      title: "Customer CRM",
      desc: "Manage profiles, credit limits, and track detailed transaction history for every client.",
image: "serviceImg-2.jpg"
    },
    {
      title: "Inventory Pro",
      desc: "Real-time stock tracking, low-stock alerts, and automated valuation for your warehouse.",
      image: "serviceImg-6.jpg"
    },
    {
      title: "Expense Tracking",
      desc: "Capture receipts on the go, categorize spending, and manage vendor bills effortlessly.",
image: "serviceImg-4.jpg"
    },
    {
      title: "Bank Sync",
      desc: "Securely connect your bank accounts and reconcile transactions automatically.",
      image: "serviceImg-1.jpg"
    },
    {
      title: "Tax Compliance",
      desc: "Stay ahead with automated VAT/GST calculations and FBR digital invoice integration.",
      image: "serviceImg-3.jpg"
    },
    {
      title: "Financial Reports",
      desc: "Instant access to P&L, Balance Sheets, and Cash Flow statements with one click.",
      image: "serviceImg-9.jpg"
    },
    {
      title: "Payroll Management",
      desc: "Automate employee salaries, tax deductions, and pay slip generation with ease.",
      image: "serviceImg-8.jpg"
    },
    {
      title: "Audit Trail",
      desc: "Complete transparency with deep audit logs tracking every change and transaction history.",
      image: "serviceImg-7.jpg"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-[#1D2F52] mb-6 tracking-tight"
          >
            Everything you need to <span className="text-[#F22A5C]">Succeed</span>
          </motion.h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium">
            Powerful tools designed to simplify your financial management and accelerate your business growth.
          </p>
        </div>

        {/* 9 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {financeData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-200 shadow-[0_15px_40px_-15px_rgba(29,47,82,0.08)] hover:shadow-[0_30px_60px_-15px_rgba(242,42,92,0.12)] transition-all duration-500"
            >
              {/* Image Container */}
              <div className="h-52 bg-gray-50 overflow-hidden relative">
                {item.image ? (
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                    <span className="text-gray-300 font-bold italic">Image Placeholder</span>
                  </div>
                )}
                {/* Subtle Brand Overlay on Image */}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-60" />
              </div>

              {/* Content Section */}
              <div className="p-8 relative">
                {/* Small Accent Line */}
                <div className="w-10 h-1 bg-[#F22A5C] rounded-full mb-6 group-hover:w-20 transition-all duration-500" />
                
                <h3 className="text-2xl font-bold text-[#1D2F52] mb-4 group-hover:text-[#F22A5C] transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed font-medium text-[15px]">
                  {item.desc}
                </p>

                {/* Bottom Interactive Arrow */}
                <div className="mt-8 flex items-center gap-2 text-[#1D2F52] font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FinanceFeatures;