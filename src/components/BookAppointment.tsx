import React, { useState } from 'react';
import { Search, Star, Calendar, Clock, BadgeAlert, CheckCircle, ArrowLeft, Stethoscope, ArrowUpDown, DollarSign, SlidersHorizontal, RefreshCw } from 'lucide-react';
import { Doctor, Appointment } from '../types';
import { GlassCard } from './GlassCard';

interface BookAppointmentProps {
  doctors: Doctor[];
  specialties: string[];
  patientEmail: string;
  patientName: string;
  onBookSuccess: (newApp: Appointment) => void;
  onBackToDashboard: () => void;
}

export function BookAppointment({
  doctors,
  specialties,
  patientEmail,
  patientName,
  onBookSuccess,
  onBackToDashboard
}: BookAppointmentProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [feeRange, setFeeRange] = useState('All'); // 'All' | 'Under100' | 'Under150' | '150Plus'
  const [experienceLevel, setExperienceLevel] = useState('All'); // 'All' | '5Plus' | '10Plus' | '15Plus'
  const [sortBy, setSortBy] = useState('rating'); // 'rating' | 'experience' | 'feeAsc' | 'feeDesc'
  
  // Active Booking state
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [bookingDate, setBookingDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [patientNotes, setPatientNotes] = useState('');
  const [errorText, setErrorText] = useState('');
  
  // Successful checkout banner state
  const [justBookedApp, setJustBookedApp] = useState<Appointment | null>(null);

  // Advanced search, filter & sort doctors
  const filteredDoctors = doctors.filter(doc => {
    // 1. Specialty filter
    const matchesSpecialty = selectedSpecialty === 'All' || doc.specialty === selectedSpecialty;
    
    // 2. Query search matches name, specialty department, or biography context
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) || 
      doc.bio.toLowerCase().includes(searchQuery.toLowerCase());
      
    // 3. Consultation Fee tier filter
    let matchesFee = true;
    if (feeRange === 'Under100') matchesFee = doc.consultationFee < 1927;
    else if (feeRange === 'Under155') matchesFee = doc.consultationFee <= 2890; // matches <= $150
    else if (feeRange === '150Plus') matchesFee = doc.consultationFee >= 2890; // matches >= $150

    // 4. Clinical experience level filter
    let matchesExperience = true;
    if (experienceLevel === '5Plus') matchesExperience = doc.experience >= 5;
    else if (experienceLevel === '10Plus') matchesExperience = doc.experience >= 10;
    else if (experienceLevel === '15Plus') matchesExperience = doc.experience >= 15;

    return matchesSpecialty && matchesSearch && matchesFee && matchesExperience;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'experience') return b.experience - a.experience;
    if (sortBy === 'feeAsc') return a.consultationFee - b.consultationFee;
    if (sortBy === 'feeDesc') return b.consultationFee - a.consultationFee;
    return 0;
  });

  const getSpecialtyCount = (spec: string) => {
    if (spec === 'All') return doctors.length;
    return doctors.filter(d => d.specialty === spec).length;
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedSpecialty('All');
    setFeeRange('All');
    setExperienceLevel('All');
    setSortBy('rating');
  };

  const timeSlots = [
    '09:00 AM - 09:30 AM',
    '10:00 AM - 10:30 AM',
    '11:30 AM - 12:00 PM',
    '02:00 PM - 02:30 PM',
    '03:30 PM - 04:00 PM',
    '04:30 PM - 05:00 PM'
  ];

  const handleStartBooking = (doc: Doctor) => {
    setSelectedDoctor(doc);
    setBookingDate('');
    setSelectedTimeSlot('');
    setPatientNotes('');
    setErrorText('');
    setJustBookedApp(null);
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText('');

    if (!bookingDate) {
      setErrorText('Please select an outpatient appointment date.');
      return;
    }
    if (!selectedTimeSlot) {
      setErrorText('Please select an available daily time slot.');
      return;
    }
    if (!selectedDoctor) return;

    // Create a new simulated scheduled appointment
    const newAppointment: Appointment = {
      id: `app-${Math.floor(1000 + Math.random() * 9000)}`,
      patientName: patientName || 'John Kaira',
      patientEmail: patientEmail || 'john.kaira.zm@gmail.com',
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      date: bookingDate,
      timeSlot: selectedTimeSlot,
      type: 'Consultation',
      status: 'Scheduled',
      notes: patientNotes,
      queueNo: Math.floor(12 + Math.random() * 20)
    };

    onBookSuccess(newAppointment);
    setJustBookedApp(newAppointment);
  };

  const handleReset = () => {
    setSelectedDoctor(null);
    setJustBookedApp(null);
    setBookingDate('');
    setSelectedTimeSlot('');
    setPatientNotes('');
  };

  // 1. Just booked confirmation state
  if (justBookedApp) {
    return (
      <div className="max-w-xl mx-auto py-8 text-center animate-fade-in" id="booking-confirmation-screen">
        <GlassCard className="p-8 space-y-6 border-2 border-[#8ade4f]/40">
          <div className="flex justify-center text-[#8ade4f]">
            <CheckCircle className="w-16 h-16 animate-bounce" />
          </div>

          <div className="space-y-2">
            <h2 className="font-serif text-2xl font-bold text-white">Consultation Booked Successfully!</h2>
            <p className="text-xs text-slate-350">
              Your consultation credentials have been logged in the secure MedFlow registry cache and a notification has been sent.
            </p>
          </div>

          <div className="p-4 bg-slate-950/60 rounded-xl border border-white/10 text-left space-y-2 text-xs">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-slate-400 font-mono">BOOKING ID:</span>
              <span className="text-white font-mono font-bold">{justBookedApp.id}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-slate-400">Scheduled Patient:</span>
              <span className="text-white font-medium">{justBookedApp.patientName}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">Clinician Specialist:</span>
              <span className="text-[#8ade4f] font-bold">{justBookedApp.doctorName}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">Clinical Specialty:</span>
              <span className="text-slate-200">{justBookedApp.specialty}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">Timeslot Coordinate:</span>
              <span className="text-white font-semibold">{justBookedApp.date} @ {justBookedApp.timeSlot}</span>
            </div>

            <div className="flex justify-between pt-2 border-t border-white/5">
              <span className="text-slate-400 font-bold">Estimated Queue Position:</span>
              <span className="text-yellow-300 font-bold font-mono">Position #{justBookedApp.queueNo}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="flex-1 py-3 bg-white/10 hover:bg-white/15 text-white font-medium rounded-xl text-xs transition-colors cursor-pointer"
            >
              Book Another Session
            </button>
            <button
              onClick={onBackToDashboard}
              className="flex-1 py-3 bg-[#ffff00] hover:bg-yellow-350 text-slate-900 font-bold rounded-xl text-xs shadow-md transition-all font-sans cursor-pointer"
            >
              Return to Dashboard
            </button>
          </div>
        </GlassCard>
      </div>
    );
  }

  // 2. Booking active submission state
  if (selectedDoctor) {
    return (
      <div className="max-w-2xl mx-auto py-8 text-left animate-fade-in" id="booking-checkout-form">
        <button 
          onClick={() => setSelectedDoctor(null)}
          className="inline-flex items-center gap-1.5 text-xs text-[#8ade4f] hover:text-[#ffff00] mb-6 font-bold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Change Doctor / Go Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Doctor Brief Card */}
          <div className="md:col-span-4">
            <GlassCard className="overflow-hidden">
              <img
                src={selectedDoctor.photo}
                alt={selectedDoctor.name}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-40 object-cover object-top"
              />
              <div className="p-4 space-y-2">
                <h4 className="text-sm font-bold text-white font-serif">{selectedDoctor.name}</h4>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#8ade4f]">{selectedDoctor.specialty}</p>
                <div className="flex items-center gap-1 text-xs text-yellow-300">
                  <Star className="w-3.5 h-3.5 fill-[#ffff00] stroke-none" />
                  <span>{selectedDoctor.rating} rating</span>
                </div>
                <div className="pt-2 border-t border-white/10 text-[10px] font-mono text-slate-300">
                  <span className="block font-bold text-[#8ade4f] mb-0.5">Available slots:</span>
                  {selectedDoctor.availability.join(', ')}
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Timeslot Selection Form */}
          <div className="md:col-span-8">
            <GlassCard className="p-6">
              <h3 className="font-serif text-lg font-bold text-white mb-4">Select Consultation Slot</h3>
              
              {errorText && (
                <div className="p-3 bg-rose-950/40 border border-rose-500/40 text-rose-300 rounded-xl text-xs mb-4 flex items-center gap-1.5 animate-shake">
                  <BadgeAlert className="w-4 h-4 shrink-0" />
                  <span>{errorText}</span>
                </div>
              )}

              <form onSubmit={handleSubmitBooking} className="space-y-4">
                <div className="text-left">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    1. Choose Consultation Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      min="2026-05-24"
                      className="w-full bg-slate-950/70 text-slate-100 text-sm pl-4 pr-4 py-3 rounded-xl border border-white/10 outline-none focus:border-[#8ade4f] transition-colors"
                    />
                  </div>
                </div>

                <div className="text-left">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    2. Select Daily Hour Range
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`p-2.5 rounded-xl text-[11px] font-mono font-bold border transition-all text-center cursor-pointer ${
                          selectedTimeSlot === slot
                            ? 'bg-[#8ade4f]/20 text-[#8ade4f] border-[#8ade4f] shadow-[0_0_12px_rgba(138,222,79,0.2)]'
                            : 'bg-white/5 text-slate-300 border-white/10 hover:border-white/20'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-left">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 font-sans">
                    3. Purpose of Clinical visit (Notes / Symptoms)
                  </label>
                  <textarea
                    rows={2}
                    value={patientNotes}
                    onChange={(e) => setPatientNotes(e.target.value)}
                    placeholder="e.g., Routine cardiologist feedback test review or persistent chest discomfort history..."
                    className="w-full bg-slate-950/70 text-slate-300 text-xs p-3 rounded-xl border border-white/10 outline-none focus:border-[#8ade4f]"
                  />
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs text-slate-300">
                  <span>Consultation Care Fee:</span>
                  <span className="text-lg font-bold text-yellow-300 font-serif">K{selectedDoctor.consultationFee}</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#ffff00] hover:bg-yellow-350 text-slate-900 font-bold rounded-xl transition-all shadow-lg hover:shadow-yellow-400/20 active:scale-95 text-xs uppercase tracking-wider font-sans cursor-pointer"
                >
                  Confirm Registry Booking
                </button>
              </form>
            </GlassCard>
          </div>
        </div>
      </div>
    );
  }

  // 3. Main lookup directories
  return (
    <div className="space-y-8 pb-12 animate-fade-in" id="book-consultation-directory">
      <div className="text-left space-y-2">
        <h1 className="font-serif text-3xl font-bold text-white">Book Specialist Consultation</h1>
        <p className="text-xs text-slate-350">
          Query specific medical department heads, check credentials, select hours, and track queue updates.
        </p>
      </div>

      {/* Advanced Filter Workspace */}
      <GlassCard className="p-6 space-y-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          
          {/* Main search bar */}
          <div className="relative w-full lg:flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search doctor name, department, credentials, residency..."
              className="w-full bg-slate-950/50 text-white placeholder-white/50 text-xs pl-10 pr-4 py-3 rounded-xl border border-white/10 outline-none focus:border-[#8ade4f]/80 focus:bg-slate-950/80 transition-all shadow-inner"
            />
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-white/50" />
            
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3 text-xs bg-white/10 hover:bg-white/20 text-white px-1.5 py-0.5 rounded cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Sort control */}
          <div className="flex gap-2 items-center w-full lg:w-auto justify-end">
            <span className="text-xs text-slate-300 font-mono flex items-center gap-1 shrink-0">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#8ade4f]" />
              Sort By:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-950/80 text-white text-xs px-3 py-2.5 rounded-xl border border-white/15 outline-none focus:border-[#8ade4f]"
            >
              <option value="rating" className="bg-blue-950 text-white">Highest Rated First</option>
              <option value="experience" className="bg-blue-950 text-white">Most Experienced First</option>
              <option value="feeAsc" className="bg-blue-950 text-white">Fee: Low to High</option>
              <option value="feeDesc" className="bg-blue-950 text-white">Fee: High to Low</option>
            </select>
          </div>
        </div>

        {/* Specialty filter tags & Count indicators */}
        <div className="space-y-2 text-left">
          <label className="block text-[10px] text-white/60 uppercase font-mono tracking-widest font-bold">
            Select Medical Specialty Department
          </label>
          <div className="flex flex-wrap gap-2">
            {specialties.map((spec) => {
              const count = getSpecialtyCount(spec);
              const isSelected = selectedSpecialty === spec;
              return (
                <button
                  key={spec}
                  onClick={() => setSelectedSpecialty(spec)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#8ade4f] text-slate-950 font-bold shadow-[0_4px_12px_rgba(138,222,79,0.35)]'
                      : 'bg-white/10 text-white hover:bg-white/15 border border-white/5'
                  }`}
                >
                  <span>{spec}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold ${
                    isSelected ? 'bg-slate-900/20 text-slate-950' : 'bg-white/15 text-white/70'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary multi-criteria filter toggles line */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-left">
          
          {/* Fee Range Filters */}
          <div className="space-y-2">
            <span className="text-[10px] text-white/60 uppercase font-mono tracking-widest font-bold flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-[#8ade4f]" />
              Consultation Fee Range
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { id: 'All', label: 'All Fees' },
                { id: 'Under100', label: '< K1927' },
                { id: 'Under155', label: '≤ K2890' },
                { id: '150Plus', label: '≥ K2890' },
              ].map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setFeeRange(tier.id)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                    feeRange === tier.id
                      ? 'bg-white/20 text-white border-white/30'
                      : 'bg-white/5 text-white/70 border-transparent hover:bg-white/10'
                  }`}
                >
                  {tier.label}
                </button>
              ))}
            </div>
          </div>

          {/* Experience level triggers */}
          <div className="space-y-2">
            <span className="text-[10px] text-white/60 uppercase font-mono tracking-widest font-bold flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#8ade4f]" />
              Minimum Experience
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { id: 'All', label: 'All Experience' },
                { id: '5Plus', label: '5+ Years' },
                { id: '10Plus', label: '10+ Years' },
                { id: '15Plus', label: '15+ Years' },
              ].map((exp) => (
                <button
                  key={exp.id}
                  type="button"
                  onClick={() => setExperienceLevel(exp.id)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                    experienceLevel === exp.id
                      ? 'bg-white/20 text-white border-white/30'
                      : 'bg-white/5 text-white/70 border-transparent hover:bg-white/10'
                  }`}
                >
                  {exp.label}
                </button>
              ))}
            </div>
          </div>

          {/* Diagnostics counts and reset filters */}
          <div className="flex flex-col justify-end">
            <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-2.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300">Filtered Results:</span>
                <span className="font-bold text-[#8ade4f] font-mono">{filteredDoctors.length} Doctors</span>
              </div>
              
              {(searchQuery || selectedSpecialty !== 'All' || feeRange !== 'All' || experienceLevel !== 'All') && (
                <button
                  onClick={handleResetFilters}
                  className="w-full py-1.5 bg-[#ffff00]/20 hover:bg-[#ffff00]/30 text-yellow-300 font-bold rounded-lg text-[10px] uppercase font-mono tracking-wider flex items-center justify-center gap-1 transition-all cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3 animate-spin duration-1000" />
                  Reset Active Filters
                </button>
              )}
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Active Doctors list grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredDoctors.map((doc) => (
          <GlassCard key={doc.id} className="overflow-hidden flex flex-col justify-between group h-full">
            <div className="relative overflow-hidden">
              <img
                src={doc.photo}
                alt={doc.name}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-48 object-cover object-top brightness-90 group-hover:scale-105 transition-transform duration-500 border-b border-white/10"
              />
              <span className="absolute top-2 right-2 bg-slate-950/90 text-yellow-300 font-bold text-[10px] px-2.5 py-1 rounded-full border border-yellow-400/25 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-[#ffff00] stroke-none" />
                {doc.rating}
              </span>
            </div>

            <div className="p-5 space-y-3 flex-grow flex flex-col justify-between text-left">
              <div className="space-y-1.5 flex-grow">
                <div>
                  <h3 className="text-base font-bold text-white font-serif">{doc.name}</h3>
                  <span className="text-[10px] uppercase font-bold text-[#8ade4f] tracking-wider font-mono block">
                    {doc.specialty} Department
                  </span>
                </div>

                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {doc.bio}
                </p>
              </div>

              <div className="space-y-3 pt-3 mt-2 border-t border-white/10">
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span className="font-mono">{doc.experience} Years Exp</span>
                  <span className="text-slate-200">Consultation Fee: <b className="text-[#8ade4f]">K{doc.consultationFee}</b></span>
                </div>

                <div className="text-[10px] text-slate-400 bg-white/5 border border-white/5 px-2 py-1 rounded font-mono">
                  Available: {doc.availability.join(', ')}
                </div>

                <button
                  onClick={() => handleStartBooking(doc)}
                  className="w-full py-2.5 bg-[#ffff00] hover:bg-yellow-350 text-slate-900 font-bold rounded-xl text-xs flex justify-center items-center gap-1.5 shadow transform hover:scale-[1.02] active:scale-[0.98] transition-all font-sans cursor-pointer animate-fade-in"
                >
                  <Calendar className="w-4 h-4" />
                  Request Booking Date
                </button>
              </div>
            </div>
          </GlassCard>
        ))}

        {filteredDoctors.length === 0 && (
          <div className="col-span-1 md:col-span-3 py-12 bg-white/5 rounded-2xl border border-dashed border-white/10 text-center space-y-2">
            <p className="text-sm text-slate-400 italic">No specialist records matched your active search query.</p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-1.5 bg-[#ffff00] hover:bg-yellow-350 text-slate-900 font-bold text-xs rounded-xl cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
