"use client"
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion'; // Framer motion for that modern Byte Digital touch
import Link from 'next/link';
import { HiPause, HiPlay } from 'react-icons/hi';

const HeroSection = () => {

  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
        videoRef.current.muted = false; // Awaz on ho jayegi click par
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative min-h-screen pt-16 pb-20 overflow-hidden bg-white">
      {/* Background Subtle Gradients */}
      <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-gradient-to-bl from-[#F22A5C]/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-gradient-to-tr from-[#1D2F52]/5 to-transparent rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Content Side */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1D2F52] leading-[1.1] mb-6">
                Master Your Finances with <br />
                <span className="bg-gradient-to-r from-[#1D2F52] via-[#F22A5C] to-[#1D2F52] bg-clip-text text-transparent">
                  Precision & Confidence
                </span>
              </h1>
              
              <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
                At <span className="font-bold text-[#1D2F52]">Tax Filerz & Co.</span>, we simplify the complex world of tax filing, expert bookkeeping, and seamless digital invoicing. Empowering your business with smart financial strategies tailored for growth.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link href="/lead-form" className="w-full sm:w-auto px-8 py-4 bg-[#1D2F52] text-white rounded-xl font-bold hover:bg-[#F22A5C] transition-all duration-300 shadow-xl shadow-[#1D2F52]/20">
                  Start Your Consultation
                </Link>
                <Link href="/services" className="w-full sm:w-auto px-8 py-4 border-2 border-[#1D2F52]/10 text-[#1D2F52] rounded-xl font-bold hover:border-[#F22A5C] hover:text-[#F22A5C] transition-all duration-300">
                  View Our Services
                </Link>
              </div>

              {/* Trust Badges / Stats */}
              <div className="mt-12 pt-8 border-t border-gray-100 flex items-center gap-8 justify-center lg:justify-start">
                <div>
                  <h4 className="text-2xl font-bold text-[#F22A5C]">99%</h4>
                  <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Accuracy Rate</p>
                </div>
                <div className="w-px h-10 bg-gray-200" />
                <div>
                  <h4 className="text-2xl font-bold text-[#1D2F52]">500+</h4>
                  <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Active Clients</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Video Side (Vertical Video Management) */}
          <div className="flex-1 relative w-full flex justify-center lg:justify-end">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-[400px] aspect-[9/16] rounded-[2.5rem] p-3 bg-gradient-to-b from-[#1D2F52] to-[#F22A5C] shadow-2xl"
            >
              {/* Inner Video Container */}
              <div className="w-full h-full min-h-[400px] rounded-[2.5rem] overflow-hidden bg-black relative group shadow-2xl border-4 border-[#1D2F52]/10">
      
      {/* Video Element */}
      <video 
        ref={videoRef}
        loop 
        playsInline 
        preload="auto"
        className={`w-full h-full object-cover transition-opacity duration-1000 ${isPlaying ? 'opacity-100' : 'opacity-60'}`}
      >
        <source src="/hero-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Play/Pause Central Button */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <button 
          onClick={togglePlay}
          className={`transition-all duration-500 transform ${isPlaying ? 'opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100' : 'opacity-100 scale-100'} 
          bg-[#F22A5C] text-white p-6 rounded-full shadow-[0_0_30px_rgba(242,42,92,0.5)] hover:bg-[#1D2F52] active:scale-90`}
        >
          {isPlaying ? <HiPause size={40} /> : <HiPlay size={40} className="ml-1" />}
        </button>
      </div>

      {/* Floating Glass UI Overlay (Bottom) */}
      {/* <div className={`absolute bottom-6 left-6 right-6 backdrop-blur-xl bg-white/10 p-5 rounded-2xl border border-white/20 z-10 transition-all duration-500 ${isPlaying ? 'translate-y-2 opacity-40 group-hover:translate-y-0 group-hover:opacity-100' : 'translate-y-0 opacity-100'}`}>
        <div className="flex items-center gap-3 mb-1">
          <span className="w-2 h-2 bg-[#F22A5C] rounded-full animate-ping"></span>
          <p className="text-white text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Live Update</p>
        </div>
        <p className="text-white text-sm md:text-base font-medium italic leading-relaxed">
          "Simplifying taxes for modern startups."
        </p>
      </div> */}

      {/* Top Badge (Extra UI Touch) */}
      {!isPlaying && (
        <div className="absolute top-6 left-6 bg-[#1D2F52] text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest z-10">
          Taxfilerz Insight
        </div>
      )}
    </div>

              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-[#F22A5C]/10 rounded-full animate-pulse blur-xl" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#1D2F52]/10 rounded-full animate-pulse blur-xl" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;