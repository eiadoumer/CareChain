import { useState } from "react";
import {
  AlertCircle,
  AlertTriangle,
  Calendar,
  CheckCircle,
  Clock,
  Heart,
  Siren,
  Stethoscope,
} from "lucide-react";
import { cx } from "../utils";
import { PATIENTS, CAREGIVER_CHAT_INITIAL } from "../data/mockData";
import {
  Card,
  InfoCell,
  InitialsAvatar,
  PageHero,
  SectionTitle,
  StatusBadge,
} from "../components/ui";
import ChatPanel from "../components/ChatPanel";

export default function CaregiverView() {
  const patient = PATIENTS[0];
  const [emergencySent, setEmergencySent] = useState(false);

  const tasks = patient.tasks;
  const completed = tasks.filter((t) => t.done).length;
  const progress = Math.round((completed / tasks.length) * 100);

  const medTimeline = [
    { time: "8:00 AM", name: "Metoprolol 25mg", status: "done" },
    { time: "8:00 AM", name: "Furosemide 40mg", status: "done" },
    { time: "8:00 PM", name: "Metoprolol 25mg", status: "pending" },
  ];

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow="Caregiver access"
        title="Caring for Rania"
        subtitle="You are linked as her primary caregiver — you'll receive alerts and can message the care team anytime."
        tone="rose"
        icon={Heart}
        stats={[
          { label: "Risk Level", value: "High" },
          { label: "Last Check-in", value: "8:00 AM" },
          { label: "Today's Progress", value: `${progress}%` },
          { label: "Next Appointment", value: "May 3" },
        ]}
      />

      <Card>
        <div className="flex items-start gap-5 flex-wrap">
          <InitialsAvatar name={patient.name} size="lg" tone="pink" />
          <div className="flex-1 min-w-[200px]">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg font-bold text-slate-900">{patient.name}</h2>
              <StatusBadge level="high" />
            </div>
            <div className="text-sm text-slate-500 mt-0.5">
              Age {patient.age} · {patient.diagnosis}
            </div>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
              <InfoCell icon={Calendar} label="Discharged" value={patient.dischargeDate} />
              <InfoCell
                icon={Stethoscope}
                label="Next appointment"
                value={`${patient.followUp.doctor}, ${patient.followUp.date}`}
              />
              <InfoCell icon={CheckCircle} label="Last check-in" value={patient.lastCheckIn} tone="emerald" />
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <SectionTitle
          title="Today's Task Progress"
          subtitle={`${completed} of ${tasks.length} tasks completed`}
          action={<div className="text-2xl font-bold text-emerald-600">{progress}%</div>}
        />
        <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="space-y-1">
          {tasks.map((t) => (
            <div key={t.id} className="flex items-center gap-3 py-2 px-2 rounded-lg">
              {t.done ? (
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
              ) : (
                <Clock className="w-5 h-5 text-slate-300 shrink-0" />
              )}
              <span className={cx("flex-1 text-sm", t.done ? "text-slate-500" : "text-slate-800")}>{t.label}</span>
              <span className="text-xs text-slate-500 bg-slate-100 rounded-full px-2 py-0.5">{t.time}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionTitle title="Today's Medication Schedule" />
        <div className="relative pl-4">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-slate-200" />
          {medTimeline.map((m, i) => (
            <div key={i} className="relative pb-4 last:pb-0 pl-6">
              <div
                className={cx(
                  "absolute left-0 top-1 w-3.5 h-3.5 rounded-full border-2 border-white ring-2",
                  m.status === "done" ? "bg-emerald-500 ring-emerald-200" : "bg-amber-400 ring-amber-200"
                )}
              />
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 rounded-full px-2.5 py-1">
                  {m.time}
                </span>
                <span className="font-medium text-slate-900">{m.name}</span>
                {m.status === "done" ? (
                  <span className="text-xs text-emerald-700 flex items-center gap-1 font-semibold">
                    <CheckCircle className="w-3.5 h-3.5" /> Confirmed taken
                  </span>
                ) : (
                  <span className="text-xs text-amber-700 flex items-center gap-1 font-semibold">
                    <Clock className="w-3.5 h-3.5" /> Pending
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionTitle title="Recent Alerts" />
        <div className="space-y-2">
          {patient.alerts.map((a, i) => {
            const border =
              a.level === "high"
                ? "border-red-500 bg-red-50/60"
                : a.level === "medium"
                ? "border-amber-500 bg-amber-50/60"
                : "border-emerald-500 bg-emerald-50/60";
            const icon =
              a.level === "high" ? (
                <AlertTriangle className="w-5 h-5 text-red-600" />
              ) : a.level === "medium" ? (
                <AlertCircle className="w-5 h-5 text-amber-600" />
              ) : (
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              );
            return (
              <div key={i} className={cx("flex items-start gap-3 p-3 rounded-xl border-l-4", border)}>
                {icon}
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-slate-700">{a.time}</div>
                  <div className="text-sm text-slate-800 mt-0.5">{a.message}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {emergencySent ? (
        <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-400 p-6 text-center">
          <div className="w-14 h-14 rounded-full bg-emerald-500 text-white mx-auto flex items-center justify-center mb-3 shadow-lg shadow-emerald-500/30">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-emerald-900">Alert sent to Dr. Haddad's team</h3>
          <p className="text-sm text-emerald-800 mt-1">Expected response within 15 minutes</p>
          <p className="text-sm text-emerald-700 mt-2 font-medium">Emergency line: +961 1 350 000</p>
          <p className="text-xs text-slate-500 mt-3">
            Alerted at {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>
      ) : (
        <button
          onClick={() => setEmergencySent(true)}
          className="w-full rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white py-5 font-semibold text-base flex items-center justify-center gap-3 shadow-lg shadow-red-500/20 hover:shadow-xl transition-all"
        >
          <Siren className="w-6 h-6" />
          Something Looks Wrong — Alert Care Team
        </button>
      )}

      <ChatPanel
        title="Chat with Care Team"
        subtitle="Nurse Layal · On call now"
        initialMessages={CAREGIVER_CHAT_INITIAL}
        replyMessage="Thank you for the update, Mariam. Please make sure Rania takes her evening Metoprolol at 8 PM. If you notice any swelling in her legs or difficulty breathing, contact us immediately."
        placeholder="Reply to care team..."
        accent="green"
      />
    </div>
  );
}
