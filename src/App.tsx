import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';
import { PatientDashboard } from './components/PatientDashboard';
import { BookAppointment } from './components/BookAppointment';
import { ScheduleCheckUp } from './components/ScheduleCheckUp';
import { OnlineSupport } from './components/OnlineSupport';
import { PrescriptionPage } from './components/PrescriptionPage';
import { PharmacyStock } from './components/PharmacyStock';
import { ServicesPricing } from './components/ServicesPricing';
import { DoctorsPage } from './components/DoctorsPage';
import { EmergencyPage } from './components/EmergencyPage';
import { AdminDashboard } from './components/AdminDashboard';

import { 
  INITIAL_DOCTORS, 
  INITIAL_SERVICES, 
  INITIAL_PHARMACY, 
  INITIAL_PRESCRIPTIONS, 
  INITIAL_PATIENTS,
  TESTIMONIALS,
  SPECIALTIES
} from './data';
import { Doctor, Appointment, Prescription, MedicationStock, PatientRecord, MedicineRequest, User, Notification } from './types';
import { Bell } from 'lucide-react';

export default function App() {
  // User Authentication State
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('medflow_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [currentTab, setCurrentTab] = useState<string>(() => {
    try {
      const savedUser = localStorage.getItem('medflow_user');
      if (savedUser) {
        const u = JSON.parse(savedUser);
        return u.role === 'admin' ? 'admin-dashboard' : 'patient-dashboard';
      }
      return 'home';
    } catch {
      return 'home';
    }
  });

  const [showLoginModal, setShowLoginModal] = useState(false);

  // Core single-source-of-truth states
  const [doctors, setDoctors] = useState<Doctor[]>(() => {
    const saved = localStorage.getItem('medflow_doctors');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Force update to diverse photographic profiles if any old doctor photos remain cached
        if (parsed.some((d: any) => d.photo && d.photo.includes('1559839734-2b71ea197ec2'))) {
          return INITIAL_DOCTORS;
        }
        return parsed;
      } catch {
        return INITIAL_DOCTORS;
      }
    }
    return INITIAL_DOCTORS;
  });

  const [services] = useState<typeof INITIAL_SERVICES>(INITIAL_SERVICES);

  const [pharmacyItems, setPharmacyItems] = useState<MedicationStock[]>(() => {
    const saved = localStorage.getItem('medflow_pharmacy');
    return saved ? JSON.parse(saved) : INITIAL_PHARMACY;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('medflow_appointments');
    if (saved) return JSON.parse(saved);
    
    // Default initial appointments mapped to John Kaira
    return [
      {
        id: 'app-9020',
        patientName: 'John Kaira',
        patientEmail: 'john.kaira.zm@gmail.com',
        doctorId: 'doc-1',
        doctorName: 'Dr. Evelyn Carter',
        specialty: 'Cardiology',
        date: '2026-05-28',
        timeSlot: '10:00 AM - 10:30 AM',
        type: 'Consultation',
        status: 'Scheduled',
        notes: 'Follow up coronary feedback review and diagnostic updates.',
        queueNo: 15
      }
    ];
  });

  const [prescriptions, setPrescriptions] = useState<Prescription[]>(() => {
    const saved = localStorage.getItem('medflow_prescriptions');
    return saved ? JSON.parse(saved) : INITIAL_PRESCRIPTIONS;
  });

  const [patientRecords, setPatientRecords] = useState<PatientRecord[]>(() => {
    const saved = localStorage.getItem('medflow_patients');
    return saved ? JSON.parse(saved) : INITIAL_PATIENTS;
  });

  const [medicineRequests, setMedicineRequests] = useState<MedicineRequest[]>(() => {
    const saved = localStorage.getItem('medflow_med_requests');
    if (saved) return JSON.parse(saved);
    
    return [
      {
        id: 'req-302',
        medicineName: 'Atorvastatin 20mg',
        patientName: 'John Kaira',
        email: 'john.kaira.zm@gmail.com',
        requestedQty: 2,
        status: 'Approved',
        date: '2026-05-20'
      },
      {
        id: 'req-303',
        medicineName: 'Omeprazole 20mg',
        patientName: 'John Kaira',
        email: 'john.kaira.zm@gmail.com',
        requestedQty: 1,
        status: 'Pending',
        date: '2026-05-23'
      }
    ];
  });

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    try {
      const saved = localStorage.getItem('medflow_notifications');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'notif-1',
        patientEmail: 'john.kaira.zm@gmail.com',
        title: 'Central Registry Active',
        message: 'Your cryptographic clinical profile has been loaded in the secure database.',
        type: 'info',
        createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
        read: false
      },
      {
        id: 'notif-2',
        patientEmail: 'john.kaira.zm@gmail.com',
        title: 'Atorvastatin Refill Ready',
        message: 'Your prescribed box count request has been approved by the on-duty pharmacist.',
        type: 'success',
        createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
        read: true
      }
    ];
  });

  const [activeToast, setActiveToast] = useState<{ id: string; title: string; message: string; type: 'info' | 'success' | 'warning' | 'alert' } | null>(null);

  // LocalStorage synchronizer
  useEffect(() => {
    localStorage.setItem('medflow_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('medflow_doctors', JSON.stringify(doctors));
  }, [doctors]);

  useEffect(() => {
    localStorage.setItem('medflow_pharmacy', JSON.stringify(pharmacyItems));
  }, [pharmacyItems]);

  useEffect(() => {
    localStorage.setItem('medflow_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('medflow_prescriptions', JSON.stringify(prescriptions));
  }, [prescriptions]);

  useEffect(() => {
    localStorage.setItem('medflow_patients', JSON.stringify(patientRecords));
  }, [patientRecords]);

  useEffect(() => {
    localStorage.setItem('medflow_med_requests', JSON.stringify(medicineRequests));
  }, [medicineRequests]);

  // Real-time notification helper
  const addNotificationAndToast = (title: string, message: string, type: 'info' | 'success' | 'warning' | 'alert', targetEmail: string) => {
    const newNotif: Notification = {
      id: `notif-${Math.floor(1000 + Math.random() * 9000)}`,
      patientEmail: targetEmail,
      title,
      message,
      type,
      createdAt: new Date().toISOString(),
      read: false
    };
    
    setNotifications(prev => [newNotif, ...prev]);
    
    // Auto trigger in-app banner toast if it relates to current viewer
    if (user && user.email === targetEmail) {
      setActiveToast({
        id: newNotif.id,
        title,
        message,
        type
      });
      // Auto dismiss banner after 5.5s
      setTimeout(() => {
        setActiveToast(current => current?.id === newNotif.id ? null : current);
      }, 5500);
    }
  };

  const handleMarkNotificationRead = (notifId: string) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, read: true } : n));
  };

  const handleMarkAllNotificationsRead = (email: string) => {
    setNotifications(prev => prev.map(n => n.patientEmail === email ? { ...n, read: true } : n));
  };

  const handleClearNotifications = (email: string) => {
    setNotifications(prev => prev.filter(n => n.patientEmail !== email));
  };

  // Helper for admin changes (Rescheduling and Doctor tardiness)
  const handleRescheduleAppointment = (appId: string, newDate: string, newTimeSlot: string) => {
    let targetPatientEmail = '';
    let doctorName = '';
    setAppointments(prev => prev.map(a => {
      if (a.id === appId) {
        targetPatientEmail = a.patientEmail;
        doctorName = a.doctorName;
        return { ...a, date: newDate, timeSlot: newTimeSlot };
      }
      return a;
    }));
    
    if (targetPatientEmail) {
      addNotificationAndToast(
        'Appointment Rescheduled',
        `Your consultation session with ${doctorName} has been rescheduled to ${newDate} @ ${newTimeSlot}.`,
        'info',
        targetPatientEmail
      );
    }
  };

  const handleDelayAppointmentDoc = (appId: string, delayMinutes: number) => {
    const victim = appointments.find(a => a.id === appId);
    if (victim) {
      addNotificationAndToast(
        'Doctor Running Late',
        `Your on-duty specialist ${victim.doctorName} is running late by ${delayMinutes} minutes due to an emergency procedure. Thank you for your patience.`,
        'alert',
        victim.patientEmail
      );
    }
  };

  // Auth Operations
  const handleLoginSuccess = (authenticatedUser: User) => {
    setUser(authenticatedUser);
    localStorage.setItem('medflow_user', JSON.stringify(authenticatedUser));
    setShowLoginModal(false);

    // Direct redirection matching authenticated role
    if (authenticatedUser.role === 'admin') {
      setCurrentTab('admin-dashboard');
    } else {
      setCurrentTab('patient-dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('medflow_user');
    setCurrentTab('home');
  };

  // State Updates from Components

  // 1. Onboarding new Doctor
  const handleAddDoctor = (newDoc: Doctor) => {
    setDoctors(prev => [newDoc, ...prev]);
  };

  const handleUpdateDoctorFee = (docId: string, newFee: number) => {
    setDoctors(prev => prev.map(d => d.id === docId ? { ...d, consultationFee: newFee } : d));
  };

  // 2. Appointment approvals
  const handleApproveAppointment = (appId: string) => {
    const target = appointments.find(a => a.id === appId);
    setAppointments(prev => prev.map(a => a.id === appId ? { ...a, status: 'Completed' } : a));
    if (target) {
      addNotificationAndToast(
        'Outpatient Visit Completed',
        `Your clinical consultation session with ${target.doctorName} was marked as Completed, and clinical outcome metrics have been finalized.`,
        'success',
        target.patientEmail
      );
    }
  };

  const handleDeclineAppointment = (appId: string) => {
    const target = appointments.find(a => a.id === appId);
    setAppointments(prev => prev.map(a => a.id === appId ? { ...a, status: 'Cancelled' } : a));
    if (target) {
      addNotificationAndToast(
        'Appointment Cancelled',
        `Your scheduled consultation with ${target.doctorName} on ${target.date} was marked as Cancelled.`,
        'warning',
        target.patientEmail
      );
    }
  };

  // 3. Complete new Appointment Booking
  const handleBookAppointmentSuccess = (newApp: Appointment) => {
    setAppointments(prev => [newApp, ...prev]);
    
    // Add event log index dynamically inside the medical records
    setPatientRecords(prev => prev.map(pat => {
      if (pat.email === newApp.patientEmail) {
        return {
          ...pat,
          history: [
            ...pat.history,
            `${newApp.date}: Scheduled specialized ${newApp.type} appointment with ${newApp.doctorName}`
          ]
        };
      }
      return pat;
    }));

    // Trigger instant real-time notification
    addNotificationAndToast(
      'Appointment Confirmed',
      `Your consultation with ${newApp.doctorName} (${newApp.specialty}) has been successfully scheduled for ${newApp.date} at ${newApp.timeSlot}.`,
      'success',
      newApp.patientEmail
    );
  };

  // 4. Pharmacy Replenish (Admin)
  const handleReplenishPharmacyItem = (medId: string) => {
    setPharmacyItems(prev => prev.map(p => p.id === medId ? { ...p, stock: p.stock + 50 } : p));
  };

  // 5. Send medicine booking order request
  const handleSendMedicineRequest = (newRequest: MedicineRequest) => {
    setMedicineRequests(prev => [newRequest, ...prev]);
  };

  // 6. Approve / Decline medicine requests (Admin)
  const handleApproveMedicineRequest = (reqId: string) => {
    setMedicineRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: 'Approved' } : r));
    
    // Deduct stock levels dynamically
    const targetReq = medicineRequests.find(r => r.id === reqId);
    if (targetReq) {
      setPharmacyItems(prev => prev.map(item => {
        if (item.name === targetReq.medicineName) {
          return { ...item, stock: Math.max(0, item.stock - targetReq.requestedQty) };
        }
        return item;
      }));

      // Add active Prescription matching approved request!
      const newPx: Prescription = {
        id: `rx-${Math.floor(200 + Math.random() * 800)}`,
        patientName: targetReq.patientName,
        doctorName: 'Clinical On-Duty Pharmacist',
        date: new Date().toLocaleDateString(),
        medicineName: targetReq.medicineName,
        dosage: '1 unit daily',
        instructions: 'Take as directed by pharmacist upon receipt.',
        refillStatus: 'Active',
        duration: '30 Days'
      };
      setPrescriptions(prev => [newPx, ...prev]);
    }
  };

  const handleDeclineMedicineRequest = (reqId: string) => {
    setMedicineRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: 'Declined' } : r));
  };

  // 7. Prescription refill requests
  const handleTriggerRefill = (pxId: string) => {
    setPrescriptions(prev => prev.map(p => p.id === pxId ? { ...p, refillStatus: 'Active' } : p));
  };

  const handleCancelAppointment = (appId: string) => {
    const target = appointments.find(a => a.id === appId);
    setAppointments(prev => prev.map(a => a.id === appId ? { ...a, status: 'Cancelled' } : a));
    if (target) {
      addNotificationAndToast(
        'Appointment Cancelled',
        `Your outpatient appointment with ${target.doctorName} was marked as Cancelled.`,
        'warning',
        target.patientEmail
      );
    }
  };

  const activePatientRecord = patientRecords.find(p => p.email === user?.email) || patientRecords[0];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-sky-400 via-blue-650 to-blue-900 text-white">
      
      {/* Dynamic Header Navbar */}
      <Navbar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        user={user}
        onLogout={handleLogout}
        onLoginClick={() => setShowLoginModal(true)}
        notifications={notifications}
        onMarkRead={handleMarkNotificationRead}
        onMarkAllRead={handleMarkAllNotificationsRead}
        onClearAll={handleClearNotifications}
      />

      {/* Main viewport Container */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-8 md:px-8">
        
        {currentTab === 'home' && (
          <HomePage 
            setCurrentTab={setCurrentTab} 
            doctors={doctors} 
            testimonials={TESTIMONIALS}
            onBookClick={() => {
              if (!user) {
                setShowLoginModal(true);
              } else {
                setCurrentTab('book-appointment');
              }
            }}
            userLoggedIn={!!user}
          />
        )}

        {currentTab === 'doctors' && (
          <DoctorsPage 
            doctors={doctors}
            onBookClick={(doc) => {
              if (!user) {
                setShowLoginModal(true);
              } else {
                setCurrentTab('book-appointment');
              }
            }}
          />
        )}

        {currentTab === 'services' && (
          <ServicesPricing services={services} />
        )}

        {currentTab === 'pharmacy' && (
          <PharmacyStock 
            pharmacyItems={pharmacyItems}
            medicineRequests={medicineRequests}
            patientName={user?.name || ''}
            patientEmail={user?.email || ''}
            onSendRequest={handleSendMedicineRequest}
          />
        )}

        {/* Patient Portal Router */}
        {currentTab === 'patient-dashboard' && user && (
          <PatientDashboard
            appointments={appointments}
            prescriptions={prescriptions}
            patientRecord={activePatientRecord}
            doctors={doctors}
            onCancelAppointment={handleCancelAppointment}
            onSimulateNotification={(title, msg, type) => addNotificationAndToast(title, msg, type, user.email)}
            onNavigate={(tab) => {
              // Route validation
              if (!user) {
                setShowLoginModal(true);
              } else {
                setCurrentTab(tab);
              }
            }}
          />
        )}

        {currentTab === 'book-appointment' && user && (
          <BookAppointment
            doctors={doctors}
            specialties={SPECIALTIES}
            patientName={user.name}
            patientEmail={user.email}
            onBookSuccess={handleBookAppointmentSuccess}
            onBackToDashboard={() => setCurrentTab('patient-dashboard')}
          />
        )}

        {currentTab === 'schedule-checkup' && user && (
          <ScheduleCheckUp
            patientEmail={user.email}
            patientName={user.name}
            onBookSuccess={handleBookAppointmentSuccess}
            onBackToDashboard={() => setCurrentTab('patient-dashboard')}
          />
        )}

        {currentTab === 'support' && (
          <OnlineSupport />
        )}

        {currentTab === 'prescriptions' && user && (
          <PrescriptionPage 
            prescriptions={prescriptions.filter(p => p.patientName === user.name)}
            onTriggerRefill={handleTriggerRefill}
          />
        )}

        {currentTab === 'emergency' && (
          <EmergencyPage />
        )}

        {/* Admin Portal Router */}
        {currentTab === 'admin-dashboard' && user?.role === 'admin' && (
          <AdminDashboard
            doctors={doctors}
            onAddDoctor={handleAddDoctor}
            onUpdateDoctorFee={handleUpdateDoctorFee}
            appointments={appointments}
            onApproveAppointment={handleApproveAppointment}
            onDeclineAppointment={handleDeclineAppointment}
            pharmacyItems={pharmacyItems}
            onReplenishPharmacyItem={handleReplenishPharmacyItem}
            patientRecords={patientRecords}
            medicineRequests={medicineRequests}
            onApproveMedicineRequest={handleApproveMedicineRequest}
            onDeclineMedicineRequest={handleDeclineMedicineRequest}
          />
        )}

      </main>

      {/* Shared Footer component */}
      <Footer setCurrentTab={setCurrentTab} />

      {/* Floating Authentication overlay modal */}
      {showLoginModal && (
        <LoginPage 
          onLoginSuccess={handleLoginSuccess}
          onCancel={() => setShowLoginModal(false)}
        />
      )}

      {/* Real-time Push/In-App Alert Toast popup banner */}
      {activeToast && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm bg-slate-900 border-2 border-[#8ade4f] rounded-2xl p-4 shadow-2xl flex items-start gap-4 animate-slide-in">
          <div className="bg-[#8ade4f]/20 p-2.5 rounded-xl text-[#8ade4f] shrink-0">
            <Bell className="w-5 h-5 animate-bounce" />
          </div>
          <div className="text-left flex-grow">
            <h4 className="font-serif font-bold text-white text-sm">{activeToast.title}</h4>
            <p className="text-[11px] text-slate-305 mt-1 leading-relaxed">{activeToast.message}</p>
            <button 
              onClick={() => setActiveToast(null)} 
              className="text-[10px] uppercase tracking-wider text-[#ffff00] hover:text-white transition-all font-bold mt-2 font-mono block cursor-pointer"
            >
              Dismiss Alert
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
