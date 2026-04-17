import { useState } from "react";
import AppShell from "./components/AppShell";
import LoginView from "./views/LoginView";
import PatientView from "./views/PatientView";
import DoctorView from "./views/DoctorView";
import HospitalView from "./views/HospitalView";
import LabView from "./views/LabView";
import CaregiverView from "./views/CaregiverView";
import { ROLE_BY_KEY } from "./data/mockData";

const VIEW_MAP = {
  patient: PatientView,
  doctor: DoctorView,
  hospital: HospitalView,
  lab: LabView,
  caregiver: CaregiverView,
};

export default function App() {
  const [currentView, setCurrentView] = useState("login");

  if (currentView === "login" || !VIEW_MAP[currentView]) {
    return <LoginView onLogin={setCurrentView} />;
  }

  const View = VIEW_MAP[currentView];
  const role = ROLE_BY_KEY[currentView];

  return (
    <AppShell role={role} onLogout={() => setCurrentView("login")}>
      <View />
    </AppShell>
  );
}
