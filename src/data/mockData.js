// ── PATIENTS ─────────────────────────────────────────────────────
export const PATIENTS = [
  {
    id: 1,
    name: "Rania Khalil",
    age: 58,
    diagnosis: "Heart Failure",
    dischargeDate: "Apr 15, 2025",
    daysSince: 2,
    risk: "high",
    riskScore: 81,
    followUp: {
      status: "booked",
      date: "May 3, 2025",
      time: "10:00 AM",
      doctor: "Dr. Elie Haddad",
      specialty: "Cardiology",
    },
    caregiver: null,
    medications: [
      {
        name: "Metoprolol Tartrate",
        dose: "25mg",
        frequency: "BID",
        status: "new",
        pill: { shape: "round", color: "#F8FAFC", accent: "#CBD5E1", imprint: "M25" },
        instructions: "Take with water. Hold if BP <90/60 or HR <55.",
      },
      {
        name: "Furosemide",
        dose: "40mg",
        frequency: "Once daily (morning)",
        status: "new",
        pill: { shape: "round", color: "#FEF3C7", accent: "#F59E0B", imprint: "F40" },
        instructions: "Take in the morning. Monitor daily weight.",
      },
      {
        name: "Lisinopril",
        dose: "5mg",
        frequency: "Once daily",
        status: "new",
        pill: { shape: "capsule", color: "#FBCFE8", accent: "#DB2777", imprint: "L5" },
        instructions: "Take at the same time each day. Report dry cough.",
      },
      {
        name: "Carvedilol",
        dose: "12.5mg",
        frequency: "BID",
        status: "discontinued",
        pill: { shape: "oblong", color: "#E5E7EB", accent: "#9CA3AF", imprint: "CV" },
        instructions: "Discontinued — replaced with Metoprolol.",
      },
    ],
    tasks: [
      { id: 1, label: "Take Metoprolol 25mg (morning)", done: true, time: "8:00 AM" },
      { id: 2, label: "Take Furosemide 40mg (morning)", done: true, time: "8:00 AM" },
      { id: 3, label: "Take Metoprolol 25mg (evening)", done: false, time: "8:00 PM" },
      { id: 4, label: "Weigh yourself and log weight", done: false, time: "Any time" },
      { id: 5, label: "Avoid salty foods today", done: false, time: "All day" },
    ],
    labTests: [
      {
        name: "CBC + BMP",
        lab: "Alpha Labs Beirut",
        priority: "urgent",
        status: "pending",
        due: "May 5, 2025",
      },
    ],
    lastCheckIn: "Today 8:00 AM",
    alerts: [
      { time: "10:32 AM", message: "Rania reported dizziness. Nurse has been notified.", level: "high" },
      { time: "Yesterday 9:00 PM", message: "Evening medication reminder was not confirmed.", level: "medium" },
      { time: "Apr 16", message: "Rania completed all tasks for the day.", level: "low" },
    ],
    vitals: { bp: "118/76", hr: 72, weight: "70.0 kg", spo2: 97 },
  },
  {
    id: 2,
    name: "Karim Nassar",
    age: 67,
    diagnosis: "COPD Exacerbation",
    dischargeDate: "Apr 17, 2025",
    daysSince: 0,
    risk: "medium",
    riskScore: 58,
    followUp: { status: "not_booked", date: null, doctor: "Dr. Haddad", specialty: "Pulmonology" },
    lastCheckIn: "Yesterday 7:40 PM",
  },
  {
    id: 3,
    name: "Lara Abi Nader",
    age: 44,
    diagnosis: "Post-Surgery (Appendectomy)",
    dischargeDate: "Apr 18, 2025",
    daysSince: -1,
    risk: "low",
    riskScore: 22,
    followUp: { status: "booked", date: "Apr 28, 2025", doctor: "Dr. Salam", specialty: "Surgery" },
    lastCheckIn: "Today 7:15 AM",
  },
  {
    id: 4,
    name: "Hassan Mourad",
    age: 72,
    diagnosis: "Type 2 Diabetes",
    dischargeDate: "Apr 14, 2025",
    daysSince: 3,
    risk: "high",
    riskScore: 92,
    followUp: { status: "missed", date: "Apr 21, 2025", doctor: "Dr. Haddad", specialty: "Endocrinology" },
    lastCheckIn: "3 days ago",
  },
  {
    id: 5,
    name: "Nadine Frem",
    age: 55,
    diagnosis: "Hypertension",
    dischargeDate: "Apr 19, 2025",
    daysSince: -2,
    risk: "low",
    riskScore: 18,
    followUp: { status: "booked", date: "May 1, 2025", doctor: "Dr. Mansour", specialty: "Internal Medicine" },
    lastCheckIn: "Today 8:45 AM",
  },
];

// ── LAB DATA ─────────────────────────────────────────────────────
export const LAB_ORDERS = [
  { id: 1, patient: "Rania Khalil", test: "CBC + BMP", orderedBy: "Dr. Haddad", priority: "urgent", status: "awaiting_booking" },
  { id: 2, patient: "Karim Nassar", test: "Spirometry", orderedBy: "Dr. Haddad", priority: "normal", status: "awaiting_booking" },
  { id: 3, patient: "Hassan Mourad", test: "HbA1c + Fasting Glucose", orderedBy: "Dr. Haddad", priority: "urgent", status: "overdue" },
  { id: 4, patient: "Georges Saad", test: "Lipid Panel", orderedBy: "Dr. Mansour", priority: "normal", status: "booked", bookedDate: "May 6, 2025" },
];

export const LAB_RESULTS = {
  patient: "Georges Saad",
  test: "Lipid Panel",
  collectedOn: "Apr 16, 2025",
  results: [
    { name: "LDL Cholesterol", value: "142 mg/dL", status: "high", normal: "<100 mg/dL" },
    { name: "HDL Cholesterol", value: "38 mg/dL", status: "low", normal: ">40 mg/dL" },
    { name: "Triglycerides", value: "188 mg/dL", status: "borderline", normal: "<150 mg/dL" },
    { name: "Total Cholesterol", value: "224 mg/dL", status: "high", normal: "<200 mg/dL" },
  ],
};

export const LAB_SLOTS = [
  { id: 1, date: "May 5", day: "Monday", time: "9:00 AM" },
  { id: 2, date: "May 5", day: "Monday", time: "2:00 PM" },
  { id: 3, date: "May 6", day: "Tuesday", time: "10:00 AM" },
];

// ── OPERATIONS ───────────────────────────────────────────────────
export const READMISSION_TREND = [
  { month: "Nov", rate: 19.2 },
  { month: "Dec", rate: 18.5 },
  { month: "Jan", rate: 17.8 },
  { month: "Feb", rate: 16.4 },
  { month: "Mar", rate: 15.1 },
  { month: "Apr", rate: 14.2 },
];

export const ESCALATION_FEED = [
  { time: "10:32 AM", message: "Hassan Mourad did not respond to 3 reminders. Caregiver notified.", level: "high" },
  { time: "9:15 AM", message: "Karim Nassar has not booked required pulmonology follow-up.", level: "medium" },
  { time: "8:50 AM", message: "Rania Khalil reported dizziness via chatbot. Flagged for nurse review.", level: "high" },
  { time: "8:10 AM", message: "Lara Abi Nader confirmed morning medications taken.", level: "low" },
];

// ── CHART DATA — PATIENT ─────────────────────────────────────────
export const WEIGHT_TREND = [
  { day: "Apr 11", value: 72.4 },
  { day: "Apr 12", value: 72.1 },
  { day: "Apr 13", value: 71.6 },
  { day: "Apr 14", value: 71.2 },
  { day: "Apr 15", value: 70.8 },
  { day: "Apr 16", value: 70.3 },
  { day: "Apr 17", value: 70.0 },
];

export const BP_TREND = [
  { day: "Apr 11", sys: 138, dia: 88 },
  { day: "Apr 12", sys: 134, dia: 85 },
  { day: "Apr 13", sys: 130, dia: 83 },
  { day: "Apr 14", sys: 126, dia: 81 },
  { day: "Apr 15", sys: 122, dia: 79 },
  { day: "Apr 16", sys: 120, dia: 78 },
  { day: "Apr 17", sys: 118, dia: 76 },
];

export const ADHERENCE = [
  { label: "On time", value: 62, color: "#10B981" },
  { label: "Late", value: 22, color: "#F59E0B" },
  { label: "Missed", value: 16, color: "#EF4444" },
];

// ── CHART DATA — LAB ─────────────────────────────────────────────
export const LAB_WEEKLY = [
  { day: "Mon", urgent: 4, normal: 7 },
  { day: "Tue", urgent: 3, normal: 9 },
  { day: "Wed", urgent: 5, normal: 6 },
  { day: "Thu", urgent: 2, normal: 8 },
  { day: "Fri", urgent: 6, normal: 10 },
  { day: "Sat", urgent: 1, normal: 4 },
  { day: "Sun", urgent: 0, normal: 2 },
];

export const LAB_STATUS_DIST = [
  { label: "Completed", value: 24, color: "#3B82F6" },
  { label: "Booked", value: 18, color: "#10B981" },
  { label: "Awaiting", value: 8, color: "#F59E0B" },
  { label: "Overdue", value: 3, color: "#EF4444" },
];

export const LAB_TURNAROUND = [
  { day: "Mon", hours: 6.2 },
  { day: "Tue", hours: 5.8 },
  { day: "Wed", hours: 4.9 },
  { day: "Thu", hours: 4.5 },
  { day: "Fri", hours: 4.1 },
  { day: "Sat", hours: 3.8 },
  { day: "Sun", hours: 3.6 },
];

// ── CHAT INITIALS ────────────────────────────────────────────────
export const PATIENT_CHAT_INITIAL = [
  { role: "ai", text: "Hi Rania! I'm your CareChain Assistant. I'm here 24/7 to help with medications, symptoms, or anything else about your recovery. How are you feeling today?" },
  { role: "user", text: "I'm feeling a bit dizzy when I stand up." },
  { role: "ai", text: "I'm sorry to hear that. Dizziness on standing can sometimes be related to your new blood pressure medications. Let's check — have you taken your Metoprolol and Furosemide today?" },
];

export const CAREGIVER_CHAT_INITIAL = [
  { role: "ai", name: "Nurse Layal", text: "Hi Mariam, just checking in — has Rania been eating well and staying comfortable today?" },
];

// ── ROLES (login + shell) ────────────────────────────────────────
export const ROLES = [
  {
    key: "patient",
    icon: "User",
    name: "Patient",
    user: "Rania Khalil",
    detail: "58y · Heart Failure",
    gradient: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50",
    text: "text-blue-600",
    tone: "blue",
    desc: "Track your recovery, medications, and chat with your care team 24/7.",
  },
  {
    key: "doctor",
    icon: "Stethoscope",
    name: "Doctor",
    user: "Dr. Elie Haddad",
    detail: "Cardiologist · AUH",
    gradient: "from-violet-500 to-purple-600",
    bg: "bg-violet-50",
    text: "text-violet-600",
    tone: "violet",
    desc: "Monitor your post-discharge panel and parse discharge notes with AI.",
  },
  {
    key: "hospital",
    icon: "Building2",
    name: "Hospital",
    user: "Sara Khoury",
    detail: "Charge Nurse · AUH",
    gradient: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    tone: "emerald",
    desc: "Command center for readmission risk, escalations, and operations.",
  },
  {
    key: "lab",
    icon: "FlaskConical",
    name: "Lab Personnel",
    user: "Maya Rizk",
    detail: "Lab Technician · Alpha Labs",
    gradient: "from-amber-500 to-orange-600",
    bg: "bg-amber-50",
    text: "text-amber-600",
    tone: "amber",
    desc: "Manage discharge lab orders, send slot availability, upload results.",
  },
  {
    key: "caregiver",
    icon: "Heart",
    name: "Caregiver",
    user: "Mariam Khalil",
    detail: "Caregiver · Rania's Daughter",
    gradient: "from-rose-500 to-pink-600",
    bg: "bg-rose-50",
    text: "text-rose-600",
    tone: "pink",
    desc: "Support your loved one's recovery with shared visibility and alerts.",
  },
];

export const ROLE_BY_KEY = Object.fromEntries(ROLES.map((r) => [r.key, r]));
