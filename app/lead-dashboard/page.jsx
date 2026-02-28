"use client";
import AdminAuthModal from "../components/DashboardLogin"
import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard, Search, Play, Square, CheckCircle, Clock, Menu, X,
  Users, Filter, TrendingUp, Loader2, Trash2, CheckCircle2, AlertCircle, 
  ChevronRight, ArrowUpRight, DollarSign, ShieldCheck,
  Inbox, ChevronDown, Loader, XCircle, RotateCw
} from 'lucide-react';
import Link from 'next/link';

// --- CONFIGURATION ---
const API_BASE_URL = 'https://taxfilerz-funnel-backend.vercel.app/';

export default function TaxFilerzDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // --- REAL STATS CALCULATION ---
  const totalLeads = leads.length;
  const confirmedCount = leads.filter(l => l.isOrderConfirmed === "Confirm").length;
  const pendingCount = leads.filter(l => l.isOrderConfirmed === "Pending" || !l.isOrderConfirmed).length;

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(API_BASE_URL);
        const result = await res.json();
        setLeads(result.data.reverse() || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    };
    fetchData();
  }, []);

  // --- UPDATED ACTION: Dropdown Status Update ---
  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_BASE_URL}order`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setLeads(prev => prev.map(lead =>
          lead._id === id ? { ...lead, isOrderConfirmed: newStatus } : lead
        ));
      }
    } catch (err) {
      console.error("Order Update failed:", err);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = !currentStatus;
    try {
      const res = await fetch(API_BASE_URL, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, sendMessages: newStatus }),
      });
      if (res.ok) {
        setLeads(prev => prev.map(lead =>
          lead._id === id ? { ...lead, sendMessages: newStatus } : lead
        ));
      }
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  const deleteLead = async (id) => {
    if (!confirm("Are you sure you want to delete this client record?")) return;
    const originalLeads = [...leads];
    setLeads(leads.filter(lead => lead._id !== id));
    try {
      const res = await fetch(API_BASE_URL, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error();
    } catch (err) {
      setLeads(originalLeads);
      alert("Deletion failed");
    }
  };

  // --- FILTERING LOGIC ---
  const filteredLeads = leads.filter(lead => {
    const nameMatch = lead.fullname.toLowerCase().includes(searchTerm.toLowerCase());
    const emailMatch = lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchSearch = nameMatch || emailMatch;

    if (activeTab === 'Confirm') return lead.isOrderConfirmed === 'Confirm' && matchSearch;
    if (activeTab === 'Pending') return (lead.isOrderConfirmed === 'Pending' || !lead.isOrderConfirmed) && matchSearch;
    if (activeTab === 'Start') return lead.sendMessages === true && matchSearch;
    if (activeTab === 'Stop') return lead.sendMessages === false && matchSearch;
    return matchSearch;
  });

  // Status Style Helper
  const getStatusStyles = (status) => {
    switch (status) {
      case 'Confirm': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'InProcess': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Reject': return 'bg-gray-100 text-gray-500 border-gray-200';
      case 'Pending': 
      default: return 'bg-rose-50 text-[#F22A5C] border-rose-100';
    }
  };

  const StatsCard = ({ title, val, icon: Icon, colorClass, onClick }) => (
    <div
      onClick={onClick}
      className={`p-6 rounded-[2rem] bg-white border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all group ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div>
        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{title}</p>
        <h3 className="text-3xl font-black mt-1 text-[#1D2F52]">{val}</h3>
      </div>
      <div className={`p-4 rounded-2xl transition-colors ${colorClass}`}>
        <Icon size={24} />
      </div>
    </div>
  );

  return (
    <>
    <AdminAuthModal />
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans overflow-hidden text-[#1D2F52]">
      {/* SIDEBAR */}
      <aside className={`${isSidebarOpen ? 'w-72' : 'w-24'} bg-[#1D2F52] text-white transition-all duration-500 ease-in-out p-6 flex flex-col shadow-2xl m-4 rounded-[2.5rem] hidden md:flex relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#F22A5C] blur-[80px] opacity-20 -mr-16 -mt-16"></div>
        
        <div className="flex items-center justify-between mb-12 px-2 z-10">
          {isSidebarOpen && (
            <div className="flex flex-col">
                <Link href="/" className="text-xl font-black tracking-tighter leading-none">TaxFilerz & Co.</Link>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors cursor-pointer">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="space-y-2 flex-1 z-10">
          {[
            { name: 'Dashboard', icon: LayoutDashboard },
            { name: 'Search', icon: Search },
            { name: 'Start', icon: Play },
            { name: 'Stop', icon: Square },
            { name: 'Confirm', icon: CheckCircle },
            { name: 'Pending', icon: Clock },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 cursor-pointer ${activeTab === item.name
                ? 'bg-[#F22A5C] text-white shadow-lg shadow-[#F22A5C]/20 scale-[1.02]'
                : 'hover:bg-white/5 text-gray-400'
                }`}
            >
              <item.icon size={20} strokeWidth={activeTab === item.name ? 3 : 2} />
              {isSidebarOpen && <span className="font-bold text-sm">{item.name}</span>}
            </button>
          ))}
        </nav>

        {isSidebarOpen && (
            <div className="mt-auto p-4 bg-white/5 rounded-3xl border border-white/10">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight text-center">System Status: Secure</p>
            </div>
        )}
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 h-screen overflow-y-auto p-6 md:p-12 relative">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-black text-[#1D2F52] tracking-tight">
              {activeTab === "Confirm" ? "Verified Records" : activeTab === "Pending" ? "Action Required" : activeTab}
            </h2>
            <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-1">Tax & Compliance Funnel</p>
          </div>
          
          <div className="flex items-center gap-4 bg-white p-2 pr-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-[#1D2F52] to-[#121d33] flex items-center justify-center font-black text-white text-xs shadow-lg">TF</div>
            <div className="hidden lg:block leading-none">
              <p className="text-xs font-black text-[#1D2F52]">Chief Auditor</p>
              <p className="text-[9px] text-[#F22A5C] font-bold uppercase mt-1 tracking-tighter">Verified Admin</p>
            </div>
          </div>
        </header>

        {activeTab === 'Dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <StatsCard title="Total Clients" val={loading ? "..." : totalLeads} icon={Users} colorClass="bg-blue-50 text-blue-600" />
            <StatsCard
              title="Tax Confirmed"
              val={loading ? "..." : confirmedCount}
              icon={ShieldCheck} colorClass="bg-emerald-50 text-emerald-600"
              onClick={() => setActiveTab('Confirm')}
            />
            <StatsCard
              title="Pending Review"
              val={loading ? "..." : pendingCount}
              icon={Clock} colorClass="bg-rose-50 text-[#F22A5C]"
              onClick={() => setActiveTab('Pending')}
            />
          </div>
        )}

        {/* SEARCH BAR */}
        {activeTab === 'Search' && (
            <div className="mb-6 relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#F22A5C] transition-colors" size={20}/>
                <input 
                    type="text" 
                    placeholder="Search by client name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white border border-gray-100 rounded-[2rem] py-5 pl-14 pr-8 outline-none focus:ring-4 focus:ring-[#F22A5C]/5 focus:border-[#F22A5C]/20 transition-all font-bold text-sm shadow-sm"
                />
            </div>
        )}

        {/* DATA TABLE SECTION */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden relative min-h-[500px]">
          {loading && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px] z-50 flex flex-col items-center justify-center gap-4">
              <Loader2 className="w-10 h-10 text-[#F22A5C] animate-spin" />
              <p className="text-[#1D2F52] font-black uppercase tracking-[0.2em] text-[10px]">Syncing Data...</p>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50/50 text-gray-400 text-[10px] uppercase tracking-[0.2em] font-black">
                <tr>
                  <th className="px-10 py-6">Client Profile</th>
                  <th className="px-10 py-6">Service Type</th>
                  <th className="px-10 py-6">Billing / Plan</th>
                  <th className="px-10 py-6 text-center">Compliance Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {!loading && filteredLeads.length > 0 ? (
                  filteredLeads.map((lead) => (
                    <tr key={lead._id} className="group hover:bg-gray-50/30 transition-all">
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-4">
                          <div className="h-11 w-11 rounded-2xl bg-gray-100 flex items-center justify-center font-black text-[#1D2F52] uppercase text-xs border border-gray-200 shadow-sm group-hover:border-[#F22A5C]/30 transition-colors">
                            {lead.fullname.charAt(0)}
                          </div>
                          <div>
                            <div className="font-black text-[#1D2F52] text-sm leading-none">{lead.fullname}</div>
                            <div className="text-[11px] font-bold text-gray-400 mt-1.5">{lead.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex flex-col gap-1">
                            <span className="text-[#F22A5C] text-[10px] font-black uppercase tracking-wider">
                            {lead.service}
                            </span>
                            <span className="text-gray-300 text-[9px] font-bold">{lead.phone || "No Contact"}</span>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <div className="font-black text-[#1D2F52] text-sm tracking-tight">{lead.packageAmount || lead.package?.packageAmount || 'PKR 0'}</div>
                        <div className="text-[9px] font-black text-gray-300 uppercase mt-1 italic">{lead.packageName || lead.package?.packageName || 'Custom'} Plan</div>
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex items-center justify-center gap-3">
                          {(activeTab === 'Dashboard' || activeTab === 'Confirm' || activeTab === 'Pending' || activeTab === 'Search') ? (
                            /* --- NEW STATUS DROPDOWN --- */
                            <div className="relative inline-block">
                              <select
                                value={lead.isOrderConfirmed || "Pending"}
                                onChange={(e) => updateStatus(lead._id, e.target.value)}
                                className={`appearance-none pl-4 pr-10 py-2.5 rounded-xl border text-[10px] font-black uppercase tracking-tighter transition-all cursor-pointer outline-none focus:ring-2 focus:ring-[#F22A5C]/10 ${getStatusStyles(lead.isOrderConfirmed)}`}
                              >
                                <option value="Confirm">Confirm</option>
                                <option value="Pending">Pending</option>
                                <option value="InProcess">InProcess</option>
                                <option value="Reject">Reject</option>
                              </select>
                              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-60">
                                <ChevronDown size={14} />
                              </div>
                            </div>
                          ) : (
                            <>
                              <button
                                onClick={() => toggleStatus(lead._id, lead.sendMessages)}
                                title={lead.sendMessages ? "Stop Processing" : "Start Processing"}
                                className={`p-2.5 rounded-xl border transition-all cursor-pointer shadow-sm ${lead.sendMessages
                                  ? 'bg-[#1D2F52] text-white border-[#1D2F52]'
                                  : 'bg-white text-gray-400 border-gray-100 hover:border-gray-300 hover:text-[#1D2F52]'
                                  }`}
                              >
                                {lead.sendMessages ? <Square size={16} fill="white" /> : <Play size={16} fill="currentColor" />}
                              </button>
                              <button
                                onClick={() => deleteLead(lead._id)}
                                className="p-2.5 rounded-xl bg-white cursor-pointer text-gray-300 border border-gray-100 hover:text-[#F22A5C] hover:border-rose-100 hover:bg-rose-50 transition-all shadow-sm"
                              >
                                <Trash2 size={16} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : !loading && (
                  <tr>
                    <td colSpan="4" className="p-32 text-center">
                      <div className="flex flex-col items-center gap-5">
                        <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 shadow-inner">
                          <Inbox size={48} className="text-gray-200" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-[#1D2F52] font-black uppercase tracking-widest text-sm">No Client Records Found</p>
                            <p className="text-gray-400 text-xs font-medium">Your funnel is currently empty.</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
    </>
  );
}