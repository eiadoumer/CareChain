import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  FlaskConical,
  MessageCircle,
  Phone,
  TrendingDown,
  Upload,
} from "lucide-react";
import { cx } from "../utils";
import {
  LAB_ORDERS,
  LAB_RESULTS,
  LAB_SLOTS,
  LAB_WEEKLY,
  LAB_STATUS_DIST,
  LAB_TURNAROUND,
} from "../data/mockData";
import {
  Card,
  InitialsAvatar,
  PageHero,
  SectionTitle,
  StatusBadge,
} from "../components/ui";
import { DonutChart, LineChart, StackedBarChart } from "../components/charts";

export default function LabView() {
  const [slotsOpenFor, setSlotsOpenFor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [slotsSent, setSlotsSent] = useState(false);
  const [notified, setNotified] = useState(false);

  const openSlots = (id) => {
    setSlotsOpenFor(id);
    setSelectedSlot(null);
    setSlotsSent(false);
  };

  const totalOrders = LAB_STATUS_DIST.reduce((s, d) => s + d.value, 0);

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow="Alpha Labs Beirut"
        title="Lab Operations Center"
        subtitle="Discharge test orders, slot scheduling, and abnormal results triage."
        tone="amber"
        icon={FlaskConical}
        stats={[
          { label: "Active Orders", value: String(totalOrders) },
          { label: "Overdue", value: "3" },
          { label: "Awaiting", value: "8" },
          { label: "Avg Turnaround", value: "4.1h" },
        ]}
      />

      <div className="rounded-2xl p-5 flex items-start gap-4 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200">
        <div className="w-12 h-12 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/20">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-orange-900">Action Required</h3>
          <p className="text-sm text-orange-800 mt-1">
            2 patients have not booked urgent tests within 72 hours. Immediate follow-up required.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <SectionTitle
            title="Weekly Order Volume"
            subtitle="Split by urgency — last 7 days"
            action={
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-red-500" /> <span className="text-slate-600">Urgent</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-slate-400" /> <span className="text-slate-600">Normal</span>
                </div>
              </div>
            }
          />
          <StackedBarChart data={LAB_WEEKLY} keys={["urgent", "normal"]} colors={["#EF4444", "#94A3B8"]} />
        </Card>

        <Card>
          <SectionTitle title="Order Status" subtitle="Current queue" />
          <DonutChart
            data={LAB_STATUS_DIST}
            centerTop={String(totalOrders)}
            centerBottom="Total orders"
            size={170}
            thickness={20}
          />
        </Card>
      </div>

      <Card>
        <SectionTitle
          title="Avg Result Turnaround Time"
          subtitle="Hours from sample to result · target ≤ 5h"
          action={
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
              <TrendingDown className="w-3.5 h-3.5" /> -42% over 7 days
            </div>
          }
        />
        <LineChart
          series={[{ color: "#F59E0B", points: LAB_TURNAROUND.map((d) => ({ y: d.hours })) }]}
          xLabels={LAB_TURNAROUND.map((d) => d.day)}
          yMin={2}
          yMax={8}
          unit="h"
          fill
        />
      </Card>

      <Card className="p-0 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <SectionTitle title="Test Orders Queue" subtitle="All orders from discharge plans" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-slate-500 border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 py-3 font-semibold">Patient</th>
                <th className="px-3 py-3 font-semibold">Test</th>
                <th className="px-3 py-3 font-semibold">Ordered By</th>
                <th className="px-3 py-3 font-semibold">Priority</th>
                <th className="px-3 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {LAB_ORDERS.map((o) => (
                <tr key={o.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2.5">
                      <InitialsAvatar name={o.patient} />
                      <span className="font-medium text-slate-900">{o.patient}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-slate-600">{o.test}</td>
                  <td className="px-3 py-3 text-slate-600">{o.orderedBy}</td>
                  <td className="px-3 py-3">
                    <StatusBadge level={o.priority} />
                  </td>
                  <td className="px-3 py-3">
                    <StatusBadge level={o.status} />
                  </td>
                  <td className="px-6 py-3 text-right">
                    {o.status === "awaiting_booking" && (
                      <button
                        onClick={() => openSlots(o.id)}
                        className="rounded-lg px-3 py-1.5 text-xs font-medium bg-blue-600 text-white hover:bg-blue-700"
                      >
                        Send Slots
                      </button>
                    )}
                    {o.status === "overdue" && (
                      <button className="rounded-lg px-3 py-1.5 text-xs font-medium bg-red-600 text-white hover:bg-red-700 flex items-center gap-1.5 ml-auto">
                        <Phone className="w-3 h-3" /> Call Patient
                      </button>
                    )}
                    {o.status === "booked" && (
                      <button className="rounded-lg px-3 py-1.5 text-xs font-medium border border-blue-200 text-blue-600 hover:bg-blue-50">
                        View
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {slotsOpenFor && (
        <Card>
          {(() => {
            const order = LAB_ORDERS.find((o) => o.id === slotsOpenFor);
            return (
              <>
                <SectionTitle
                  title={`Send Available Slots — ${order.patient}`}
                  subtitle={`${order.test} · ${order.priority === "urgent" ? "Urgent" : "Standard"} priority`}
                  action={
                    <button onClick={() => setSlotsOpenFor(null)} className="text-slate-400 hover:text-slate-700 text-sm">
                      Close
                    </button>
                  }
                />
                <div className="grid sm:grid-cols-3 gap-3 mb-4">
                  {LAB_SLOTS.map((s) => {
                    const active = selectedSlot === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setSelectedSlot(s.id)}
                        className={cx(
                          "rounded-xl border-2 p-4 text-left transition-all",
                          active ? "border-blue-500 bg-blue-50" : "border-slate-200 bg-white hover:border-slate-300"
                        )}
                      >
                        <div className="text-xs text-slate-500">{s.day}</div>
                        <div className="text-lg font-bold text-slate-900 mt-0.5">{s.date}</div>
                        <div className="text-sm text-slate-700 mt-1 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" /> {s.time}
                        </div>
                        {active && (
                          <div className="mt-2 text-xs font-semibold text-blue-600 flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5" /> Selected
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
                {slotsSent ? (
                  <div className="flex items-center gap-2 rounded-lg bg-emerald-50 text-emerald-700 px-4 py-3 text-sm font-medium">
                    <CheckCircle className="w-4 h-4" /> Slots sent to patient via WhatsApp
                  </div>
                ) : (
                  <button
                    onClick={() => setSlotsSent(true)}
                    disabled={!selectedSlot}
                    className="rounded-lg px-4 py-2.5 text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-colors flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <MessageCircle className="w-4 h-4" /> Send to Patient via WhatsApp
                  </button>
                )}
              </>
            );
          })()}
        </Card>
      )}

      <Card>
        <SectionTitle
          title={`Results Upload — ${LAB_RESULTS.patient}`}
          subtitle={`${LAB_RESULTS.test} · Collected ${LAB_RESULTS.collectedOn}`}
          action={
            <button className="rounded-lg px-3 py-1.5 text-xs font-medium border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center gap-1.5">
              <Upload className="w-3.5 h-3.5" /> Upload PDF
            </button>
          }
        />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-slate-500 border-b border-slate-100">
                <th className="py-2 font-semibold">Test</th>
                <th className="py-2 font-semibold">Value</th>
                <th className="py-2 font-semibold">Normal Range</th>
                <th className="py-2 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {LAB_RESULTS.results.map((r, i) => (
                <tr key={i} className="border-b border-slate-50 last:border-0">
                  <td className="py-3 font-medium text-slate-900">{r.name}</td>
                  <td className="py-3 text-slate-700">{r.value}</td>
                  <td className="py-3 text-slate-500">{r.normal}</td>
                  <td className="py-3">
                    <StatusBadge level={r.status} label={r.status.charAt(0).toUpperCase() + r.status.slice(1)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 bg-red-50 border-l-4 border-red-500 rounded-lg p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="font-semibold text-red-900 text-sm">Abnormal results detected</div>
            <div className="text-sm text-red-800">Notify Dr. Mansour and send secure report?</div>
          </div>
          {notified ? (
            <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium bg-emerald-100 text-emerald-700">
              <CheckCircle className="w-4 h-4" /> Dr. Mansour notified
            </div>
          ) : (
            <button
              onClick={() => setNotified(true)}
              className="rounded-lg px-3 py-2 text-sm font-medium bg-red-600 text-white hover:bg-red-700"
            >
              Yes, Send Alert
            </button>
          )}
        </div>
      </Card>
    </div>
  );
}
