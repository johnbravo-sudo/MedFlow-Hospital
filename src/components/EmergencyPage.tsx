import React, { useState } from 'react';
import { PhoneCall, MapPin, ShieldAlert, Award, AlertCircle, RefreshCw, Send, CheckCircle2 } from 'lucide-react';
import { GlassCard } from './GlassCard';

export function EmergencyPage() {
  const [patientLocation, setPatientLocation] = useState('');
  const [injuryCategory, setInjuryCategory] = useState('');
  const [patientName, setPatientName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  
  const [ambulanceDispatched, setAmbulanceDispatched] = useState(false);
  const [errorText, setErrorText] = useState('');

  const handleRequestAmbulance = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText('');

    if (!patientLocation.trim()) {
      setErrorText('Please describe the active physical location coordinates.');
      return;
    }
    if (!injuryCategory) {
      setErrorText('Please select the traumatic symptom category.');
      return;
    }
    if (!contactPhone.trim()) {
      setErrorText('Please define an active telephone callback number.');
      return;
    }

    setAmbulanceDispatched(true);
  };

  const handleResetAmbulance = () => {
    setPatientLocation('');
    setInjuryCategory('');
    setPatientName('');
    setContactPhone('');
    setAmbulanceDispatched(false);
  };

  return (
    <div className="space-y-8 pb-12 animate-fade-in text-left font-sans" id="emergency-dispatch-view">
      
      {/* Alert Header Banner */}
      <div className="bg-rose-950/45 border-2 border-rose-500/40 p-6 rounded-2xl space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-600/10 rounded-full blur-2xl pointer-events-none" />
        <div className="space-y-1 text-left">
          <span className="text-xs uppercase font-bold tracking-widest text-rose-400 font-mono">24/7 PRIORITY CRITICAL TRAUMA</span>
          <h1 className="font-serif text-3xl font-bold text-white flex items-center gap-2">
            MedFlow Clinical Emergency Unit
          </h1>
          <p className="text-xs text-rose-300">
            Directly coordinate mobile intensive care ambulance dispatches, critical heart stroke alerts, and priority trauma arrivals.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Ambulance Dispatch Request Form (7 columns) */}
        <div className="lg:col-span-7">
          {ambulanceDispatched ? (
            <GlassCard className="p-8 text-center space-y-6 border-2 border-rose-500/50 bg-rose-950/20">
              <div className="flex justify-center text-rose-500">
                <ShieldAlert className="w-16 h-16 animate-ping" />
              </div>

              <div className="space-y-1.5 text-center">
                <h2 className="font-serif text-2xl font-bold text-white">INTELLIGENT MOBILE EMS DISPATCHED</h2>
                <p className="text-xs text-rose-300 font-semibold uppercase font-mono tracking-wider">
                  Ambulance unit mapped to coordinates securely.
                </p>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-xl border border-rose-500/20 text-left space-y-2 text-xs">
                <div className="flex justify-between border-b border-rose-950 pb-2">
                  <span className="text-slate-500 font-mono">DISPATCH FLOW ID:</span>
                  <span className="text-rose-400 font-mono font-bold">DIS-{Math.floor(1000 + Math.random() * 9000)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Declared Location:</span>
                  <span className="text-white font-semibold">{patientLocation}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Symptom Stream:</span>
                  <span className="text-rose-300 font-bold uppercase">{injuryCategory}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Fulfillment Telephone:</span>
                  <span className="text-white font-mono">{contactPhone}</span>
                </div>

                <div className="flex justify-between border-t border-rose-950 pt-2 text-[#89C540] font-bold">
                  <span>Estimated Arrival:</span>
                  <span className="text-yellow-300 font-mono">6 - 11 minutes (Outpatient Priority)</span>
                </div>
              </div>

              <div className="p-3 bg-[#FFEB3B]/10 border border-yellow-400/30 text-yellow-300 text-[10px] rounded-lg text-left">
                ⚠️ <b>Patient Safety Directive:</b> Keep the telephone line open. Our Clinical Dispatch Officer is reviewing these credentials to provide remote phone-first trauma support.
              </div>

              <button
                onClick={handleResetAmbulance}
                className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs transition-all uppercase tracking-wider"
              >
                Clear / Dispatch Another Call
              </button>
            </GlassCard>
          ) : (
            <GlassCard className="p-6 space-y-5">
              <h3 className="font-serif text-lg font-bold text-white border-b border-slate-800 pb-2">
                Simulated Ambulance Dispatch Trigger
              </h3>

              {errorText && (
                <p className="text-xs text-rose-300 bg-rose-950/40 border border-rose-500/30 p-2.5 rounded-lg text-left">
                  ⚠️ {errorText}
                </p>
              )}

              <form onSubmit={handleRequestAmbulance} className="space-y-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">
                      Patient Initial Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="e.g., John Kaira"
                      className="w-full bg-slate-950/80 border border-slate-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">
                      Phone Callback Coordinate *
                    </label>
                    <input
                      type="text"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="e.g., +1 800-555-0199"
                      className="w-full bg-slate-950/80 border border-slate-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-rose-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">
                    Traumatic Symptom Stream Category *
                  </label>
                  <select
                    value={injuryCategory}
                    onChange={(e) => setInjuryCategory(e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-rose-500"
                  >
                    <option value="">-- Choose Category --</option>
                    <option value="Coronary / Active Chest Pain Syndrome">Cardiologic / Severe Chest Pain</option>
                    <option value="Severe Physical Trauma / Open Wound Lacerations">Physical Trauma / Suture Laceration</option>
                    <option value="Neurological Stroke / Cognitive Disorientation">Neurologic / Suspected Stroke</option>
                    <option value="Acute Respiratory Distress / Asthma Obstruction">Asthma / Pulmonary Distress</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">
                    Physical Location / Address GPS Coordinates *
                  </label>
                  <textarea
                    rows={2.5}
                    value={patientLocation}
                    onChange={(e) => setPatientLocation(e.target.value)}
                    placeholder="Provide specific block coordinates, hallway name, or GPS latitude-longitude coordinates..."
                    className="w-full bg-slate-950/80 border border-slate-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-rose-500"
                  />
                </div>

                <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-[11px] rounded-lg">
                  ⚠️ <b>Legal Warning:</b> Triggering mock ambulance dispatch mimics actual full coordinates dispatch routing to confirm system infrastructure works beautifully.
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs uppercase tracking-widest transition-all shadow shadow-rose-600/10 cursor-pointer"
                >
                  Confirm & Dispatch Ambulance
                </button>
              </form>
            </GlassCard>
          )}
        </div>

        {/* Priority Phone Helpline sidebar widget (5 columns) */}
        <div className="lg:col-span-5 space-y-6">
          <GlassCard className="p-6 text-center space-y-4 border-l-4 border-l-rose-500 bg-slate-900/80">
            <div className="flex justify-center text-rose-500 animate-pulse">
              <PhoneCall className="w-12 h-12" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-400">Direct Trauma Center</span>
              <h3 className="font-serif text-xl font-bold text-white">Emergency Hotline</h3>
              <a 
                href="tel:1-800-555-5555" 
                className="block text-2xl font-black font-serif text-rose-400 tracking-wider hover:underline"
              >
                1-800-MED-FLOW
              </a>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed text-left">
              Our direct central routing line is staffed by clinical triage nurses 24 hours a day. Outpatient and intensive care ambulances can be deployed on response trajectories instantly.
            </p>

            <div className="space-y-3 pt-3 border-t border-slate-800 text-left text-xs text-slate-400">
              <div className="flex gap-2.5">
                <span className="text-emerald-400 font-bold font-mono">✓</span>
                <span>Active coordinates tracking</span>
              </div>
              <div className="flex gap-2.5">
                <span className="text-emerald-400 font-bold font-mono">✓</span>
                <span>Pre-admission clinic preparation alerts</span>
              </div>
              <div className="flex gap-2.5">
                <span className="text-emerald-400 font-bold font-mono">✓</span>
                <span>Trauma surgeon on-call alert sync</span>
              </div>
            </div>
          </GlassCard>

          {/* Priority admission guideline */}
          <GlassCard className="p-5 space-y-2.5">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1">
              <AlertCircle className="w-4 h-4 text-[#89C540]" />
              Priority Care Charter
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Patients arriving via EMS dispatch coordinates bypass outpatient queues completely. Clinical registries sync dynamically to expedite specialized trauma operations.
            </p>
          </GlassCard>

        </div>

      </div>

    </div>
  );
}
