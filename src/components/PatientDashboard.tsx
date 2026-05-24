import { Calendar, ShieldAlert, Award, FileText, Pill, MessageSquare, Plus, Activity, Star, Clock } from 'lucide-react';
import { Appointment, Prescription, PatientRecord, Doctor } from '../types';
import { GlassCard } from './GlassCard';

interface PatientDashboardProps {
  appointments: Appointment[];
  prescriptions: Prescription[];
  patientRecord: PatientRecord;
  doctors: Doctor[];
  onNavigate: (tabId: string) => void;
  onCancelAppointment: (appointmentId: string) => void;
  onSimulateNotification?: (title: string, message: string, type: 'info' | 'success' | 'warning' | 'alert') => void;
}

export function PatientDashboard({
  appointments,
  prescriptions,
  patientRecord,
  doctors,
  onNavigate,
  onCancelAppointment,
  onSimulateNotification
}: PatientDashboardProps) {

  // Get active upcoming appointments
  const upcomingAppointments = appointments.filter(
    app => app.patientEmail === patientRecord.email && app.status === 'Scheduled'
  );

  return (
    <div className="space-y-8 pb-12 animate-fade-in" id="patient-dashboard-view">
      
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-teal-950/40 via-blue-950/40 to-slate-900/40 p-6 rounded-2xl border border-[rgba(137,197,64,0.25)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#89C540]/5 rounded-full blur-2xl pointer-events-none" />
        <div className="space-y-1 relative z-10 text-left">
          <span className="text-xs uppercase font-mono tracking-widest text-[#89C540] font-bold">PATIENT PORTAL DASHBOARD</span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">Welcome, {patientRecord.name}</h1>
          <p className="text-xs text-slate-300">
            Identify your medical prescription refills, next triage queues, and check-up metrics.
          </p>
        </div>
        
        <div className="flex gap-2 relative z-10 shrink-0">
          <button
            onClick={() => onNavigate('book-appointment')}
            className="px-4 py-2.5 bg-[#FFEB3B] hover:bg-yellow-400 text-slate-900 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            Book Consult
          </button>
          
          <button
            onClick={() => onNavigate('schedule-checkup')}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl text-xs border border-slate-700/80 transition-all hover:border-[#89C540]/30"
          >
            Schedule Check-Up
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column - History & Medical Credentials (8 columns) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Medical Summary Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <GlassCard className="p-4 flex items-center gap-3.5">
              <div className="bg-[#89C540]/10 p-2.5 rounded-lg text-[#89C540] shrink-0">
                <Activity className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono font-bold block">Blood Type</span>
                <span className="text-base font-bold text-white">{patientRecord.bloodGroup}</span>
              </div>
            </GlassCard>

            <GlassCard className="p-4 flex items-center gap-3.5">
              <div className="bg-yellow-300/10 p-2.5 rounded-lg text-yellow-300 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono font-bold block">Patient Age</span>
                <span className="text-base font-bold text-white">{patientRecord.age} Years Old</span>
              </div>
            </GlassCard>

            <GlassCard className="p-4 flex items-center gap-3.5">
              <div className="bg-rose-500/10 p-2.5 rounded-lg text-rose-300 shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono font-bold block">Allergy Risk</span>
                <span className="text-xs font-bold text-[#FFEB3B] truncate max-w-[120px]" title={patientRecord.allergies.join(', ')}>
                  {patientRecord.allergies[0]} (+{patientRecord.allergies.length - 1} more)
                </span>
              </div>
            </GlassCard>
          </div>

          {/* Core Medical Record Timeline & History */}
          <GlassCard className="p-6 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#89C540]" />
                Electronic Health Profile
              </h3>
              <span className="text-[10px] text-slate-400 font-mono uppercase">ID: {patientRecord.id}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#89C540] mb-2">Chronic Conditions</h4>
                <div className="flex flex-wrap gap-1.5">
                  {patientRecord.conditions.map((cond, i) => (
                    <span key={i} className="bg-slate-900 border border-slate-800 text-slate-300 text-[11px] px-2.5 py-1 rounded-full">
                      {cond}
                    </span>
                  ))}
                  {patientRecord.conditions.length === 0 && <span className="text-xs text-slate-500 italic">None logged.</span>}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-2">Known Contraallergens</h4>
                <div className="flex flex-wrap gap-1.5">
                  {patientRecord.allergies.map((all, i) => (
                    <span key={i} className="bg-rose-950/20 border border-rose-500/20 text-rose-300 text-[11px] px-2.5 py-1 rounded-full">
                      {all}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Diagnostic History List */}
            <div className="space-y-3 pt-3 border-t border-slate-800 text-left">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Diagnostic Event Timeline</h4>
              <div className="space-y-2.5">
                {patientRecord.history.map((event, i) => (
                  <div key={i} className="flex gap-3 text-xs p-2.5 bg-slate-950/40 rounded-xl border border-slate-800/80">
                    <span className="text-emerald-400 font-mono shrink-0">●</span>
                    <span className="text-slate-300">{event}</span>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Pharmacy access suggestion + active prescriptions list */}
          <GlassCard className="p-6 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                <Pill className="w-5 h-5 text-yellow-300" />
                Active Pharmacological Prescriptions
              </h3>
              <button 
                onClick={() => onNavigate('prescriptions')} 
                className="text-xs text-[#89C540] hover:text-yellow-300 hover:underline flex items-center gap-1.5 uppercase font-mono tracking-wider font-bold"
              >
                Full Prescriptions View
              </button>
            </div>

            <div className="space-y-4">
              {prescriptions.map((px) => (
                <div 
                  key={px.id} 
                  className="p-4 bg-slate-950/50 rounded-xl border border-slate-800 hover:border-slate-700/80 transition-all text-left flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-400">ID: {px.id}</span>
                      <span className={`text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                        px.refillStatus === 'Active' 
                          ? 'bg-emerald-900/40 text-[#89C540] border border-emerald-500/30' 
                          : 'bg-yellow-900/40 text-yellow-300 border border-yellow-500/20'
                      }`}>
                        {px.refillStatus}
                      </span>
                    </div>
                    
                    <h4 className="text-sm font-bold text-white font-serif">{px.medicineName}</h4>
                    <p className="text-xs text-slate-300"><span className="text-slate-500">Dosage:</span> {px.dosage}</p>
                    <p className="text-xs text-slate-400"><span className="text-slate-500">Instructions:</span> {px.instructions}</p>
                  </div>

                  <div className="text-right sm:text-right flex sm:flex-col justify-between w-full sm:w-auto items-center sm:items-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-900">
                    <span className="text-xs text-slate-400 font-medium block">Authorized by {px.doctorName}</span>
                    <span className="text-[11px] text-[#89C540] font-mono mt-1 block">Refill Duration: {px.duration}</span>
                  </div>
                </div>
              ))}
              
              {prescriptions.length === 0 && (
                <p className="text-xs text-slate-500 italic py-4 text-center">No active pharmacological logs found on the central server.</p>
              )}
            </div>
          </GlassCard>

        </div>

        {/* Right Column - Upcoming Appointments, Queue Status & Quick Support (4 columns) */}
        <div className="lg:col-span-4 space-y-6 text-left">
          
          {/* Clinical Real-Time Event Simulator */}
          <GlassCard className="p-5 space-y-3 border border-dashed border-[#8ade4f]/30">
            <h3 className="font-serif text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wider">
              <Activity className="w-4 h-4 text-[#8ade4f] animate-pulse" />
              Triage Event Simulator
            </h3>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Trigger simulated clinical changes to view instant in-app alerts and notifications in action.
            </p>
            <div className="grid grid-cols-1 gap-2 pt-1">
              <button
                onClick={() => {
                  if (onSimulateNotification) {
                    onSimulateNotification(
                      'Doctor Running Late',
                      'Your clinical cardiologist, Dr. Evelyn Carter, is delayed by 20 minutes due to an emergency cardiac triage procedure.',
                      'alert'
                    );
                  }
                }}
                className="w-full py-2 bg-rose-500/10 hover:bg-rose-550/20 text-rose-300 font-mono font-bold border border-rose-500/20 rounded-xl text-[10px] text-left px-3 flex justify-between items-center transition-all cursor-pointer"
              >
                <span>🚨 Specialist Delayed 20 Mins</span>
                <span className="text-[9px] bg-rose-600 text-white font-bold px-1.5 py-0.5 rounded">Trigger</span>
              </button>

              <button
                onClick={() => {
                  if (onSimulateNotification) {
                    onSimulateNotification(
                      'Therapy Slot Rescheduled',
                      'Your specialized osteopathic follow-up check has been rescheduled to tomorrow at 11:30 AM.',
                      'info'
                    );
                  }
                }}
                className="w-full py-2 bg-blue-500/10 hover:bg-blue-550/20 text-indigo-300 font-mono font-bold border border-indigo-500/20 rounded-xl text-[10px] text-left px-3 flex justify-between items-center transition-all cursor-pointer"
              >
                <span>📅 Slot Shift: Rescheduled Option</span>
                <span className="text-[9px] bg-blue-600 text-white font-bold px-1.5 py-0.5 rounded">Trigger</span>
              </button>

              <button
                onClick={() => {
                  if (onSimulateNotification) {
                    onSimulateNotification(
                      'Lab Diagnostics Ready',
                      'Your deep lipid profile results are verified by the pathologist and saved in the Vault.',
                      'success'
                    );
                  }
                }}
                className="w-full py-2 bg-[#8ade4f]/10 hover:bg-[#8ade4f]/20 text-[#8ade4f] font-mono font-bold border border-emerald-500/20 rounded-xl text-[10px] text-left px-3 flex justify-between items-center transition-all cursor-pointer"
              >
                <span>🧪 Labs Uploaded to Patient Vault</span>
                <span className="text-[9px] bg-[#8ade4f] text-slate-950 font-bold px-1.5 py-0.5 rounded">Trigger</span>
              </button>
            </div>
          </GlassCard>

          {/* Active Queue status micro-card */}
          <GlassCard className="p-5 space-y-4 border-l-4 border-l-[#89C540]">
            <h3 className="font-mono text-xs font-bold tracking-widest text-[#89C540] uppercase">OUTPATIENT QUEUE</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Your Booking Status:</span>
                <span className="text-[#89C540] font-bold">In-Queue</span>
              </div>
              <div className="flex justify-between text-xs pb-2 border-b border-slate-800">
                <span className="text-slate-400">People Ahead:</span>
                <span className="text-slate-300 font-mono">2 Patients</span>
              </div>
              
              <div className="pt-2 flex items-center gap-3">
                <div className="bg-yellow-300/10 p-2 rounded text-yellow-300 text-lg font-bold font-mono">
                  Q32
                </div>
                <div className="text-left font-sans">
                  <h4 className="text-xs font-bold text-white">Estimated wait: 18 min</h4>
                  <p className="text-[10px] text-slate-500">Updates live based on triage severity.</p>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Upcoming Appointments */}
          <GlassCard className="p-5 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <h3 className="font-serif text-sm font-bold text-white flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-400" />
                Upcoming Consultations
              </h3>
              <span className="text-[#89C540] text-[10px] bg-[#89C540]/10 px-2 py-0.5 rounded-full font-mono font-bold">
                {upcomingAppointments.length} Active
              </span>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {upcomingAppointments.map((app) => (
                <div 
                  key={app.id} 
                  className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2.5 text-left"
                >
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-slate-500 font-mono">{app.date} • {app.timeSlot}</span>
                    <span className="bg-[#89C540]/10 border border-[#89C540]/30 text-[#89C540] font-bold px-1.5 py-0.5 rounded text-[9px]">
                      {app.type}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-white">{app.doctorName}</h4>
                    <span className="text-[10px] text-slate-400">{app.specialty} Specialist</span>
                  </div>

                  {app.notes && (
                    <p className="text-[11px] text-slate-500 italic bg-slate-900/60 p-2 rounded">
                      Note: {app.notes}
                    </p>
                  )}

                  <div className="pt-2 border-t border-slate-900 flex justify-between items-center">
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to cancel this scheduled consultation?')) {
                          onCancelAppointment(app.id);
                        }
                      }}
                      className="text-[10px] text-rose-400 hover:text-rose-300 font-bold uppercase tracking-wider hover:underline"
                    >
                      Cancel Booking
                    </button>
                    <span className="text-[10px] text-[#89C540] font-bold">Confirmed</span>
                  </div>
                </div>
              ))}

              {upcomingAppointments.length === 0 && (
                <div className="py-4 text-center">
                  <p className="text-xs text-slate-500 italic">No scheduled upcoming sessions.</p>
                  <button 
                    onClick={() => onNavigate('book-appointment')}
                    className="mt-2 text-xs text-[#89C540] hover:text-yellow-300 underline font-bold"
                  >
                    Schedule one now!
                  </button>
                </div>
              )}
            </div>
          </GlassCard>

          {/* Quick Support chat shortcut list widget */}
          <GlassCard className="p-5 space-y-3">
            <h3 className="font-serif text-sm font-bold text-white flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-blue-400" />
              24/7 Support Chatdesk
            </h3>
            <p className="text-[11px] text-slate-400">
              Address live medical registration queries, drug stocks list updates, and medical transport availability securely.
            </p>
            <button
              onClick={() => onNavigate('support')}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs flex justify-center items-center gap-1.5 transition-colors shadow-sm"
            >
              Enter Support Desk Live Room
            </button>
          </GlassCard>

          {/* Direct Pharmacy Catalog search quick-link */}
          <GlassCard className="p-5 space-y-3">
            <h3 className="font-serif text-sm font-bold text-white flex items-center gap-1.5">
              <Pill className="w-4 h-4 text-yellow-300" />
              Check Drug Formulary Stock
            </h3>
            <p className="text-[11px] text-slate-400">
              Query our active pharmacy stock count database directly to look up available medications prior to your clinical visit.
            </p>
            <button
              onClick={() => onNavigate('pharmacy')}
              className="w-full py-2.5 bg-[#FFEB3B] hover:bg-yellow-400 text-slate-900 font-bold rounded-xl text-xs flex justify-center items-center gap-1.5 transition-all shadow-sm"
            >
              Search Pharmacy Stock
            </button>
          </GlassCard>

        </div>

      </div>

    </div>
  );
}
