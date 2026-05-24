import { useState } from 'react';
import { Menu, X, ShieldAlert, UserCheck, LogOut, LogIn, Stethoscope, Activity, Bell, Trash2, Eye, BellOff } from 'lucide-react';
import { User, Notification } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  user: User | null;
  onLogout: () => void;
  onLoginClick: () => void;
  notifications?: Notification[];
  onMarkRead?: (id: string) => void;
  onMarkAllRead?: (email: string) => void;
  onClearAll?: (email: string) => void;
}

export function Navbar({ 
  currentTab, 
  setCurrentTab, 
  user, 
  onLogout, 
  onLoginClick,
  notifications = [],
  onMarkRead,
  onMarkAllRead,
  onClearAll
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'doctors', label: 'Our Doctors' },
    { id: 'services', label: 'Services & Pricing' },
    { id: 'pharmacy', label: 'Pharmacy Stock' },
  ];

  // Additional patient-only tabs
  const patientItems = [
    { id: 'patient-dashboard', label: 'My Dashboard' },
    { id: 'book-appointment', label: 'Book Appointment' },
    { id: 'schedule-checkup', label: 'Schedule Check-Up' },
    { id: 'prescriptions', label: 'My Prescriptions' },
    { id: 'support', label: 'Online Support' },
  ];

  // Admin-only tabs
  const adminItems = [
    { id: 'admin-dashboard', label: 'Admin Panel Office' }
  ];

  const handleTabClick = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/10 backdrop-blur-md border-b border-white/20 px-4 py-3 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo and Brand */}
        <div 
          onClick={() => handleTabClick('home')} 
          className="flex items-center space-x-2 cursor-pointer group"
          id="nav-logo-container"
        >
          <div className="bg-[#8ade4f] p-2 rounded-xl shadow-[0_0_15px_rgba(138,222,79,0.3)] group-hover:scale-105 transition-all text-slate-900">
            <Stethoscope className="w-5 h-5 font-bold" />
          </div>
          <span className="font-serif text-xl font-bold tracking-tight text-white group-hover:text-yellow-300 transition-colors">
            Med<span className="text-[#8ade4f]">Flow</span> Hospital
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                currentTab === item.id 
                  ? 'bg-[#8ade4f]/25 text-white border border-[#8ade4f]/50 shadow-[0_0_8px_rgba(138,222,79,0.25)]' 
                  : 'text-white/80 hover:text-white hover:bg-white/15'
              }`}
            >
              {item.label}
            </button>
          ))}

          {/* Patient Tabs (when logged in as patient) */}
          {user && user.role === 'patient' && (
            <>
              <div className="w-[1px] h-6 bg-white/20 mx-2" />
              {patientItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentTab === item.id 
                      ? 'bg-[#8ade4f]/25 text-white border border-[#8ade4f]/50 shadow-[0_0_8px_rgba(138,222,79,0.25)]' 
                      : 'text-white/80 hover:text-[#ffff00] hover:bg-white/15'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </>
          )}

          {/* Admin Tabs */}
          {user && user.role === 'admin' && (
            <>
              <div className="w-[1px] h-6 bg-white/20 mx-2" />
              {adminItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentTab === item.id 
                      ? 'bg-[#ffff00]/20 text-yellow-300 border border-[#ffff00]/30' 
                      : 'text-yellow-350 hover:text-yellow-250 hover:bg-white/15'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </>
          )}

          {/* Emergency Button */}
          <button
            onClick={() => handleTabClick('emergency')}
            className="ml-4 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold tracking-wider uppercase rounded-full border border-rose-400/40 shadow-lg hover:shadow-rose-600/20 hover:scale-105 transition-all flex items-center gap-1.5 animate-pulse"
          >
            <Activity className="w-3.5 h-3.5" />
            Emergency
          </button>
        </div>

        {/* Desktop Login Action */}
        <div className="hidden lg:flex items-center space-x-3">
          
          {/* Notification bell trigger for logged-in Patient Portal */}
          {user && user.role === 'patient' && (
            <div className="relative animate-fade-in" id="navbar-notification-dropdown">
              <button
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className={`p-2.5 rounded-xl text-white transition-all border outline-none cursor-pointer flex items-center justify-center relative ${
                  notifDropdownOpen
                    ? 'bg-[#8ade4f]/20 border-[#8ade4f] text-[#8ade4f]'
                    : 'bg-white/10 border-white/10 hover:bg-white/15'
                }`}
                title="Notifications"
              >
                <Bell className={`w-4 h-4 ${notifications.filter(n => n.patientEmail === user.email && !n.read).length > 0 ? 'animate-bounce' : ''}`} />
                {notifications.filter(n => n.patientEmail === user.email && !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 text-slate-900 font-bold text-[9px] rounded-full flex items-center justify-center border-2 border-slate-900 shadow-md">
                    {notifications.filter(n => n.patientEmail === user.email && !n.read).length}
                  </span>
                )}
              </button>

              {/* Float popover glass panel */}
              {notifDropdownOpen && (
                <div className="absolute right-0 mt-3.5 w-80 bg-slate-900 border border-white/20 rounded-2xl shadow-xl z-50 p-4 text-left overflow-hidden animate-fade-in" style={{ transformOrigin: 'top right' }}>
                  {/* Popover Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/15">
                    <div className="flex items-center gap-1.5">
                      <span className="font-serif font-bold text-white text-xs">Alert Registry</span>
                      <span className="text-[10px] bg-[#8ade4f]/20 text-[#8ade4f] px-1.5 py-0.5 rounded font-mono font-bold">
                        {notifications.filter(n => n.patientEmail === user.email).length} Total
                      </span>
                    </div>
                    {notifications.filter(n => n.patientEmail === user.email && !n.read).length > 0 && onMarkAllRead && (
                      <button
                        onClick={() => {
                          onMarkAllRead(user.email);
                        }}
                        className="text-[10px] text-yellow-300 hover:text-white transition-all font-mono font-semibold cursor-pointer"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  {/* Scrollable Alert Body list */}
                  <div className="max-h-64 overflow-y-auto space-y-2.5 py-3 scrollbar-none">
                    {notifications.filter(n => n.patientEmail === user.email).length === 0 ? (
                      <div className="py-6 text-center space-y-1">
                        <BellOff className="w-8 h-8 text-white/20 mx-auto" />
                        <p className="text-[11px] text-slate-400 italic">No direct notifications on record.</p>
                      </div>
                    ) : (
                      notifications
                        .filter(n => n.patientEmail === user.email)
                        .map((notif) => (
                          <div 
                            key={notif.id}
                            className={`p-2.5 rounded-xl border transition-all text-xs flex gap-2 relative ${
                              notif.read
                                ? 'bg-white/5 border-transparent'
                                : 'bg-[#8ade4f]/5 border-[#8ade4f]/30 ring-1 ring-[#8ade4f]/10'
                            }`}
                          >
                            {/* Type color dot */}
                            <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                              notif.type === 'success' ? 'bg-[#8ade4f]' :
                              notif.type === 'warning' ? 'bg-yellow-400' :
                              notif.type === 'alert' ? 'bg-[#ff5555] animate-pulse' :
                              'bg-indigo-400'
                            }`} />

                            <div className="space-y-0.5 flex-grow">
                              <div className="flex justify-between items-start">
                                <span className={`font-bold font-serif ${notif.read ? 'text-white/80' : 'text-white'}`}>{notif.title}</span>
                                {!notif.read && onMarkRead && (
                                  <button
                                    onClick={() => onMarkRead(notif.id)}
                                    className="text-[9px] text-[#8ade4f] hover:text-[#ffff00] flex items-center font-mono cursor-pointer shrink-0 ml-1 bg-white/5 px-1 py-0.5 rounded"
                                    title="Mark read"
                                  >
                                    Read
                                  </button>
                                )}
                              </div>
                              <p className="text-[10.5px] leading-relaxed text-slate-300">{notif.message}</p>
                              <span className="block text-[9px] text-slate-500 font-mono font-medium pt-0.5">
                                {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                          </div>
                        ))
                    )}
                  </div>

                  {/* Popover Footer actions */}
                  {notifications.filter(n => n.patientEmail === user.email).length > 0 && onClearAll && (
                    <button
                      onClick={() => {
                        onClearAll(user.email);
                        setNotifDropdownOpen(false);
                      }}
                      className="w-full pt-2.5 border-t border-white/10 text-center text-[10px] text-rose-400 hover:text-rose-300 flex items-center justify-center gap-1 font-mono cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Clear Archive
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {user ? (
            <div className="flex items-center space-x-3 bg-white/10 px-4 py-1.5 rounded-xl border border-white/20">
              <div className="flex flex-col text-right">
                <span className="text-sm font-semibold text-white">{user.name}</span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#8ade4f]">{user.role}</span>
              </div>
              <button 
                onClick={onLogout}
                className="p-1.5 rounded-lg text-rose-300 hover:text-white hover:bg-rose-900/40 transition-all cursor-pointer"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-[#ffff00] text-blue-900 font-bold rounded-full hover:scale-105 transition-all shadow-md hover:shadow-yellow-400/25 font-sans cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              Patient Login
            </button>
          )}
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="lg:hidden mt-3 p-4 bg-[#112240]/95 backdrop-blur-xl border border-white/20 rounded-xl space-y-2 flex flex-col">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                currentTab === item.id 
                  ? 'bg-[#8ade4f]/20 text-[#8ade4f] border-l-4 border-[#8ade4f]' 
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              {item.label}
            </button>
          ))}

          {/* Patient Tabs in Mobile */}
          {user && user.role === 'patient' && (
            <>
              <div className="text-[10px] uppercase font-bold tracking-wider text-white/50 pt-2 px-4">Patient Portal</div>
              {patientItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    currentTab === item.id 
                      ? 'bg-[#8ade4f]/20 text-[#8ade4f] border-l-4 border-[#8ade4f]' 
                      : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </>
          )}

          {/* Admin Tabs in Mobile */}
          {user && user.role === 'admin' && (
            <>
              <div className="text-[10px] uppercase font-bold tracking-wider text-yellow-500/80 pt-2 px-4">Administrative Suite</div>
              {adminItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    currentTab === item.id 
                      ? 'bg-[#ffff00]/20 text-yellow-350 border-l-4 border-[#ffff00]' 
                      : 'text-yellow-400 hover:bg-white/15'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </>
          )}

          {/* Mobile Emergency Button */}
          <button
            onClick={() => handleTabClick('emergency')}
            className="w-full mt-2 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg uppercase tracking-wider text-xs border border-rose-400/40 text-center flex items-center justify-center gap-2"
          >
            <Activity className="w-4 h-4 animate-bounce" />
            24/7 Emergency Line
          </button>

          {/* Mobile Login Action */}
          <div className="pt-4 border-t border-white/10 mt-2">
            {user ? (
              <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white">{user.name}</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#8ade4f]">{user.role}</span>
                 </div>
                <button 
                  onClick={() => { onLogout(); setMobileOpen(false); }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-900/50 hover:bg-rose-800 text-rose-300 rounded-lg text-xs font-semibold cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => { onLoginClick(); setMobileOpen(false); }}
                className="w-full py-3 bg-[#ffff00] text-blue-900 font-bold rounded-xl flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                Patient Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
