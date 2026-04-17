import { useId } from "react";
import { cx } from "../utils";

// ── LINE CHART ───────────────────────────────────────────────────
export function LineChart({ series, xLabels = [], yMin, yMax, unit = "", height = 220, fill = false }) {
  const uid = useId().replace(/:/g, "");
  const width = 640;
  const padding = { top: 20, right: 20, bottom: 36, left: 44 };
  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;

  const allY = series.flatMap((s) => s.points.map((p) => p.y));
  const minY = yMin ?? Math.floor(Math.min(...allY) - 1);
  const maxY = yMax ?? Math.ceil(Math.max(...allY) + 1);
  const range = maxY - minY || 1;
  const n = xLabels.length || series[0]?.points.length || 1;

  const xForIdx = (i) => padding.left + (innerW * i) / Math.max(n - 1, 1);
  const yForValue = (v) => padding.top + innerH - ((v - minY) / range) * innerH;

  const gridCount = 4;
  const gridValues = Array.from({ length: gridCount + 1 }, (_, i) => minY + (range * i) / gridCount);

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto min-w-[420px]" role="img">
        {gridValues.map((g, i) => {
          const y = yForValue(g);
          return (
            <g key={i}>
              <line x1={padding.left} x2={padding.left + innerW} y1={y} y2={y} stroke="#E2E8F0" strokeDasharray="3 3" />
              <text x={padding.left - 8} y={y + 4} textAnchor="end" fill="#94A3B8" fontSize="10">
                {Number.isInteger(g) ? g : g.toFixed(1)}
                {unit}
              </text>
            </g>
          );
        })}
        {xLabels.map((lbl, i) => (
          <text key={i} x={xForIdx(i)} y={padding.top + innerH + 20} textAnchor="middle" fill="#94A3B8" fontSize="10">
            {lbl}
          </text>
        ))}
        {series.map((s, si) => {
          const pts = s.points.map((p, i) => `${xForIdx(i)},${yForValue(p.y)}`).join(" ");
          const areaId = `area-${uid}-${si}`;
          return (
            <g key={si}>
              {fill && (
                <>
                  <defs>
                    <linearGradient id={areaId} x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor={s.color} stopOpacity="0.25" />
                      <stop offset="100%" stopColor={s.color} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <polygon
                    fill={`url(#${areaId})`}
                    points={`${padding.left},${padding.top + innerH} ${pts} ${padding.left + innerW},${padding.top + innerH}`}
                  />
                </>
              )}
              <polyline fill="none" stroke={s.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={pts} />
              {s.points.map((p, i) => (
                <circle key={i} cx={xForIdx(i)} cy={yForValue(p.y)} r={3.5} fill="#fff" stroke={s.color} strokeWidth="2" />
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ── DONUT CHART ──────────────────────────────────────────────────
export function DonutChart({ data, size = 180, thickness = 22, centerTop = "", centerBottom = "" }) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const r = size / 2;
  const innerR = r - thickness;
  const cx_ = r;
  const cy = r;

  let cumulative = 0;
  const arcs = data.map((d) => {
    const startAngle = (cumulative / total) * Math.PI * 2 - Math.PI / 2;
    cumulative += d.value;
    const endAngle = (cumulative / total) * Math.PI * 2 - Math.PI / 2;
    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
    const x1 = cx_ + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx_ + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    const ix1 = cx_ + innerR * Math.cos(endAngle);
    const iy1 = cy + innerR * Math.sin(endAngle);
    const ix2 = cx_ + innerR * Math.cos(startAngle);
    const iy2 = cy + innerR * Math.sin(startAngle);
    const path = [
      `M ${x1} ${y1}`,
      `A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`,
      `L ${ix1} ${iy1}`,
      `A ${innerR} ${innerR} 0 ${largeArc} 0 ${ix2} ${iy2}`,
      "Z",
    ].join(" ");
    return { path, color: d.color };
  });

  return (
    <div className="flex items-center gap-5 flex-wrap">
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
          {arcs.map((a, i) => (
            <path key={i} d={a.path} fill={a.color} />
          ))}
          <circle cx={cx_} cy={cy} r={innerR - 1} fill="white" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold text-slate-900 leading-none">{centerTop}</div>
          <div className="text-xs text-slate-500 mt-1">{centerBottom}</div>
        </div>
      </div>
      <div className="space-y-2 flex-1 min-w-[140px]">
        {data.map((d) => {
          const pct = Math.round((d.value / total) * 100);
          return (
            <div key={d.label} className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
              <span className="text-sm text-slate-700 flex-1">{d.label}</span>
              <span className="text-sm font-semibold text-slate-900">{pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── STACKED BAR CHART ────────────────────────────────────────────
export function StackedBarChart({ data, keys, colors, unit = "" }) {
  const width = 560;
  const height = 220;
  const padding = { top: 20, right: 20, bottom: 36, left: 40 };
  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;
  const maxTotal = Math.max(...data.map((d) => keys.reduce((s, k) => s + d[k], 0))) || 1;
  const barWidth = innerW / data.length - 12;

  const gridCount = 4;
  const gridValues = Array.from({ length: gridCount + 1 }, (_, i) => (maxTotal * i) / gridCount);

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto min-w-[420px]">
        {gridValues.map((g, i) => {
          const y = padding.top + innerH - (g / maxTotal) * innerH;
          return (
            <g key={i}>
              <line x1={padding.left} x2={padding.left + innerW} y1={y} y2={y} stroke="#E2E8F0" strokeDasharray="3 3" />
              <text x={padding.left - 6} y={y + 4} textAnchor="end" fill="#94A3B8" fontSize="10">
                {Math.round(g)}
                {unit}
              </text>
            </g>
          );
        })}

        {data.map((d, i) => {
          const x = padding.left + (innerW / data.length) * i + 6;
          let currentY = padding.top + innerH;
          return (
            <g key={i}>
              {keys.map((k, ki) => {
                const h = (d[k] / maxTotal) * innerH;
                currentY -= h;
                return (
                  <rect
                    key={k}
                    x={x}
                    y={currentY}
                    width={barWidth}
                    height={h}
                    fill={colors[ki]}
                    rx={ki === keys.length - 1 ? 4 : 0}
                  />
                );
              })}
              <text x={x + barWidth / 2} y={padding.top + innerH + 20} textAnchor="middle" fill="#94A3B8" fontSize="10">
                {d.day}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ── READMISSION CHART ────────────────────────────────────────────
export function ReadmissionChart({ data }) {
  const width = 620;
  const height = 260;
  const padding = { top: 30, right: 30, bottom: 46, left: 50 };
  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;
  const maxY = 25;
  const gridLines = [0, 5, 10, 15, 20, 25];
  const barGap = 20;
  const barWidth = (innerW - barGap * (data.length - 1)) / data.length;
  const lastDelta = data.length >= 2 ? (data[data.length - 2].rate - data[data.length - 1].rate).toFixed(1) : 0;

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto min-w-[500px]">
        {gridLines.map((g) => {
          const y = padding.top + innerH - (g / maxY) * innerH;
          return (
            <g key={g}>
              <line x1={padding.left} x2={padding.left + innerW} y1={y} y2={y} stroke="#E2E8F0" strokeDasharray="3 3" />
              <text x={padding.left - 8} y={y + 4} textAnchor="end" fill="#94A3B8" fontSize="11">
                {g}%
              </text>
            </g>
          );
        })}
        {data.map((d, i) => {
          const x = padding.left + i * (barWidth + barGap);
          const barH = (d.rate / maxY) * innerH;
          const y = padding.top + innerH - barH;
          const isLast = i === data.length - 1;
          const fill = isLast ? "#2563EB" : "#CBD5E1";
          return (
            <g key={d.month}>
              <rect x={x} y={y} width={barWidth} height={barH} fill={fill} rx="6" />
              <text
                x={x + barWidth / 2}
                y={y - 8}
                textAnchor="middle"
                fill={isLast ? "#1D4ED8" : "#64748B"}
                fontSize="12"
                fontWeight="600"
              >
                {d.rate}%
              </text>
              <text x={x + barWidth / 2} y={padding.top + innerH + 22} textAnchor="middle" fill="#64748B" fontSize="12">
                {d.month}
              </text>
            </g>
          );
        })}
        <g>
          <rect x={width - padding.right - 150} y={padding.top} width="140" height="28" rx="14" fill="#ECFDF5" stroke="#A7F3D0" />
          <text x={width - padding.right - 80} y={padding.top + 18} textAnchor="middle" fill="#047857" fontSize="12" fontWeight="600">
            ↓ {lastDelta}% vs last month
          </text>
        </g>
      </svg>
    </div>
  );
}
