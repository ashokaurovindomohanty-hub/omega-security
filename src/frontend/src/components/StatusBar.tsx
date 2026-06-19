import { formatUptime, useOmegaStore } from "@/store/omegaStore";
import { Activity, Power, Shield, Zap } from "lucide-react";
import { useEffect } from "react";

interface StatusBarProps {
  onSimClick?: () => void;
}

export default function StatusBar({ onSimClick }: StatusBarProps) {
  const { threatCount, uptime, activeShields, tick, isEngaged, toggleEngaged } =
    useOmegaStore();

  useEffect(() => {
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tick]);

  return (
    <div
      className="relative z-50 w-full flex items-center justify-between px-4 py-2 font-mono text-xs tracking-widest"
      style={{
        background: "rgba(5, 10, 30, 0.95)",
        borderBottom: "1px solid rgba(0,191,255,0.3)",
        boxShadow: "0 0 20px rgba(0,191,255,0.15), 0 2px 30px rgba(0,0,0,0.8)",
        backdropFilter: "blur(12px)",
      }}
      data-ocid="status-bar"
    >
      {/* Scan line overlay */}
      <div className="scan-line absolute inset-0 pointer-events-none" />

      {/* Left: OMEGA badge */}
      <div className="flex items-center gap-3">
        <div
          className="font-display font-black tracking-[0.25em] text-sm text-glow"
          style={{ color: "#00BFFF" }}
        >
          Ω OMEGA
        </div>
        <div
          className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider"
          style={{
            background: "rgba(0,191,255,0.1)",
            border: "1px solid rgba(0,191,255,0.3)",
            color: "#00BFFF",
          }}
        >
          ONLINE
        </div>
      </div>

      {/* Center: Stats */}
      <div className="flex items-center gap-6">
        <StatItem
          icon={<Activity className="w-3 h-3" />}
          label="UPTIME"
          value={formatUptime(uptime)}
          color="#00BFFF"
          ocid="status-uptime"
        />
        <StatItem
          icon={<Shield className="w-3 h-3" />}
          label="ACTIVE SHIELDS"
          value={String(activeShields)}
          color="#1E90FF"
          ocid="status-shields"
        />
        <StatItem
          icon={<Zap className="w-3 h-3" />}
          label="THREATS NEUTRALIZED"
          value={threatCount.toLocaleString()}
          color="#00BFFF"
          pulse
          ocid="status-threats"
        />
      </div>

      {/* Right: Action buttons + indicator */}
      <div className="flex items-center gap-3">
        {/* SIM button */}
        {onSimClick && (
          <button
            type="button"
            onClick={onSimClick}
            className="px-3 py-1 text-xs font-bold tracking-widest rounded transition-all duration-200"
            style={{
              background: "rgba(255,140,0,0.1)",
              border: "1px solid rgba(255,140,0,0.5)",
              color: "#FF8C00",
              boxShadow: "0 0 8px rgba(255,140,0,0.25)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(255,140,0,0.2)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 16px rgba(255,140,0,0.5)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(255,140,0,0.1)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 8px rgba(255,140,0,0.25)";
            }}
            data-ocid="status-sim_button"
          >
            ⚡ SIM
          </button>
        )}

        {/* ENGAGE / DISENGAGE button */}
        <button
          type="button"
          onClick={toggleEngaged}
          className="px-3 py-1 text-xs font-bold tracking-widest rounded transition-all duration-200 flex items-center gap-1.5"
          style={
            isEngaged
              ? {
                  background: "rgba(255,0,51,0.15)",
                  border: "1px solid rgba(255,0,51,0.6)",
                  color: "#FF0033",
                  boxShadow: "0 0 12px rgba(255,0,51,0.4)",
                }
              : {
                  background: "rgba(0,191,255,0.1)",
                  border: "1px solid rgba(0,191,255,0.5)",
                  color: "#00BFFF",
                  boxShadow: "0 0 8px rgba(0,191,255,0.25)",
                }
          }
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLButtonElement;
            if (isEngaged) {
              el.style.background = "rgba(255,0,51,0.25)";
              el.style.boxShadow = "0 0 20px rgba(255,0,51,0.6)";
            } else {
              el.style.background = "rgba(0,191,255,0.2)";
              el.style.boxShadow = "0 0 16px rgba(0,191,255,0.5)";
            }
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLButtonElement;
            if (isEngaged) {
              el.style.background = "rgba(255,0,51,0.15)";
              el.style.boxShadow = "0 0 12px rgba(255,0,51,0.4)";
            } else {
              el.style.background = "rgba(0,191,255,0.1)";
              el.style.boxShadow = "0 0 8px rgba(0,191,255,0.25)";
            }
          }}
          data-ocid="status-engage_button"
        >
          <Power className="w-3 h-3" aria-hidden="true" />
          {isEngaged ? "DISENGAGE" : "ENGAGE"}
        </button>

        {/* System indicator */}
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{
              background: isEngaged ? "#FF0033" : "#00BFFF",
              boxShadow: isEngaged
                ? "0 0 8px rgba(255,0,51,0.9)"
                : "0 0 8px rgba(0,191,255,0.9)",
            }}
          />
          <span
            style={{
              color: isEngaged ? "rgba(255,0,51,0.8)" : "rgba(0,191,255,0.7)",
            }}
          >
            {isEngaged ? "OMEGA ENGAGED" : "SYSTEM NOMINAL"}
          </span>
        </div>
      </div>
    </div>
  );
}

function StatItem({
  icon,
  label,
  value,
  color,
  pulse,
  ocid,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
  pulse?: boolean;
  ocid: string;
}) {
  return (
    <div className="flex items-center gap-2" data-ocid={ocid}>
      <span style={{ color: `${color}80` }}>{icon}</span>
      <div>
        <div style={{ color: "rgba(0,191,255,0.4)", fontSize: "9px" }}>
          {label}
        </div>
        <div
          className={pulse ? "animate-pulse" : ""}
          style={{
            color,
            fontWeight: 700,
            fontSize: "12px",
            letterSpacing: "0.1em",
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}
