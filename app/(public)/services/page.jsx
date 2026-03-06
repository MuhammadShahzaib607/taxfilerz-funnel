"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { HiCheck, HiOutlineLibrary, HiOutlineDocumentText, HiOutlineDesktopComputer } from 'react-icons/hi';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const ServicesPage = () => {
  // Data strictly based on your uploaded images
  const categories = [
    {
      title: "Bookkeeping & Accounting",
      icon: <HiOutlineLibrary />,
      desc: "Choose a plan that's right for you to manage your daily financials.",
      plans: [
        { name: "Silver", price: "24,999", color: "#1D2F52", features: ["Upto 50 Transactions", "Payroll (upto 10 employees)", "Bank Reconciliation (1 Bank)", "Monthly Financial Report (P&L upto 10 LAC)", "Sales Tax Invoices (15-20)", "Client's own Software"] },
        { name: "Gold", price: "44,999", color: "#F22A5C", features: ["150-200 Transactions", "Payroll (upto 25 employees)", "Bank Reconciliation (150 Transactions)", "Monthly Financial Report (P&L upto 20 LAC)", "Yearly Financial Statement", "Sales Tax Invoice (upto 40)", "FBR Digital Sales Tax Invoices"] },
        { name: "Platinum", price: "69,999", color: "#1D2F52", features: ["Unlimited Transactions", "Payroll (upto 35-40 employees)", "Bank Reconciliation (Unlimited)", "Monthly Financial Report P&L", "Semi Annual Balance Sheet", "Yearly Financial Statement", "FBR Notice Compliance"] }
      ]
    },
    {
      title: "Sales Tax Return Packages",
      icon: <HiOutlineDocumentText />,
      desc: "Complete FBR, SRB, and PRA compliance for your business returns.",
      plans: [
        { name: "Starter", price: "14,999", color: "#1D2F52", features: ["FBR Sales Tax Return Only", "Upto 20 Sales Tax Invoices Only", "Purchase Reconciliation"] },
        { name: "Standard", price: "24,999", color: "#F22A5C", features: ["FBR Sales Tax Return Preparation", "SRB Sales Tax return Preparation", "25 FBR Sales Tax Invoices", "25 SRB/PRA/KPRA/BRA Invoices", "Purchase Invoice Reconciliation"] },
        { name: "Premium", price: "69,999", color: "#1D2F52", features: ["FBR/SRB/PRA Return Preparation", "35 FBR Sales Tax Invoices", "Annex- F Preparation", "Annex-H 1 Preparation", "Sales Tax Audit Support"] }
      ]
    },
    {
      title: "Digital Invoicing & ERP",
      icon: <HiOutlineDesktopComputer />,
      desc: "Modern FBR integrated software solutions for seamless operations.",
      plans: [
        { name: "Digital Invoicing", price: "15,000", note: "One-time: 40,000", color: "#1D2F52", features: ["FBR Digital Invoice Integration", "Customer Management", "Item Management", "Sales Reporting", "1 Company, 5 Users"] },
        { name: "Inventory & Finance", price: "15,000", note: "One-time: 50,000", color: "#F22A5C", features: ["All features of Package 1", "Purchase Management", "Inventory Control", "Financial Accounting", "1 Company, 5 Users"] },
        { name: "Full ERP", price: "20,000", note: "One-time: 60,000", color: "#1D2F52", features: ["All features of Package 2", "Production Module (BOM)", "Production & Assembly", "1 Company, 5 Users"] }
      ]
    }
  ];

  return (
<>
    <Navbar />
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1D2F52]/5 rounded-full blur-[120px] -z-10" />
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-[#1D2F52] mb-6"
          >
            Transparent <span className="bg-gradient-to-r from-[#1D2F52] to-[#F22A5C] bg-clip-text text-transparent">Pricing</span>
          </motion.h1>
          <p className="text-gray-500 text-xl font-medium max-w-2xl mx-auto">
            Scale your business with TaxFilerz's professional financial and tax services.
          </p>
        </div>
      </section>

      {/* Services Sections */}
      {categories.map((cat, idx) => (
        <section key={idx} className={`py-24 ${idx % 2 !== 0 ? 'bg-gray-50/50' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-14 h-14 bg-[#1D2F52] text-white rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-[#1D2F52]/20">
                {cat.icon}
              </div>
              <div>
                <h2 className="text-3xl font-black text-[#1D2F52]">{cat.title}</h2>
                <p className="text-gray-500 font-medium">{cat.desc}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {cat.plans.map((plan, pIdx) => (
                <motion.div
                  key={pIdx}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_rgba(29,47,82,0.1)] transition-all relative overflow-hidden flex flex-col h-full"
                >
                  {/* Price Header */}
                  <div className="mb-8">
                    <h3 className="text-sm font-black uppercase tracking-widest mb-2" style={{ color: plan.color }}>{plan.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-gray-400 font-bold text-sm">PKR</span>
                      <span className="text-4xl font-black text-[#1D2F52]">{plan.price}</span>
                      <span className="text-gray-400 font-bold text-sm">/mo</span>
                    </div>
                    {plan.note && <p className="text-[10px] font-black text-[#F22A5C] mt-1 uppercase">{plan.note}</p>}
                  </div>

                  {/* Features List */}
                  <ul className="space-y-4 mb-10 flex-grow">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-sm font-semibold text-gray-600">
                        <HiCheck className="mt-1 flex-shrink-0" style={{ color: plan.color }} />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button 
                    className="w-full py-4 rounded-2xl font-black transition-all hover:scale-[1.02] active:scale-[0.98]"
                    style={{ backgroundColor: plan.color, color: 'white' }}
                  >
                    Get Started
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Footer Branding Section */}
      <section className="py-20 bg-[#1D2F52] text-center">
        <h2 className="text-white text-3xl font-black mb-4">Not sure which plan to choose?</h2>
        <p className="text-gray-400 mb-8 font-medium">Our experts can help you customize a package for your specific business needs.</p>
      </section>
    </div>
    <Footer />
</>
  );
};

export default ServicesPage;