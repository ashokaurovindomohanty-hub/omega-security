import { Shield } from "lucide-react";
import { useState } from "react";

export function FirewallPanel() {
  const [active, setActive] = useState(false);

  function handleActivate() {
    setActive(true);
    setTimeout(() => setActive(false), 800);
  }

  const integrityBars = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div
      className="relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300"
      role="button"
      tabIndex={0}
      aria-label="Unbreachable Firewall panel — click to activate"
      style={{
        background: "rgba(5,12,35,0.92)",
        border: active
          ? "1px solid rgba(0,255,255,0.7)"
          : "1px solid rgba(0,191,255,0.25)",
        boxShadow: active
          ? "0 0 40px rgba(0,255,255,0.4), 0 0 80px rgba(0,191,255,0.15), inset 0 0 20px rgba(0,0,0,0.5)"
          : "0 0 12px rgba(0,191,255,0.1), inset 0 0 20px rgba(0,0,0,0.6)",
      }}
      onClick={handleActivate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleActivate();
      }}
      data-ocid="panel-firewall"
    >
      {/* Activation pulse overlay */}
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

      {/* Top neon border gradient */}
      <div
        style={{
          height: 2,
          background:
            "linear-gradient(90deg, transparent, #00BFFF, #1E90FF, transparent)",
          boxShadow: "0 0 8px rgba(0,191,255,0.6)",
        }}
      />

      {/* Header */}
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ borderBottom: "1px solid rgba(0,191,255,0.12)" }}
      >
        <Shield
          className="w-3.5 h-3.5"
          style={{
            color: "#00BFFF",
            filter: "drop-shadow(0 0 4px rgba(0,191,255,0.8))",
          }}
        />
        <span
          className="font-mono font-bold tracking-widest text-xs"
          style={{ color: "#00BFFF", fontFamily: "var(--font-mono)" }}
        >
          UNBREACHABLE FIREWALL
        </span>
      </div>

      <div className="p-3 flex flex-col items-center gap-3">
        {/* Shield SVG with rotating rings */}
        <div
          className="relative flex items-center justify-center"
          style={{ width: 110, height: 110 }}
        >
          {/* Outermost rotating ring */}
          <div
            className="absolute rounded-full"
            style={{
              width: 104,
              height: 104,
              border: "1.5px solid rgba(0,191,255,0.2)",
              borderTopColor: "rgba(0,191,255,0.7)",
              borderRightColor: "rgba(0,191,255,0.4)",
              animation: "halo-rotate 8s linear infinite",
              boxShadow:
                "0 0 12px rgba(0,191,255,0.15), inset 0 0 8px rgba(0,191,255,0.05)",
            }}
          />
          {/* Second ring */}
          <div
            className="absolute rounded-full"
            style={{
              width: 84,
              height: 84,
              border: "1.5px dashed rgba(0,191,255,0.35)",
              animation: "halo-rotate-reverse 5s linear infinite",
              boxShadow: "0 0 8px rgba(0,191,255,0.1)",
            }}
          />
          {/* Inner ring */}
          <div
            className="absolute rounded-full"
            style={{
              width: 64,
              height: 64,
              border: "2px solid rgba(0,191,255,0.5)",
              borderBottomColor: "rgba(30,144,255,0.8)",
              animation: "halo-rotate 3s linear infinite",
              boxShadow: "0 0 16px rgba(0,191,255,0.3)",
            }}
          />
          {/* Glow core */}
          <div
            className="absolute rounded-full"
            style={{
              width: 44,
              height: 44,
              background:
                "radial-gradient(circle, rgba(0,191,255,0.2) 0%, rgba(0,191,255,0.05) 60%, transparent 100%)",
            }}
          />
          {/* Shield icon */}
          <svg
            width={28}
            height={32}
            viewBox="0 0 24 28"
            fill="none"
            role="img"
            aria-label="Firewall shield icon"
            style={{
              filter:
                "drop-shadow(0 0 10px rgba(0,191,255,0.9)) drop-shadow(0 0 20px rgba(0,191,255,0.5))",
            }}
          >
            <title>Firewall shield</title>
            <path
              d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5L12 1z"
              stroke="#00BFFF"
              strokeWidth="1.5"
              fill="rgba(0,191,255,0.12)"
            />
            <path
              d="M9 13l2 2 4-4"
              stroke="#00BFFF"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Status label */}
        <div
          className="font-mono text-xs tracking-widest text-center"
          style={{
            color: "rgba(0,191,255,0.7)",
            fontFamily: "var(--font-mono)",
          }}
        >
          ETERNAL SHIELD TECH
        </div>

        {/* Status badge */}
        <div
          className="px-4 py-1 rounded font-mono text-xs font-bold tracking-wider"
          style={{
            background: "rgba(0,191,255,0.1)",
            border: "1px solid rgba(0,191,255,0.35)",
            color: "#00BFFF",
            boxShadow: "0 0 8px rgba(0,191,255,0.2)",
            animation: "anomaly-pulse 2.5s ease-in-out infinite",
          }}
        >
          ACTIVE — 100% INTEGRITY
        </div>

        {/* Integrity bars */}
        <div className="w-full flex gap-0.5">
          {integrityBars.map((i) => (
            <div
              key={i}
              className="flex-1 rounded-full"
              style={{
                height: 3,
                background: "rgba(0,191,255,0.6)",
                boxShadow: "0 0 4px rgba(0,191,255,0.5)",
                animation: `anomaly-pulse ${1.2 + i * 0.1}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
