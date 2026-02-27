"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineCloudUpload, HiOutlineShieldCheck, HiOutlineSupport } from 'react-icons/hi';
import Link from 'next/link';

const AccessibilitySection = () => {
  // IMAGE PATHS VARIABLES (Yahan apni images ka path dalien)
  const mainPersonImg = ""; 
  const dashboardPreviewImg = "";

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Sub-header / Top Tag */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-black tracking-[0.3em] text-[#F22A5C] uppercase mb-4">
            Reliability First
          </h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-[#1D2F52] tracking-tight">
            Financial Management <br /> 
            <span className="text-gray-400 italic font-serif">Made Simple & Secure</span>
          </h3>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Content: Text Information */}
          <div className="flex-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h4 className="text-4xl font-black text-[#1D2F52] mb-6 leading-tight">
                Fully Accessible. <br /> Anywhere, Anytime.
              </h4>
              <p className="text-gray-600 text-lg leading-relaxed mb-8 font-medium">
                Our cloud-native infrastructure ensures that your financial data is always at your fingertips. Whether you're in the office or on the go, stay connected with 99.9% uptime and real-time synchronization. No more manual updates—everything is handled seamlessly by our secure servers.
              </p>

              {/* Feature Tags */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#1D2F52]/20 transition-all">
                  <HiOutlineCloudUpload className="text-[#F22A5C] w-8 h-8 shrink-0" />
                  <div>
                    <p className="font-bold text-[#1D2F52]">Cloud Sync</p>
                    <p className="text-sm text-gray-500">Real-time backup</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#F22A5C]/20 transition-all">
                  <HiOutlineShieldCheck className="text-[#1D2F52] w-8 h-8 shrink-0" />
                  <div>
                    <p className="font-bold text-[#1D2F52]">Bank Grade</p>
                    <p className="text-sm text-gray-500">End-to-end encryption</p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-6">
                <Link href="/lead-form" className="px-8 py-4 bg-[#1D2F52] text-white rounded-2xl font-bold hover:shadow-2xl hover:shadow-[#1D2F52]/30 transition-all flex items-center gap-3 group">
                  Start Now
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Visual Image Stack (Based on Image analysis) */}
          <div className="flex-1 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              {/* Main Image with Border Gradient */}
              <div className="relative p-2 rounded-[3rem] bg-gradient-to-br from-[#1D2F52]/10 to-[#F22A5C]/10 shadow-2xl overflow-hidden">
                <img 
                  src={mainPersonImg || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop"} 
                  alt="Financial Expert" 
                  className="w-full h-[500px] object-cover rounded-[2.5rem]"
                />
              </div>

              {/* Floating Dashboard Card (Small overlap as seen in images) */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-10 -left-10 md:-left-20 w-64 md:w-80 p-4 bg-white rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.12)] border border-gray-100 hidden sm:block"
              >
                <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#1D2F52]">
                        <HiOutlineSupport size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase">Live Assistance</p>
                        <p className="text-sm font-bold text-[#1D2F52]">24/7 Expert Support</p>
                    </div>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "85%" }}
                      className="h-full bg-gradient-to-r from-[#1D2F52] to-[#F22A5C]"
                    />
                </div>
              </motion.div>
            </motion.div>

            {/* Background Decorative Blurs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10">
              <div className="absolute top-0 right-0 w-72 h-72 bg-[#1D2F52]/5 blur-[100px] rounded-full" />
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#F22A5C]/5 blur-[100px] rounded-full" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AccessibilitySection;