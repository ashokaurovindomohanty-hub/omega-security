import { Eye } from "lucide-react";
import { useState } from "react";

// Hexagon path helper
function hexPath(cx: number, cy: number, r: number): string {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  });
  return `M${pts.join("L")}Z`;
}

export function MirrorDecoyPanel() {
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
      aria-label="Mirror Decoy System panel — click to activate"
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
      data-ocid="panel-mirror-decoy"
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
        <Eye
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
          MIRROR DECOY SYSTEM
        </span>
      </div>

      <div className="p-3 flex flex-col items-center gap-3">
        {/* Mirror effect — two hexagons with reflection gradient between */}
        <div className="relative flex items-center justify-center">
          <svg
            width={160}
            height={90}
            viewBox="0 0 160 90"
            role="img"
            aria-label="Mirror decoy cloning visualization"
          >
            <title>Mirror decoy visualization</title>
            <defs>
              <linearGradient id="mirrorSeam" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(0,191,255,0.0)" />
                <stop offset="40%" stopColor="rgba(0,191,255,0.6)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.9)" />
                <stop offset="60%" stopColor="rgba(0,191,255,0.6)" />
                <stop offset="100%" stopColor="rgba(0,191,255,0.0)" />
              </linearGradient>
              <linearGradient
                id="hexFillOrigin"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="rgba(0,191,255,0.3)" />
                <stop offset="100%" stopColor="rgba(30,144,255,0.1)" />
              </linearGradient>
              <linearGradient
                id="hexFillDecoy"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="rgba(30,144,255,0.15)" />
                <stop offset="100%" stopColor="rgba(0,191,255,0.05)" />
              </linearGradient>
              <filter id="glowFilter">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Original hexagon (left) */}
            <g filter="url(#glowFilter)">
              <path
                d={hexPath(48, 45, 32)}
                fill="url(#hexFillOrigin)"
                stroke="rgba(0,191,255,0.7)"
                strokeWidth="1.2"
              />
              {/* Inner hex */}
              <path
                d={hexPath(48, 45, 20)}
                fill="none"
                stroke="rgba(0,191,255,0.35)"
                strokeWidth="0.7"
              />
              {/* Omega symbol */}
              <text
                x={41}
                y={51}
                fontSize={18}
                fill="#00BFFF"
                fontWeight="900"
                style={{ filter: "drop-shadow(0 0 6px rgba(0,191,255,0.9))" }}
              >
                Ω
              </text>
              <text
                x={36}
                y={63}
                fontSize={6}
                fill="rgba(0,191,255,0.6)"
                letterSpacing={2}
              >
                ORIGIN
              </text>
            </g>

            {/* Seam reflection line */}
            <rect x={76} y={10} width={8} height={70} fill="url(#mirrorSeam)" />

            {/* Decoy hexagon (right, fading animation) */}
            <g style={{ animation: "anomaly-pulse 2.2s ease-in-out infinite" }}>
              <path
                d={hexPath(112, 45, 32)}
                fill="url(#hexFillDecoy)"
                stroke="rgba(30,144,255,0.45)"
                strokeWidth="1"
                strokeDasharray="4 2"
              />
              <path
                d={hexPath(112, 45, 20)}
                fill="none"
                stroke="rgba(30,144,255,0.2)"
                strokeWidth="0.7"
                strokeDasharray="3 3"
              />
              <text
                x={105}
                y={51}
                fontSize={18}
                fill="rgba(30,144,255,0.7)"
                fontWeight="900"
              >
                Ω
              </text>
              <text
                x={101}
                y={63}
                fontSize={6}
                fill="rgba(30,144,255,0.45)"
                letterSpacing={2}
              >
                DECOY
              </text>
            </g>

            {/* Arrows */}
            <text x={73} y={48} fontSize={11} fill="rgba(0,191,255,0.5)">
              ⟺
            </text>
          </svg>
        </div>

        {/* Labels */}
        <div className="w-full flex items-center justify-between">
          <span
            className="font-mono text-xs tracking-wider"
            style={{ color: "rgba(0,191,255,0.6)" }}
          >
            YATA MIRROR — ACTIVE
          </span>
          <span
            className="font-mono font-bold text-xs px-2 py-0.5 rounded"
            style={{
              background: "rgba(0,191,255,0.1)",
              border: "1px solid rgba(0,191,255,0.3)",
              color: "#00BFFF",
              fontSize: 9,
            }}
          >
            DECOYS ACTIVE: 7
          </span>
        </div>

        {/* Cloning status */}
        <div
          className="w-full rounded py-1 text-center font-mono text-xs"
          style={{
            background: "rgba(0,191,255,0.06)",
            border: "1px solid rgba(0,191,255,0.15)",
            color: "rgba(0,191,255,0.5)",
            fontSize: 9,
          }}
        >
          CLONING DISTRACTION TACTICS ACTIVE
        </div>
      </div>
    </div>
  );
}
