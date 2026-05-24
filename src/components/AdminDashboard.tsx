import React, { useState } from 'react';
import { 
  Users, Stethoscope, Calendar, Pill, DollarSign, BarChart3, 
  Search, Plus, Check, X, ShieldAlert, Award, TrendingUp, RefreshCw, FileText
} from 'lucide-react';
import { Doctor, Appointment, MedicationStock, PatientRecord, MedicineRequest } from '../types';
import { GlassCard } from './GlassCard';

interface AdminDashboardProps {
  doctors: Doctor[];
  onAddDoctor: (doc: Doctor) => void;
  onUpdateDoctorFee: (id: string, newFee: number) => void;
  appointments: Appointment[];
  onApproveAppointment: (id: string) => void;
  onDeclineAppointment: (id: string) => void;
  pharmacyItems: MedicationStock[];
  onReplenishPharmacyItem: (id: string) => void;
  patientRecords: PatientRecord[];
  medicineRequests: MedicineRequest[];
  onApproveMedicineRequest: (id: string) => void;
  onDeclineMedicineRequest: (id: string) => void;
}

export function AdminDashboard({
  doctors,
  onAddDoctor,
  onUpdateDoctorFee,
  appointments,
  onApproveAppointment,
  onDeclineAppointment,
  pharmacyItems,
  onReplenishPharmacyItem,
  patientRecords,
  medicineRequests,
  onApproveMedicineRequest,
  onDeclineMedicineRequest
}: AdminDashboardProps) {
  const [activeAdminSubTab, setActiveAdminSubTab] = useState<'analytics' | 'patients' | 'doctors' | 'appointments' | 'pharmacy'>('analytics');
  
  // Search parameters
  const [patientSearch, setPatientSearch] = useState('');
  const [doctorSearch, setDoctorSearch] = useState('');
  
  // Add Doctor Form state
  const [showAddDoctorForm, setShowAddDoctorForm] = useState(false);
  const [newDocName, setNewDocName] = useState('');
  const [newDocSpecialty, setNewDocSpecialty] = useState('Cardiology');
  const [newDocExp, setNewDocExp] = useState(5);
  const [newDocFee, setNewDocFee] = useState(100);
  const [newDocBio, setNewDocBio] = useState('');

  // Simulating Payments Registry
  const [paymentBilling, setPaymentBilling] = useState([
    { id: 'bill-101', patient: 'John Kaira', service: 'Cardiology Consult', amount: 150, date: '2026-05-18', status: 'Claim Verified' },
    { id: 'bill-102', patient: 'Sarah Connor', service: 'MRI Brain Diagnostic', amount: 450, date: '2026-05-20', status: 'Paid Credit' },
    { id: 'bill-103', patient: 'John Kaira', service: 'Omeprazole 20mg Reserve', amount: 17.40, date: '2026-05-22', status: 'Pending Insurance' },
    { id: 'bill-104', patient: 'Robert Stark', service: 'General Physical exam', amount: 90, date: '2026-05-23', status: 'Paid Electronic' }
  ]);

  const handleAddNewDoctorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocName.trim() || !newDocBio.trim()) {
      alert('Please fill out all clinician coordinates parameters.');
      return;
    }

    const newDoc: Doctor = {
      id: `doc-${Math.floor(100+Math.random()*900)}`,
      name: newDocName,
      specialty: newDocSpecialty,
      experience: newDocExp,
      rating: 4.8,
      availability: ['Monday AM', 'Thursday PM'],
      consultationFee: newDocFee,
      photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
      bio: newDocBio
    };

    onAddDoctor(newDoc);
    
    // Reset Form
    setNewDocName('');
    setNewDocBio('');
    setShowAddDoctorForm(false);
  };

  const calculateFinancialMetrics = () => {
    const totalRevenue = paymentBilling.reduce((sum, item) => sum + item.amount, 0);
    const pendingClaims = paymentBilling.filter(b => b.status === 'Pending Insurance').length;
    return { totalRevenue, pendingClaims };
  };

  const { totalRevenue, pendingClaims } = calculateFinancialMetrics();

  return (
    <div className="space-y-8 pb-12 animate-fade-in font-sans text-left" id="admin-dashboard-suite">
      
      {/* Admin Suite Title Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/40 p-6 rounded-2xl border border-yellow-500/30">
        <div className="space-y-1">
          <span className="text-xs uppercase font-bold tracking-widest text-yellow-400 font-mono">ADMINISTRATIVE OFFICE PORTAL</span>
          <h1 className="font-serif text-3xl font-bold text-white">Central Operations Console</h1>
          <p className="text-xs text-slate-300">
            Audit patient health records, coordinate specialist fees, manage scheduled consultation approvals, and monitor pharmacy stock lists.
          </p>
        </div>

        <span className="bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 px-3 py-1 rounded text-xs font-mono font-bold shrink-0 uppercase tracking-widest">
          SYSTEM ACTIVE
        </span>
      </div>

      {/* Admin Sub tabs Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {[
          { id: 'analytics', label: 'Suite Analytics', icon: BarChart3 },
          { id: 'patients', label: 'Patient Logs', icon: Users },
          { id: 'doctors', label: 'Specialist Staff', icon: Stethoscope },
          { id: 'appointments', label: 'Consult Appts', icon: Calendar },
          { id: 'pharmacy', label: 'Pharmacy Inventory', icon: Pill }
        ].map((sub) => {
          const Icon = sub.icon;
          return (
            <button
              key={sub.id}
              onClick={() => setActiveAdminSubTab(sub.id as any)}
              className={`py-3 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeAdminSubTab === sub.id
                  ? 'bg-yellow-400/15 text-yellow-300 border-yellow-400/60 shadow-[0_0_12px_rgba(234,179,8,0.1)]'
                  : 'bg-slate-950/45 text-slate-300 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{sub.label}</span>
            </button>
          );
        })}
      </div>

      {/* Render sub panel panels */}

      {/* 1. Suite Analytics */}
      {activeAdminSubTab === 'analytics' && (
        <div className="space-y-6 animate-fade-in" id="panel-analytics">
          
          {/* Diagnostic overview metrics grid */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <GlassCard className="p-5 flex items-center gap-4">
              <div className="bg-yellow-300/10 p-3 rounded-xl text-yellow-300 shrink-0">
                <DollarSign className="w-6 h-6" />
              </div>
              <div className="text-left">
                <span className="text-[10px] text-slate-500 font-mono block uppercase tracking-widest leading-none mb-1">Total Revenue Audited</span>
                <span className="text-2xl font-bold text-white font-serif">K{totalRevenue.toFixed(2)}</span>
              </div>
            </GlassCard>

            <GlassCard className="p-5 flex items-center gap-4">
              <div className="bg-[#89C540]/10 p-3 rounded-xl text-[#89C540] shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-left">
                <span className="text-[10px] text-slate-500 font-mono block uppercase tracking-widest leading-none mb-1">Patient Registrations</span>
                <span className="text-2xl font-bold text-white font-serif">{patientRecords.length} Active</span>
              </div>
            </GlassCard>

            <GlassCard className="p-5 flex items-center gap-4">
              <div className="bg-blue-500/10 p-3 rounded-xl text-blue-300 shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div className="text-left">
                <span className="text-[10px] text-slate-500 font-mono block uppercase tracking-widest leading-none mb-1">Consultation Bookings</span>
                <span className="text-2xl font-bold text-white font-serif">{appointments.length} Total</span>
              </div>
            </GlassCard>

            <GlassCard className="p-5 flex items-center gap-4">
              <div className="bg-purple-500/10 p-3 rounded-xl text-purple-300 shrink-0">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div className="text-left">
                <span className="text-[10px] text-slate-500 font-mono block uppercase tracking-widest leading-none mb-1">Pending Drug Reservations</span>
                <span className="text-2xl font-bold text-white font-serif">{medicineRequests.filter(r => r.status === 'Pending').length} Pending</span>
              </div>
            </GlassCard>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* pure SVG beautifully stylized linear chart mapping diagnostics performance ratios */}
            <div className="lg:col-span-8">
              <GlassCard className="p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <h3 className="text-base font-serif font-bold text-white">Monthly Clinical Intake Vectors</h3>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">Dynamic Metric</span>
                </div>

                <div className="w-full text-center relative pt-4">
                  {/* SVG graph */}
                  <svg viewBox="0 0 500 180" className="w-full h-auto text-[#89C540] fill-current">
                    <defs>
                      <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(137, 197, 64, 0.25)" />
                        <stop offset="100%" stopColor="rgba(137, 197, 64, 0)" />
                      </linearGradient>
                    </defs>
                    {/* Grid lines */}
                    <line x1="20" y1="10" x2="480" y2="10" stroke="#1E293B" strokeWidth="1" />
                    <line x1="20" y1="50" x2="480" y2="50" stroke="#1E293B" strokeWidth="1" />
                    <line x1="20" y1="90" x2="480" y2="90" stroke="#1E293B" strokeWidth="1" />
                    <line x1="20" y1="130" x2="480" y2="130" stroke="#1E293B" strokeWidth="1" />
                    <line x1="20" y1="150" x2="480" y2="150" stroke="#334155" strokeWidth="1.5" />

                    {/* Path underlay shaded area */}
                    <path
                      d="M 20 150 L 50 110 L 120 120 L 200 70 L 280 90 L 360 40 L 440 30 L 480 50 L 480 150 Z"
                      fill="url(#chart-grad)"
                      stroke="none"
                    />

                    {/* Drawing path points */}
                    <path
                      d="M 20 150 L 50 110 L 120 120 L 200 70 L 280 90 L 360 40 L 440 30 L 480 50"
                      fill="none"
                      stroke="#89C540"
                      strokeWidth="3.5"
                    />

                    {/* Grid dots */}
                    <circle cx="50" cy="110" r="4.5" fill="#FFEB3B" />
                    <circle cx="120" cy="120" r="4.5" fill="#FFEB3B" />
                    <circle cx="200" cy="70" r="4.5" fill="#FFEB3B" />
                    <circle cx="280" cy="90" r="4.5" fill="#FFEB3B" />
                    <circle cx="360" cy="40" r="4.5" fill="#FFEB3B" />
                    <circle cx="440" cy="30" r="4.5" fill="#FFEB3B" />
                    <circle cx="480" cy="50" r="4.5" fill="#FFEB3B" />

                    {/* Text values */}
                    <text x="50" y="170" fill="#64748B" fontSize="10" textAnchor="middle">Jan</text>
                    <text x="120" y="170" fill="#64748B" fontSize="10" textAnchor="middle">Feb</text>
                    <text x="200" y="170" fill="#64748B" fontSize="10" textAnchor="middle">Mar</text>
                    <text x="280" y="170" fill="#64748B" fontSize="10" textAnchor="middle">Apr</text>
                    <text x="360" y="170" fill="#64748B" fontSize="10" textAnchor="middle">May</text>
                    <text x="440" y="170" fill="#64748B" fontSize="10" textAnchor="middle">Jun</text>
                  </svg>
                </div>
                
                <p className="text-[11px] text-slate-400 text-center">
                  *Graphic mappings outline outpatient intakes and diagnostic metrics over the first fiscal semester.
                </p>
              </GlassCard>
            </div>

            {/* Simulated payment registries table */}
            <div className="lg:col-span-4">
              <GlassCard className="p-5 space-y-4">
                <h3 className="font-serif text-sm font-bold text-white border-b border-slate-800 pb-2">
                  Live Payments & Surtaxes Ledger
                </h3>

                <div className="space-y-3 max-h-[200px] overflow-y-auto pr-1">
                  {paymentBilling.map((bill) => (
                    <div key={bill.id} className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg space-y-1 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-[9px] text-slate-500">{bill.id} • {bill.date}</span>
                        <span className="text-[10px] text-[#89C540] font-bold font-serif">K{bill.amount}</span>
                      </div>
                      <h4 className="font-bold text-white text-[11px]">{bill.patient}</h4>
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>{bill.service}</span>
                        <span className="text-yellow-300 font-mono font-bold uppercase text-[8px]">{bill.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>

        </div>
      )}

      {/* 2. Patient Logs */}
      {activeAdminSubTab === 'patients' && (
        <div className="space-y-6 animate-fade-in" id="panel-patients-records">
          <GlassCard className="p-4 flex gap-3 items-center">
            <Search className="w-4 h-4 text-slate-500 shrink-0" />
            <input
              type="text"
              value={patientSearch}
              onChange={(e) => setPatientSearch(e.target.value)}
              placeholder="Query patient names, known allergies, chronic conditions..."
              className="w-full bg-transparent text-xs text-white outline-none"
            />
          </GlassCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {patientRecords.filter(p => p.name.toLowerCase().includes(patientSearch.toLowerCase()) || p.conditions.join(' ').toLowerCase().includes(patientSearch.toLowerCase())).map((pat) => (
              <GlassCard key={pat.id} className="p-5 space-y-3.5 text-left">
                <div className="flex justify-between items-start border-b border-slate-850 pb-2.5">
                  <div>
                    <h3 className="font-serif text-sm font-bold text-white leading-tight">{pat.name}</h3>
                    <span className="text-[10px] font-mono text-slate-400">UID: {pat.id} • {pat.email}</span>
                  </div>
                  <span className="bg-[#89C540]/10 border border-[#89C540]/35 text-[#89C540] px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono">
                    Blood {pat.bloodGroup.split(' ')[0]}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="block text-[9px] uppercase font-mono text-slate-500 mb-0.5">Chronologies</span>
                    <p className="font-medium text-slate-200 truncate">{pat.conditions.join(', ')}</p>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase font-mono text-slate-500 mb-0.5">Contraallergens</span>
                    <p className="font-medium text-rose-300 truncate">{pat.allergies.join(', ')}</p>
                  </div>
                </div>

                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
                  <span className="block text-[9px] uppercase font-bold text-[#89C540] tracking-wider mb-1">Most Recent Event</span>
                  <p className="line-clamp-2 italic">"{pat.history[pat.history.length - 1]}"</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* 3. Specialist Staff */}
      {activeAdminSubTab === 'doctors' && (
        <div className="space-y-6 animate-fade-in" id="panel-doctors-management">
          
          <div className="flex justify-between items-center">
            <button
              onClick={() => setShowAddDoctorForm(!showAddDoctorForm)}
              className="px-4 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Specialist Physician
            </button>
          </div>

          {/* Add doctor Form overlay */}
          {showAddDoctorForm && (
            <GlassCard className="p-6 max-w-xl mx-auto space-y-4">
              <h3 className="font-serif text-base font-bold text-white border-b border-slate-800 pb-2">Physician Onboarding Coordinates</h3>

              <form onSubmit={handleAddNewDoctorSubmit} className="space-y-3.5 text-xs text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Full Doctor Name</label>
                    <input
                      type="text"
                      value={newDocName}
                      onChange={(e) => setNewDocName(e.target.value)}
                      placeholder="e.g., Dr. Gregory House"
                      className="w-full bg-slate-950/80 border border-slate-700 rounded-lg p-2.5 outline-none text-white focus:border-[#89C540]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Clinical Specialty</label>
                    <select
                      value={newDocSpecialty}
                      onChange={(e) => setNewDocSpecialty(e.target.value)}
                      className="w-full bg-slate-950/80 border border-slate-700 rounded-lg p-2.5 outline-none text-white focus:border-[#89C540]"
                    >
                      <option value="Cardiology">Cardiology</option>
                      <option value="Pediatrics">Pediatrics</option>
                      <option value="Neurology">Neurology</option>
                      <option value="Orthopedics">Orthopedics</option>
                      <option value="Dermatology">Dermatology</option>
                      <option value="General Medicine">General Medicine</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Years Practitioner Experience</label>
                    <input
                      type="number"
                      value={newDocExp}
                      onChange={(e) => setNewDocExp(parseInt(e.target.value) || 1)}
                      className="w-full bg-slate-950/80 border border-slate-700 rounded-lg p-2.5 outline-none text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Consultation Fee (K)</label>
                    <input
                      type="number"
                      value={newDocFee}
                      onChange={(e) => setNewDocFee(parseInt(e.target.value) || 50)}
                      className="w-full bg-slate-950/80 border border-slate-700 rounded-lg p-2.5 outline-none text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Physician Biosketch</label>
                  <textarea
                    rows={2.5}
                    value={newDocBio}
                    onChange={(e) => setNewDocBio(e.target.value)}
                    placeholder="Describe therapeutic credentials, medical residency hospital, or specializing certifications..."
                    className="w-full bg-slate-950/80 border border-slate-700 rounded-lg p-2.5 outline-none text-white focus:border-[#89C540]"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddDoctorForm(false)}
                    className="flex-1 py-2.5 bg-slate-800 text-white rounded-lg font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-[#FFEB3B] text-slate-900 font-bold rounded-lg shadow-sm font-sans"
                  >
                    Onboard Doctor
                  </button>
                </div>
              </form>
            </GlassCard>
          )}

          {/* Doctors management interactive indices */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {doctors.map((doc) => (
              <GlassCard key={doc.id} className="p-5 flex flex-col justify-between text-left">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={doc.photo}
                      alt={doc.name}
                      referrerPolicy="no-referrer"
                      className="w-11 h-11 rounded-full object-cover border border-slate-750"
                    />
                    <div>
                      <h4 className="font-serif font-bold text-white text-sm leading-tight">{doc.name}</h4>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider">{doc.specialty} Specialist</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2">
                    {doc.bio}
                  </p>
                </div>

                <div className="pt-3.5 mt-3.5 border-t border-slate-850 flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <span className="block text-[9px] text-slate-500 font-mono uppercase">Consult Fee</span>
                    <input
                      type="number"
                      value={doc.consultationFee}
                      onChange={(e) => onUpdateDoctorFee(doc.id, parseInt(e.target.value) || 0)}
                      className="w-16 bg-slate-950 text-yellow-300 font-bold px-2 py-0.5 border border-slate-800 rounded outline-none text-center"
                    />
                  </div>

                  <span className="bg-slate-900 px-2 py-1 rounded text-[10px] font-mono border border-slate-800 text-[#89C540]">
                    {doc.experience} Yr Residency
                  </span>
                </div>
              </GlassCard>
            ))}
          </div>

        </div>
      )}

      {/* 4. Support Consults & Appointments approval desk */}
      {activeAdminSubTab === 'appointments' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in" id="panel-appointments-approvals">
          {/* Outpatient Appointments List (7 columns) */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-serif text-base font-bold text-white border-b border-slate-800 pb-2 uppercase tracking-wide">
              Patient Consultations Approval Desk
            </h3>

            <div className="space-y-3">
              {appointments.map((app) => (
                <div 
                  key={app.id} 
                  className="p-4 bg-slate-950/65 rounded-xl border border-slate-800 text-left flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-slate-500 font-bold">FLOW CODE: {app.id}</span>
                      <span className={`text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        app.status === 'Scheduled' 
                          ? 'bg-yellow-900/35 text-yellow-300 border border-yellow-500/20' 
                          : app.status === 'Cancelled'
                          ? 'bg-rose-950 text-rose-300'
                          : 'bg-emerald-900/30 text-[#89C540]'
                      }`}>
                        {app.status}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white font-serif">{app.patientName} &rarr; {app.doctorName}</h4>
                    <p className="text-slate-400">Specialty focus: <b>{app.specialty}</b> • {app.date} @ {app.timeSlot}</p>
                    {app.notes && <p className="text-slate-500 max-w-sm font-medium italic">"Note: {app.notes}"</p>}
                  </div>

                  {app.status === 'Scheduled' && (
                    <div className="flex gap-1.5 shrink-0 self-end sm:self-center">
                      <button
                        onClick={() => onDeclineAppointment(app.id)}
                        className="p-1.5 bg-rose-950 hover:bg-rose-900 border border-rose-500/30 text-rose-300 rounded"
                        title="Cancel Consultation"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => onApproveAppointment(app.id)}
                        className="p-1.5 bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/30 text-[#89C540] rounded"
                        title="Complete Consultation"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {appointments.length === 0 && (
                <p className="text-xs text-slate-500 italic text-center py-6">No clinical appointments tracked on the registry.</p>
              )}
            </div>
          </div>

          {/* Medicine Refills approvals (5 columns) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-serif text-base font-bold text-white border-b border-slate-800 pb-2 uppercase tracking-wide">
              Pharmacy Refill Orders Queue
            </h3>

            <div className="space-y-3">
              {medicineRequests.map((req) => (
                <div key={req.id} className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-850 hover:border-slate-800 text-left space-y-2 text-xs">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-slate-500 font-mono">ORDER ID: {req.id}</span>
                    <span className={`text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      req.status === 'Approved' 
                        ? 'bg-emerald-950 text-[#89C540]' 
                        : req.status === 'Declined'
                        ? 'bg-rose-950 text-rose-300'
                        : 'bg-yellow-950 text-yellow-300 border border-yellow-500/20'
                    }`}>
                      {req.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-white font-serif">{req.medicineName}</h4>
                    <p className="text-slate-400">Requested by <b>{req.patientName}</b> ({req.requestedQty} box count)</p>
                  </div>

                  {req.status === 'Pending' && (
                    <div className="flex gap-2 pt-1 border-t border-slate-900">
                      <button
                        onClick={() => onDeclineMedicineRequest(req.id)}
                        className="flex-1 py-1.5 bg-rose-950 hover:bg-rose-900 text-rose-300 text-[10px] font-bold uppercase tracking-wider rounded transition-colors cursor-pointer"
                      >
                        Decline
                      </button>
                      <button
                        onClick={() => onApproveMedicineRequest(req.id)}
                        className="flex-1 py-1.5 bg-[#89C540]/20 hover:bg-[#89C540]/30 text-[#89C540] text-[10px] font-bold uppercase tracking-wider rounded transition-colors cursor-pointer"
                      >
                        Approve Refill
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {medicineRequests.length === 0 && (
                <p className="text-xs text-slate-500 italic text-center py-6">No pharmacy reserves pending in the triage pipeline.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 5. Pharmacy Stock levels */}
      {activeAdminSubTab === 'pharmacy' && (
        <div className="space-y-6 animate-fade-in" id="panel-pharmacy-levels">
          <h3 className="font-serif text-base font-bold text-white pb-2 border-b border-slate-850">
            Internal Pharmacological Index & Dispensation Levels
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pharmacyItems.map((med) => (
              <GlassCard key={med.id} className="p-4 flex items-center justify-between text-left text-xs">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 font-mono block uppercase">{med.category}</span>
                  <h4 className="font-serif font-bold text-white text-sm">{med.name}</h4>
                  
                  <div className="flex items-center gap-1">
                    <span className="text-slate-500">Live Stock count:</span>
                    <span className={`font-mono font-bold ${
                      med.stock > 40 ? 'text-emerald-400' : 'text-rose-400 animate-pulse'
                    }`}>
                      {med.stock} units
                    </span>
                  </div>
                </div>

                <div className="text-right space-y-2 shrink-0">
                  <span className="block font-mono text-xs font-bold text-yellow-300">K{med.price.toFixed(2)} / Box</span>
                  <button
                    onClick={() => onReplenishPharmacyItem(med.id)}
                    className="px-2.5 py-1.5 bg-[#89C540]/20 hover:bg-[#89C540]/30 text-[#89C540] border border-[#89C540]/30 font-bold rounded text-[10px] uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Replenish (+50 Box)
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
