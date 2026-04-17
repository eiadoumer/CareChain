import { useState } from "react";
import {
  ArrowRight,
  Building2,
  CheckCircle,
  FlaskConical,
  Globe,
  Heart,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  User,
  Zap,
} from "lucide-react";
import { cx } from "../utils";
import { ROLES } from "../data/mockData";

const ICON_MAP = { User, Stethoscope, Building2, FlaskConical, Heart };

export default function LoginView({ onLogin }) {
  const [selected, setSelected] = useState("patient");

  return (
    <div className="min-h-screen w-full bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-3xl -translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="relative max-w-7xl mx-auto px-6 py-10 lg:py-16 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-screen">
        {/* Left hero */}
        <div className="space-y-8">
          <div className="flex items-center gap-2.5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Heart className="w-6 h-6" strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-xl font-bold text-slate-900">
                Discharge<span className="text-blue-600">IQ</span>
              </div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">Post-Discharge Care</div>
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              Pilot with AUH Beirut · 5 roles, one platform
            </div>
            <h1 className="mt-5 text-4xl lg:text-5xl font-bold text-slate-900 leading-[1.1] tracking-tight">
              The care that starts{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                after discharge.
              </span>
            </h1>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed max-w-xl">
              CareChain coordinates patients, doctors, hospitals, labs, and caregivers to reduce
              30-day hospital readmissions across Lebanon.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-lg">
            <div className="rounded-xl bg-white border border-slate-200 p-4">
              <div className="text-2xl font-bold text-emerald-600">-21%</div>
              <div className="text-xs text-slate-500 mt-1">Readmissions in pilot</div>
            </div>
            <div className="rounded-xl bg-white border border-slate-200 p-4">
              <div className="text-2xl font-bold text-blue-600">24/7</div>
              <div className="text-xs text-slate-500 mt-1">AI care assistant</div>
            </div>
            <div className="rounded-xl bg-white border border-slate-200 p-4">
              <div className="text-2xl font-bold text-violet-600">3</div>
              <div className="text-xs text-slate-500 mt-1">Languages supported</div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> HIPAA compliant
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-600" /> AR · EN · FR
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-600" /> Real-time
            </div>
          </div>
        </div>

        {/* Right login card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-900/5 p-6 lg:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900">Continue as</h2>
            <p className="text-sm text-slate-500 mt-1">
              Select your role to enter the appropriate dashboard.
            </p>
          </div>

          <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-1 -mr-1">
            {ROLES.map((r) => {
              const Icon = ICON_MAP[r.icon] || User;
              const active = selected === r.key;
              return (
                <button
                  key={r.key}
                  onClick={() => setSelected(r.key)}
                  className={cx(
                    "w-full text-left rounded-xl border-2 p-4 flex items-center gap-4 transition-all",
                    active ? "border-blue-500 bg-blue-50/40 shadow-sm" : "border-slate-200 hover:border-slate-300 bg-white"
                  )}
                >
                  <div
                    className={cx(
                      "w-11 h-11 rounded-xl bg-gradient-to-br text-white flex items-center justify-center shrink-0 shadow-md",
                      r.gradient
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-slate-900">{r.name}</span>
                      <span
                        className={cx(
                          "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
                          r.bg,
                          r.text
                        )}
                      >
                        Demo
                      </span>
                    </div>
                    <div className="text-sm text-slate-600 mt-0.5 truncate">
                      {r.user} · <span className="text-slate-400">{r.detail}</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1 line-clamp-1">{r.desc}</div>
                  </div>
                  <div
                    className={cx(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0",
                      active ? "border-blue-600 bg-blue-600" : "border-slate-300 bg-white"
                    )}
                  >
                    {active && <CheckCircle className="w-4 h-4 text-white" />}
                  </div>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => onLogin(selected)}
            className="mt-6 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3.5 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all"
          >
            Continue to dashboard
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="mt-4 text-center text-xs text-slate-400">
            This is a hackathon demo — no real credentials required.
          </div>
        </div>
      </div>
    </div>
  );
}
