import { formatUptime, useOmegaStore } from "@/store/omegaStore";
import { Activity, Shield, Zap } from "lucide-react";
import { useEffect } from "react";

export default function StatusBar() {
  const { threatCount, uptime, activeShields, tick } = useOmegaStore();

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

      {/* Right: System indicator */}
      <div className="flex items-center gap-2">
        <div
          className="w-2 h-2 rounded-full animate-pulse"
          style={{
            background: "#00BFFF",
            boxShadow: "0 0 8px rgba(0,191,255,0.9)",
          }}
        />
        <span style={{ color: "rgba(0,191,255,0.7)" }}>SYSTEM NOMINAL</span>
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
