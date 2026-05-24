import { useState } from 'react';
import { Pill, Download, Printer, Award, Calendar, RefreshCw, Eye, CheckCircle } from 'lucide-react';
import { Prescription } from '../types';
import { GlassCard } from './GlassCard';

interface PrescriptionPageProps {
  prescriptions: Prescription[];
  onTriggerRefill: (prescriptionId: string) => void;
}

export function PrescriptionPage({ prescriptions, onTriggerRefill }: PrescriptionPageProps) {
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [downloadSuccessTimer, setDownloadSuccessTimer] = useState<string | null>(null);

  const handleDownload = (px: Prescription) => {
    setDownloadSuccessTimer(px.id);
    
    // Simulate generation of prescription credentials in a PDF format.
    const fileContent = `
MEDFLOW MEDICAL HOSPITAL prescription receipt
-------------------------------------------
PRESCRIPTION ID: ${px.id}
PATIENT: ${px.patientName}
SPECIALIST: ${px.doctorName}
DATE DETECTED: ${px.date}
MEDICAMENT: ${px.medicineName}
DOSAGE SCHEDULING: ${px.dosage}
DIRECTIONS: ${px.instructions}
DURATION: ${px.duration}
REFILL: ${px.refillStatus}
-------------------------------------------
Valid for pharmacological fulfillment securely.
    `;
    
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `MedFlow-Prescription-${px.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setDownloadSuccessTimer(null);
    }, 2000);
  };

  return (
    <div className="space-y-8 pb-12 animate-fade-in text-left font-sans" id="prescription-management-view">
      
      <div className="text-left space-y-2">
        <h1 className="font-serif text-3xl font-bold text-white">Active Medical Prescriptions</h1>
        <p className="text-xs text-slate-400">
          Access dosage coordinates authenticated by clinical specialists, verify refill statuses, and download official medical sheets.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Prescription List block (7 columns) */}
        <div className="lg:col-span-7 space-y-4">
          {prescriptions.map((px) => (
            <GlassCard 
              key={px.id} 
              className={`p-5 transition-all cursor-pointer ${
                selectedPrescription?.id === px.id ? 'border-[#89C540] bg-slate-900/40 shadow-emerald-500/5' : ''
              }`}
              onClick={() => setSelectedPrescription(px)}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-500 font-bold">ID: {px.id}</span>
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      px.refillStatus === 'Active' 
                        ? 'bg-emerald-950 text-[#89C540] border border-emerald-500/30' 
                        : px.refillStatus === 'Refill Pending'
                        ? 'bg-amber-950 text-amber-300 border border-amber-500/30'
                        : 'bg-rose-950 text-rose-300 border border-rose-500/30'
                    }`}>
                      {px.refillStatus}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white font-serif">{px.medicineName}</h3>
                  <p className="text-xs text-slate-400">Prescribed by {px.doctorName} • {px.date}</p>
                </div>

                <div className="flex sm:flex-col gap-2 shrink-0">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDownload(px); }}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5"
                    title="Download Text File Receipt"
                  >
                    {downloadSuccessTimer === px.id ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-[#89C540]" />
                        <span className="text-[10px] font-bold text-[#89C540]">Downloaded</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span className="text-[10px]">Download Rx</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </GlassCard>
          ))}

          {prescriptions.length === 0 && (
            <p className="text-xs text-slate-500 italic py-6 text-center">No active pharmacology coordinates tracked for you.</p>
          )}
        </div>

        {/* Detailed Sheet view (5 columns) */}
        <div className="lg:col-span-5">
          {selectedPrescription ? (
            <GlassCard className="p-6 space-y-5 border-t-4 border-t-[#89C540] border-[rgba(137,197,64,0.3)] bg-slate-900/80">
              <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-sm font-semibold text-[#89C540] uppercase tracking-wider font-mono">Prescription Sheet Details</h3>
                  <p className="text-[11px] text-slate-400">Authenticated via Central Triage Database</p>
                </div>
                <button
                  onClick={() => alert(`Standard paper transmission signaled. Place your terminal on clinical diagnostic network.`)}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded hover:text-white transition-colors"
                  title="Print Official Form"
                >
                  <Printer className="w-4 h-4" />
                </button>
              </div>

              {/* Physical details block */}
              <div className="space-y-4 text-xs text-left">
                <div className="grid grid-cols-2 gap-4 pb-2 border-b border-slate-850">
                  <div>
                    <span className="block text-[10px] text-slate-500 uppercase font-mono">Patient Name</span>
                    <span className="text-white font-semibold">{selectedPrescription.patientName}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500 uppercase font-mono">Physician Registrar</span>
                    <span className="text-white font-semibold">{selectedPrescription.doctorName}</span>
                  </div>
                </div>

                <div className="pb-2 border-b border-slate-850 space-y-0.5">
                  <span className="block text-[10px] text-slate-500 uppercase font-mono">Medication Name & Concentration</span>
                  <span className="text-yellow-300 font-bold font-serif text-sm">{selectedPrescription.medicineName}</span>
                </div>

                <div className="pb-2 border-b border-slate-850 space-y-0.5">
                  <span className="block text-[10px] text-slate-500 uppercase font-mono">Dosage Scheme</span>
                  <p className="text-slate-200 font-medium">{selectedPrescription.dosage}</p>
                </div>

                <div className="pb-2 border-b border-slate-850 space-y-0.5">
                  <span className="block text-[10px] text-slate-500 uppercase font-mono">Directions & Food Rules</span>
                  <p className="text-slate-300 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800 italic leading-relaxed">
                    "{selectedPrescription.instructions}"
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="block text-[10px] text-slate-500 uppercase font-mono">Treatment Length</span>
                    <span className="text-white font-semibold">{selectedPrescription.duration}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500 uppercase font-mono">Refill Allocation</span>
                    <span className="text-[#89C540] font-bold">{selectedPrescription.refillStatus}</span>
                  </div>
                </div>
              </div>

              {/* Refill trigger action */}
              {selectedPrescription.refillStatus === 'Refill Pending' ? (
                <button
                  onClick={() => onTriggerRefill(selectedPrescription.id)}
                  className="w-full py-3 bg-[#FFEB3B] hover:bg-yellow-400 text-slate-900 font-bold rounded-xl text-xs flex justify-center items-center gap-1.5 transition-all font-sans cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4 animate-spin-slow" />
                  Trigger Instant Digital Refill Status
                </button>
              ) : selectedPrescription.refillStatus === 'Active' ? (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-[#89C540] text-[11px] rounded-lg text-center font-semibold">
                  ✓ Refill active. Full inventory catalog ready for pickup coordination.
                </div>
              ) : (
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-[11px] rounded-lg text-center font-semibold">
                  ⚠️ Refills exhausted. Please schedule an outpatient consult for fresh diagnostics.
                </div>
              )}

            </GlassCard>
          ) : (
            <div className="p-10 bg-slate-900/30 rounded-2xl border border-dashed border-slate-800 text-center text-xs text-slate-500">
              Select any prescription on the left side to display fully detailed clinical dosing charts and triggering refills.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
