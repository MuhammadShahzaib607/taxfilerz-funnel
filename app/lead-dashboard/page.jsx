"use client";
import AdminAuthModal from "../components/DashboardLogin"
import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard, Search, Play, Square, CheckCircle, Clock, Menu, X,
  Users, Loader2, Trash2, ShieldCheck,
  Inbox, ChevronDown, XCircle, PhoneIncoming, Plus, MessageSquare, Send, Download
} from 'lucide-react';
import Link from 'next/link';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// --- CONFIGURATION ---
const API_BASE_URL = 'https://taxfilerz-funnel-backend.vercel.app/';

export default function TaxFilerzDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [leads, setLeads] = useState([]);
  const [contactLeads, setContactLeads] = useState([]); 
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const [isNoteModalOpen, setNoteModalOpen] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [isSubmittingNote, setIsSubmittingNote] = useState(false);

  const totalLeads = leads.length;
  const confirmedCount = leads.filter(l => l.isOrderConfirmed === "Confirm").length;
  // Updated: Defaulting everything that isn't explicitly set to Pending
  const pendingCount = leads.filter(l => l.isOrderConfirmed === "Pending" || !l.isOrderConfirmed).length;

  // Fetch Main Leads Data
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

  useEffect(() => {
    if (activeTab === 'ContactInfo') {
      const fetchContactData = async () => {
        setLoading(true);
        try {
          const res = await fetch(`${API_BASE_URL}contactInfo`);
          const result = await res.json();
          setContactLeads(result.data.reverse() || []);
        } catch (err) {
          console.error("Error fetching contact info:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchContactData();
    }
  }, [activeTab]);

  // --- PDF GENERATION FUNCTION ---
  const downloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Client Name", "Email", "Service", "Package", "Status"];
    const tableRows = [];

    const dataToExport = activeTab === 'ContactInfo' ? filteredContactLeads : filteredLeads;

    dataToExport.forEach(lead => {
      const leadData = [
        lead.fullname,
        lead.email,
        lead.service || 'N/A',
        lead.packageAmount || lead.package?.packageAmount || '0',
        lead.isOrderConfirmed || 'Pending'
      ];
      tableRows.push(leadData);
    });

    doc.text(`TaxFilerz - ${activeTab} Report`, 14, 15);
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      theme: 'grid',
      headStyles: { fillColor: [242, 42, 92] }
    });
    doc.save(`TaxFilerz_${activeTab}_Report.pdf`);
  };

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

  const handleAddNote = async () => {
    if (!noteText.trim()) return alert("Please enter some text for the note.");
    setIsSubmittingNote(true);
    try {
      const res = await fetch(`${API_BASE_URL}add-note`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedLeadId, text: noteText }),
      });
      if (res.ok) {
        setLeads(prev => prev.map(lead => 
          lead._id === selectedLeadId 
          ? { ...lead, notes: [...(lead.notes || []), { text: noteText, date: new Date() }] } 
          : lead
        ));
        setNoteModalOpen(false);
        setNoteText('');
      } else {
        alert("Failed to add note");
      }
    } catch (err) {
      console.error("Note submission error:", err);
    } finally {
      setIsSubmittingNote(false);
    }
  };

  // --- FIXED FILTERING LOGIC ---
  const filteredLeads = leads.filter((lead) => {
    const nameMatch = lead.fullname?.toLowerCase().includes(searchTerm.toLowerCase());
    const emailMatch = lead.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchSearch = nameMatch || emailMatch;

    if (activeTab === 'Confirm Orders') return lead.isOrderConfirmed === 'Confirm' && matchSearch;
    // Updated: Checking only for Pending or empty status
    if (activeTab === 'Pending Orders') return (lead.isOrderConfirmed === 'Pending' || !lead.isOrderConfirmed) && matchSearch;
    if (activeTab === 'In Process Orders') return lead.isOrderConfirmed === 'InProcess' && matchSearch;
    if (activeTab === 'Reject Orders') return lead.isOrderConfirmed === 'Reject' && matchSearch;
    return matchSearch;
  });

  const filteredContactLeads = contactLeads.filter((lead) => {
    const nameMatch = lead.fullname?.toLowerCase().includes(searchTerm.toLowerCase());
    const emailMatch = lead.email?.toLowerCase().includes(searchTerm.toLowerCase());
    return nameMatch || emailMatch;
  });

  const getStatusStyles = (status) => {
    switch (status) {
      case 'Confirm': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'InProcess': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Reject': return 'bg-gray-100 text-gray-500 border-gray-200';
      // Default / Pending is now strictly the signature Rose/Red color
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
      
      {/* --- ADD NOTE ODAL --- */}
      {isNoteModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#1D2F52]/40 backdrop-blur-md" onClick={() => setNoteModalOpen(false)}></div>
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl z-10 relative overflow-hidden animate-in fade-in zoom-in duration-300">
             <div className="absolute top-0 right-0 w-24 h-24 bg-[#F22A5C] blur-[60px] opacity-10 -mr-12 -mt-12"></div>
             <h3 className="text-2xl font-black text-[#1D2F52] mb-2 flex items-center gap-3">
               <MessageSquare className="text-[#F22A5C]" /> Add Internal Note
             </h3>
             <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-6">Details will be saved to this lead profile</p>
             
             <textarea 
               className="w-full h-40 bg-gray-50 border border-gray-100 rounded-[1.5rem] p-5 outline-none focus:ring-4 focus:ring-[#F22A5C]/5 focus:border-[#F22A5C]/20 transition-all font-medium text-sm text-[#1D2F52] resize-none"
               placeholder="Write your observation or update here..."
               value={noteText}
               onChange={(e) => setNoteText(e.target.value)}
             />

             <div className="flex gap-3 mt-6">
                <button onClick={() => setNoteModalOpen(false)} className="flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-gray-400 hover:bg-gray-50 transition-colors">Cancel</button>
                <button 
                  onClick={handleAddNote}
                  disabled={isSubmittingNote}
                  className="flex-[2] py-4 rounded-2xl font-black text-xs uppercase tracking-widest bg-[#F22A5C] text-white shadow-lg shadow-[#F22A5C]/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                >
                  {isSubmittingNote ? <Loader2 className="animate-spin" size={16}/> : <Send size={16}/>} Save Note
                </button>
             </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-[#F8FAFC] flex font-sans overflow-hidden text-[#1D2F52]">
        <aside className={`${isSidebarOpen ? 'w-72' : 'w-24'} bg-[#1D2F52] text-white transition-all duration-500 ease-in-out p-6 flex flex-col shadow-2xl m-4 rounded-[2.5rem] hidden md:flex relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#F22A5C] blur-[80px] opacity-20 -mr-16 -mt-16"></div>
          <div className="flex items-center justify-between mb-12 px-2 z-10">
            {isSidebarOpen && <Link href="/" className="text-xl font-black tracking-tighter leading-none">TaxFilerz & Co.</Link>}
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors cursor-pointer">
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <nav className="space-y-2 flex-1 z-10 overflow-y-auto pr-2 custom-scrollbar">
            {[
              { name: 'Dashboard', icon: LayoutDashboard },
              { name: 'Search', icon: Search },
              { name: 'Confirm Orders', icon: CheckCircle },
              { name: 'Pending Orders', icon: Clock },
              { name: 'In Process Orders', icon: Loader2 },
              { name: 'Reject Orders', icon: XCircle },
              { name: 'ContactInfo', icon: PhoneIncoming }, 
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 cursor-pointer ${activeTab === item.name ? 'bg-[#F22A5C] text-white shadow-lg shadow-[#F22A5C]/20 scale-[1.02]' : 'hover:bg-white/5 text-gray-400'}`}
              >
                <item.icon size={20} strokeWidth={activeTab === item.name ? 3 : 2} />
                {isSidebarOpen && <span className="font-bold text-sm">{item.name}</span>}
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 h-screen overflow-y-auto p-6 md:p-12 relative">
          <header className="flex justify-between items-center mb-10">
    <div>
      <h2 className="text-3xl font-black text-[#1D2F52] tracking-tight">
        {activeTab === "ContactInfo" ? "Inquiries & Leads" : activeTab}
      </h2>
      <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-1">
        Tax & Compliance Funnel
      </p>
    </div>

    <div className="flex items-center gap-4">
      {/* --- ADDED DOWNLOAD PDF BUTTON --- */}
      {/* <button 
        onClick={downloadPDF}
        className="hidden md:flex items-center gap-2 bg-white border border-gray-100 p-3 px-6 rounded-2xl shadow-sm text-[#F22A5C] font-black text-xs uppercase tracking-widest hover:bg-rose-50 transition-all active:scale-95 group"
      >
        <Download size={18} className="group-hover:bounce" />
        Export PDF
      </button> */}

      {/* Admin Profile */}
      <div className="flex items-center gap-4 bg-white p-2 pr-6 rounded-3xl shadow-sm border border-gray-100">
        <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-[#1D2F52] to-[#121d33] flex items-center justify-center font-black text-white text-xs shadow-lg">
          TF
        </div>
        <div className="hidden lg:block leading-none">
          <p className="text-xs font-black text-[#1D2F52]">Chief Auditor</p>
          <p className="text-[9px] text-[#F22A5C] font-bold uppercase mt-1 tracking-tighter">
            Verified Admin
          </p>
        </div>
      </div>
    </div>
  </header>

          {activeTab === 'Dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <StatsCard title="Total Clients" val={loading ? "..." : totalLeads} icon={Users} colorClass="bg-blue-50 text-blue-600" />
              <StatsCard title="Tax Confirmed" val={loading ? "..." : confirmedCount} icon={ShieldCheck} colorClass="bg-emerald-50 text-emerald-600" onClick={() => setActiveTab('Confirm Orders')} />
              <StatsCard title="Pending Review" val={loading ? "..." : pendingCount} icon={Clock} colorClass="bg-rose-50 text-[#F22A5C]" onClick={() => setActiveTab('Pending Orders')} />
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-4 mb-6">
             <div className="flex-1 relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#F22A5C] transition-colors" size={20} />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white border border-gray-100 rounded-[2rem] py-5 pl-14 pr-8 outline-none focus:ring-4 focus:ring-[#F22A5C]/5 focus:border-[#F22A5C]/20 transition-all font-bold text-sm shadow-sm"
                />
             </div>
          </div>

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
                    {activeTab === 'ContactInfo' ? (
                      <>
                        <th className="px-10 py-6">Phone Number</th>
                        <th className="px-10 py-6">Inquiry Date</th>
                      </>
                    ) : (
                      <>
                        <th className="px-10 py-6">Service Type</th>
                        <th className="px-10 py-6">Billing / Plan</th>
                      </>
                    )}
                    {activeTab === "ContactInfo" ? null : <th className="px-10 py-6 text-center">Actions</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {!loading && (activeTab === 'ContactInfo' ? filteredContactLeads : filteredLeads).length > 0 ? (
                    (activeTab === 'ContactInfo' ? filteredContactLeads : filteredLeads).map((lead) => (
                      <React.Fragment key={lead._id}>
                      <tr className="group hover:bg-gray-50/30 transition-all">
                        <td className="px-10 py-6">
                          <div className="flex items-center gap-4">
                            <div className="h-11 w-11 rounded-2xl bg-gray-100 flex items-center justify-center font-black text-[#1D2F52] uppercase text-xs border border-gray-200 shadow-sm group-hover:border-[#F22A5C]/30 transition-colors">
                              {lead.fullname?.charAt(0)}
                            </div>
                            <div>
                              <div className="font-black text-[#1D2F52] text-sm leading-none">{lead.fullname}</div>
                              <div className="text-[11px] font-bold text-gray-400 mt-1.5">{lead.email}</div>
                              <div className="text-[11px] font-black text-[#F22A5C] mt-1 uppercase tracking-tighter">
                                 {new Date(lead.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </td>

                        {activeTab === 'ContactInfo' ? (
                          <>
                            <td className="px-10 py-6 font-bold text-sm text-[#1D2F52]">{lead.phone}</td>
                            <td className="px-10 py-6 text-[11px] font-bold text-gray-400">{new Date(lead.createdAt).toLocaleDateString()}</td>
                          </>
                        ) : (
                          <>
                            <td className="px-10 py-6">
                              <div className="flex flex-col gap-1">
                                <span className="text-[#F22A5C] text-[10px] font-black uppercase tracking-wider">{lead.service}</span>
                                <span className="text-gray-300 text-[9px] font-bold">{lead.phone || "No Contact"}</span>
                              </div>
                            </td>
                            <td className="px-10 py-6">
                              <div className="font-black text-[#1D2F52] text-sm tracking-tight">{lead.packageAmount || lead.package?.packageAmount || 'PKR 0'}</div>
                              <div className="text-[9px] font-black text-gray-300 uppercase mt-1 italic">{lead.packageName || lead.package?.packageName || 'Custom'} Plan</div>
                            </td>
                          </>
                        )}

                        <td className="px-10 py-6">
                          <div className="flex items-center justify-center gap-3">
                            {activeTab !== 'ContactInfo' && (
                              <div className="relative inline-block">
                                <select
                                  value={lead.isOrderConfirmed || "Pending"}
                                  onChange={(e) => updateStatus(lead._id, e.target.value)}
                                  className={`appearance-none pl-4 pr-10 py-2.5 rounded-xl border text-[10px] font-black uppercase tracking-tighter transition-all cursor-pointer outline-none focus:ring-2 focus:ring-[#F22A5C]/10 ${getStatusStyles(lead.isOrderConfirmed || "Pending")}`}
                                >
                                  <option value="Confirm">Confirm</option>
                                  <option value="Pending">Pending</option>
                                  <option value="InProcess">InProcess</option>
                                  <option value="Reject">Reject</option>
                                </select>
                                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
                              </div>
                            )}
                            {activeTab !== "ContactInfo" && (
                              <button onClick={() => activeTab === 'Dashboard' ? (setSelectedLeadId(lead._id), setNoteModalOpen(true)) : deleteLead(lead._id)} className="p-2.5 rounded-xl bg-white cursor-pointer text-gray-300 border border-gray-100 hover:text-[#F22A5C] hover:border-rose-100 hover:bg-rose-50 transition-all shadow-sm">
                                {activeTab === 'Dashboard' ? <Plus size={16} /> : <Trash2 size={16} />}
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                      {activeTab === 'Dashboard' && lead.notes && lead.notes.length > 0 && (
                        <tr>
                          <td colSpan="4" className="px-14 py-4 bg-gray-50/20">
                            <div className="flex flex-wrap gap-2">
                              {lead.notes.map((note, idx) => (
                                <div key={idx} className="bg-white border border-gray-100 p-3 rounded-2xl shadow-sm max-w-xs">
                                  <p className="text-[#1D2F52] text-xs font-semibold leading-relaxed">{note.text}</p>
                                  <div className="flex items-center gap-1.5 mt-2 opacity-40">
                                    <Clock size={10} />
                                    <span className="text-[9px] font-black uppercase tracking-tighter">{new Date(note.date).toLocaleDateString()}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                      </React.Fragment>
                    ))
                  ) : !loading && (
                    <tr>
                      <td colSpan="5" className="p-32 text-center">
                        <div className="flex flex-col items-center gap-5">
                          <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 shadow-inner"><Inbox size={48} className="text-gray-200" /></div>
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