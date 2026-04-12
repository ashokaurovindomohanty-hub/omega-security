import { Lock } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const CONNECTIONS = [
  "192.168.0.42",
  "ENDPOINT-DELTA-7",
  "203.0.113.88",
  "NODE-ALPHA-3",
  "10.0.0.199",
  "VECTOR-SIGMA-12",
  "172.16.0.55",
  "AGENT-OMEGA-X",
  "198.51.100.4",
  "PROXY-GHOST-9",
];

function Panel({
  title,
  icon,
  children,
  ocid,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  ocid: string;
}) {
  const [active, setActive] = useState(false);

  const activate = () => {
    setActive(true);
    setTimeout(() => setActive(false), 800);
  };

  return (
    <div
      className="relative rounded-lg overflow-hidden transition-all duration-300"
      style={{
        background: "rgba(5,12,35,0.9)",
        border: active
          ? "1px solid rgba(0,191,255,0.65)"
          : "1px solid rgba(0,191,255,0.2)",
        boxShadow: active
          ? "0 0 30px rgba(0,191,255,0.35), 0 0 60px rgba(0,191,255,0.12), inset 0 0 20px rgba(0,0,0,0.5)"
          : "0 0 10px rgba(0,191,255,0.08), inset 0 0 20px rgba(0,0,0,0.6)",
      }}
      data-ocid={ocid}
      onClick={activate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") activate();
      }}
    >
      {active && (
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(0,191,255,0.14) 0%, transparent 70%)",
            animation: "face-pulse 0.5s ease-out",
          }}
        />
      )}
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ borderBottom: "1px solid rgba(0,191,255,0.15)" }}
      >
        <span style={{ color: "#00BFFF" }}>{icon}</span>
        <span
          className="font-mono font-bold tracking-wider text-xs"
          style={{ color: "#00BFFF" }}
        >
          {title}
        </span>
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}

export default function ZeroTrustPanel() {
  const [score, setScore] = useState(72);
  const [connIdx, setConnIdx] = useState(0);
  const [prevScore, setPrevScore] = useState(72);
  const [flash, setFlash] = useState(false);
  const tickRef = useRef(0);

  useEffect(() => {
    const id = setInterval(() => {
      tickRef.current += 1;
      // Score changes every 2s, connection cycles every 4s
      setScore((s) => {
        const delta = Math.round((Math.random() - 0.45) * 14);
        const next = Math.max(15, Math.min(99, s + delta));
        setPrevScore(s);
        if (Math.abs(next - s) > 5) setFlash(true);
        return next;
      });
      if (tickRef.current % 2 === 0) {
        setConnIdx((i) => (i + 1) % CONNECTIONS.length);
      }
    }, 2000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (flash) {
      const t = setTimeout(() => setFlash(false), 400);
      return () => clearTimeout(t);
    }
  }, [flash]);

  const color = score > 70 ? "#00BFFF" : score > 40 ? "#ffcc00" : "#ff4444";
  const glowColor =
    score > 70
      ? "rgba(0,191,255,0.6)"
      : score > 40
        ? "rgba(255,204,0,0.6)"
        : "rgba(255,68,68,0.6)";
  const label = score > 70 ? "TRUSTED" : score > 40 ? "CAUTION" : "BLOCKED";
  const circumference = 2 * Math.PI * 30; // r=30
  const dashOffset = circumference - (score / 100) * circumference;

  return (
    <Panel
      title="ZERO-TRUST ARCHITECTURE"
      icon={<Lock className="w-3.5 h-3.5" />}
      ocid="panel-zerotrust"
    >
      <div className="flex items-center gap-4">
        {/* Arc gauge */}
        <div
          className="relative flex-shrink-0 flex items-center justify-center"
          style={{ width: 80, height: 80 }}
        >
          <svg
            width={80}
            height={80}
            viewBox="0 0 80 80"
            aria-label={`Trust score: ${score}%`}
            role="img"
          >
            {/* Track */}
            <circle
              cx={40}
              cy={40}
              r={30}
              fill="none"
              stroke="rgba(0,191,255,0.1)"
              strokeWidth={6}
            />
            {/* Progress arc */}
            <circle
              cx={40}
              cy={40}
              r={30}
              fill="none"
              stroke={color}
              strokeWidth={6}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              transform="rotate(-90 40 40)"
              style={{
                transition:
                  "stroke-dashoffset 0.6s cubic-bezier(0.4,0,0.2,1), stroke 0.6s",
                filter: `drop-shadow(0 0 6px ${glowColor})`,
              }}
            />
            {/* Tick marks */}
            {[0, 25, 50, 75].map((pct) => {
              const angle = (pct / 100) * 360 - 90;
              const rad = (angle * Math.PI) / 180;
              const x1 = 40 + 26 * Math.cos(rad);
              const y1 = 40 + 26 * Math.sin(rad);
              const x2 = 40 + 22 * Math.cos(rad);
              const y2 = 40 + 22 * Math.sin(rad);
              return (
                <line
                  key={pct}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="rgba(0,191,255,0.25)"
                  strokeWidth={1}
                />
              );
            })}
          </svg>
          {/* Center value */}
          <div
            className="absolute flex flex-col items-center"
            style={{
              animation: flash ? "counter-up 0.3s ease-out" : "none",
            }}
          >
            <span
              className="font-mono font-black leading-none"
              style={{
                fontSize: 18,
                color,
                textShadow: `0 0 10px ${glowColor}`,
                transition: "color 0.6s",
              }}
            >
              {score}
            </span>
            <span
              className="font-mono font-bold leading-none"
              style={{
                fontSize: 7,
                color: "rgba(0,191,255,0.45)",
                letterSpacing: "0.1em",
              }}
            >
              %
            </span>
          </div>
        </div>

        {/* Right side info */}
        <div className="flex-1 min-w-0">
          {/* Status badge */}
          <div
            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded mb-2"
            style={{
              background: `${color}18`,
              border: `1px solid ${color}55`,
              transition: "background 0.6s, border-color 0.6s",
            }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: color,
                boxShadow: `0 0 6px ${glowColor}`,
                animation: "anomaly-pulse 1.5s infinite",
              }}
            />
            <span
              className="font-mono font-black tracking-widest"
              style={{ fontSize: 9, color, textShadow: `0 0 6px ${glowColor}` }}
            >
              {label}
            </span>
          </div>

          {/* Connection label */}
          <div
            className="font-mono text-xs mb-1 truncate"
            style={{ color: "rgba(0,191,255,0.45)", fontSize: 9 }}
          >
            CONNECTION:
          </div>
          <div
            className="font-mono font-bold truncate mb-2"
            style={{
              fontSize: 10,
              color: "#00BFFF",
              textShadow: "0 0 6px rgba(0,191,255,0.5)",
              animation: "boot-reveal 0.4s ease-out",
            }}
            key={connIdx}
          >
            {CONNECTIONS[connIdx]}
          </div>

          {/* Mini checks */}
          {["ENDPOINT AUTH", "PACKET VERIFY", "POLICY ENGINE"].map((item) => (
            <div key={item} className="flex items-center gap-1.5 mb-0.5">
              <div
                className="w-1 h-1 rounded-full flex-shrink-0"
                style={{ background: color, boxShadow: `0 0 4px ${glowColor}` }}
              />
              <span
                className="font-mono truncate"
                style={{ fontSize: 8, color: "rgba(0,191,255,0.5)" }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Score delta indicator */}
      <div
        className="mt-2 flex items-center justify-between"
        style={{ borderTop: "1px solid rgba(0,191,255,0.08)", paddingTop: 6 }}
      >
        <span
          className="font-mono"
          style={{ fontSize: 8, color: "rgba(0,191,255,0.35)" }}
        >
          TRUST SCORE
        </span>
        <span
          className="font-mono font-bold"
          style={{
            fontSize: 8,
            color:
              score > prevScore
                ? "#00ff88"
                : score < prevScore
                  ? "#ff4444"
                  : "rgba(0,191,255,0.5)",
            textShadow:
              score !== prevScore
                ? score > prevScore
                  ? "0 0 6px rgba(0,255,136,0.7)"
                  : "0 0 6px rgba(255,68,68,0.7)"
                : "none",
          }}
        >
          {score > prevScore ? "▲" : score < prevScore ? "▼" : "—"} {score}%
        </span>
      </div>
    </Panel>
  );
}
