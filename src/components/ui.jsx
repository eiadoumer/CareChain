import {
  AlertCircle,
  CheckCircle,
  TrendingDown,
  XCircle,
} from "lucide-react";
import { cx } from "../utils";

// ── STATUS BADGE ─────────────────────────────────────────────────
const badgeStyles = {
  high: "bg-red-100 text-red-700",
  medium: "bg-amber-100 text-amber-700",
  low: "bg-emerald-100 text-emerald-700",
  new: "bg-emerald-100 text-emerald-700",
  discontinued: "bg-red-100 text-red-700 line-through",
  urgent: "bg-red-100 text-red-700",
  normal: "bg-slate-100 text-slate-600",
  booked: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  overdue: "bg-red-100 text-red-700",
  awaiting_booking: "bg-amber-100 text-amber-700",
  missed: "bg-red-100 text-red-700",
  not_booked: "bg-amber-100 text-amber-700",
  borderline: "bg-amber-100 text-amber-700",
};

const badgeLabels = {
  high: "High Risk",
  medium: "Medium Risk",
  low: "Low Risk",
  new: "NEW",
  discontinued: "DISCONTINUED",
  urgent: "Urgent",
  normal: "Normal",
  booked: "Booked",
  pending: "Pending",
  overdue: "Overdue",
  awaiting_booking: "Awaiting Booking",
  missed: "Missed",
  not_booked: "Not Booked",
  borderline: "Borderline",
};

export function StatusBadge({ level, label }) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        badgeStyles[level] || "bg-slate-100 text-slate-600"
      )}
    >
      {label || badgeLabels[level] || level}
    </span>
  );
}

// ── RISK BAR ─────────────────────────────────────────────────────
export function RiskBar({ percent }) {
  const color = percent > 75 ? "bg-red-500" : percent >= 50 ? "bg-amber-500" : "bg-emerald-500";
  return (
    <div className="flex items-center gap-3 w-full">
      <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
        <div className={cx("h-full rounded-full transition-all", color)} style={{ width: `${percent}%` }} />
      </div>
      <span className="text-sm font-semibold text-slate-700 w-10 text-right">{percent}%</span>
    </div>
  );
}

// ── CARD ─────────────────────────────────────────────────────────
export function Card({ children, className = "", as: Tag = "div", ...rest }) {
  return (
    <Tag
      className={cx(
        "bg-white rounded-2xl border border-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_1px_3px_rgba(15,23,42,0.04)] p-6",
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// ── SECTION TITLE ────────────────────────────────────────────────
export function SectionTitle({ title, subtitle, action }) {
  return (
    <div className="flex items-start justify-between mb-4 gap-3">
      <div>
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

// ── INITIALS AVATAR ──────────────────────────────────────────────
const avatarTones = {
  blue: "bg-gradient-to-br from-blue-500 to-indigo-600 text-white",
  pink: "bg-gradient-to-br from-pink-500 to-rose-600 text-white",
  emerald: "bg-gradient-to-br from-emerald-500 to-teal-600 text-white",
  amber: "bg-gradient-to-br from-amber-500 to-orange-600 text-white",
  violet: "bg-gradient-to-br from-violet-500 to-purple-600 text-white",
};
const avatarSizes = {
  sm: "w-6 h-6 text-[10px]",
  md: "w-8 h-8 text-xs",
  lg: "w-16 h-16 text-lg",
  xl: "w-20 h-20 text-xl",
};

export function InitialsAvatar({ name, size = "md", tone = "blue" }) {
  const initials = (name || "")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div className={cx("rounded-full flex items-center justify-center font-semibold shrink-0", avatarSizes[size], avatarTones[tone])}>
      {initials}
    </div>
  );
}

// ── STAT CARD ────────────────────────────────────────────────────
const statAccents = {
  blue: { left: "border-l-blue-500", icon: "bg-blue-50 text-blue-600" },
  red: { left: "border-l-red-500", icon: "bg-red-50 text-red-600" },
  amber: { left: "border-l-amber-500", icon: "bg-amber-50 text-amber-600" },
  emerald: { left: "border-l-emerald-500", icon: "bg-emerald-50 text-emerald-600" },
  violet: { left: "border-l-violet-500", icon: "bg-violet-50 text-violet-600" },
};

export function StatCard({ value, label, accent = "blue", icon: Icon, trend }) {
  const a = statAccents[accent] || statAccents.blue;
  return (
    <div className={cx("bg-white rounded-2xl border border-slate-200/70 shadow-sm border-l-4 p-5 flex items-center justify-between", a.left)}>
      <div>
        <div className="text-3xl font-bold text-slate-900 leading-tight">{value}</div>
        <div className="text-sm text-slate-500 mt-1">{label}</div>
        {trend && (
          <div className="text-xs font-semibold text-emerald-600 mt-1 flex items-center gap-1">
            <TrendingDown className="w-3 h-3" /> {trend}
          </div>
        )}
      </div>
      {Icon && (
        <div className={cx("w-11 h-11 rounded-xl flex items-center justify-center", a.icon)}>
          <Icon className="w-5 h-5" />
        </div>
      )}
    </div>
  );
}

// ── PAGE HERO ────────────────────────────────────────────────────
const heroTones = {
  blue: "from-blue-600 via-blue-500 to-indigo-600",
  rose: "from-rose-500 via-red-500 to-orange-500",
  emerald: "from-emerald-500 via-teal-500 to-cyan-500",
  violet: "from-violet-600 via-purple-500 to-fuchsia-500",
  amber: "from-amber-500 via-orange-500 to-rose-500",
};

export function PageHero({ eyebrow, title, subtitle, tone = "blue", icon: Icon, actions, stats }) {
  return (
    <div className={cx("rounded-2xl p-6 text-white bg-gradient-to-br relative overflow-hidden", heroTones[tone])}>
      <div className="absolute -right-10 -top-10 w-56 h-56 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -right-20 -bottom-20 w-56 h-56 rounded-full bg-white/5 blur-2xl" />
      <div className="relative flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-start gap-4">
          {Icon && (
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center shrink-0">
              <Icon className="w-6 h-6" />
            </div>
          )}
          <div>
            {eyebrow && <div className="text-xs font-semibold tracking-wider uppercase opacity-80">{eyebrow}</div>}
            <h1 className="text-2xl font-bold mt-0.5">{title}</h1>
            {subtitle && <p className="text-sm text-white/85 mt-1 max-w-2xl">{subtitle}</p>}
          </div>
        </div>
        {actions}
      </div>
      {stats && (
        <div className="relative mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stats.map((s, i) => (
            <div key={i} className="rounded-xl bg-white/15 backdrop-blur p-3 border border-white/10">
              <div className="text-xs text-white/80">{s.label}</div>
              <div className="text-lg font-bold mt-0.5">{s.value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── INFO CELL ────────────────────────────────────────────────────
const infoTones = {
  slate: "text-slate-500",
  emerald: "text-emerald-600",
};

export function InfoCell({ icon: Icon, label, value, tone = "slate" }) {
  return (
    <div className="flex items-start gap-2">
      <Icon className={cx("w-4 h-4 mt-0.5 shrink-0", infoTones[tone])} />
      <div className="min-w-0">
        <div className="text-xs text-slate-500">{label}</div>
        <div className="text-sm font-medium text-slate-900 truncate">{value}</div>
      </div>
    </div>
  );
}

// ── FOLLOW-UP CELL ───────────────────────────────────────────────
export function FollowUpCell({ followUp }) {
  if (followUp.status === "booked") {
    return (
      <div className="flex items-center gap-1.5 text-sm text-emerald-700">
        <CheckCircle className="w-4 h-4" />
        <span>{followUp.date}</span>
      </div>
    );
  }
  if (followUp.status === "missed") {
    return (
      <div className="flex items-center gap-1.5 text-sm text-red-700">
        <XCircle className="w-4 h-4" />
        <span>Missed {followUp.date}</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1.5 text-sm text-amber-700">
      <AlertCircle className="w-4 h-4" />
      <span>Not booked</span>
    </div>
  );
}
