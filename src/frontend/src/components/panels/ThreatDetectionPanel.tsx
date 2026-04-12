import { useOmegaStore } from "@/store/omegaStore";
import { Radio } from "lucide-react";
import { useState } from "react";

const NEURAL_NODES: [number, number][] = [
  [45, 35],
  [75, 40],
  [30, 55],
  [90, 60],
  [50, 78],
  [78, 72],
  [60, 48],
];

const CONNECTIONS: [number, number, number, number][] = [
  [45, 35, 75, 40],
  [75, 40, 90, 60],
  [30, 55, 50, 78],
  [50, 78, 78, 72],
  [45, 35, 30, 55],
  [60, 48, 75, 40],
  [60, 48, 50, 78],
];

export function ThreatDetectionPanel() {
  const [active, setActive] = useState(false);
  const { threatCount } = useOmegaStore();

  function handleActivate() {
    setActive(true);
    setTimeout(() => setActive(false), 800);
  }

  return (
    <div
      className="relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300"
      role="button"
      tabIndex={0}
      aria-label="AI-Powered Threat Detection panel — click to activate"
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
      data-ocid="panel-threat-detection"
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
            "linear-gradient(90deg, transparent, #00BFFF, #1E90FF, transparent)",
          boxShadow: "0 0 8px rgba(0,191,255,0.6)",
        }}
      />

      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ borderBottom: "1px solid rgba(0,191,255,0.12)" }}
      >
        <Radio
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
          AI-POWERED THREAT DETECTION
        </span>
      </div>

      <div className="p-3 flex flex-col items-center gap-2">
        {/* Radar SVG */}
        <div className="relative flex items-center justify-center">
          <svg
            width={130}
            height={130}
            viewBox="0 0 130 130"
            role="img"
            aria-label="Neural network radar display"
          >
            <title>Neural network radar</title>
            <defs>
              <radialGradient id="radarBg" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(0,191,255,0.08)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
              <radialGradient id="sweepGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(0,191,255,0.25)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>

            {/* Background fill */}
            <circle cx={65} cy={65} r={58} fill="url(#radarBg)" />

            {/* Radar rings */}
            {[18, 30, 42, 54].map((r) => (
              <circle
                key={r}
                cx={65}
                cy={65}
                r={r}
                fill="none"
                stroke="rgba(0,191,255,0.18)"
                strokeWidth="0.7"
              />
            ))}

            {/* Cross hairs */}
            <line
              x1={65}
              y1={10}
              x2={65}
              y2={120}
              stroke="rgba(0,191,255,0.1)"
              strokeWidth="0.5"
            />
            <line
              x1={10}
              y1={65}
              x2={120}
              y2={65}
              stroke="rgba(0,191,255,0.1)"
              strokeWidth="0.5"
            />
            <line
              x1={25}
              y1={25}
              x2={105}
              y2={105}
              stroke="rgba(0,191,255,0.07)"
              strokeWidth="0.4"
            />
            <line
              x1={105}
              y1={25}
              x2={25}
              y2={105}
              stroke="rgba(0,191,255,0.07)"
              strokeWidth="0.4"
            />

            {/* Radar sweep sector */}
            <path
              d="M65,65 L117,42 A58,58 0 0,1 120,65 Z"
              fill="url(#sweepGrad)"
              style={{
                transformOrigin: "65px 65px",
                animation: "radar-sweep 3s linear infinite",
              }}
            />

            {/* Neural connections */}
            {CONNECTIONS.map(([x1, y1, x2, y2]) => (
              <line
                key={`${x1}-${y1}-${x2}-${y2}`}
                x1={x1 + 2}
                y1={y1 + 2}
                x2={x2 + 2}
                y2={y2 + 2}
                stroke="rgba(0,191,255,0.22)"
                strokeWidth="0.7"
              />
            ))}

            {/* Neural nodes */}
            {NEURAL_NODES.map(([cx, cy], i) => (
              <g key={`${cx}-${cy}`}>
                <circle
                  cx={cx + 2}
                  cy={cy + 2}
                  r={4}
                  fill="none"
                  stroke="rgba(0,191,255,0.3)"
                  strokeWidth="0.5"
                  style={{
                    animation: `anomaly-pulse ${1.5 + i * 0.25}s ease-in-out infinite`,
                  }}
                />
                <circle
                  cx={cx + 2}
                  cy={cy + 2}
                  r={2.2}
                  fill="#00BFFF"
                  opacity={0.8}
                  style={{
                    filter: "drop-shadow(0 0 3px rgba(0,191,255,0.9))",
                    animation: `anomaly-pulse ${1.5 + i * 0.25}s ease-in-out infinite`,
                  }}
                />
              </g>
            ))}
          </svg>
        </div>

        {/* Subtitle */}
        <div
          className="font-mono text-xs tracking-wider text-center"
          style={{ color: "rgba(0,191,255,0.65)" }}
        >
          NEURAL NET SURVEILLANCE ACTIVE
        </div>

        {/* Threat count */}
        <div
          className="w-full flex items-center justify-between rounded px-2 py-1"
          style={{
            background: "rgba(0,191,255,0.07)",
            border: "1px solid rgba(0,191,255,0.2)",
          }}
        >
          <span
            className="font-mono text-xs"
            style={{ color: "rgba(0,191,255,0.5)", fontSize: 9 }}
          >
            THREATS DETECTED
          </span>
          <span
            className="font-mono font-black text-sm"
            style={{
              color: "#00BFFF",
              textShadow: "0 0 8px rgba(0,191,255,0.8)",
              animation: "anomaly-pulse 2s ease-in-out infinite",
            }}
          >
            {threatCount.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
