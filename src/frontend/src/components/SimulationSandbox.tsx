import { useOmegaStore } from "@/store/omegaStore";
import type { ThreatSeverity } from "@/store/omegaStore";
import { AlertTriangle, RotateCcw, X, Zap } from "lucide-react";
import { useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SimulationSandboxProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SimLevel {
  id: ThreatSeverity;
  label: string;
  color: string;
  glowColor: string;
  borderColor: string;
  bgTint: string;
  description: string;
  pulse?: boolean;
}

// ─── Config ───────────────────────────────────────────────────────────────────

const SIM_LEVELS: SimLevel[] = [
  {
    id: "LOW",
    label: "LOW",
    color: "#00ff88",
    glowColor: "rgba(0,255,136,0.5)",
    borderColor: "rgba(0,255,136,0.4)",
    bgTint: "rgba(0,255,136,0.04)",
    description: "+50 threats · minor anomaly spike",
  },
  {
    id: "MED",
    label: "MED",
    color: "#ffd700",
    glowColor: "rgba(255,215,0,0.5)",
    borderColor: "rgba(255,215,0,0.4)",
    bgTint: "rgba(255,215,0,0.04)",
    description: "+150 threats · heightened scanning",
  },
  {
    id: "HIGH",
    label: "HIGH",
    color: "#ff6600",
    glowColor: "rgba(255,102,0,0.5)",
    borderColor: "rgba(255,102,0,0.4)",
    bgTint: "rgba(255,102,0,0.04)",
    description: "+500 threats · firewall stress",
  },
  {
    id: "CRITICAL",
    label: "CRITICAL",
    color: "#ff0033",
    glowColor: "rgba(255,0,51,0.6)",
    borderColor: "rgba(255,0,51,0.5)",
    bgTint: "rgba(255,0,51,0.08)",
    description: "+1000 threats · cascade protocol",
    pulse: true,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function SimulationSandbox({ isOpen, onClose }: SimulationSandboxProps) {
  const simLevel = useOmegaStore((s) => s.simLevel);
  const setSimLevel = useOmegaStore((s) => s.setSimLevel);
  const resetSim = useOmegaStore((s) => s.resetSim);
  const overlayRef = useRef<HTMLDivElement>(null);

  const isCritical = simLevel === "CRITICAL";

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  if (!isOpen) return null;

  const activeLevelConfig = SIM_LEVELS.find((l) => l.id === simLevel);

  return (
    <div
      ref={overlayRef}
      data-ocid="simulation_sandbox.dialog"
      onClick={handleBackdropClick}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
      role="presentation"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(8px)",
        background: isCritical ? "rgba(40,0,8,0.88)" : "rgba(4,6,20,0.85)",
        transition: "background 0.4s ease",
        padding: "1rem",
      }}
    >
      {/* Scanline overlay inside modal backdrop */}
      <div
        className="scan-line"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Threat Simulation Sandbox"
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "540px",
          borderRadius: "12px",
          background: isCritical
            ? "linear-gradient(135deg, #1a0004 0%, #0d0010 50%, #0a0e27 100%)"
            : "linear-gradient(135deg, #0d1235 0%, #080c1e 60%, #0a0e27 100%)",
          border: isCritical
            ? "1px solid rgba(255,0,51,0.55)"
            : "1px solid rgba(0,191,255,0.3)",
          boxShadow: isCritical
            ? "0 0 40px rgba(255,0,51,0.35), 0 0 80px rgba(255,0,51,0.15), inset 0 0 30px rgba(0,0,0,0.7)"
            : "0 0 40px rgba(0,191,255,0.2), 0 0 80px rgba(30,144,255,0.1), inset 0 0 30px rgba(0,0,0,0.7)",
          transition: "all 0.4s ease",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "1.25rem 1.5rem 1rem",
            borderBottom: isCritical
              ? "1px solid rgba(255,0,51,0.3)"
              : "1px solid rgba(0,191,255,0.15)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "0.75rem",
            }}
          >
            <AlertTriangle
              size={22}
              style={{
                color: isCritical ? "#ff0033" : "#ffd700",
                filter: isCritical
                  ? "drop-shadow(0 0 8px rgba(255,0,51,0.8))"
                  : "drop-shadow(0 0 8px rgba(255,215,0,0.7))",
                marginTop: "2px",
                flexShrink: 0,
              }}
            />
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.1rem",
                  fontWeight: 900,
                  letterSpacing: "0.12em",
                  color: isCritical ? "#ff4466" : "#00bfff",
                  textShadow: isCritical
                    ? "0 0 12px rgba(255,0,51,0.7), 0 0 30px rgba(255,0,51,0.3)"
                    : "0 0 12px rgba(0,191,255,0.6), 0 0 30px rgba(0,191,255,0.3)",
                  margin: 0,
                }}
              >
                THREAT SIMULATION SANDBOX
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  color: "rgba(160,180,220,0.7)",
                  letterSpacing: "0.18em",
                  margin: "4px 0 0",
                }}
              >
                CONTROLLED ENVIRONMENT — REAL REACTIONS
              </p>
            </div>
          </div>

          <button
            type="button"
            data-ocid="simulation_sandbox.close_button"
            onClick={onClose}
            aria-label="Close simulation sandbox"
            style={{
              background: "transparent",
              border: "1px solid rgba(0,191,255,0.2)",
              borderRadius: "6px",
              padding: "4px 6px",
              cursor: "pointer",
              color: "rgba(0,191,255,0.7)",
              transition: "all 0.2s ease",
              flexShrink: 0,
              lineHeight: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(0,191,255,0.12)";
              e.currentTarget.style.color = "#00bfff";
              e.currentTarget.style.borderColor = "rgba(0,191,255,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "rgba(0,191,255,0.7)";
              e.currentTarget.style.borderColor = "rgba(0,191,255,0.2)";
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Current Level Indicator */}
        <div
          style={{
            padding: "0.875rem 1.5rem",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              color: "rgba(140,160,200,0.7)",
              letterSpacing: "0.15em",
            }}
          >
            ACTIVE LEVEL:
          </span>
          {simLevel && activeLevelConfig ? (
            <span
              data-ocid="simulation_sandbox.active_level"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                color: activeLevelConfig.color,
                background: activeLevelConfig.bgTint,
                border: `1px solid ${activeLevelConfig.borderColor}`,
                boxShadow: `0 0 10px ${activeLevelConfig.glowColor}, 0 0 20px ${activeLevelConfig.glowColor.replace("0.5", "0.2")}`,
                padding: "2px 10px",
                borderRadius: "4px",
                animation: activeLevelConfig.pulse
                  ? "anomaly-pulse 1s ease-in-out infinite"
                  : "none",
              }}
            >
              ● {simLevel}
            </span>
          ) : (
            <span
              data-ocid="simulation_sandbox.active_level"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "rgba(100,120,160,0.5)",
                letterSpacing: "0.1em",
              }}
            >
              — IDLE —
            </span>
          )}
        </div>

        {/* 2×2 Escalation Grid */}
        <div
          style={{
            padding: "1.25rem 1.5rem",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.875rem",
          }}
        >
          {SIM_LEVELS.map((level, idx) => {
            const isActive = simLevel === level.id;
            return (
              <button
                type="button"
                key={level.id}
                data-ocid={`simulation_sandbox.level_button.${idx + 1}`}
                onClick={() => setSimLevel(level.id)}
                style={{
                  position: "relative",
                  background: isActive
                    ? level.bgTint
                    : "rgba(255,255,255,0.02)",
                  border: isActive
                    ? `1px solid ${level.borderColor}`
                    : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "8px",
                  padding: "0.875rem 1rem",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.25s ease",
                  boxShadow: isActive
                    ? `0 0 16px ${level.glowColor}, inset 0 0 12px rgba(0,0,0,0.5)`
                    : "inset 0 0 12px rgba(0,0,0,0.4)",
                  animation:
                    isActive && level.pulse
                      ? "anomaly-pulse 1s ease-in-out infinite"
                      : "none",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = level.bgTint;
                    e.currentTarget.style.borderColor = level.borderColor;
                    e.currentTarget.style.boxShadow = `0 0 12px ${level.glowColor.replace("0.5", "0.3")}`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.08)";
                    e.currentTarget.style.boxShadow =
                      "inset 0 0 12px rgba(0,0,0,0.4)";
                  }
                }}
              >
                {/* Active indicator line */}
                {isActive && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "2px",
                      background: `linear-gradient(90deg, transparent, ${level.color}, transparent)`,
                    }}
                  />
                )}

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    marginBottom: "6px",
                  }}
                >
                  <Zap
                    size={13}
                    style={{
                      color: level.color,
                      filter: `drop-shadow(0 0 4px ${level.glowColor})`,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.82rem",
                      fontWeight: 800,
                      letterSpacing: "0.18em",
                      color: level.color,
                      textShadow: `0 0 8px ${level.glowColor}`,
                    }}
                  >
                    {level.label}
                  </span>
                </div>

                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.62rem",
                    color: "rgba(160,180,210,0.65)",
                    letterSpacing: "0.06em",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {level.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Reset Button */}
        <div style={{ padding: "0 1.5rem 1.5rem" }}>
          <button
            type="button"
            data-ocid="simulation_sandbox.reset_button"
            onClick={resetSim}
            style={{
              width: "100%",
              padding: "0.75rem",
              background: "rgba(255,0,51,0.12)",
              border: "1px solid rgba(255,0,51,0.35)",
              borderRadius: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              color: "#ff4466",
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              boxShadow:
                "0 0 12px rgba(255,0,51,0.15), inset 0 0 16px rgba(0,0,0,0.5)",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,0,51,0.22)";
              e.currentTarget.style.borderColor = "rgba(255,0,51,0.6)";
              e.currentTarget.style.boxShadow =
                "0 0 20px rgba(255,0,51,0.3), inset 0 0 16px rgba(0,0,0,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,0,51,0.12)";
              e.currentTarget.style.borderColor = "rgba(255,0,51,0.35)";
              e.currentTarget.style.boxShadow =
                "0 0 12px rgba(255,0,51,0.15), inset 0 0 16px rgba(0,0,0,0.5)";
            }}
          >
            <RotateCcw size={14} />
            RESET ALL INDICATORS TO BASELINE
          </button>
        </div>
      </div>
    </div>
  );
}

export default SimulationSandbox;
