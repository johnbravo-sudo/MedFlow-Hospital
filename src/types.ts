export type Role = 'visitor' | 'patient' | 'admin' | 'doctor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number; // in years
  rating: number; // out of 5
  availability: string[]; // e.g., ["Monday AM", "Wednesday PM"]
  consultationFee: number;
  photo: string;
  bio: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: string;
  timeSlot: string;
  type: 'Consultation' | 'Check-up' | 'Lab' | 'Follow-up';
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  notes?: string;
  queueNo?: number;
}

export interface Prescription {
  id: string;
  patientName: string;
  doctorName: string;
  date: string;
  medicineName: string;
  dosage: string; // e.g., "1 tablet, twice daily"
  instructions: string; // e.g., "Take after food"
  refillStatus: 'Active' | 'No Refills' | 'Refill Pending';
  duration: string; // e.g., "14 days"
}

export interface MedicationStock {
  id: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  requiresPrescription: boolean;
}

export interface MedicineRequest {
  id: string;
  medicineName: string;
  patientName: string;
  email: string;
  requestedQty: number;
  status: 'Pending' | 'Approved' | 'Declined';
  date: string;
}

export interface ServicePrice {
  id: string;
  category: 'Consultation' | 'Diagnostics' | 'Procedures' | 'Lab Tests';
  name: string;
  price: number;
  description: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'support';
  text: string;
  timestamp: string;
}

export interface PatientRecord {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: string;
  bloodGroup: string;
  conditions: string[];
  allergies: string[];
  history: string[]; // Timeline events or treatments
}

export interface Notification {
  id: string;
  patientEmail: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  createdAt: string;
  read: boolean;
}
