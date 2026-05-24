import { Doctor, MedicationStock, ServicePrice, PatientRecord, Prescription } from './types';

export const INITIAL_DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Evelyn Carter',
    specialty: 'Cardiology',
    experience: 14,
    rating: 4.9,
    availability: ['Monday AM', 'Tuesday PM', 'Thursday AM'],
    consultationFee: 2890,
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    bio: 'Specializing in interventional cardiology and cardiovascular sciences with over 14 years of experience from Johns Hopkins Hospital.'
  },
  {
    id: 'doc-2',
    name: 'Dr. Marcus Vance',
    specialty: 'Pediatrics',
    experience: 10,
    rating: 4.8,
    availability: ['Monday PM', 'Wednesday AM', 'Friday AM'],
    consultationFee: 2312,
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    bio: 'Dedicated pediatrician focused on adolescent medicine and developmental pediatric health. Loves working with parents and infants.'
  },
  {
    id: 'doc-3',
    name: 'Dr. Surbhi Mehta',
    specialty: 'Neurology',
    experience: 12,
    rating: 4.95,
    availability: ['Tuesday AM', 'Wednesday PM', 'Thursday PM'],
    consultationFee: 3468,
    photo: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&q=80&w=400',
    bio: 'Expert clinical neurologist diagnosing epilepsy, sleep disorders, cognitive neuro-rehabilitation, and headache therapeutics.'
  },
  {
    id: 'doc-4',
    name: 'Dr. Adrian Ross',
    specialty: 'Orthopedics',
    experience: 16,
    rating: 4.7,
    availability: ['Monday AM', 'Wednesday AM', 'Thursday AM'],
    consultationFee: 3083,
    photo: 'https://images.unsplash.com/photo-1582750433449-64c01f00a89f?auto=format&fit=crop&q=80&w=400',
    bio: 'Orthopedic surgeon focusing on sports injuries, dynamic joint reconstructions, and state-of-the-art minimally invasive surgeries.'
  },
  {
    id: 'doc-5',
    name: 'Dr. Chloe Sinclair',
    specialty: 'Dermatology',
    experience: 8,
    rating: 4.85,
    availability: ['Tuesday PM', 'Thursday PM', 'Friday PM'],
    consultationFee: 2505,
    photo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400',
    bio: 'Board-certified dermatologist specializing in laser therapy, clinical pediatric dermatology, and proactive skin cancer screenings.'
  },
  {
    id: 'doc-6',
    name: 'Dr. Alan Mercer',
    specialty: 'General Medicine',
    experience: 18,
    rating: 4.9,
    availability: ['Monday AM', 'Tuesday AM', 'Wednesday PM', 'Friday PM'],
    consultationFee: 1734,
    photo: 'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?auto=format&fit=crop&q=80&w=400',
    bio: 'Primary care physician centered on family practice, therapeutic wellness audits, lifestyle modification, and geriatrics.'
  }
];

export const INITIAL_SERVICES: ServicePrice[] = [
  {
    id: 's-1',
    category: 'Consultation',
    name: 'General Practitioner Consultation',
    price: 1734,
    description: 'General health assessment, vitals check, and prescription diagnostics.'
  },
  {
    id: 's-2',
    category: 'Consultation',
    name: 'Specialist Physician Consultation',
    price: 2890,
    description: 'Expert consultation in Cardiology, Neurology, Orthopedics, or Dermatology.'
  },
  {
    id: 's-3',
    category: 'Diagnostics',
    name: 'MRI Scan (Brain/Joints)',
    price: 8671,
    description: 'High-resolution magnetic resonance imaging with fully certified radiologist response.'
  },
  {
    id: 's-4',
    category: 'Diagnostics',
    name: 'CT Scan (Chest/Abdomen)',
    price: 6166,
    description: 'Rapid compute tomography scanning with multi-slice tissue reconstruction.'
  },
  {
    id: 's-5',
    category: 'Diagnostics',
    name: 'Cardiovascular 2D Echocardiogram',
    price: 4046,
    description: 'Ultrasonic flow analysis of standard structural cardiac chambers and valves.'
  },
  {
    id: 's-6',
    category: 'Lab Tests',
    name: 'Full Blood Count & Metabolic Panel',
    price: 1252,
    description: 'Standard clinical lab screen mapping blood chemistry, lipids, hepatic, and kidney values.'
  },
  {
    id: 's-7',
    category: 'Lab Tests',
    name: 'Thyroid Function Screening (TSH, FT3, FT4)',
    price: 1060,
    description: 'Sensitive immunological diagnostic of central endocrine and metabolic axes.'
  },
  {
    id: 's-8',
    category: 'Procedures',
    name: 'Nebulization & Inhalation Therapy',
    price: 770,
    description: 'Local respiratory relief and dilation with clinical-grade nebulized medications.'
  },
  {
    id: 's-9',
    category: 'Procedures',
    name: 'Minor Surgical Suture & Dressings',
    price: 2120,
    description: 'Aseptic laceration closure, sterile wound care, and follow-up consultation guide.'
  }
];

export const INITIAL_PHARMACY: MedicationStock[] = [
  { id: 'p-1', name: 'Atorvastatin 20mg', category: 'Cardiovascular', stock: 120, price: 626.28, requiresPrescription: true },
  { id: 'p-2', name: 'Amoxicillin 500mg', category: 'Antibiotics', stock: 85, price: 346.86, requiresPrescription: true },
  { id: 'p-3', name: 'Metformin 850mg', category: 'Diabetes Management', stock: 150, price: 404.67, requiresPrescription: true },
  { id: 'p-4', name: 'Lisinopril 10mg', category: 'Antihypertensive', stock: 64, price: 292.90, requiresPrescription: true },
  { id: 'p-5', name: 'Ibuprofen 400mg', category: 'Analgesics', stock: 300, price: 163.79, requiresPrescription: false },
  { id: 'p-6', name: 'Cetirizine 10mg', category: 'Allergy Relief', stock: 240, price: 231.24, requiresPrescription: false },
  { id: 'p-7', name: 'Paracetamol 500mg', category: 'Analgesics', stock: 500, price: 96.35, requiresPrescription: false },
  { id: 'p-8', name: 'Salbutamol Inhaler', category: 'Asthma/Respiratory', stock: 45, price: 439.36, requiresPrescription: true },
  { id: 'p-9', name: 'Omeprazole 20mg', category: 'Gastroenterology', stock: 95, price: 335.29, requiresPrescription: false },
  { id: 'p-10', name: 'Gabapentin 300mg', category: 'Neuropathic Pain', stock: 40, price: 847.88, requiresPrescription: true }
];

export const INITIAL_PRESCRIPTIONS: Prescription[] = [
  {
    id: 'rx-101',
    patientName: 'John Kaira',
    doctorName: 'Dr. Evelyn Carter',
    date: '2026-05-18',
    medicineName: 'Atorvastatin 20mg',
    dosage: '1 tablet once daily',
    instructions: 'Take in the evening before sleeping',
    refillStatus: 'Active',
    duration: '30 Days'
  },
  {
    id: 'rx-102',
    patientName: 'John Kaira',
    doctorName: 'Dr. Alan Mercer',
    date: '2026-05-20',
    medicineName: 'Omeprazole 20mg',
    dosage: '1 capsule daily',
    instructions: 'Take 30 minutes before your morning meal',
    refillStatus: 'Refill Pending',
    duration: '14 Days'
  }
];

export const INITIAL_PATIENTS: PatientRecord[] = [
  {
    id: 'pat-1',
    name: 'John Kaira',
    email: 'john.kaira.zm@gmail.com',
    age: 34,
    gender: 'Male',
    bloodGroup: 'O Positive (O+)',
    conditions: ['Mild Hypertension', 'Seasonal Allergies'],
    allergies: ['Penicillin', 'Pollen'],
    history: [
      '2025-11-12: Diagnosed with mild hyperlipidemia - managed with lifestyle changes.',
      '2026-02-14: Routine wellness screening - blood pressure checked and cataloged.',
      '2026-05-18: Specialized Cardiology consultation with Dr. Carter.'
    ]
  },
  {
    id: 'pat-2',
    name: 'Sarah Connor',
    email: 'sarah.connor@sky.net',
    age: 46,
    gender: 'Female',
    bloodGroup: 'A Negative (A-)',
    conditions: ['Post-Traumatic Stress', 'Minor Joint Inflammations'],
    allergies: ['Sulfa drugs'],
    history: [
      '2025-08-04: Joint reconstruction follow-up - fully mobile with exercise therapies.',
      '2026-03-10: Outpatient lab test for metabolic biomarkers.'
    ]
  },
  {
    id: 'pat-3',
    name: 'Robert Stark',
    email: 'robert.stark@winterfell.org',
    age: 52,
    gender: 'Male',
    bloodGroup: 'B Positive (B+)',
    conditions: ['Gouty Arthritis'],
    allergies: ['NSAIDs'],
    history: [
      '2024-10-30: Acute localized arthritic episode managed with uric acid regulatory care.'
    ]
  }
];

export const TESTIMONIALS = [
  {
    text: "The interactive patient dashboard made managing, viewing my lab metrics, and looking up Dr. Carter's availability so simple. The care here is prompt and world-class.",
    author: "Richard Miller",
    meta: "Heart Valve Patient"
  },
  {
    text: "Being able to check if my family prescription is in catalog stock before driving saved us massive amounts of trouble. Outstanding patient support and digital foresight.",
    author: "Elena Petrova",
    meta: "Mother of two"
  },
  {
    text: "Their rapid emergency ambulance and clinical dispatch helped transport my grandfather safely. Priority notifications on queue status is a wonderful layout innovation.",
    author: "Amir Al-Husseini",
    meta: "Family Beneficiary"
  }
];

export const SPECIALTIES = [
  'All',
  'Cardiology',
  'Pediatrics',
  'Neurology',
  'Orthopedics',
  'Dermatology',
  'General Medicine'
];
