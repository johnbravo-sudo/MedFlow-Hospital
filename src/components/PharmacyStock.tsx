import React, { useState } from 'react';
import { Search, Pill, BadgePlus, Check, Filter, ShieldAlert, ShoppingBag, BadgeCheck } from 'lucide-react';
import { MedicationStock, MedicineRequest } from '../types';
import { GlassCard } from './GlassCard';

interface PharmacyStockProps {
  pharmacyItems: MedicationStock[];
  medicineRequests: MedicineRequest[];
  patientName: string;
  patientEmail: string;
  onSendRequest: (req: MedicineRequest) => void;
}

export function PharmacyStock({
  pharmacyItems,
  medicineRequests,
  patientName,
  patientEmail,
  onSendRequest
}: PharmacyStockProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Reserve / Request modal state
  const [targetItem, setTargetItem] = useState<MedicationStock | null>(null);
  const [requestQty, setRequestQty] = useState(1);
  const [bookingSuccessMsg, setBookingSuccessMsg] = useState(false);

  const categories = ['All', 'Cardiovascular', 'Antibiotics', 'Diabetes Management', 'Analgesics', 'Antihypertensive', 'Allergy Relief'];

  const filteredItems = pharmacyItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenRequest = (item: MedicationStock) => {
    setTargetItem(item);
    setRequestQty(1);
    setBookingSuccessMsg(false);
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetItem) return;

    if (requestQty < 1 || requestQty > 10) {
      alert('You can request simulated quantities between 1 and 10 boxes maximum.');
      return;
    }

    const newRequest: MedicineRequest = {
      id: `req-${Math.floor(100+Math.random()*900)}`,
      medicineName: targetItem.name,
      patientName: patientName || 'Visitor Outpatient',
      email: patientEmail || 'visitor@medflow.org',
      requestedQty: requestQty,
      status: 'Pending',
      date: new Date().toLocaleDateString()
    };

    onSendRequest(newRequest);
    setBookingSuccessMsg(true);
    setTimeout(() => {
      setTargetItem(null);
      setBookingSuccessMsg(false);
    }, 2000);
  };

  return (
    <div className="space-y-8 pb-12 animate-fade-in text-left font-sans" id="pharmacy-stock-view">
      
      <div className="text-left space-y-2">
        <h1 className="font-serif text-3xl font-bold text-white">Digital Pharmacy Stock Index</h1>
        <p className="text-xs text-slate-400">
          Search hospital drug catalog stock levels, check consultation prices, examine Rx regulatory requirements, and coordinate click-to-reserve queues.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Search controls + Index list (8 columns) */}
        <div className="lg:col-span-8 space-y-6">
          <GlassCard className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Category Dropdown/Selector */}
            <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-950 text-slate-300 text-xs px-3 py-2.5 rounded-lg border border-slate-800 outline-none focus:border-[#89C540] transition-all font-semibold"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Search inputs */}
            <div className="relative w-full md:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search prescription/allergy relief..."
                className="w-full bg-slate-950/70 text-slate-100 text-xs pl-9 pr-4 py-2.5 rounded-lg border border-slate-800 outline-none focus:border-[#89C540] transition-colors"
              />
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
            </div>
          </GlassCard>

          {/* Catalog grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredItems.map((med) => (
              <GlassCard key={med.id} className="p-5 flex flex-col justify-between text-left relative">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] text-slate-500 font-mono tracking-wider">{med.category}</span>
                    
                    {/* Rx validation pill indicator */}
                    {med.requiresPrescription ? (
                      <span className="text-[9px] bg-rose-950/40 text-rose-300 border border-rose-500/20 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                        <ShieldAlert className="w-3 h-3" />
                        Rx Required
                      </span>
                    ) : (
                      <span className="text-[9px] bg-emerald-900/10 text-emerald-400 border border-emerald-500/10 px-2 py-0.5 rounded-full">
                        OTC Available
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white font-serif">{med.name}</h3>
                    <div className="flex items-center gap-1 text-xs mt-1">
                      <span className="text-slate-500">Stock Count:</span>
                      <span className={`font-mono font-bold ${
                        med.stock > 100 
                          ? 'text-emerald-400' 
                          : med.stock > 20 
                          ? 'text-yellow-300' 
                          : 'text-rose-400 animate-pulse'
                      }`}>
                        {med.stock} units
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-850 flex items-center justify-between">
                  <span className="text-base font-bold font-serif text-yellow-300">K{med.price.toFixed(2)} / Box</span>
                  
                  <button
                    onClick={() => handleOpenRequest(med)}
                    className="px-3.5 py-1.5 bg-[#FFEB3B] hover:bg-yellow-400 text-slate-900 font-bold rounded-lg text-xs flex items-center gap-1 cursor-pointer transition-all"
                  >
                    <BadgePlus className="w-4 h-4" />
                    Reserve
                  </button>
                </div>
              </GlassCard>
            ))}

            {filteredItems.length === 0 && (
              <div className="col-span-1 sm:col-span-2 py-12 bg-slate-900/35 border border-dashed border-slate-800 text-center rounded-xl">
                <p className="text-xs text-slate-500 italic">No pharmaceutical stock items match your specifications.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right column - Reserve reservation sheet modal AND past requests list (4 columns) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Reservation panel tool */}
          {targetItem ? (
            <GlassCard className="p-5 space-y-4 border-t-4 border-t-yellow-300 bg-slate-900/80">
              <h3 className="font-serif text-sm font-bold text-white flex items-center gap-1.5ClassName">
                <ShoppingBag className="w-4 h-4 text-yellow-300" />
                Reserve Medication Stock
              </h3>

              {bookingSuccessMsg ? (
                <div className="p-4 bg-emerald-900/40 border border-emerald-500/30 text-[#89C540] text-xs rounded-xl flex items-center gap-2">
                  <BadgeCheck className="w-5 h-5 shrink-0" />
                  <span>Your simulated reservation request has been dispatched. Review past index status below.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmitRequest} className="space-y-4 text-left">
                  <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-lg">
                    <span className="block text-[10px] text-slate-500 font-mono">DRUG REGISTRATION TARGET</span>
                    <span className="text-white font-bold">{targetItem.name}</span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">Category: {targetItem.category}</span>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">
                      Request Quantity (Boxes)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={requestQty}
                      onChange={(e) => setRequestQty(parseInt(e.target.value) || 1)}
                      className="w-full bg-slate-950/80 border border-slate-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#89C540]"
                    />
                    <span className="text-[10px] text-slate-500 block mt-1">Total Pricing: K{(targetItem.price * requestQty).toFixed(2)}</span>
                  </div>

                  {targetItem.requiresPrescription && (
                    <div className="p-2.5 bg-rose-950/40 border border-rose-500/20 text-rose-300 text-[10px] rounded-lg">
                      ⚠️ <b>Clinical Warning:</b> Fulfilling reservation of Atorvastatin or Lisinopril requires submission of valid medical Rx upon pickup.
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setTargetItem(null)}
                      className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-[#FFEB3B] hover:bg-yellow-400 text-slate-900 font-bold rounded-lg text-xs shadow-sm transition-all"
                    >
                      Confirm Request
                    </button>
                  </div>
                </form>
              )}
            </GlassCard>
          ) : (
            <div className="p-5 bg-slate-900/30 rounded-2xl border border-dashed border-slate-800 text-center text-xs text-slate-500">
              Click "Reserve" on any drug formulation to trigger simulated pickup reservation.
            </div>
          )}

          {/* Past request list items */}
          <GlassCard className="p-5 space-y-4">
            <h3 className="font-serif text-sm font-bold text-white border-b border-slate-800 pb-2">
              Your Active Drug Reservatory Orders
            </h3>

            <div className="space-y-3 max-h-[250px] overflow-y-auto pr-1">
              {medicineRequests.map((req) => (
                <div key={req.id} className="p-3 bg-slate-950/60 rounded-lg border border-slate-800 hover:border-slate-700 space-y-1 text-xs text-left">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[10px] text-slate-500">#{req.id}</span>
                    <span className={`text-[9px] font-bold uppercase py-0.5 px-2 rounded-full ${
                      req.status === 'Approved' 
                        ? 'bg-emerald-900/30 text-[#89C540] border border-emerald-500/20' 
                        : req.status === 'Declined'
                        ? 'bg-rose-950 text-rose-300'
                        : 'bg-yellow-900/30 text-yellow-300 border border-yellow-500/25'
                    }`}>
                      {req.status}
                    </span>
                  </div>
                  
                  <h4 className="font-serif font-bold text-slate-200">{req.medicineName}</h4>
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Requested Qty: {req.requestedQty} box</span>
                    <span>Date: {req.date}</span>
                  </div>
                </div>
              ))}

              {medicineRequests.length === 0 && (
                <p className="text-xs text-slate-500 italic py-4 text-center">No catalog reservations dispatched yet.</p>
              )}
            </div>
          </GlassCard>

        </div>

      </div>

    </div>
  );
}
