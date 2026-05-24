import { HeartPulse, Shield, CalendarCheck, Pill, ArrowRight, Star, Clock, UserPlus } from 'lucide-react';
import { Doctor } from '../types';
import { GlassCard } from './GlassCard';

interface HomePageProps {
  setCurrentTab: (tab: string) => void;
  doctors: Doctor[];
  testimonials: Array<{ text: string; author: string; meta: string }>;
  onBookClick: () => void;
  userLoggedIn: boolean;
}

export function HomePage({ setCurrentTab, doctors, testimonials, onBookClick, userLoggedIn }: HomePageProps) {
  return (
    <div className="space-y-16 pb-12 animate-fade-in" id="home-page-container">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 md:pt-16 pb-8">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#8ade4f]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-400/10 border border-[#8ade4f]/40 text-[#8ade4f] text-xs font-bold rounded-full uppercase tracking-wider">
              <HeartPulse className="w-3.5 h-3.5" />
              Next-Gen Medical Excellence
            </div>
            
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-none">
              Your Health, <br className="hidden sm:inline" />
              Our <span className="text-[#8ade4f] animate-pulse">Highest Priority</span>
            </h1>
            
            <p className="text-slate-300 text-base md:text-lg max-w-xl leading-relaxed">
              Experience transparent clinical services, synchronized prescription coordination, live outpatient queues, and 24/7 urgent trauma dispatch tailored with a premium frosted glass interface.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={onBookClick}
                className="px-6 py-3.5 bg-[#ffff00] hover:bg-yellow-350 font-bold text-blue-900 rounded-xl flex items-center gap-2 transform hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_rgba(255,255,0,0.25)] font-sans cursor-pointer"
              >
                <CalendarCheck className="w-5 h-5" />
                Book Appointment Now
              </button>
              
              <button
                onClick={() => setCurrentTab('services')}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl border border-white/20 hover:border-[#8ade4f]/40 flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>View Prices & Fees</span>
                <ArrowRight className="w-4 h-4 text-[#8ade4f]" />
              </button>
            </div>

            {/* Micro Stats Banner */}
            <div className="grid grid-cols-3 gap-4 pt-6 max-w-md">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="block text-2xl font-bold font-serif text-white">99.8%</span>
                <span className="text-[10px] text-blue-200 uppercase tracking-widest font-mono">Patient Trust</span>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="block text-2xl font-bold font-serif text-white">24/7</span>
                <span className="text-[10px] text-blue-200 uppercase tracking-widest font-mono">Clinical Care</span>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="block text-2xl font-bold font-serif text-[#8ade4f]">15 Min</span>
                <span className="text-[10px] text-blue-200 uppercase tracking-widest font-mono">Avg Response</span>
              </div>
            </div>
          </div>

          {/* Hero Feature Showcase Card */}
          <div className="lg:col-span-5 relative">
            <GlassCard className="p-6 relative z-10 space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-white/15">
                <span className="text-xs text-white/70 font-mono">LIVE CLINIC FLOW STATUS</span>
                <span className="flex items-center gap-1 text-[10px] font-bold text-[#8ade4f]">
                  <span className="w-2 h-2 rounded-full bg-[#8ade4f] animate-bounce" />
                  ACTIVE REGISTRY
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-[#8ade4f]/10">
                  <div className="flex items-center gap-2.5">
                    <HeartPulse className="w-5 h-5 text-rose-400" />
                    <div className="text-left">
                      <h4 className="text-xs font-semibold text-white">Trauma Unit Status</h4>
                      <p className="text-[10px] text-rose-300 font-semibold uppercase font-mono">Operational priority</p>
                    </div>
                  </div>
                  <span className="bg-rose-500/20 text-rose-300 text-[10px] px-2.5 py-1 rounded font-mono font-bold">EXCELLENT</span>
                </div>

                <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-[#8ade4f]/10 border-white/10">
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-5 h-5 text-[#8ade4f]" />
                    <div className="text-left">
                      <h4 className="text-xs font-semibold text-white">Outpatient Queue</h4>
                      <p className="text-[10px] text-blue-200">Total waiting right now</p>
                    </div>
                  </div>
                  <span className="bg-[#8ade4f]/20 text-[#8ade4f] text-xs px-2.5 py-1 rounded font-bold font-mono">4 PATIENTS</span>
                </div>

                <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-[#8ade4f]/10 border-white/10">
                  <div className="flex items-center gap-2.5">
                    <Pill className="w-5 h-5 text-[#ffff00]" />
                    <div className="text-left">
                      <h4 className="text-xs font-semibold text-white">Pharmacy Stock Count</h4>
                      <p className="text-[10px] text-blue-200">Available medical formulations</p>
                    </div>
                  </div>
                  <span className="bg-[#ffff00]/20 text-yellow-300 text-xs px-2.5 py-1 rounded font-bold font-mono">1,400+ UNITS</span>
                </div>
              </div>

              <div className="pt-2 text-center">
                <p className="text-[11px] text-slate-400 italic">
                  "Fully digitalized record indexing protects your clinical timeline data."
                </p>
              </div>
            </GlassCard>
            
            {/* Visual glow backdrop elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-indigo-500/10 rounded-2xl -rotate-3 z-0 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Hospital Introduction */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="font-serif text-3xl font-bold text-white">State-Of-The-Art Facilities</h2>
          <p className="text-sm text-slate-400">
            Connecting medical expertise with cutting-edge patient workflows to simplify scheduling and diagnostic reviews.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="p-6 space-y-3">
            <div className="bg-emerald-500/10 text-[#8ade4f] p-3 rounded-xl w-fit">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-white">Safe & Accredited</h3>
            <p className="text-xs text-blue-200 leading-relaxed">
              We operate under rigorous clinical supervision procedures, exceeding international healthcare safety protocols.
            </p>
          </GlassCard>

          <GlassCard className="p-6 space-y-3">
            <div className="bg-yellow-400/15 text-yellow-300 p-3 rounded-xl w-fit">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-white">Instant Sync Booking</h3>
            <p className="text-xs text-blue-200 leading-relaxed">
              Skip phone waitlines completely. Look up doctor schedules, choose specific hours, and receive real-time confirmations on your device.
            </p>
          </GlassCard>

          <GlassCard className="p-6 space-y-3">
            <div className="bg-sky-400/10 text-sky-300 p-3 rounded-xl w-fit">
              <Pill className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-white">Formulary Coordination</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Search real-time pharmacy inventory catalogs, request critical drug availability reserves, and coordinate dosage notes.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* Doctor Highlights */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 className="font-serif text-3xl font-bold text-white">Pioneering Specialists</h2>
            <p className="text-sm text-blue-100 max-w-lg">
              Our clinical department heads represent decades of research, training, and direct patient healing.
            </p>
          </div>
          <button
            onClick={() => setCurrentTab('doctors')}
            className="text-xs font-semibold text-[#8ade4f] hover:text-yellow-350 flex items-center gap-1 hover:underline group cursor-pointer"
          >
            Explore all doctor profiles
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {doctors.slice(0, 3).map((doc) => (
            <GlassCard key={doc.id} className="relative overflow-hidden group">
              <img
                src={doc.photo}
                alt={doc.name}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-48 object-cover object-top brightness-95 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2 bg-slate-950/80 px-2.5 py-1 rounded-full text-xs font-bold text-[#8ade4f] border border-[#8ade4f]/30 shadow flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-[#8ade4f] stroke-none" />
                {doc.rating}
              </div>
              
              <div className="p-5 space-y-3">
                <div>
                  <h3 className="text-base font-bold text-white font-serif">{doc.name}</h3>
                  <p className="text-xs font-semibold text-[#8ade4f] uppercase tracking-wider">{doc.specialty}</p>
                </div>
                
                <p className="text-xs text-blue-100 line-clamp-2 leading-relaxed">
                  {doc.bio}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs text-white/90">
                  <span className="font-mono text-[11px]">{doc.experience} Years Exp</span>
                  <span className="text-yellow-300 font-bold">K{doc.consultationFee} Consultation</span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="font-serif text-3xl font-bold text-white">Restored Lives</h2>
          <p className="text-sm text-slate-400">
            Hear straight from the patients, families, and community members we support every single day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((test, idx) => (
            <GlassCard key={idx} className="p-6 relative flex flex-col justify-between">
              <div className="text-[#8ade4f] text-3xl font-serif">“</div>
              <p className="text-xs text-white/95 italic leading-relaxed z-10">
                {test.text}
              </p>
              <div className="pt-4 mt-4 border-t border-white/10 flex justify-between items-center">
                <div>
                  <h4 className="text-xs font-bold text-white">{test.author}</h4>
                  <p className="text-[10px] text-[#8ade4f]">{test.meta}</p>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-transparent" />
                  ))}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Interactive App CTA */}
      <section>
        <GlassCard className="p-8 max-w-5xl mx-auto overflow-hidden relative">
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-emerald-400/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4 text-left">
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-white">
                Ready to coordinate your clinical check-ups?
              </h3>
              <p className="text-xs text-blue-100 max-w-2xl leading-relaxed">
                Log into our patient portal to access complete lab histories, live queue positions, digital medication stock reservations, and downloadable prescription sheets.
              </p>
            </div>
            
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              {userLoggedIn ? (
                <button
                  onClick={() => setCurrentTab('patient-dashboard')}
                  className="w-full sm:w-auto px-6 py-3 bg-[#ffff00] hover:bg-yellow-350 text-blue-900 font-bold rounded-xl transition-all font-sans text-center shadow-lg transform hover:scale-105 cursor-pointer"
                >
                  Access Patient Dashboard
                </button>
              ) : (
                <button
                  onClick={onBookClick}
                  className="w-full sm:w-auto px-6 py-3 bg-[#ffff00] hover:bg-yellow-350 text-blue-900 font-bold rounded-xl transition-all font-sans text-center shadow-lg transform hover:scale-105 cursor-pointer"
                >
                  Create Patient Account
                </button>
              )}
            </div>
          </div>
        </GlassCard>
      </section>

    </div>
  );
}
