import { Star, Mail, Award, CheckSquare, HeartHandshake, ShieldCheck } from 'lucide-react';
import { Doctor } from '../types';
import { GlassCard } from './GlassCard';

interface DoctorsPageProps {
  doctors: Doctor[];
  onBookClick: (doc: Doctor) => void;
}

export function DoctorsPage({ doctors, onBookClick }: DoctorsPageProps) {
  return (
    <div className="space-y-8 pb-12 animate-fade-in text-left font-sans" id="clinicians-directory">
      
      <div className="text-left space-y-2">
        <h1 className="font-serif text-3xl font-bold text-white">Our Board-Certified Clinical staff</h1>
        <p className="text-xs text-slate-400">
          Meet MedFlow's world-class medical specialists, coordinating to deliver robust clinical services.
        </p>
      </div>

      {/* Grid of doctor profile pages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {doctors.map((doc) => (
          <GlassCard key={doc.id} className="p-6 grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
            
            {/* Left side containing physician high contrast clinical avatar */}
            <div className="sm:col-span-5 space-y-3 shrink-0">
              <div className="relative">
                <img
                  src={doc.photo}
                  alt={doc.name}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-44 object-cover object-top rounded-2xl border border-slate-750"
                />
                <span className="absolute bottom-2.5 right-2.5 bg-slate-950/85 text-yellow-300 font-bold text-[10px] px-2.5 py-1 rounded border border-yellow-400/20 flex items-center gap-1 shadow">
                  <Star className="w-3.5 h-3.5 fill-yellow-400 stroke-none" />
                  {doc.rating} Rating
                </span>
              </div>
              
              <div className="p-2.5 bg-slate-950/50 rounded-xl border border-slate-850 space-y-1 text-center sm:text-left">
                <span className="block text-[10px] text-slate-500 uppercase font-mono">Consulation Fee</span>
                <span className="text-base font-bold text-[#89C540]">K{doc.consultationFee}</span>
              </div>
            </div>

            {/* Right side containing specialty availability bio and credentials profiles */}
            <div className="sm:col-span-7 space-y-4">
              <div className="space-y-1 text-left">
                <h3 className="text-lg font-bold text-white font-serif">{doc.name}</h3>
                <span className="bg-[#89C540]/10 border border-[#89C540]/30 text-[#89C540] px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider font-mono inline-block">
                  {doc.specialty} Specialist
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {doc.bio}
              </p>

              {/* On-call coordinate listings */}
              <div className="space-y-2 text-xs">
                <span className="block text-[10px] font-mono text-slate-500 uppercase font-bold text-left">Weekly Outpatient Hours</span>
                <div className="flex flex-wrap gap-1.5 justify-start">
                  {doc.availability.map((day, i) => (
                    <span key={i} className="bg-slate-950/80 border border-slate-800 text-slate-300 px-2 py-1 rounded text-[10px] font-mono font-semibold">
                      {day}
                    </span>
                  ))}
                </div>
              </div>

              {/* Proactive medical verification checklist */}
              <div className="pt-3 border-t border-slate-850 grid grid-cols-2 gap-2 text-[10px] text-slate-400">
                <div className="flex gap-1.5 items-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Licensed Registrar</span>
                </div>
                <div className="flex gap-1.5 items-center">
                  <Award className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{doc.experience} Yr Resident</span>
                </div>
              </div>

              <button
                onClick={() => onBookClick(doc)}
                className="w-full mt-2 py-2.5 bg-[#FFEB3B] hover:bg-yellow-400 text-slate-900 font-bold rounded-xl text-xs uppercase tracking-wider transition-all font-sans cursor-pointer flex justify-center items-center gap-1.5 shadow"
              >
                <span>Request Booking Slot</span>
              </button>
            </div>

          </GlassCard>
        ))}
      </div>

    </div>
  );
}
