import { useId } from "react";
import { cx } from "../utils";

function RoundTablet({ color, accent, imprint, size, uid }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ display: "block" }}>
      <defs>
        <radialGradient id={`rg-${uid}`} cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="45%" stopColor={color} />
          <stop offset="100%" stopColor={accent} stopOpacity="0.9" />
        </radialGradient>
        <filter id={`sh-${uid}`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" />
          <feOffset dx="0" dy="3" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.25" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle cx="50" cy="50" r="38" fill={`url(#rg-${uid})`} filter={`url(#sh-${uid})`} stroke={accent} strokeOpacity="0.4" strokeWidth="0.5" />
      <line x1="15" y1="50" x2="85" y2="50" stroke={accent} strokeWidth="1.4" strokeOpacity="0.55" strokeLinecap="round" />
      {imprint && (
        <text x="50" y="40" textAnchor="middle" fill={accent} fontSize="8" fontWeight="700" opacity="0.7">
          {imprint}
        </text>
      )}
      <ellipse cx="38" cy="36" rx="13" ry="6" fill="white" opacity="0.4" />
    </svg>
  );
}

function OblongTablet({ color, accent, imprint, size, uid }) {
  return (
    <svg viewBox="0 0 120 80" width={size * 1.5} height={size} style={{ display: "block" }}>
      <defs>
        <linearGradient id={`og-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="50%" stopColor={color} />
          <stop offset="100%" stopColor={accent} stopOpacity="0.85" />
        </linearGradient>
        <filter id={`osh-${uid}`} x="-20%" y="-30%" width="140%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
          <feOffset dx="0" dy="3" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.25" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect
        x="10"
        y="20"
        width="100"
        height="40"
        rx="20"
        ry="20"
        fill={`url(#og-${uid})`}
        filter={`url(#osh-${uid})`}
        stroke={accent}
        strokeOpacity="0.4"
        strokeWidth="0.5"
      />
      <line x1="60" y1="24" x2="60" y2="56" stroke={accent} strokeWidth="1.2" strokeOpacity="0.5" strokeLinecap="round" />
      {imprint && (
        <text x="35" y="44" textAnchor="middle" fill={accent} fontSize="9" fontWeight="700" opacity="0.7">
          {imprint}
        </text>
      )}
      <ellipse cx="36" cy="28" rx="16" ry="4" fill="white" opacity="0.45" />
    </svg>
  );
}

function Capsule({ color, accent, imprint, size, uid }) {
  return (
    <svg viewBox="0 0 120 80" width={size * 1.5} height={size} style={{ display: "block" }}>
      <defs>
        <linearGradient id={`cg1-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
        <linearGradient id={`cg2-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.9" />
          <stop offset="100%" stopColor={accent} />
        </linearGradient>
        <filter id={`csh-${uid}`} x="-20%" y="-30%" width="140%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
          <feOffset dx="0" dy="3" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.25" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id={`clipL-${uid}`}>
          <rect x="10" y="20" width="50" height="40" />
        </clipPath>
        <clipPath id={`clipR-${uid}`}>
          <rect x="60" y="20" width="50" height="40" />
        </clipPath>
      </defs>
      <g filter={`url(#csh-${uid})`}>
        <rect x="10" y="20" width="100" height="40" rx="20" ry="20" fill={`url(#cg1-${uid})`} clipPath={`url(#clipL-${uid})`} />
        <rect x="10" y="20" width="100" height="40" rx="20" ry="20" fill={`url(#cg2-${uid})`} clipPath={`url(#clipR-${uid})`} />
        <line x1="60" y1="20" x2="60" y2="60" stroke="rgba(0,0,0,0.25)" strokeWidth="0.6" />
        <rect
          x="10"
          y="20"
          width="100"
          height="40"
          rx="20"
          ry="20"
          fill="none"
          stroke={accent}
          strokeOpacity="0.45"
          strokeWidth="0.5"
        />
      </g>
      {imprint && (
        <text x="85" y="44" textAnchor="middle" fill="white" fontSize="8" fontWeight="700" opacity="0.9">
          {imprint}
        </text>
      )}
      <ellipse cx="36" cy="28" rx="14" ry="4" fill="white" opacity="0.5" />
    </svg>
  );
}

export default function PillImage({
  shape = "round",
  color = "#F8FAFC",
  accent = "#CBD5E1",
  imprint,
  size = 64,
  discontinued = false,
  className = "",
}) {
  const uid = useId().replace(/:/g, "");
  const Shape =
    shape === "capsule" ? Capsule : shape === "oblong" ? OblongTablet : RoundTablet;

  return (
    <div
      className={cx(
        "relative inline-flex items-center justify-center",
        discontinued && "grayscale opacity-50",
        className
      )}
      style={{ minWidth: size }}
    >
      <Shape color={color} accent={accent} imprint={imprint} size={size} uid={uid} />
      {discontinued && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full opacity-80">
            <line x1="15" y1="15" x2="85" y2="85" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </div>
      )}
    </div>
  );
}
