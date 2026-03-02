"use client"
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiUser, HiMail, HiPhone, HiChevronDown, HiCheckCircle, HiInformationCircle, HiPlusCircle, HiLightningBolt, HiStar } from 'react-icons/hi';
import { CgSpinnerTwoAlt } from 'react-icons/cg';
import axios from 'axios';
import { serviceData } from '../../utils/packages.js'; 

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://taxfilerz-funnel-backend.vercel.app/";

const LeadModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedService, setSelectedService] = useState('bookkeeping');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [formData, setFormData] = useState({ fullname: '', email: '', phone: '' });
  
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      setIsOpen(true);
      hasMounted.current = true;
    }
    const timer = setInterval(() => setIsOpen(true), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  const calculatePrice = (plan) => {
    let base = plan.discounted || plan.discountedPrice || plan.monthly || plan.price || 0;
    return billingCycle === 'annual' ? Math.round(base * 0.85) : base;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPlanId) return alert("Please select a package first!");

    const plan = serviceData[selectedService].find(p => p.id === selectedPlanId);
    setLoading(true);

    try {
      await axios.post(`${API_BASE_URL}`, {
        ...formData,
        service: selectedService.toUpperCase(),
        packageAmount: `PKR ${calculatePrice(plan).toLocaleString()}`,
        packageName: plan.name,
        plan: billingCycle
      });
      setIsOpen(false);
      alert("Success! We'll contact you shortly.");
    } catch (err) {
      alert("Error sending inquiry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => !loading && setIsOpen(false)}
            className="absolute inset-0 bg-[#1D2F52]/80 backdrop-blur-md cursor-pointer"
          />

          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            className="relative bg-white w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl p-6 md:p-10 scrollbar-hide border border-white/20"
          >
            <button type="button" onClick={() => setIsOpen(false)} className="absolute right-6 top-6 text-gray-400 hover:text-[#F22A5C] transition-all"><HiX size={28} /></button>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-[#1D2F52] uppercase tracking-tighter">
                Claim Your <span className="text-[#F22A5C]">Free Strategy</span> Session
              </h2>
              <p className="text-gray-400 text-[10px] font-bold mt-2 uppercase tracking-widest">Official TaxFilerz & Co. Packages 2026</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* User Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['fullname', 'email', 'phone'].map((id) => (
                  <input 
                    key={id} required placeholder={id.toUpperCase()} 
                    className="w-full px-5 py-3 bg-gray-50 rounded-xl border border-transparent focus:border-[#F22A5C] outline-none font-bold text-xs transition-all"
                    onChange={(e)=>setFormData({...formData, [id]: e.target.value})}
                  />
                ))}
              </div>

              {/* Selectors */}
              <div className="flex flex-col md:flex-row gap-4 relative">
                <div className="relative flex-grow">
                  <select 
                    className="w-full p-4 bg-[#1D2F52] text-white rounded-xl font-black text-xs appearance-none outline-none cursor-pointer pr-10"
                    value={selectedService} onChange={(e) => {setSelectedService(e.target.value); setSelectedPlanId(null);}}
                  >
                    <option value="bookkeeping">Bookkeeping Virtual Assistant</option>
                    <option value="software">TaxFilerz – Accounting Software Packages</option>
                    <option value="bundles">TaxFilerz – All in One Accounting Software & Bookkeeping Packages</option>
                    <option value="taxComplianceServices">Tax Compliance Services Package</option>
                    <option value="taxlegalConsultancy">Tax Consultancy</option>
                  </select>
                  <HiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white pointer-events-none" size={20} />
                </div>
              </div>

              {/* Dynamic Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {serviceData[selectedService].map((p) => {
                  const currentPrice = calculatePrice(p);
                  const isPremium = p.name.toLowerCase().includes('premium') || p.name.toLowerCase().includes('enterprise') || p.name.toLowerCase().includes('advanced');

                  return (
                    <div 
                      key={p.id} onClick={() => setSelectedPlanId(p.id)}
                      className={`relative p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col ${selectedPlanId === p.id ? 'border-[#F22A5C] bg-[#F22A5C]/5 shadow-xl' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                    >
                      {/* BONUS Badge for Premium Plans */}
                      {isPremium && (
                        <div className="absolute -top-3 -right-10 -translate-x-1/2 bg-[#F22A5C] text-white px-4 py-1 rounded-full text-[10px] font-black tracking-[0.2em] flex items-center gap-1 shadow-lg z-20">
                          BONUS OFFER
                        </div>
                      )}

                      <h4 className="font-black text-sm text-[#1D2F52] uppercase">{p.name}</h4>
                      <p className="text-[10px] font-bold text-gray-400 mb-2 leading-tight">{p.subtitle}</p>
                      
                      {/* Discounted Pricing Section */}
                      <div className="mb-3">
                        {/* <div className="text-[18px] font-bold text-gray-400 line-through decoration-gray-400 opacity-60">
                          PKR {(currentPrice * 2).toLocaleString()}
                        </div>

<span className="inline-flex items-center px-3 py-1 rounded-full bg-[#F22A5C]/10 text-[#F22A5C] text-[9px] font-black uppercase tracking-widest border border-[#F22A5C]/20 mb-3 mt-2">
                                50% Discount
                             </span>

                        <div className="text-[#F22A5C] font-black text-xl leading-tight">
                            PKR {currentPrice.toLocaleString()}
                            <span className="text-xs text-gray-300 ml-1">/mo</span>
                        </div> */}
                      </div>

                      {p.setup && <div className="text-[9px] font-black text-blue-600 mb-3 bg-blue-50 p-1 px-2 rounded-md inline-block">ONE-TIME SETUP: PKR {p.setup.toLocaleString()}</div>}

                      <div className="space-y-4 flex-grow overflow-y-auto max-h-[250px] pr-2 scrollbar-hide">
                        {/* Features */}
                        <div>
                          <p className="text-[9px] font-black text-gray-400 uppercase mb-2">Core Features</p>
                          <ul className="space-y-1.5">
                            {p.features.map((f, i) => (
                              <li key={i} className="text-[10px] text-gray-600 font-bold flex gap-2 items-start"><HiCheckCircle className="text-green-500 shrink-0" size={14}/> {f}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Feature Categories */}
                        {p.featureCategory && (
                          <div>
                            <p className="text-[9px] font-black text-gray-400 uppercase mb-2">Modules Included</p>
                            <div className="flex flex-wrap gap-1">
                              {p.featureCategory.map((cat, i) => (
                                <span key={i} className="text-[8px] bg-gray-100 px-2 py-0.5 rounded font-bold">{cat}</span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Client Benefits */}
                        {p.clientBenefit && (
                          <div className="bg-purple-50 p-3 rounded-xl border border-purple-100">
                            <p className="text-[9px] font-black text-purple-600 uppercase mb-1">Business Benefits</p>
                            <ul className="space-y-1">
                              {p.clientBenefit.map((ben, i) => (
                                <li key={i} className="text-[9px] text-purple-700 font-bold flex gap-1"><HiLightningBolt size={10}/> {ben}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Extra / Financial Services */}
                        {(p.extra || p.financialServices) && (
                          <div className="pt-3 border-t border-gray-100">
                              <p className="text-[11px] font-black text-red-500 uppercase mb-2">
                                {p.subtitle === "Suitable for turnover 10+ crore annually." || p.subtitle === "Digital Invoice + Purchase + Inventory + Production + Finance + Bookkeeping Pkg" ? "Not Charged: Save Rs. 200,000" : "Add-ons & Advisory"}
                              </p>
                              <ul className="space-y-1">
                               {(p.extra || p.financialServices).map((ex, i) => (
                                 <li key={i} className="text-[9px] text-gray-500 font-bold flex gap-2 italic items-start"><HiPlusCircle className="text-gray-300 shrink-0" size={12}/> {ex}</li>
                               ))}
                             </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4">
                <button disabled={loading || !selectedPlanId} className="w-full py-5 bg-[#1D2F52] text-white rounded-xl font-black text-sm tracking-widest hover:bg-[#F22A5C] transition-all disabled:opacity-30">
                  {loading ? <CgSpinnerTwoAlt className="animate-spin mx-auto text-xl" /> : "CONFIRM SELECTION & GET STARTED"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LeadModal;