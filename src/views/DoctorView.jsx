import { useState } from "react";
import {
  AlertCircle,
  AlertTriangle,
  Calendar,
  CheckCheck,
  CheckCircle,
  Loader2,
  Pill,
  Sparkles,
  Stethoscope,
  XCircle,
} from "lucide-react";
import { cx } from "../utils";
import { PATIENTS } from "../data/mockData";
import {
  Card,
  FollowUpCell,
  InitialsAvatar,
  PageHero,
  SectionTitle,
  StatusBadge,
} from "../components/ui";

function ParsedSection({ title, items, tone, icon: Icon }) {
  const tones = {
    green: "border-emerald-200 bg-emerald-50 text-emerald-900",
    red: "border-red-200 bg-red-50 text-red-900",
    blue: "border-blue-200 bg-blue-50 text-blue-900",
    purple: "border-purple-200 bg-purple-50 text-purple-900",
  };
  return (
    <div className={cx("rounded-xl border p-4", tones[tone])}>
      <div className="flex items-center gap-2 font-semibold text-sm mb-2">
        <Icon className="w-4 h-4" /> {title}
      </div>
      <ul className="text-sm space-y-1 opacity-90">
        {items.map((it, i) => (
          <li key={i}>• {it}</li>
        ))}
      </ul>
    </div>
  );
}

function ParsedDischarge({ onReset }) {
  return (
    <div className="space-y-3">
      <div className="grid md:grid-cols-2 gap-3">
        <ParsedSection title="New Medications" tone="green" icon={Pill} items={["Salbutamol inhaler — 2 puffs BID", "Prednisolone — 30mg daily × 5 days"]} />
        <ParsedSection title="Discontinued" tone="red" icon={XCircle} items={["Theophylline 200mg"]} />
        <ParsedSection title="Continue" tone="blue" icon={CheckCheck} items={["Tiotropium 18mcg — once daily"]} />
        <ParsedSection title="Follow-up" tone="purple" icon={Calendar} items={["Pulmonology appointment in 2 weeks"]} />
      </div>
      <div className="rounded-xl border-l-4 border-red-500 bg-red-50 p-4">
        <div className="flex items-center gap-2 mb-2 text-red-900 font-semibold">
          <AlertTriangle className="w-4 h-4" /> Clinical Flags
        </div>
        <ul className="text-sm text-red-800 space-y-1 list-disc list-inside">
          <li>Hold Prednisolone if blood glucose &gt;200 mg/dL</li>
          <li>Return to ED if SpO₂ &lt;92%</li>
        </ul>
      </div>
      <div className="flex justify-between items-center pt-2">
        <div className="text-xs text-slate-500">Parsed in 0.82s · 4 medications · 2 clinical flags extracted</div>
        <div className="flex gap-2">
          <button onClick={onReset} className="rounded-lg px-4 py-2 text-sm font-medium border border-slate-200 text-slate-700 hover:bg-slate-50">
            Re-parse
          </button>
          <button className="rounded-lg px-4 py-2 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700">
            Send to Patient
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DoctorView() {
  const [alertSent, setAlertSent] = useState(false);
  const [parseState, setParseState] = useState("idle");
  const [note, setNote] = useState(
    `Patient: Karim Nassar, 67M
Diagnosis: Acute exacerbation of COPD
Discharge medications:
- DISCONTINUE Theophylline 200mg
- START Salbutamol inhaler 2 puffs BID (new)
- START Prednisolone 30mg daily x5 days (new) — hold if blood glucose >200 mg/dL
- CONTINUE Tiotropium 18mcg once daily
Follow-up: Pulmonology in 2 weeks
Warning: Monitor O2 saturation. Return to ED if SpO2 <92%`
  );

  const runParse = () => {
    setParseState("loading");
    setTimeout(() => setParseState("parsed"), 800);
  };

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow="Cardiology · AUH Beirut"
        title="Your Post-Discharge Panel"
        subtitle="12 patients under active monitoring. 3 need your attention today."
        tone="violet"
        icon={Stethoscope}
        stats={[
          { label: "Active", value: "12" },
          { label: "High Risk", value: "3" },
          { label: "Missed", value: "2" },
          { label: "Follow-ups", value: "5 this wk" },
        ]}
      />

      <div className="bg-amber-50 border-l-4 border-amber-500 rounded-xl p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
          <AlertCircle className="w-5 h-5 text-amber-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-amber-900">Missed Follow-up</h3>
          <p className="text-sm text-amber-800 mt-1">
            Hassan Mourad missed his follow-up appointment on Apr 21. Last reminder sent 48h ago.
          </p>
        </div>
        {alertSent ? (
          <div className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium bg-emerald-100 text-emerald-700">
            <CheckCircle className="w-4 h-4" /> Alert Sent
          </div>
        ) : (
          <button
            onClick={() => setAlertSent(true)}
            className="rounded-lg px-4 py-2 text-sm font-medium bg-amber-600 text-white hover:bg-amber-700 transition-colors"
          >
            Send Alert
          </button>
        )}
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <SectionTitle title="My Patients" subtitle="5 post-discharge patients under your care" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-slate-500 border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 py-3 font-semibold">Patient</th>
                <th className="px-3 py-3 font-semibold">Age</th>
                <th className="px-3 py-3 font-semibold">Diagnosis</th>
                <th className="px-3 py-3 font-semibold">Discharged</th>
                <th className="px-3 py-3 font-semibold">Risk</th>
                <th className="px-3 py-3 font-semibold">Follow-up</th>
                <th className="px-6 py-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {PATIENTS.map((p) => (
                <tr key={p.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2.5">
                      <InitialsAvatar name={p.name} />
                      <span className="font-medium text-slate-900">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-slate-600">{p.age}</td>
                  <td className="px-3 py-3 text-slate-600">{p.diagnosis}</td>
                  <td className="px-3 py-3 text-slate-600">{p.dischargeDate}</td>
                  <td className="px-3 py-3">
                    <StatusBadge level={p.risk} />
                  </td>
                  <td className="px-3 py-3">
                    <FollowUpCell followUp={p.followUp} />
                  </td>
                  <td className="px-6 py-3 text-right">
                    <button className="rounded-lg px-3 py-1.5 text-xs font-medium border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <SectionTitle
          title="Smart Discharge Parser"
          subtitle="Upload a discharge summary — AI extracts a structured care plan"
          action={
            <div className="flex items-center gap-2 text-xs text-blue-600 bg-blue-50 rounded-full px-3 py-1 font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> GPT-4 Medical
            </div>
          }
        />

        <div className="flex items-center gap-3 mb-3 text-sm">
          <label className="text-slate-500">Patient:</label>
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-700">
            <InitialsAvatar name="Karim Nassar" size="sm" />
            Karim Nassar · 67M · COPD
          </div>
        </div>

        {parseState !== "parsed" ? (
          <>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full h-48 rounded-xl border border-slate-200 p-3 text-sm font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-slate-50"
            />
            <div className="flex justify-end mt-3">
              <button
                onClick={runParse}
                disabled={parseState === "loading"}
                className="rounded-lg px-5 py-2.5 text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-95 transition-opacity flex items-center gap-2 disabled:opacity-60 shadow-md shadow-blue-500/20"
              >
                {parseState === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Parsing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" /> Parse with AI
                  </>
                )}
              </button>
            </div>
          </>
        ) : (
          <ParsedDischarge onReset={() => setParseState("idle")} />
        )}
      </Card>
    </div>
  );
}
