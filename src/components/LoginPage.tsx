import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Key, ShieldAlert, BadgeCheck, Stethoscope } from 'lucide-react';
import { User, Role } from '../types';

interface LoginPageProps {
  onLoginSuccess: (user: User) => void;
  onCancel: () => void;
}

export function LoginPage({ onLoginSuccess, onCancel }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedRolePreset, setSelectedRolePreset] = useState<'patient' | 'admin'>('patient');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Please provide both email and password coordinates.');
      return;
    }

    // Role checking and authentication simulation
    if (email.toLowerCase() === 'john.kaira.zm@gmail.com' || email.toLowerCase() === 'john') {
      const patientUser: User = {
        id: 'pat-1',
        name: 'John Kaira',
        email: 'john.kaira.zm@gmail.com',
        role: 'patient',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'
      };
      onLoginSuccess(patientUser);
    } else if (email.toLowerCase() === 'admin@medflow.org' || email.toLowerCase() === 'admin') {
      const adminUser: User = {
        id: 'admin-001',
        name: 'Super Admin Office',
        email: 'admin@medflow.org',
        role: 'admin',
        avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150'
      };
      onLoginSuccess(adminUser);
    } else {
      setErrorMessage('Unrecognized user ID credentials. Try pre-set buttons below for instant role emulation.');
    }
  };

  const applyPreset = (preset: 'patient' | 'admin') => {
    setSelectedRolePreset(preset);
    if (preset === 'patient') {
      setEmail('john.kaira.zm@gmail.com');
      setPassword('patient123');
    } else {
      setEmail('admin@medflow.org');
      setPassword('admin123');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      
      {/* Absolute background with hospital overlay blur */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1600')",
        }}
      >
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" />
      </div>

      {/* Floating glass card */}
      <div className="relative z-10 w-full max-w-lg bg-slate-900/80 backdrop-blur-xl border border-[rgba(137,197,64,0.3)] rounded-3xl shadow-2xl overflow-hidden p-8 sm:p-10 space-y-6 animate-scale-up">
        
        {/* Header containing logo on top left */}
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            <div className="bg-[#89C540] p-2 rounded-xl text-slate-900 shadow-[0_0_15px_rgba(137,197,64,0.3)]">
              <Stethoscope className="w-5 h-5" />
            </div>
            <span className="font-serif text-lg font-bold text-white">
              Med<span className="text-[#89C540]">Flow</span>
            </span>
          </div>
          <button 
            onClick={onCancel}
            className="text-slate-400 hover:text-white text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors"
          >
            Cancel / Go Back
          </button>
        </div>

        {/* Title and subtitle */}
        <div className="text-left">
          <h2 className="font-serif text-2xl font-bold text-white tracking-tight">Clinical Staff & Patient Portal</h2>
          <p className="text-xs text-slate-400">Identify yourself to request active consultations, queue numbers, or drug registries.</p>
        </div>

        {errorMessage && (
          <div className="p-3.5 bg-rose-950/60 border border-rose-500/40 rounded-xl flex items-center gap-2 text-rose-300 text-xs text-left">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 tracking-wide uppercase mb-1.5">Email coordinate</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g., john.kaira.zm@gmail.com"
                className="w-full bg-slate-950/70 text-slate-100 text-sm pl-10 pr-4 py-3 rounded-xl border border-slate-700 focus:border-[#89C540] outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-semibold text-slate-300 tracking-wide uppercase">Password key</label>
              <a 
                href="#forgot-password" 
                onClick={(e) => { e.preventDefault(); alert('Please coordinate with clinical registration at help@medflow.org to reset passcode profiles.'); }}
                className="text-xs text-[#89C540] hover:text-yellow-300 transition-colors"
              >
                Forgot passcode?
              </a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-950/70 text-slate-100 text-sm pl-10 pr-10 py-3 rounded-xl border border-slate-700 focus:border-[#89C540] outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#FFEB3B] hover:bg-yellow-400 text-slate-900 font-bold rounded-xl transition-all shadow-lg hover:shadow-yellow-400/20 active:scale-95 font-sans"
          >
            Authenticate Profile
          </button>
        </form>

        {/* Emulation / Sandbox helper controls */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <p className="text-[11px] font-mono text-slate-500 text-left uppercase tracking-wider">PORTAL DEMONSTRATION ACCOUNTS</p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => applyPreset('patient')}
              className={`p-3 rounded-xl border text-left transition-all text-xs flex flex-col justify-between gap-1 ${
                selectedRolePreset === 'patient' 
                  ? 'bg-[#89C540]/10 border-[#89C540]/80 text-[#89C540]' 
                  : 'bg-slate-950/40 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-bold">Patient Role</span>
                <BadgeCheck className={`w-4 h-4 ${selectedRolePreset === 'patient' ? 'text-[#89C540]' : 'text-slate-600'}`} />
              </div>
              <span className="text-[10px] text-slate-400 font-mono">john.kaira.zm@gmail.com</span>
            </button>

            <button
              onClick={() => applyPreset('admin')}
              className={`p-3 rounded-xl border text-left transition-all text-xs flex flex-col justify-between gap-1 ${
                selectedRolePreset === 'admin' 
                  ? 'bg-yellow-400/10 border-yellow-400/80 text-yellow-300' 
                  : 'bg-slate-950/40 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-bold">Admin Role</span>
                <BadgeCheck className={`w-4 h-4 ${selectedRolePreset === 'admin' ? 'text-yellow-400' : 'text-slate-600'}`} />
              </div>
              <span className="text-[10px] text-slate-400 font-mono">admin@medflow.org</span>
            </button>
          </div>
          <p className="text-[10px] text-slate-400 text-center">
            Clicking these buttons pre-populates email and allows instant login emulation!
          </p>
        </div>

      </div>
    </div>
  );
}
