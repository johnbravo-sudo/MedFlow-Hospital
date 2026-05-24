import { Stethoscope, Phone, Shield, ShieldAlert, Award, Clock } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export function Footer({ setCurrentTab }: FooterProps) {
  return (
    <footer className="bg-[#112240]/90 text-slate-300 py-12 px-4 md:px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Hospital Brand info */}
        <div className="space-y-4 col-span-1 md:col-span-1">
          <div className="flex items-center space-x-2 text-white">
            <div className="bg-[#8ade4f] p-1.5 rounded-lg text-slate-900">
              <Stethoscope className="w-4 h-4" />
            </div>
            <span className="font-serif text-lg font-bold">
              Med<span className="text-[#8ade4f]">Flow</span> Hospital
            </span>
          </div>
          <p className="text-xs leading-relaxed text-slate-350">
            Dedicated to providing patient-first clinical excellence, rapid response emergency services, and smart prescription coordination tools.
          </p>
          <div className="flex gap-2">
            <span className="bg-white/5 px-2.5 py-1 rounded text-[10px] font-mono border border-white/10 text-[#8ade4f]">
              Registered Portal v1.4
            </span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-3 text-[#8ade4f]">Department Services</h4>
          <ul className="space-y-2 text-xs">
            <li><button onClick={() => setCurrentTab('doctors')} className="hover:text-[#ffff00] transition-colors cursor-pointer">Cardiology & Diagnostics</button></li>
            <li><button onClick={() => setCurrentTab('doctors')} className="hover:text-[#ffff00] transition-colors cursor-pointer">Pediatrics & Wellness</button></li>
            <li><button onClick={() => setCurrentTab('doctors')} className="hover:text-[#ffff00] transition-colors cursor-pointer">Neurological Care</button></li>
            <li><button onClick={() => setCurrentTab('doctors')} className="hover:text-[#ffff00] transition-colors cursor-pointer">Orthopedics & Surgery</button></li>
          </ul>
        </div>

        {/* Patient Resources */}
        <div>
          <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-3 text-[#8ade4f]">Patient Resources</h4>
          <ul className="space-y-2 text-xs">
            <li><button onClick={() => setCurrentTab('pharmacy')} className="hover:text-[#ffff00] transition-colors cursor-pointer">Instant Pharmacy Stock</button></li>
            <li><button onClick={() => setCurrentTab('services')} className="hover:text-[#ffff00] transition-colors cursor-pointer">Transparent Service Pricing</button></li>
            <li><button onClick={() => setCurrentTab('emergency')} className="hover:text-[#ffff00] transition-colors cursor-pointer">24/7 Dispatch Request</button></li>
            <li><button onClick={() => setCurrentTab('support')} className="hover:text-[#ffff00] transition-colors cursor-pointer">Support Live Desk</button></li>
          </ul>
        </div>

        {/* Hours & Help */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-rose-400 tracking-wider uppercase flex items-center gap-1">
            <ShieldAlert className="w-4 h-4 animate-pulse" />
            Emergency Center
          </h4>
          <div className="bg-rose-950/40 p-3 rounded-lg border border-rose-500/30 animate-pulse">
            <p className="text-xs text-rose-300 font-semibold mb-1 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              HOTLINE: 1-800-MED-FLOW
            </p>
            <p className="text-[10px] text-rose-400 font-medium">Call for ambulance dispatch and prioritized trauma coordinates.</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-350">
            <Clock className="w-3.5 h-3.5 text-[#8ade4f]" />
            <span>Outpatient Hours: 8:00 AM - 9:00 PM</span>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-white/10 text-center text-xs text-slate-400 flex flex-col sm:flex-row justify-between items-center gap-4">
        <span>© 2026 MedFlow Hospital Center. Real-time patient records cryptographically structured. All rights reserved.</span>
        <div className="flex gap-4">
          <a href="#" className="hover:underline text-white/60">Privacy Charter</a>
          <span>•</span>
          <a href="#" className="hover:underline text-white/60">Clinical Terms</a>
          <span>•</span>
          <a href="#" className="hover:underline text-white/60">GDPR Shield</a>
        </div>
      </div>
    </footer>
  );
}
