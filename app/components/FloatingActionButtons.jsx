"use client"
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiOutlineRefresh, HiOutlineClipboardList, 
  HiCheckCircle, HiChevronLeft, HiX, HiLightningBolt, HiPlusCircle
} from 'react-icons/hi';
import { RiRobot2Fill, RiWhatsappFill } from 'react-icons/ri';
import Link from 'next/link';
import { serviceData } from '../utils/packages.js';
const FloatingActionButtons = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: "Welcome to TaxFilerz! 🚀 I'm your AI assistant. Which service category can I help you explore today?", stage: 'initial' }
  ]);
  const [currentStage, setCurrentStage] = useState('services');
  const [selectedService, setSelectedService] = useState(null);
  const chatContainerRef = useRef(null);

  const whatsappNumber = "+923272338939";
  const whatsappMsg = encodeURIComponent("Assalam o Alaikum, I am interested in your services and want to discuss further.");

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const addMessage = (text, type, hasLinks = false, details = null) => {
    const newMsg = { id: Date.now(), type, text, hasLinks, details };
    setMessages(prev => [...prev, newMsg]);
  };

  const handleSelection = (option) => {
    if (currentStage === 'services') {
      addMessage(`I'm interested in ${option.toUpperCase()}.`, 'user');
      setSelectedService(option);
      setTimeout(() => {
        addMessage(`Excellent choice. We have specialized plans for ${option}. Pick one to see the full breakdown:`, 'bot');
        setCurrentStage('plans');
      }, 600);  
    } else if (currentStage === 'plans') {
      addMessage(`Show me details for "${option}".`, 'user');
      setTimeout(() => {
        const planDetails = serviceData[selectedService].find(p => p.name === option);
        addMessage(`Here is everything included in the ${option} package:`, 'bot', true, planDetails);
        setCurrentStage('explore');
      }, 600);
    }
  };

  const resetChat = () => {
    addMessage("I want to check other services.", 'user');
    setTimeout(() => {
      setCurrentStage('services');
      addMessage("Sure! Which other category would you like to explore?", 'bot');
    }, 600);
  };

  return (
    <>
      {/* Back Button */}
      <Link href="/">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="fixed left-6 bottom-6 z-[999] bg-white text-[#1D2F52] w-14 h-14 rounded-full shadow-2xl flex items-center justify-center border border-gray-100 cursor-pointer">
          <HiChevronLeft size={30} />
        </motion.div>
      </Link>

      {/* Chat Toggle */}
      <motion.div 
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`fixed right-6 bottom-6 z-[999] cursor-pointer w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-colors ${isOpen ? 'bg-[#F22A5C]' : 'bg-[#1D2F52]'} text-white`}
      >
        {isOpen ? <HiX size={30} /> : <RiRobot2Fill size={32} />}
      </motion.div>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed right-6 bottom-24 z-[998] w-[92vw] md:w-[420px] h-[600px] bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#1D2F52] p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-[#F22A5C] p-2 rounded-xl"><RiRobot2Fill size={22} /></div>
                <div>
                  <h4 className="font-black text-xs uppercase tracking-widest">TaxFilerz Bot</h4>
                  <p className="text-[9px] text-green-400 font-bold uppercase">System Online • 2026</p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-5 bg-gray-50/50 scrollbar-hide">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[90%] p-4 rounded-2xl text-[12px] shadow-sm ${msg.type === 'user' ? 'bg-[#1D2F52] text-white rounded-tr-none' : 'bg-white text-gray-700 rounded-tl-none border border-gray-200'}`}>
                    <p className="font-bold">{msg.text}</p>
                    
                    {msg.details && (
                      <div className="mt-3 space-y-3">
                        {/* Price & Subtitle */}
                        <div className="border-b border-gray-100 pb-2">
                          <p className="text-[#F22A5C] font-black text-base">PKR {(msg.details.discounted || msg.details.discountedPrice || msg.details.monthly || msg.details.price).toLocaleString()}</p>
                          <p className="text-[9px] text-gray-400 font-bold uppercase leading-tight">{msg.details.subtitle}</p>
                          {msg.details.setup && <p className="text-[9px] text-blue-600 font-black mt-1">One-time Setup: PKR {msg.details.setup.toLocaleString()}</p>}
                        </div>

                        {/* Feature Categories (if any) */}
                        {msg.details.featureCategory && (
                           <div className="flex flex-wrap gap-1">
                             {msg.details.featureCategory.map((cat, i) => (
                               <span key={i} className="bg-gray-100 text-[8px] px-2 py-0.5 rounded font-bold">{cat}</span>
                             ))}
                           </div>
                        )}

                        {/* Features List */}
                        <ul className="space-y-1.5 max-h-[150px] overflow-y-auto pr-2 scrollbar-hide">
                          {msg.details.features.map((f, i) => (
                            <li key={i} className="text-[10px] flex gap-2 font-medium text-gray-600 leading-tight">
                              <HiCheckCircle className="text-green-500 shrink-0 mt-0.5" /> {f}
                            </li>
                          ))}
                        </ul>

                        {/* Client Benefits (if any) */}
                        {msg.details.clientBenefit && (
                          <div className="bg-purple-50 p-2 rounded-lg border border-purple-100">
                            {msg.details.clientBenefit.map((ben, i) => (
                              <p key={i} className="text-[9px] text-purple-700 font-bold flex gap-1 items-center"><HiLightningBolt /> {ben}</p>
                            ))}
                          </div>
                        )}

                        {/* Extras / Financial Services */}
                        {(msg.details.extra || msg.details.financialServices) && (
                          <div className="pt-2 border-t border-gray-100 italic">
                            {(msg.details.extra || msg.details.financialServices).map((ex, i) => (
                              <p key={i} className="text-[9px] text-gray-500 font-bold flex gap-1 items-start"><HiPlusCircle className="text-gray-300 mt-0.5" /> {ex}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {msg.hasLinks && (
                      <div className="mt-4 flex flex-col gap-2">
                        <a href={`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`} target="_blank" className="bg-[#25D366] text-white py-2.5 rounded-xl font-black flex items-center justify-center gap-2 text-[10px] uppercase shadow-lg"><RiWhatsappFill size={16} /> Chat on WhatsApp</a>
                        <Link href="/lead-form" onClick={()=>setIsOpen(false)} className="bg-white border-2 border-[#1D2F52] text-[#1D2F52] py-2.5 rounded-xl font-black flex items-center justify-center gap-2 text-[10px] uppercase"><HiOutlineClipboardList size={16} /> Book Session</Link>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Selection Buttons */}
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="flex flex-wrap gap-2 justify-center">
                {currentStage === 'services' && Object.keys(serviceData).map((s) => (
                  <button key={s} onClick={() => handleSelection(s)} className="px-4 py-2 border-2 border-[#1D2F52] text-[#1D2F52] rounded-xl font-black text-[9px] uppercase hover:bg-[#1D2F52] hover:text-white transition-all">
                    {s}
                  </button>
                ))}
                
                {currentStage === 'plans' && serviceData[selectedService].map((p) => (
                  <button key={p.id} onClick={() => handleSelection(p.name)} className="px-4 py-2 border-2 border-[#F22A5C] text-[#F22A5C] rounded-xl font-black text-[9px] uppercase hover:bg-[#F22A5C] hover:text-white transition-all">
                    {p.name}
                  </button>
                ))}

                {currentStage === 'explore' && (
                  <button onClick={resetChat} className="px-5 py-2.5 bg-[#1D2F52] text-white rounded-xl font-black text-[9px] uppercase flex items-center gap-2">
                    <HiOutlineRefresh /> View More Services
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingActionButtons;