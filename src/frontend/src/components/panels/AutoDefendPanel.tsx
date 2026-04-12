import { Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const STAGES = [
  "MONITORING",
  "ANALYZING",
  "RESPONDING",
  "NEUTRALIZED",
] as const;
type Stage = (typeof STAGES)[number];

const STAGE_COLORS: Record<Stage, string> = {
  MONITORING: "#00BFFF",
  ANALYZING: "#FFD700",
  RESPONDING: "#FF8C00",
  NEUTRALIZED: "#00FF88",
};

const STATUS_LINES = [
  { label: "Auto-generates defenses", icon: "✓", key: "defenses" },
  { label: "Launches targeted counterattacks", icon: "✓", key: "attacks" },
  {
    label: "Evolves strategies based on threat intel",
    icon: "✓",
    key: "evolves",
  },
];

export function AutoDefendPanel() {
  const [active, setActive] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);

  function handleActivate() {
    setActive(true);
    setTimeout(() => setActive(false), 800);
  }

  // Cycle through stages every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setStageIndex((i) => (i + 1) % STAGES.length);
      progressRef.current = 0;
      setProgress(0);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Continuously animate progress bar
  useEffect(() => {
    const tick = setInterval(() => {
      progressRef.current = Math.min(100, progressRef.current + 1.5);
      setProgress(progressRef.current);
    }, 45);
    return () => clearInterval(tick);
  }, []);

  const stage = STAGES[stageIndex];
  const stageColor = STAGE_COLORS[stage];

  return (
    <div
      className="relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300"
      role="button"
      tabIndex={0}
      aria-label="Auto-Defend / Auto-Strike panel — click to activate"
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
      data-ocid="panel-auto-defend"
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
            "linear-gradient(90deg, transparent, #FF8C00, #00BFFF, transparent)",
          boxShadow: "0 0 8px rgba(0,191,255,0.4)",
        }}
      />

      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ borderBottom: "1px solid rgba(0,191,255,0.12)" }}
      >
        <Zap
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
          AUTO-DEFEND / AUTO-STRIKE
        </span>
      </div>

      <div className="p-3 flex flex-col gap-2.5">
        {/* Status lines */}
        {STATUS_LINES.map((line) => (
          <div
            key={line.key}
            className="flex items-center gap-2 rounded px-2 py-1.5"
            style={{
              background: "rgba(0,191,255,0.05)",
              border: "1px solid rgba(0,191,255,0.12)",
            }}
          >
            {/* LED indicator */}
            <div
              className="flex-shrink-0 w-1.5 h-1.5 rounded-full"
              style={{
                background: "#00FF88",
                boxShadow:
                  "0 0 6px rgba(0,255,136,0.9), 0 0 12px rgba(0,255,136,0.4)",
                animation: "anomaly-pulse 1.8s ease-in-out infinite",
              }}
            />
            <span
              className="font-mono text-xs flex-1"
              style={{ color: "rgba(0,191,255,0.7)", fontSize: 9.5 }}
            >
              {line.label}
            </span>
            <span
              className="font-mono font-bold text-xs"
              style={{ color: "#00FF88", fontSize: 9 }}
            >
              {line.icon}
            </span>
          </div>
        ))}

        {/* Threat Evolution progress */}
        <div className="mt-1">
          <div className="flex justify-between items-center mb-1.5">
            <span
              className="font-mono text-xs"
              style={{ color: "rgba(0,191,255,0.45)", fontSize: 9 }}
            >
              THREAT EVOLUTION
            </span>
            <span
              className="font-mono font-bold text-xs px-2 py-0.5 rounded"
              style={{
                color: stageColor,
                background: `${stageColor}18`,
                border: `1px solid ${stageColor}44`,
                fontSize: 9,
                textShadow: `0 0 6px ${stageColor}`,
                transition: "color 0.5s, background 0.5s",
              }}
            >
              {stage}
            </span>
          </div>

          {/* Stage progress bar */}
          <div
            className="w-full rounded-full overflow-hidden"
            style={{
              height: 5,
              background: "rgba(0,191,255,0.08)",
              border: "1px solid rgba(0,191,255,0.1)",
            }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: `linear-gradient(90deg, rgba(0,191,255,0.6), ${stageColor})`,
                boxShadow: `0 0 8px ${stageColor}88`,
                transition:
                  "width 0.1s linear, background 0.5s, box-shadow 0.5s",
              }}
            />
          </div>

          {/* Stage dots */}
          <div className="flex justify-between mt-1.5">
            {STAGES.map((s, i) => (
              <div key={s} className="flex flex-col items-center gap-0.5">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background:
                      i <= stageIndex
                        ? STAGE_COLORS[s]
                        : "rgba(0,191,255,0.15)",
                    boxShadow:
                      i === stageIndex ? `0 0 6px ${STAGE_COLORS[s]}` : "none",
                    transition: "background 0.3s, box-shadow 0.3s",
                  }}
                />
                <span
                  className="font-mono"
                  style={{
                    color:
                      i <= stageIndex ? STAGE_COLORS[s] : "rgba(0,191,255,0.2)",
                    fontSize: 6,
                  }}
                >
                  {s.slice(0, 3)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
