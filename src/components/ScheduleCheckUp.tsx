import React, { useState } from 'react';
import { Calendar, Layers, CheckCircle2, FlaskConical, Heart, ChevronRight, User } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { Appointment } from '../types';

interface ScheduleCheckUpProps {
  patientEmail: string;
  patientName: string;
  onBookSuccess: (newApp: Appointment) => void;
  onBackToDashboard: () => void;
}

export function ScheduleCheckUp({
  patientEmail,
  patientName,
  onBookSuccess,
  onBackToDashboard
}: ScheduleCheckUpProps) {
  const [activeCheckupType, setActiveCheckupType] = useState<'Routine' | 'Lab' | 'FollowUp'>('Routine');
  const [selectedSubProgram, setSelectedSubProgram] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [preferredSlot, setPreferredSlot] = useState('');
  const [acknowledgementApproved, setAcknowledgementApproved] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [receipt, setReceipt] = useState<Appointment | null>(null);

  const routinePrograms = [
    { id: 'rp-1', name: 'Comprehensive Golden Age Audit', price: Math.round(180 * 19.27), duration: '90 mins' },
    { id: 'rp-2', name: 'Standard Biomarker Executive Scan', price: Math.round(120 * 19.27), duration: '60 mins' },
    { id: 'rp-3', name: 'Youth / Pediatric Wellness Assessment', price: Math.round(95 * 19.27), duration: '45 mins' }
  ];

  const labPrograms = [
    { id: 'lp-1', name: 'Comprehensive Endocrine Metabolic Sync', price: Math.round(110 * 19.27), duration: '20 mins' },
    { id: 'lp-2', name: 'Liver, Renal, and Lipid Panels Index', price: Math.round(85 * 19.27), duration: '15 mins' },
    { id: 'lp-3', name: 'Cardiopulmonary Lipid-A Microscopic Assay', price: Math.round(70 * 19.27), duration: '15 mins' }
  ];

  const followUpPrograms = [
    { id: 'fp-1', name: 'Post-Trauma Wound Care & Suture Removal', price: Math.round(50 * 19.27), duration: '30 mins' },
    { id: 'fp-2', name: 'Chronic Cardio Resistance Progress Review', price: Math.round(75 * 19.27), duration: '30 mins' },
    { id: 'fp-3', name: 'Diabetes Hormone Balance Calibration', price: Math.round(60 * 19.27), duration: '30 mins' }
  ];

  const getActiveArray = () => {
    switch (activeCheckupType) {
      case 'Routine': return routinePrograms;
      case 'Lab': return labPrograms;
      case 'FollowUp': return followUpPrograms;
    }
  };

  const handleProgramClick = (name: string) => {
    setSelectedSubProgram(name);
    setErrorText('');
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText('');

    if (!selectedSubProgram) {
      setErrorText('Please select an active clinical routine screening package.');
      return;
    }
    if (!targetDate) {
      setErrorText('Please specify a target date for checkup dispatch.');
      return;
    }
    if (!preferredSlot) {
      setErrorText('Please select an available daily hour range.');
      return;
    }
    if (!acknowledgementApproved) {
      setErrorText('You must approve the Clinical Preparation Charter.');
      return;
    }

    // Book checkup
    const checkupMap: Record<string, string> = {
      Routine: 'Check-up',
      Lab: 'Lab',
      FollowUp: 'Follow-up'
    };

    const newAppointment: Appointment = {
      id: `chk-${Math.floor(10000 + Math.random() * 90000)}`,
      patientName: patientName,
      patientEmail: patientEmail,
      doctorId: 'clinic-coordinator',
      doctorName: 'Clinical Triage Coordinator',
      specialty: 'Diagnostics / Wellness Screenings',
      date: targetDate,
      timeSlot: preferredSlot,
      type: checkupMap[activeCheckupType] as any,
      status: 'Scheduled',
      notes: `Screening Package Selected: ${selectedSubProgram}`,
      queueNo: Math.floor(40 + Math.random() * 30)
    };

    onBookSuccess(newAppointment);
    setReceipt(newAppointment);
  };

  // 1. Render booking outcome receipt
  if (receipt) {
    return (
      <div className="max-w-xl mx-auto py-8 text-center animate-fade-in" id="checkup-checkout-receipt">
        <GlassCard className="p-8 space-y-6 border-2 border-[rgba(137,197,64,0.4)]">
          <div className="flex justify-center text-emerald-400">
            <CheckCircle2 className="w-16 h-16 animate-bounce" />
          </div>

          <div className="space-y-1.5 text-center">
            <h2 className="font-serif text-2xl font-bold text-white">Screening Check-Up Dispatched</h2>
            <p className="text-xs text-slate-400">
              Registration logs updated. Prepare yourself according to outpatient instructions.
            </p>
          </div>

          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-left space-y-2 text-xs">
            <div className="flex justify-between border-b border-slate-900 pb-2">
              <span className="text-slate-500 font-mono">FLOW ID:</span>
              <span className="text-white font-mono font-bold">{receipt.id}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Registry Name:</span>
              <span className="text-white font-semibold">{receipt.patientName}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Scheduled Unit:</span>
              <span className="text-[#89C540] font-bold">{receipt.doctorName}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Clinical Focus:</span>
              <span className="text-slate-300">{receipt.notes}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Timeslot:</span>
              <span className="text-white font-semibold">{receipt.date} @ {receipt.timeSlot}</span>
            </div>

            <div className="flex justify-between border-t border-slate-900 pt-2 text-[#89C540] font-bold">
              <span>Diagnostics Queue Check:</span>
              <span className="font-mono">Triage Code #{receipt.queueNo}</span>
            </div>
          </div>

          <div className="p-3 bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 text-[10px] rounded-lg text-left">
            ⚠️ <b>Clinical Preparation Guidelines:</b> If receiving blood drew panels, fast for at least 8 hours previous to your scheduled hour range. Only plain water is permitted.
          </div>

          <button
            onClick={onBackToDashboard}
            className="w-full py-3.5 bg-[#FFEB3B] hover:bg-yellow-400 text-slate-900 font-bold rounded-xl text-xs uppercase tracking-wider transition-all font-sans"
          >
            Go Back to Dashboard
          </button>
        </GlassCard>
      </div>
    );
  }

  // 2. Schedule options setup page
  return (
    <div className="space-y-8 pb-12 animate-fade-in text-left font-sans" id="schedule-check-up-screen">
      <div className="text-left space-y-2">
        <h1 className="font-serif text-3xl font-bold text-white">Schedule Preventive Check-Ups</h1>
        <p className="text-xs text-slate-400">
          Access general wellness screening programs, book outpatient metabolic draws, or schedule post-surgical wound consults.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Checkup selection column (8 columns) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Main selection buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <GlassCard 
              onClick={() => { setActiveCheckupType('Routine'); setSelectedSubProgram(''); setErrorText(''); }}
              className={`p-5 flex flex-col items-center gap-3 text-center ${
                activeCheckupType === 'Routine' ? 'border-l-4 border-l-[#89C540] bg-slate-900/80' : ''
              }`}
            >
              <div className="bg-[#89C540]/10 p-2.5 rounded-xl text-[#89C540]">
                <Heart className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white font-serif">1. Routine Physicals</h3>
                <p className="text-[10px] text-slate-400 leading-relaxed">Executive wellness exams, biometrics, health auditing.</p>
              </div>
            </GlassCard>

            <GlassCard 
              onClick={() => { setActiveCheckupType('Lab'); setSelectedSubProgram(''); setErrorText(''); }}
              className={`p-5 flex flex-col items-center gap-3 text-center ${
                activeCheckupType === 'Lab' ? 'border-l-4 border-l-yellow-300 bg-slate-900/80' : ''
              }`}
            >
              <div className="bg-yellow-300/10 p-2.5 rounded-xl text-yellow-300">
                <FlaskConical className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white font-serif">2. Laboratory Visits</h3>
                <p className="text-[10px] text-slate-400 leading-relaxed">Metabolic lipid screens, urine panels, hormones charts.</p>
              </div>
            </GlassCard>

            <GlassCard 
              onClick={() => { setActiveCheckupType('FollowUp'); setSelectedSubProgram(''); setErrorText(''); }}
              className={`p-5 flex flex-col items-center gap-3 text-center ${
                activeCheckupType === 'FollowUp' ? 'border-l-4 border-l-sky-400 bg-slate-900/80' : ''
              }`}
            >
              <div className="bg-sky-400/10 p-2.5 rounded-xl text-sky-400">
                <Layers className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white font-serif">3. Follow-Up Consults</h3>
                <p className="text-[10px] text-slate-400 leading-relaxed">Wound monitoring, post-surgery audits, dose calibration.</p>
              </div>
            </GlassCard>
          </div>

          {/* Sub program packages list */}
          <GlassCard className="p-6 space-y-4">
            <h3 className="font-serif text-lg font-bold text-white border-b border-slate-800 pb-2">
              {activeCheckupType === 'Routine' && 'Available General Physicals'}
              {activeCheckupType === 'Lab' && 'Available Specialized Lab Screens'}
              {activeCheckupType === 'FollowUp' && 'Available Follow-Up Treatment Consults'}
            </h3>

            <div className="space-y-3">
              {getActiveArray().map((prog) => (
                <div
                  key={prog.id}
                  onClick={() => handleProgramClick(prog.name)}
                  className={`p-4 rounded-xl border transition-all text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-900/30 ${
                    selectedSubProgram === prog.name
                      ? 'bg-[rgba(137,197,64,0.1)] border-[#89C540] text-[#89C540]'
                      : 'bg-slate-950/40 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white">{prog.name}</h4>
                    <span className="text-[10px] text-slate-400 font-mono block">Estimated procedure: {prog.duration}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-base font-bold font-serif text-yellow-300">K{prog.price}</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Dispatch details Form card (4 columns) */}
        <div className="lg:col-span-4">
          <GlassCard className="p-5 space-y-5">
            <h3 className="font-serif text-sm font-bold text-white border-b border-slate-800 pb-2 flex items-center gap-1.5ClassName">
              <Calendar className="w-4 h-4 text-emerald-400" />
              Scheduling Coordination
            </h3>

            {errorText && (
              <p className="text-[11px] text-rose-300 bg-rose-950/40 border border-rose-500/20 p-2.5 rounded-lg">
                ⚠️ {errorText}
              </p>
            )}

            <form onSubmit={handleCheckout} className="space-y-4 text-left">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Check-Up Target Date
                </label>
                <input
                  type="date"
                  value={targetDate}
                  min="2026-05-24"
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#89C540]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Preferred Arrival Slot
                </label>
                <select
                  value={preferredSlot}
                  onChange={(e) => setPreferredSlot(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-[#89C540]"
                >
                  <option value="">-- Choose Slot --</option>
                  <option value="Morning Slot (08:00 AM - 11:30 AM)">Morning (08:00 AM - 11:30 AM)</option>
                  <option value="Mid-Day Slot (12:00 PM - 02:30 PM)">Midday (12:00 PM - 02:30 PM)</option>
                  <option value="Evening Slot (03:00 PM - 06:30 PM)">Evening (03:00 PM - 06:30 PM)</option>
                </select>
              </div>

              <div className="space-y-2 bg-slate-950/80 p-3 rounded-lg border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                <div className="flex gap-2 items-start">
                  <input
                    type="checkbox"
                    id="charter-checkbox"
                    checked={acknowledgementApproved}
                    onChange={(e) => setAcknowledgementApproved(e.target.checked)}
                    className="mt-0.5 rounded accent-[#89C540] checked:bg-[#89C540]"
                  />
                  <label htmlFor="charter-checkbox" className="cursor-pointer select-none">
                    I approve the <b>Clinical Preparation Charter</b>. I understand blood panel screens require prior fasting, and cancellations must be flagged 12 hours prior.
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#FFEB3B] hover:bg-yellow-400 text-slate-900 font-bold rounded-xl text-xs uppercase tracking-wider transition-all font-sans shadow shadow-yellow-400/10 cursor-pointer"
              >
                Dispatch Scheduled Request
              </button>
            </form>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
