import { useState } from 'react';
import { Landmark, ArrowRight, ShieldCheck, HelpCircle, Activity, Award } from 'lucide-react';
import { ServicePrice } from '../types';
import { GlassCard } from './GlassCard';

interface ServicesPricingProps {
  services: ServicePrice[];
}

export function ServicesPricing({ services }: ServicesPricingProps) {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'All' | 'Consultation' | 'Diagnostics' | 'Lab Tests' | 'Procedures'>('All');

  const filteredServices = services.filter(ser => {
    return activeCategoryFilter === 'All' || ser.category === activeCategoryFilter;
  });

  const categoriesSet: Array<'All' | 'Consultation' | 'Diagnostics' | 'Lab Tests' | 'Procedures'> = [
    'All',
    'Consultation',
    'Diagnostics',
    'Lab Tests',
    'Procedures'
  ];

  return (
    <div className="space-y-8 pb-12 animate-fade-in text-left font-sans" id="services-pricing-view">
      
      <div className="text-left space-y-2">
        <h1 className="font-serif text-3xl font-bold text-white">Clinical Services Rate Chart</h1>
        <p className="text-xs text-slate-400">
          MedFlow administers standard, transparent, fee-for-service pricing models without hidden insurance copay traps.
        </p>
      </div>

      {/* Pricing Categories tags */}
      <GlassCard className="p-4 flex flex-wrap gap-1.5 justify-start">
        {categoriesSet.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategoryFilter(cat)}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeCategoryFilter === cat
                ? 'bg-[rgba(137,197,64,0.20)] text-[#89C540] border border-[#89C540]/40'
                : 'bg-slate-950/45 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Transparent rate table (8 columns) */}
        <div className="lg:col-span-8 space-y-4">
          {filteredServices.map((ser) => (
            <GlassCard key={ser.id} className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-left">
              <div className="space-y-1 max-w-xl">
                <span className="text-[10px] text-slate-500 font-mono tracking-wider font-bold block uppercase">{ser.category}</span>
                <h3 className="text-base font-bold text-white font-serif">{ser.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{ser.description}</p>
              </div>

              <div className="bg-slate-950/80 px-4 py-3.5 rounded-xl border border-slate-800/80 shrink-0 text-right w-full sm:w-auto">
                <span className="block text-[10px] text-slate-500 uppercase font-mono mb-0.5">Direct Rate Fee</span>
                <span className="text-xl font-bold font-serif text-yellow-300">K{ser.price}</span>
              </div>
            </GlassCard>
          ))}

          {filteredServices.length === 0 && (
            <p className="text-xs text-slate-500 italic py-6 text-center">No service pricing entries map this classification filter.</p>
          )}
        </div>

        {/* Insurance partners helper widget (4 columns) */}
        <div className="lg:col-span-4 space-y-6">
          <GlassCard className="p-5 space-y-4">
            <h3 className="font-serif text-sm font-bold text-white border-b border-slate-800 pb-2 flex items-center gap-1.5">
              <Landmark className="w-4 h-4 text-[#89C540]" />
              Insurance & Reimbursement
            </h3>
            
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Our clinic registry is qualified with major digital health insurance clearinghouses. Outpatient and diagnostics check-up procedures map straight to claims indices.
            </p>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center p-2.5 bg-slate-950/60 rounded-lg border border-slate-900">
                <span className="text-slate-300 font-semibold">Alliance Silver Shield</span>
                <span className="text-[10px] text-emerald-400 font-bold uppercase font-mono">100% Eligible</span>
              </div>

              <div className="flex justify-between items-center p-2.5 bg-slate-950/60 rounded-lg border border-slate-900">
                <span className="text-slate-300 font-semibold">MetroCare Premium</span>
                <span className="text-[10px] text-emerald-400 font-bold uppercase font-mono">100% Eligible</span>
              </div>

              <div className="flex justify-between items-center p-2.5 bg-slate-950/60 rounded-lg border border-slate-900">
                <span className="text-slate-300 font-semibold">Gold Apex Triage Policy</span>
                <span className="text-[10px] text-emerald-400 font-bold uppercase font-mono">100% Eligible</span>
              </div>
            </div>
            
            <p className="text-[10px] text-slate-500">
              *Coordination files can be generated from your active Patient Suite Dashboard instantly upon physical outpatient visit checkout.
            </p>
          </GlassCard>

          {/* Transparent pricing core charter */}
          <GlassCard className="p-5 space-y-3 border-l-4 border-l-[#89C540] bg-slate-900/40">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-[#89C540]" />
              No Hidden Fees Mandate
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              All prices cataloged here represent standard fees, medical equipment maintenance, clinical expert hours, and diagnostic analysis response, with zero surcharges.
            </p>
          </GlassCard>

        </div>

      </div>

    </div>
  );
}
