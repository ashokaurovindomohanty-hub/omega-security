import { Globe } from "lucide-react";
import { useState } from "react";

interface ThreatDot {
  id: string;
  cx: number;
  cy: number;
  label: string;
  location: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  timestamp: string;
  type: string;
}

const THREAT_DOTS: ThreatDot[] = [
  {
    id: "t1",
    cx: 51,
    cy: 28,
    label: "MOSCOW",
    location: "Russia",
    severity: "HIGH",
    timestamp: "02:14:33",
    type: "DDoS WAVE",
  },
  {
    id: "t2",
    cx: 75,
    cy: 38,
    label: "BEIJING",
    location: "China",
    severity: "CRITICAL",
    timestamp: "02:13:57",
    type: "INTRUSION PROBE",
  },
  {
    id: "t3",
    cx: 47,
    cy: 33,
    label: "KYIV",
    location: "Ukraine",
    severity: "HIGH",
    timestamp: "02:15:01",
    type: "APT INFILTRATION",
  },
  {
    id: "t4",
    cx: 74,
    cy: 48,
    label: "PYONGYANG",
    location: "N. Korea",
    severity: "CRITICAL",
    timestamp: "02:12:44",
    type: "ZERO-DAY EXPLOIT",
  },
  {
    id: "t5",
    cx: 58,
    cy: 36,
    label: "TEHRAN",
    location: "Iran",
    severity: "HIGH",
    timestamp: "02:11:20",
    type: "PAYLOAD ATTEMPT",
  },
  {
    id: "t6",
    cx: 22,
    cy: 36,
    label: "NEW YORK",
    location: "USA",
    severity: "MEDIUM",
    timestamp: "02:10:55",
    type: "ANOMALY SCAN",
  },
  {
    id: "t7",
    cx: 31,
    cy: 58,
    label: "BOGOTÁ",
    location: "Colombia",
    severity: "LOW",
    timestamp: "02:09:37",
    type: "PORT SWEEP",
  },
  {
    id: "t8",
    cx: 40,
    cy: 53,
    label: "LAGOS",
    location: "Nigeria",
    severity: "HIGH",
    timestamp: "02:08:12",
    type: "PHISHING NET",
  },
  {
    id: "t9",
    cx: 84,
    cy: 55,
    label: "SYDNEY",
    location: "Australia",
    severity: "LOW",
    timestamp: "02:07:48",
    type: "RECON SCAN",
  },
  {
    id: "t10",
    cx: 49,
    cy: 22,
    label: "ST. PETERSBURG",
    location: "Russia",
    severity: "CRITICAL",
    timestamp: "02:16:02",
    type: "BOTNET C2",
  },
  {
    id: "t11",
    cx: 70,
    cy: 30,
    label: "URUMQI",
    location: "China",
    severity: "HIGH",
    timestamp: "02:05:31",
    type: "DATA EXFIL",
  },
  {
    id: "t12",
    cx: 34,
    cy: 44,
    label: "ISTANBUL",
    location: "Turkey",
    severity: "MEDIUM",
    timestamp: "02:04:15",
    type: "RANSOMWARE SEED",
  },
];

const SEVERITY_COLORS: Record<"CRITICAL" | "HIGH" | "MEDIUM" | "LOW", string> =
  {
    CRITICAL: "#FF2222",
    HIGH: "#FF8800",
    MEDIUM: "#FFCC00",
    LOW: "#00BFFF",
  };

interface ContinentPath {
  id: string;
  d: string;
}

const CONTINENT_PATHS: ContinentPath[] = [
  {
    id: "north-america",
    d: "M 14,14 L 18,12 L 22,13 L 28,12 L 30,16 L 32,20 L 30,26 L 26,28 L 24,32 L 20,36 L 18,34 L 16,28 L 14,22 Z",
  },
  {
    id: "south-america",
    d: "M 24,40 L 28,38 L 32,42 L 34,48 L 32,54 L 28,56 L 24,52 L 22,46 Z",
  },
  {
    id: "europe",
    d: "M 44,16 L 50,14 L 54,16 L 54,20 L 52,24 L 48,26 L 44,24 L 42,20 Z",
  },
  {
    id: "africa",
    d: "M 44,26 L 50,24 L 54,26 L 56,32 L 56,44 L 52,50 L 46,50 L 40,44 L 38,36 L 40,28 Z",
  },
  {
    id: "asia",
    d: "M 54,12 L 62,10 L 72,10 L 82,12 L 86,16 L 88,22 L 84,26 L 80,28 L 76,24 L 70,26 L 66,24 L 62,26 L 58,24 L 56,20 Z",
  },
  {
    id: "southeast-asia",
    d: "M 70,28 L 76,26 L 80,30 L 78,36 L 74,38 L 70,34 L 68,30 Z",
  },
  {
    id: "australia",
    d: "M 76,46 L 84,44 L 88,48 L 88,54 L 82,56 L 76,54 L 74,50 Z",
  },
];

export function KingsEyePanel() {
  const [active, setActive] = useState(false);
  const [tooltip, setTooltip] = useState<ThreatDot | null>(null);

  function handleActivate() {
    setActive(true);
    setTimeout(() => setActive(false), 800);
  }

  return (
    <div
      className="relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300"
      role="button"
      tabIndex={0}
      aria-label="King's Eye global threat map panel — click to activate"
      style={{
        background: "rgba(5,12,35,0.92)",
        border: active
          ? "1px solid rgba(0,255,255,0.7)"
          : "1px solid rgba(0,191,255,0.25)",
        boxShadow: active
          ? "0 0 40px rgba(0,255,255,0.4), inset 0 0 20px rgba(0,0,0,0.5)"
          : "0 0 12px rgba(0,191,255,0.1), inset 0 0 20px rgba(0,0,0,0.6)",
      }}
      onClick={handleActivate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleActivate();
      }}
      data-ocid="panel-kings-eye"
    >
      {active && (
        <div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(0,255,255,0.18) 0%, transparent 70%)",
            animation: "face-pulse 0.6s ease-out",
          }}
        />
      )}

      <div
        style={{
          height: 2,
          background:
            "linear-gradient(90deg, transparent, #1E90FF, #00BFFF, transparent)",
          boxShadow: "0 0 8px rgba(0,191,255,0.6)",
        }}
      />

      <div
        className="flex items-center justify-between px-3 py-2"
        style={{ borderBottom: "1px solid rgba(0,191,255,0.12)" }}
      >
        <div className="flex items-center gap-2">
          <Globe
            className="w-3.5 h-3.5"
            style={{
              color: "#00BFFF",
              filter: "drop-shadow(0 0 4px rgba(0,191,255,0.8))",
            }}
          />
          <span
            className="font-mono font-bold tracking-widest text-xs"
            style={{ color: "#00BFFF" }}
          >
            KING'S EYE — GLOBAL THREAT VISIBILITY
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span
            className="font-mono text-xs"
            style={{ color: "rgba(0,191,255,0.5)", fontSize: 9 }}
          >
            GLOBAL: <span style={{ color: "#00FF88" }}>ONLINE</span>
          </span>
          <span
            className="font-mono text-xs"
            style={{ color: "rgba(0,191,255,0.5)", fontSize: 9 }}
          >
            OMEGA COMMAND: <span style={{ color: "#00BFFF" }}>ACTIVE</span>
          </span>
        </div>
      </div>

      <div className="p-3">
        {/* World Map SVG */}
        <div className="relative w-full" style={{ paddingBottom: "46%" }}>
          <div className="absolute inset-0">
            <svg
              viewBox="0 0 100 46"
              className="w-full h-full"
              role="img"
              aria-label="World threat map with active threat indicators"
              style={{ display: "block" }}
            >
              <title>Global threat map</title>

              {/* Ocean background */}
              <rect
                x={0}
                y={0}
                width={100}
                height={46}
                fill="rgba(0,10,30,0.8)"
                rx={2}
              />

              {/* Grid */}
              {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((x) => (
                <line
                  key={`v${x}`}
                  x1={x}
                  y1={0}
                  x2={x}
                  y2={46}
                  stroke="rgba(0,191,255,0.04)"
                  strokeWidth="0.3"
                />
              ))}
              {[9, 18, 27, 36].map((y) => (
                <line
                  key={`h${y}`}
                  x1={0}
                  y1={y}
                  x2={100}
                  y2={y}
                  stroke="rgba(0,191,255,0.04)"
                  strokeWidth="0.3"
                />
              ))}

              {/* Equator */}
              <line
                x1={0}
                y1={23}
                x2={100}
                y2={23}
                stroke="rgba(0,191,255,0.1)"
                strokeWidth="0.4"
                strokeDasharray="1 2"
              />

              {/* Continents */}
              {CONTINENT_PATHS.map((c) => (
                <path
                  key={c.id}
                  d={c.d}
                  fill="rgba(0,60,120,0.35)"
                  stroke="rgba(0,191,255,0.25)"
                  strokeWidth="0.4"
                />
              ))}

              {/* Threat dots */}
              {THREAT_DOTS.map((dot) => {
                const color = SEVERITY_COLORS[dot.severity];
                return (
                  <g key={dot.id}>
                    {/* Expanding ping rings */}
                    <circle
                      cx={dot.cx}
                      cy={dot.cy}
                      r={3}
                      fill="none"
                      stroke={color}
                      strokeWidth="0.4"
                      opacity={0.7}
                      style={{
                        animation: "threat-ping 1.8s ease-out infinite",
                      }}
                    />
                    <circle
                      cx={dot.cx}
                      cy={dot.cy}
                      r={1.8}
                      fill="none"
                      stroke={color}
                      strokeWidth="0.5"
                      opacity={0.5}
                      style={{
                        animation: "threat-ping 2.2s ease-out infinite 0.4s",
                      }}
                    />
                    {/* Core dot */}
                    <circle
                      cx={dot.cx}
                      cy={dot.cy}
                      r={1.2}
                      fill={color}
                      role="button"
                      tabIndex={0}
                      style={{
                        filter: `drop-shadow(0 0 2px ${color})`,
                        cursor: "pointer",
                        animation: "anomaly-pulse 2s ease-in-out infinite",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setTooltip(tooltip?.id === dot.id ? null : dot);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.stopPropagation();
                          setTooltip(tooltip?.id === dot.id ? null : dot);
                        }
                      }}
                      data-ocid={`threat-dot-${dot.id}`}
                      aria-label={`${dot.severity} threat at ${dot.label}`}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Tooltip */}
            {tooltip && (
              <div
                className="absolute z-10 rounded pointer-events-none"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -60%)",
                  background: "rgba(0,5,20,0.97)",
                  border: `1px solid ${SEVERITY_COLORS[tooltip.severity]}55`,
                  boxShadow: `0 0 16px ${SEVERITY_COLORS[tooltip.severity]}33`,
                  padding: "8px 12px",
                  minWidth: 160,
                }}
              >
                <div
                  className="font-mono font-black text-xs tracking-wider"
                  style={{ color: SEVERITY_COLORS[tooltip.severity] }}
                >
                  {tooltip.label}, {tooltip.location}
                </div>
                <div
                  className="font-mono text-xs mt-0.5"
                  style={{ color: "rgba(0,191,255,0.7)", fontSize: 9 }}
                >
                  {tooltip.type}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className="font-mono text-xs px-1.5 py-0.5 rounded"
                    style={{
                      background: `${SEVERITY_COLORS[tooltip.severity]}22`,
                      border: `1px solid ${SEVERITY_COLORS[tooltip.severity]}44`,
                      color: SEVERITY_COLORS[tooltip.severity],
                      fontSize: 8,
                    }}
                  >
                    {tooltip.severity}
                  </span>
                  <span
                    className="font-mono text-xs"
                    style={{ color: "rgba(0,191,255,0.4)", fontSize: 8 }}
                  >
                    {tooltip.timestamp} UTC
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-2">
          {(["CRITICAL", "HIGH", "MEDIUM", "LOW"] as const).map((sev) => (
            <div key={sev} className="flex items-center gap-1">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: SEVERITY_COLORS[sev],
                  boxShadow: `0 0 4px ${SEVERITY_COLORS[sev]}`,
                }}
              />
              <span
                className="font-mono text-xs"
                style={{ color: "rgba(0,191,255,0.4)", fontSize: 8 }}
              >
                {sev}
              </span>
            </div>
          ))}
          <span
            className="ml-auto font-mono text-xs"
            style={{ color: "rgba(0,191,255,0.3)", fontSize: 8 }}
          >
            {THREAT_DOTS.length} ACTIVE THREATS
          </span>
        </div>
      </div>
    </div>
  );
}
