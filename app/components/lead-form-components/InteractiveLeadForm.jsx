"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiCheckCircle, HiPhone, HiUser, HiMail, HiChevronDown, 
  HiInformationCircle, HiLightningBolt, HiPlusCircle, HiStar 
} from 'react-icons/hi';
import { CgSpinnerTwoAlt } from 'react-icons/cg';
import { serviceData } from '../../utils/packages.js';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://taxfilerz-funnel-backend.vercel.app/";

const InteractiveLeadForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ fullname: '', email: '', phone: '' });
  const [selectedService, setSelectedService] = useState('');
  const [billingCycle, setBillingCycle] = useState('monthly'); 
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  const calculateFinalPrice = (plan) => {
    let base = plan.discounted || plan.monthly || plan.discountedPrice || plan.price;
    if (billingCycle === 'annual') {
      return Math.round((base * 12 * 0.9) / 12); 
    }
    return base;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPlanId) return alert("Please select a package first!");

    const plan = serviceData[selectedService].find(p => p.id === selectedPlanId);
    const finalPrice = calculateFinalPrice(plan);

    const payload = {
      fullname: formData.fullname,
      email: formData.email,
      phone: formData.phone,
      service: selectedService.toUpperCase(),
      packageAmount: `PKR ${finalPrice.toLocaleString()}`,
      packageName: plan.name,
      plan: billingCycle
    };

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}`, payload);
      if (response.data.success) {
        alert("Request sent successfully!");
        setFormData({ fullname: '', email: '', phone: '' });
        setSelectedPlanId(null);
        setSelectedService('');
      }
    } catch (error) {
      alert(error.response?.data?.message || "Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-white relative">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F22A5C]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#1D2F52]/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-[#1D2F52] via-[#F22A5C] to-[#1D2F52] bg-clip-text text-transparent uppercase tracking-tighter">
              Ready to Scale?
            </span>
          </h2>
          <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px]">Select your service and get a custom quote</p>
        </div>

        <div className="bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(29,47,82,0.1)] border border-gray-100 p-8 md:p-14">
          <form onSubmit={handleSubmit} className="space-y-12">
            
            {/* 1. User Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { id: 'fullname', label: 'Full Name', icon: <HiUser />, placeholder: 'Naveed Ahmad' },
                { id: 'email', label: 'Email', icon: <HiMail />, placeholder: 'contact@taxfilerz.com' },
                { id: 'phone', label: 'Phone', icon: <HiPhone />, placeholder: '+92 3XX XXXXXXX' }
              ].map((input) => (
                <div key={input.id}>
                  <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block ml-2">{input.label}</label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#1D2F52]/20">{input.icon}</span>
                    <input
                      required
                      autoComplete="off"
                      className="w-full pl-12 pr-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#F22A5C]/20 outline-none font-bold text-[#1D2F52] transition-all"
                      placeholder={input.placeholder}
                      value={formData[input.id]}
                      onChange={(e) => setFormData({...formData, [input.id]: e.target.value})}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* 2. Service Selection with Dropdown Icon */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-4 border-t border-gray-50">
              <div className="w-full">
                <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block ml-2">What do you need?</label>
                <div className="relative">
                  <select
                    required
                    className="w-full appearance-none px-8 py-5 bg-[#1D2F52] text-white rounded-2xl font-black text-xs tracking-widest cursor-pointer outline-none shadow-lg pr-14"
                    value={selectedService}
                    onChange={(e) => { setSelectedService(e.target.value); setSelectedPlanId(null); }}
                  >
                    <option value="" disabled>SELECT CATEGORY</option>
                    <option value="bookkeeping">Bookkeeping Virtual Assitant</option>
                    <option value="software">TaxFilerz – Accounting Software Packages</option>
                    <option value="bundles">TaxFilerz – All in One Accounting Software & Bookkeeping Packages</option>
                    <option value="taxlegal">Tax compliance Services Package.</option>
                  </select>
                  <HiChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-white text-xl pointer-events-none" />
                </div>
              </div>
            </div>

            {/* 3. Package Grid */}
            <AnimatePresence mode="wait">
              {selectedService && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {serviceData[selectedService].map((plan) => {
                    const currentPrice = calculateFinalPrice(plan);
                    const isPremium = plan.name.toLowerCase().includes('premium') || plan.name.toLowerCase().includes('enterprise') || plan.name.toLowerCase().includes('advanced');
                    
                    return (
                      <div
                        key={plan.id}
                        onClick={() => setSelectedPlanId(plan.id)}
                        className={`relative p-8 rounded-[2.5rem] border-2 cursor-pointer transition-all flex flex-col h-full ${
                          selectedPlanId === plan.id ? "border-[#F22A5C] bg-[#F22A5C]/5 shadow-2xl" : "border-gray-100 hover:border-gray-200 bg-white"
                        }`}
                      >
                        {/* HUGE BONUS Badge for Premium Plans */}
                        {isPremium && (
                          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#F22A5C] text-white px-6 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] flex items-center gap-2 shadow-xl z-20 whitespace-nowrap border-4 border-white">
                            <HiStar className="animate-pulse" /> HUGE BONUS INCLUDED
                          </div>
                        )}

                        <h4 className="font-black text-[#1D2F52] text-lg mb-1 uppercase tracking-tight">{plan.name}</h4>
                        <p className="text-[10px] font-bold text-gray-400 mb-4 uppercase leading-relaxed">{plan.subtitle}</p>
                        
                        <div className="mb-6">
                          {/* 2x Strike-through Price */}
                          <p className="text-xs font-bold text-gray-400 line-through decoration-[#F22A5C] decoration-2 opacity-60 mb-0.5">
                            Rs {(currentPrice * 2).toLocaleString()}
                          </p>
                          <p className="text-3xl font-black text-[#1D2F52]">
                            Rs {currentPrice.toLocaleString()}
                            <span className="text-xs text-gray-400 ml-1">/mo</span>
                          </p>
                          {plan.setup && <p className="text-[9px] font-black text-blue-600 uppercase mt-1 tracking-widest">One-time Setup: Rs {plan.setup.toLocaleString()}</p>}
                        </div>

                        {/* Display Categories if available */}
                        {plan.featureCategory && (
                           <div className="flex flex-wrap gap-1 mb-4">
                              {plan.featureCategory.map((cat, i) => (
                                 <span key={i} className="bg-gray-100 text-[8px] px-2 py-0.5 rounded font-black text-gray-500 uppercase">{cat}</span>
                              ))}
                           </div>
                        )}

                        {/* Features List */}
                        <ul className="space-y-3 mb-6 flex-grow max-h-[250px] overflow-y-auto pr-2 scrollbar-hide text-left">
                          {plan.features.map((f, i) => (
                            <li key={i} className="text-[11px] font-bold text-gray-600 flex items-start gap-2 leading-tight">
                              <HiCheckCircle className="text-[#F22A5C] mt-0.5 shrink-0" /> {f}
                            </li>
                          ))}
                        </ul>

                        {/* Client Benefits Section */}
                        {plan.clientBenefit && (
                           <div className="mb-4 p-3 bg-white rounded-xl border border-purple-100 shadow-sm text-left">
                              <p className="text-[8px] font-black text-purple-400 uppercase mb-2 tracking-tighter">Package Benefit</p>
                              {plan.clientBenefit.map((ben, i) => (
                                 <p key={i} className="text-[10px] font-bold text-purple-700 flex items-center gap-2 mb-1">
                                    <HiLightningBolt className="shrink-0" /> {ben}
                                 </p>
                              ))}
                           </div>
                        )}

                        {/* Extra / Financial Services Section */}
                        {(plan.extra || plan.financialServices) && (
                          <div className="pt-4 border-t border-dashed border-gray-200 mt-auto text-left">
                            <p className="text-[8px] font-black text-gray-400 uppercase mb-2">Available Add-ons</p>
                            {(plan.extra || plan.financialServices).map((ex, i) => (
                              <p key={i} className="text-[9px] font-bold text-gray-500 flex items-start gap-2 uppercase mb-1.5 leading-tight">
                                <HiPlusCircle className="text-[#1D2F52] shrink-0 mt-0.5" /> {ex}
                              </p>
                            ))}
                          </div>
                        )}

                        {selectedPlanId === plan.id && (
                          <motion.div layoutId="check" className="absolute -top-3 -right-3 bg-[#F22A5C] text-white rounded-full p-1 shadow-lg border-4 border-white">
                            <HiCheckCircle size={24} />
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>

            {/* 4. Action Button */}
            <div className="flex flex-col items-center gap-6 pt-8">
              <button
                type="submit"
                disabled={loading || !selectedPlanId}
                className="group w-full md:w-auto px-24 py-6 bg-[#1D2F52] text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all shadow-2xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <CgSpinnerTwoAlt className="animate-spin text-2xl mx-auto" /> : "Confirm Request"}
              </button>
              <div className="flex items-center gap-4 opacity-40">
                <div className="h-px w-12 bg-gray-400" />
                <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">TaxFilerz Precision Systems</p>
                <div className="h-px w-12 bg-gray-400" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default InteractiveLeadForm;