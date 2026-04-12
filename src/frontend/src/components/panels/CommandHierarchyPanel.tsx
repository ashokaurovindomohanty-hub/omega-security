import { Brain, Crown, Shield } from "lucide-react";
import { useState } from "react";

interface CommandLevel {
  label: string;
  subLabel: string;
  rank: string;
  color: string;
  glowRgb: string;
  icon: React.ReactNode;
  animDuration: string;
}

const LEVELS: CommandLevel[] = [
  {
    label: "YOUR VOICE / INPUT",
    subLabel: "SUPREME COMMANDER",
    rank: "PRIMARY",
    color: "#FFD700",
    glowRgb: "255,215,0",
    icon: <Crown className="w-4 h-4" />,
    animDuration: "1.8s",
  },
  {
    label: "AI OVERRIDE",
    subLabel: "NEURAL CONTROLLER",
    rank: "SECONDARY",
    color: "#00BFFF",
    glowRgb: "0,191,255",
    icon: <Brain className="w-4 h-4" />,
    animDuration: "2.2s",
  },
  {
    label: "MISA BACKUP AI",
    subLabel: "TERTIARY FAILSAFE",
    rank: "TERTIARY",
    color: "#C0C0C0",
    glowRgb: "192,192,192",
    icon: <Shield className="w-4 h-4" />,
    animDuration: "2.8s",
  },
];

export function CommandHierarchyPanel() {
  const [active, setActive] = useState(false);

  function handleActivate() {
    setActive(true);
    setTimeout(() => setActive(false), 800);
  }

  return (
    <div
      className="relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300"
      role="button"
      tabIndex={0}
      aria-label="Command Hierarchy panel — click to activate"
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
      data-ocid="panel-command-hierarchy"
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
            "linear-gradient(90deg, transparent, #FFD700, #00BFFF, transparent)",
          boxShadow: "0 0 8px rgba(255,215,0,0.4)",
        }}
      />

      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ borderBottom: "1px solid rgba(0,191,255,0.12)" }}
      >
        <Crown
          className="w-3.5 h-3.5"
          style={{
            color: "#FFD700",
            filter: "drop-shadow(0 0 4px rgba(255,215,0,0.8))",
          }}
        />
        <span
          className="font-mono font-bold tracking-widest text-xs"
          style={{ color: "#00BFFF" }}
        >
          COMMAND HIERARCHY
        </span>
      </div>

      <div className="p-3 flex flex-col gap-2.5">
        {LEVELS.map((level, idx) => (
          <div
            key={level.rank}
            className="relative rounded overflow-hidden"
            style={{
              background: `rgba(${level.glowRgb},0.06)`,
              border: `1px solid rgba(${level.glowRgb},0.25)`,
              boxShadow: `0 0 8px rgba(${level.glowRgb},0.1)`,
            }}
          >
            {/* Shimmer bar for PRIMARY */}
            {idx === 0 && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,215,0,0.08) 50%, transparent 100%)",
                  animation: "halo-rotate 3s linear infinite",
                  backgroundSize: "200% 100%",
                }}
              />
            )}

            <div className="flex items-center gap-2.5 px-3 py-2.5">
              {/* Icon */}
              <div
                className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded"
                style={{
                  background: `rgba(${level.glowRgb},0.12)`,
                  border: `1px solid rgba(${level.glowRgb},0.3)`,
                  color: level.color,
                  filter: `drop-shadow(0 0 4px rgba(${level.glowRgb},0.6))`,
                }}
              >
                {level.icon}
              </div>

              {/* Labels */}
              <div className="flex-1 min-w-0">
                <div
                  className="font-mono font-black text-xs tracking-wider truncate"
                  style={{
                    color: level.color,
                    textShadow: `0 0 10px rgba(${level.glowRgb},0.7)`,
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {level.label}
                </div>
                <div
                  className="font-mono text-xs"
                  style={{ color: `rgba(${level.glowRgb},0.45)`, fontSize: 9 }}
                >
                  {level.subLabel}
                </div>
              </div>

              {/* Rank badge + pulse */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <span
                  className="font-mono font-bold text-xs px-1.5 py-0.5 rounded"
                  style={{
                    background: `rgba(${level.glowRgb},0.12)`,
                    border: `1px solid rgba(${level.glowRgb},0.3)`,
                    color: level.color,
                    fontSize: 8,
                  }}
                >
                  {level.rank}
                </span>
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: level.color,
                    boxShadow: `0 0 6px rgba(${level.glowRgb},0.9), 0 0 12px rgba(${level.glowRgb},0.5)`,
                    animation: `anomaly-pulse ${level.animDuration} ease-in-out infinite`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
