import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  FlaskConical,
  Heart,
  Sparkles,
  Stethoscope,
  TrendingDown,
  XCircle,
} from "lucide-react";
import { cx } from "../utils";
import {
  PATIENTS,
  WEIGHT_TREND,
  BP_TREND,
  ADHERENCE,
  PATIENT_CHAT_INITIAL,
} from "../data/mockData";
import { Card, PageHero, SectionTitle, StatusBadge } from "../components/ui";
import { LineChart, DonutChart } from "../components/charts";
import ChatPanel from "../components/ChatPanel";
import PillImage from "../components/PillImage";

function MedicationCard({ med, big = false, showInstructions = true }) {
  const discontinued = med.status === "discontinued";
  return (
    <div
      className={cx(
        "rounded-xl border p-4 flex items-start gap-4",
        discontinued ? "bg-red-50/40 border-red-200" : "bg-white border-slate-200"
      )}
    >
      <div
        className={cx(
          "rounded-lg flex items-center justify-center shrink-0",
          big ? "w-24 h-20" : "w-20 h-16",
          discontinued ? "bg-red-50" : "bg-slate-50"
        )}
      >
        <PillImage
          shape={med.pill.shape}
          color={med.pill.color}
          accent={med.pill.accent}
          imprint={med.pill.imprint}
          size={big ? 64 : 54}
          discontinued={discontinued}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={cx(
              "font-semibold text-slate-900",
              discontinued && "line-through text-slate-400"
            )}
          >
            {med.name}
          </span>
          <StatusBadge level={med.status} />
        </div>
        <div className={cx("text-sm mt-0.5", discontinued ? "text-slate-400 line-through" : "text-slate-600")}>
          {med.dose} · {med.frequency}
        </div>
        {showInstructions && med.instructions && !discontinued && (
          <div className="mt-2 text-xs text-slate-500 italic leading-relaxed">{med.instructions}</div>
        )}
      </div>
    </div>
  );
}

export default function PatientView() {
  const patient = PATIENTS[0];
  const [tasks, setTasks] = useState(patient.tasks);
  const [labBooked, setLabBooked] = useState(false);

  const completed = tasks.filter((t) => t.done).length;
  const progress = Math.round((completed / tasks.length) * 100);

  const toggleTask = (id) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const discarded = patient.medications.filter((m) => m.status === "discontinued");
  const active = patient.medications.filter((m) => m.status !== "discontinued");

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow={`Day ${patient.daysSince + 1} of recovery`}
        title={`Good morning, ${patient.name.split(" ")[0]}`}
        subtitle={`You're recovering from ${patient.diagnosis}. Your care team is monitoring you closely — you're not alone.`}
        tone="blue"
        icon={Heart}
        stats={[
          { label: "Blood Pressure", value: patient.vitals.bp },
          { label: "Heart Rate", value: `${patient.vitals.hr} bpm` },
          { label: "Weight", value: patient.vitals.weight },
          { label: "SpO₂", value: `${patient.vitals.spo2}%` },
        ]}
      />

      {/* Risk Alert */}
      <div className="rounded-2xl p-5 flex items-start gap-4 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200">
        <div className="w-12 h-12 rounded-xl bg-red-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-red-500/20">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-red-900">High Readmission Risk</h3>
            <span className="rounded-full px-2.5 py-0.5 text-xs font-semibold bg-red-600 text-white">
              Risk Score {patient.riskScore}/100
            </span>
          </div>
          <p className="text-sm text-red-800 mt-1">
            You have {active.length} new medications and no caregiver linked. Your care team has been
            notified and is actively monitoring your recovery.
          </p>
          <button className="mt-3 text-xs font-semibold text-red-700 hover:text-red-900 underline underline-offset-2">
            Invite a family caregiver →
          </button>
        </div>
      </div>

      {/* PRESCRIPTION CHANGE — old vs new with pill images */}
      <Card className="p-0 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
          <SectionTitle
            title="Your Prescription Change"
            subtitle="Compare what was stopped vs what to take now — shown with pill appearance"
            action={
              <div className="flex items-center gap-2 text-xs text-blue-600 bg-blue-50 rounded-full px-3 py-1 font-semibold">
                <Sparkles className="w-3.5 h-3.5" /> Reviewed by {patient.followUp.doctor}
              </div>
            }
          />
        </div>
        <div className="grid md:grid-cols-[1fr_auto_1.2fr] items-stretch">
          {/* OLD / DISCARDED */}
          <div className="p-6 bg-red-50/40">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                <XCircle className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider font-bold text-red-700">Stop Taking</div>
                <div className="text-sm text-slate-500">These were discarded at discharge</div>
              </div>
            </div>
            <div className="space-y-3">
              {discarded.length === 0 ? (
                <div className="text-sm text-slate-500 italic">No discontinued medications.</div>
              ) : (
                discarded.map((m, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl border border-red-200 p-4 flex items-center gap-4"
                  >
                    <div className="w-20 h-16 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                      <PillImage
                        shape={m.pill.shape}
                        color={m.pill.color}
                        accent={m.pill.accent}
                        imprint={m.pill.imprint}
                        size={54}
                        discontinued
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-slate-400 line-through">{m.name}</div>
                      <div className="text-sm text-slate-400 line-through">
                        {m.dose} · {m.frequency}
                      </div>
                      <StatusBadge level="discontinued" />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Divider arrow */}
          <div className="hidden md:flex items-center justify-center px-4 bg-gradient-to-r from-red-50/40 to-emerald-50/40">
            <div className="w-10 h-10 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center shadow-sm">
              <svg className="w-5 h-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* NEW */}
          <div className="p-6 bg-emerald-50/40">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider font-bold text-emerald-700">Start Taking</div>
                <div className="text-sm text-slate-500">Your new discharge regimen</div>
              </div>
            </div>
            <div className="space-y-3">
              {active.map((m, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-emerald-200 p-4 flex items-center gap-4"
                >
                  <div className="w-20 h-16 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                    <PillImage
                      shape={m.pill.shape}
                      color={m.pill.color}
                      accent={m.pill.accent}
                      imprint={m.pill.imprint}
                      size={54}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-slate-900">{m.name}</span>
                      <StatusBadge level="new" />
                    </div>
                    <div className="text-sm text-slate-600">
                      {m.dose} · {m.frequency}
                    </div>
                    {m.instructions && (
                      <div className="text-xs text-slate-500 italic mt-1 line-clamp-1">{m.instructions}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <SectionTitle
            title="Weight Trend"
            subtitle="Daily weight is critical for heart failure — watch for sudden jumps"
            action={
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                <TrendingDown className="w-3.5 h-3.5" /> -2.4 kg over 7 days
              </div>
            }
          />
          <LineChart
            series={[{ color: "#2563EB", points: WEIGHT_TREND.map((d) => ({ y: d.value })) }]}
            xLabels={WEIGHT_TREND.map((d) => d.day)}
            yMin={68}
            yMax={74}
            unit=" kg"
            fill
          />
        </Card>

        <Card>
          <SectionTitle title="Medication Adherence" subtitle="Last 7 days" />
          <DonutChart data={ADHERENCE} centerTop="62%" centerBottom="On time" size={170} thickness={20} />
          <div className="mt-4 text-xs text-slate-500 bg-slate-50 rounded-lg p-3">
            <div className="flex items-center gap-1.5 font-semibold text-slate-700 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" /> AI Insight
            </div>
            Evening doses have the highest miss rate — consider setting a 7:45 PM reminder.
          </div>
        </Card>
      </div>

      {/* BP chart */}
      <Card>
        <SectionTitle
          title="Blood Pressure Trend"
          subtitle="Morning readings · Goal: <130/80 mmHg"
          action={
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span className="text-slate-600">Systolic</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-violet-400" />
                <span className="text-slate-600">Diastolic</span>
              </div>
            </div>
          }
        />
        <LineChart
          series={[
            { color: "#2563EB", points: BP_TREND.map((d) => ({ y: d.sys })) },
            { color: "#8B5CF6", points: BP_TREND.map((d) => ({ y: d.dia })) },
          ]}
          xLabels={BP_TREND.map((d) => d.day)}
          yMin={60}
          yMax={150}
        />
      </Card>

      {/* Tasks */}
      <Card>
        <SectionTitle
          title="Today's Tasks"
          subtitle={`${completed} of ${tasks.length} completed`}
          action={<div className="text-2xl font-bold text-emerald-600">{progress}%</div>}
        />
        <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="space-y-1">
          {tasks.map((task) => (
            <button
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className="w-full flex items-center gap-3 py-2.5 px-2 rounded-lg hover:bg-slate-50 transition-colors text-left"
            >
              <div
                className={cx(
                  "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors shrink-0",
                  task.done ? "bg-emerald-500 border-emerald-500" : "border-slate-300 bg-white"
                )}
              >
                {task.done && <CheckCircle className="w-4 h-4 text-white" />}
              </div>
              <span className={cx("flex-1 text-sm", task.done ? "line-through text-slate-400" : "text-slate-800")}>
                {task.label}
              </span>
              <span className="text-xs text-slate-500 bg-slate-100 rounded-full px-2 py-0.5">{task.time}</span>
            </button>
          ))}
        </div>
      </Card>

      {/* Full medication details */}
      <Card>
        <SectionTitle
          title="Full Medication Details"
          subtitle="Instructions and schedule for each medication"
        />
        <div className="grid md:grid-cols-2 gap-3">
          {patient.medications.map((med, idx) => (
            <MedicationCard key={idx} med={med} />
          ))}
        </div>
      </Card>

      {/* Appointments */}
      <Card>
        <SectionTitle title="Upcoming Appointments" />
        <div className="space-y-2">
          <div className="flex items-center gap-4 p-3.5 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
            <div className="w-11 h-11 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-slate-900">Dr. Elie Haddad — Cardiology</div>
              <div className="text-sm text-slate-500">May 3, 2025 · 10:00 AM · AUH Beirut</div>
            </div>
            <StatusBadge level="booked" label="Confirmed" />
          </div>
          <div className="flex items-center gap-4 p-3.5 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
            <div className="w-11 h-11 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-slate-900">CBC + BMP — Blood Work</div>
              <div className="text-sm text-slate-500">Alpha Labs Beirut · Due May 5, 2025</div>
            </div>
            {labBooked ? (
              <StatusBadge level="booked" label="Booked ✓" />
            ) : (
              <button
                onClick={() => setLabBooked(true)}
                className="rounded-lg px-4 py-2 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Book Now
              </button>
            )}
          </div>
        </div>
      </Card>

      {/* Chat */}
      <ChatPanel
        title="Ask CareChain Assistant"
        subtitle="Available 24/7 · Arabic · English · French"
        initialMessages={PATIENT_CHAT_INITIAL}
        replyMessage="I understand your concern. Based on your current medications, dizziness can sometimes occur with new beta-blockers. Please sit or lie down when it happens, drink water, and monitor your blood pressure if possible. If symptoms persist or worsen, please contact Dr. Haddad's office or press the emergency button."
        placeholder="Ask about your medications, symptoms, or recovery..."
      />

      {/* Emergency hotline note */}
      <div className="flex items-center justify-center gap-2 text-xs text-slate-400 py-2">
        <Clock className="w-3.5 h-3.5" />
        Emergency hotline: +961 1 350 000 — answered 24/7
      </div>
    </div>
  );
}
