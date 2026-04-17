import {
  Activity,
  AlertTriangle,
  Building2,
  FlaskConical,
  Users,
} from "lucide-react";
import { cx } from "../utils";
import { PATIENTS, READMISSION_TREND, ESCALATION_FEED } from "../data/mockData";
import {
  Card,
  InitialsAvatar,
  PageHero,
  RiskBar,
  SectionTitle,
  StatCard,
} from "../components/ui";
import { ReadmissionChart } from "../components/charts";

export default function HospitalView() {
  return (
    <div className="space-y-6">
      <PageHero
        eyebrow="AUH Beirut · Live"
        title="Hospital Command Center"
        subtitle="Post-discharge operations across all departments. Real-time readmission risk intelligence."
        tone="emerald"
        icon={Building2}
        stats={[
          { label: "Post-Discharge", value: "47" },
          { label: "High Risk", value: "8" },
          { label: "Unbooked Labs", value: "5" },
          { label: "30-day Readmit", value: "14.2%" },
        ]}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard value="47" label="Patients Post-Discharge" accent="blue" icon={Users} />
        <StatCard value="8" label="High Risk" accent="red" icon={AlertTriangle} />
        <StatCard value="5" label="Unbooked Lab Tests" accent="amber" icon={FlaskConical} />
        <StatCard value="14.2%" label="30-Day Readmission" accent="emerald" icon={Activity} trend="↓ from 18.1%" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <SectionTitle title="High Risk Patients — Priority Monitor" subtitle="Ordered by urgency score" />
          <div className="space-y-2">
            {PATIENTS.map((p) => (
              <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0">
                <InitialsAvatar name={p.name} />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-slate-900 truncate">
                    {p.name} <span className="text-slate-400 font-normal">· {p.diagnosis}</span>
                  </div>
                  <div className="text-xs text-slate-500">
                    {p.daysSince >= 0
                      ? `${p.daysSince} day${p.daysSince === 1 ? "" : "s"} since discharge`
                      : `Discharging in ${-p.daysSince} day${p.daysSince === -1 ? "" : "s"}`}
                    {p.lastCheckIn && ` · Last check-in: ${p.lastCheckIn}`}
                  </div>
                </div>
                <div className="w-40 shrink-0">
                  <RiskBar percent={p.riskScore} />
                </div>
                <button className="rounded-lg px-3 py-1.5 text-xs font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors shrink-0">
                  Intervene
                </button>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionTitle
            title="Live Escalation Feed"
            subtitle="Real-time alerts"
            action={
              <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live
              </span>
            }
          />
          <div className="space-y-2">
            {ESCALATION_FEED.map((e, i) => {
              const dotColor =
                e.level === "high" ? "bg-red-500" : e.level === "medium" ? "bg-amber-500" : "bg-emerald-500";
              const bg = e.level === "high" ? "bg-red-50/50" : "bg-transparent";
              return (
                <div key={i} className={cx("flex items-start gap-3 p-3 rounded-xl border border-slate-100", bg)}>
                  <span className={cx("w-2 h-2 rounded-full mt-1.5 shrink-0", dotColor)} />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-slate-700">{e.time}</div>
                    <div className="text-sm text-slate-700 mt-0.5">{e.message}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <Card>
        <SectionTitle title="30-Day Readmission Rate" subtitle="Last 6 months · all departments" />
        <ReadmissionChart data={READMISSION_TREND} />
      </Card>
    </div>
  );
}
