"use client"
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineRefresh, HiCheckCircle, HiLightningBolt } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import { RiAddCircleFill } from 'react-icons/ri'; // New icon for extras
import Navbar from "../../components/Navbar.jsx"
import Footer from "../../components/Footer.jsx"
import { serviceData } from '../../utils/packages.js';

const TaxfilerzChatBot = () => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: "Welcome to TaxFilerz & Co.! 🚀\nI'm your AI Assistant. Which area of your business should we optimize today?", stage: 'initial' }
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
  }, [messages]);

  const addMessage = (text, type, hasLinks = false, details = null) => {
    const newMsg = { id: Date.now(), type, text, hasLinks, details };
    setMessages(prev => [...prev, newMsg]);
  };

  const handleSelection = (option) => {
    if (currentStage === 'services') {
      addMessage(`I'm interested in ${option.toUpperCase()} services.`, 'user');
      setSelectedService(option);
      setTimeout(() => {
        addMessage(`Excellent! For ${option}, we have specialized packages. Which one fits your scale?`, 'bot');
        setCurrentStage('plans');
      }, 600);
    } 
    else if (currentStage === 'plans') {
      addMessage(`Tell me more about the "${option}" plan.`, 'user');
      setTimeout(() => {
        const planDetails = serviceData[selectedService].find(p => p.name === option);
        addMessage(`Here are the comprehensive details for the ${option} package:`, 'bot', true, planDetails);
        setCurrentStage('explore');
      }, 600);
    }
  };

  const resetChat = () => {
    addMessage("Show me other service categories.", 'user');
    setTimeout(() => {
      addMessage("Of course! What else can TaxFilerz do for you?", 'bot');
      setCurrentStage('services');
    }, 600);
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`, '_blank');
  };

  return (
    <>
      <Navbar />
      <section className="py-24 bg-white relative overflow-hidden min-h-screen">
        {/* Background Blurs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-100/30 blur-[120px] -z-10" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#F22A5C]/5 blur-[120px] -z-10" />

        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-[#1D2F52] mb-3 tracking-tighter uppercase">
              TaxFilerz <span className='text-[#F22A5C]'>AI Assistant</span>
            </h2>
            <div className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Active & Ready to help</p>
            </div>
          </div>

          <div className="bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(29,47,82,0.2)] border border-gray-100 overflow-hidden flex flex-col h-[700px]">
            
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 scroll-smooth scrollbar-hide">
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div key={msg.id} initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[90%] p-6 rounded-[2rem] shadow-sm ${msg.type === 'user' ? 'bg-[#1D2F52] text-white rounded-tr-none' : 'bg-gray-50 text-gray-800 rounded-tl-none border border-gray-100'}`}>
                      <p className="font-bold text-sm md:text-base leading-relaxed whitespace-pre-line">{msg.text}</p>
                      
                      {msg.details && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-5 p-5 bg-white rounded-3xl border border-gray-100 shadow-xl">
                          {/* Header Info */}
                          <div className="flex flex-col gap-1 mb-4 border-b pb-3">
                             <span className="font-black text-[#1D2F52] text-lg uppercase">{msg.details.name}</span>
                             <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{msg.details.subtitle}</span>
                          </div>
                          
                          {/* Pricing */}
                          {/* <div className="mb-4">
                             <p className="text-[#F22A5C] font-black text-2xl">
                                PKR {(msg.details.discounted || msg.details.discountedPrice || msg.details.monthly || msg.details.price).toLocaleString()}
                                <span className="text-xs text-gray-300 font-medium lowercase"> /period</span>
                             </p>
                             {msg.details.setup && <p className="text-[11px] text-blue-600 font-black mt-1 uppercase">Setup Fee: PKR {msg.details.setup.toLocaleString()}</p>}
                          </div> */}

                          {/* Feature Categories Tags */}
                          {msg.details.featureCategory && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {msg.details.featureCategory.map((cat, i) => (
                                <span key={i} className="px-2 py-1 bg-gray-100 text-[9px] rounded-md font-black text-gray-500 uppercase tracking-tighter border border-gray-200">{cat}</span>
                              ))}
                            </div>
                          )}

                          {/* Features List */}
                          <ul className="space-y-3 mb-5 max-h-[200px] overflow-y-auto pr-2 scrollbar-hide">
                            {msg.details.features.map((feat, i) => (
                              <li key={i} className="flex items-start gap-3 text-[12px] text-gray-600 font-bold leading-tight">
                                <HiCheckCircle className="text-[#F22A5C] mt-0.5 shrink-0" size={16} />
                                {feat}
                              </li>
                            ))}
                          </ul>

                          {/* Client Benefits Box */}
                          {msg.details.clientBenefit && (
                            <div className="mb-5 p-4 bg-purple-50 rounded-2xl border border-purple-100">
                              <p className="text-[10px] text-purple-400 font-black uppercase mb-2 tracking-widest">Key Benefits</p>
                              {msg.details.clientBenefit.map((ben, i) => (
                                <p key={i} className="text-xs text-purple-800 font-bold flex items-center gap-2 mb-1">
                                  <HiLightningBolt className="text-purple-500" /> {ben}
                                </p>
                              ))}
                            </div>
                          )}

                          {/* Financial Services / Extra Retainers */}
                          {(msg.details.extra || msg.details.financialServices) && (
                            <div className="mb-5 pt-4 border-t border-gray-100">
                               <p className="text-[10px] text-gray-400 font-black uppercase mb-2 tracking-widest">Additional Support</p>
                               {(msg.details.extra || msg.details.financialServices).map((ex, i) => (
                                 <p key={i} className="text-[11px] text-gray-500 font-bold flex items-start gap-2 mb-1.5 leading-tight">
                                   <RiAddCircleFill className="text-gray-300 mt-0.5 shrink-0" /> {ex}
                                 </p>
                               ))}
                            </div>
                          )}

                          <button onClick={openWhatsApp} className="w-full py-4 bg-green-500 text-white rounded-2xl font-black text-xs flex items-center justify-center gap-2 hover:bg-green-600 transition-all shadow-lg shadow-green-200 uppercase tracking-widest">
                            <FaWhatsapp size={18}/> Activate This Plan
                          </button>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Stage Controls */}
            <div className="p-8 bg-gray-50 border-t border-gray-100">
              <div className="flex flex-wrap gap-3 justify-center">
                {currentStage === 'services' && Object.keys(serviceData).map((s) => (
                  <button key={s} onClick={() => handleSelection(s)} className="px-6 py-3 bg-white border-2 border-[#1D2F52] text-[#1D2F52] rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#1D2F52] hover:text-white transition-all active:scale-95 shadow-md">
                    {s}
                  </button>
                ))}

                {currentStage === 'plans' && serviceData[selectedService].map((p) => (
                  <button key={p.id} onClick={() => handleSelection(p.name)} className="px-6 py-3 bg-white border-2 border-[#F22A5C] text-[#F22A5C] rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#F22A5C] hover:text-white transition-all active:scale-95 shadow-md">
                    {p.name}
                  </button>
                ))}

                {currentStage === 'explore' && (
                   <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
                      <button onClick={resetChat} className="px-8 py-4 bg-[#1D2F52] text-white rounded-2xl font-black text-xs flex items-center justify-center gap-2 hover:shadow-2xl transition-all uppercase tracking-widest grow">
                        <HiOutlineRefresh size={18}/> Other Services
                      </button>
                      <button onClick={openWhatsApp} className="px-8 py-4 bg-green-500 text-white rounded-2xl font-black text-xs flex items-center justify-center gap-2 hover:shadow-2xl transition-all uppercase tracking-widest grow">
                        <FaWhatsapp size={18}/> Contact Expert
                      </button>
                   </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default TaxfilerzChatBot;