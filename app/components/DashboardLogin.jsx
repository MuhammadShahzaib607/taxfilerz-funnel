"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiLockClosed, HiMail, HiEye, HiEyeOff } from 'react-icons/hi';

const AdminAuthModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if already admin
    const adminStatus = sessionStorage.getItem('isAdmin');
    if (!adminStatus) {
      setIsOpen(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "brandsocia@gmail.com" && password === "brandsocia@123") {
      sessionStorage.setItem('isAdmin', 'true');
      setIsOpen(false);
      window.location.reload(); // Refresh to reflect changes
    } else {
      setError("Invalid Credentials. Access Denied.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4 bg-[#1D2F52]/80 backdrop-blur-xl">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl border border-gray-100 relative overflow-hidden"
          >
            {/* Design Element */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#F22A5C]/10 rounded-full blur-3xl" />
            
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#1D2F52] text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <HiLockClosed size={30} />
              </div>
              <h2 className="text-2xl font-black text-[#1D2F52] uppercase tracking-tighter">Admin <span className="text-[#F22A5C]">Access</span></h2>
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-1">Verify your identity to proceed</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative group">
                <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#F22A5C] transition-colors" />
                <input 
                  type="email" required placeholder="Admin Email"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl outline-none border border-transparent focus:border-[#F22A5C]/20 focus:bg-white transition-all font-bold text-sm"
                />
              </div>

              <div className="relative group">
                <span onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-[#1D2F52]">
                  {showPass ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                </span>
                <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#F22A5C] transition-colors" />
                <input 
                  type={showPass ? "text" : "password"} required placeholder="Password"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-gray-50 rounded-2xl outline-none border border-transparent focus:border-[#F22A5C]/20 focus:bg-white transition-all font-bold text-sm"
                />
              </div>

              {error && <p className="text-[#F22A5C] text-[10px] font-black text-center uppercase animate-pulse">{error}</p>}

              <button className="w-full py-4 bg-[#1D2F52] text-white rounded-2xl font-black text-sm tracking-widest hover:bg-[#F22A5C] transition-all shadow-xl shadow-[#1D2F52]/20 uppercase">
                Login to Dashboard
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AdminAuthModal;