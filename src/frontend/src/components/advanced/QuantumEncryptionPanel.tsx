import { Atom } from "lucide-react";
import { useEffect, useState } from "react";

const STATUS_MESSAGES = [
  "SUPERPOSITION ACTIVE",
  "ENTANGLEMENT VERIFIED",
  "KEY EXCHANGE COMPLETE",
  "QUBIT COHERENCE: 99.97%",
  "PHASE ALIGNMENT LOCKED",
  "TUNNEL ENCRYPTION ON",
  "BELL STATE CONFIRMED",
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

export default function QuantumEncryptionPanel() {
  const [msgIdx, setMsgIdx] = useState(0);
  const [strength] = useState(256);
  const [orbiting, setOrbiting] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setMsgIdx((i) => (i + 1) % STATUS_MESSAGES.length);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <Panel
      title="QUANTUM ENCRYPTION"
      icon={<Atom className="w-3.5 h-3.5" />}
      ocid="panel-quantum"
    >
      <div className="flex flex-col items-center gap-3 py-1">
        {/* Qubit animation: gyroscope-style triple orbits */}
        <div
          className="relative flex items-center justify-center"
          style={{ width: 72, height: 72, perspective: "220px" }}
          onClick={() => setOrbiting((v) => !v)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setOrbiting((v) => !v);
          }}
          aria-label="Qubit animation toggle"
        >
          {/* Outer orbital ring — tilted on X */}
          <div
            className="absolute"
            style={{
              width: 68,
              height: 68,
              borderRadius: "50%",
              border: "1.5px solid rgba(0,191,255,0.55)",
              boxShadow:
                "0 0 10px rgba(0,191,255,0.3), inset 0 0 8px rgba(0,191,255,0.1)",
              animation: orbiting ? "qubit-spin 3s linear infinite" : "none",
              transformStyle: "preserve-3d",
            }}
          />
          {/* Middle orbital — different axis, faster */}
          <div
            className="absolute"
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              border: "1.5px solid rgba(30,144,255,0.45)",
              boxShadow: "0 0 8px rgba(30,144,255,0.25)",
              animation: orbiting
                ? "qubit-spin 2s linear infinite reverse"
                : "none",
              transform: "rotateX(60deg)",
              transformStyle: "preserve-3d",
            }}
          />
          {/* Inner orbital — perpendicular */}
          <div
            className="absolute"
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "1px solid rgba(0,191,255,0.35)",
              animation: orbiting ? "qubit-spin 1.4s linear infinite" : "none",
              transform: "rotateY(70deg)",
              transformStyle: "preserve-3d",
            }}
          />
          {/* Central glowing node */}
          <div
            className="absolute"
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(0,191,255,1) 0%, rgba(0,191,255,0.4) 50%, transparent 80%)",
              boxShadow:
                "0 0 16px rgba(0,191,255,0.9), 0 0 30px rgba(0,191,255,0.4)",
              animation: "anomaly-pulse 1.8s ease-in-out infinite",
            }}
          />
          {/* Orbiting electron dot on outer ring */}
          <div
            className="absolute"
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "#00BFFF",
              boxShadow: "0 0 8px rgba(0,191,255,0.9)",
              top: 0,
              left: "50%",
              transformOrigin: "0px 34px",
              animation: orbiting ? "halo-rotate 3s linear infinite" : "none",
              marginLeft: -2.5,
            }}
          />
        </div>

        {/* Strength display */}
        <div className="text-center">
          <div
            className="font-mono font-black tracking-widest"
            style={{
              fontSize: 11,
              color: "#00BFFF",
              textShadow: "0 0 10px rgba(0,191,255,0.7)",
            }}
          >
            ENCRYPTION STRENGTH: QUANTUM-{strength}
          </div>
        </div>

        {/* Cycling status message */}
        <div
          className="w-full text-center rounded px-2 py-1.5"
          style={{
            background: "rgba(0,191,255,0.07)",
            border: "1px solid rgba(0,191,255,0.18)",
          }}
        >
          <span
            className="font-mono font-bold tracking-widest"
            style={{
              fontSize: 9,
              color: "#00BFFF",
              textShadow: "0 0 8px rgba(0,191,255,0.6)",
              animation: "boot-reveal 0.35s ease-out",
            }}
            key={msgIdx}
          >
            {STATUS_MESSAGES[msgIdx]}
          </span>
        </div>

        {/* Qubit strength bars */}
        <div className="w-full flex gap-1">
          {["q0", "q1", "q2", "q3", "q4", "q5", "q6", "q7"].map((qid, i) => (
            <div
              key={qid}
              className="flex-1 rounded-sm"
              style={{
                height: 4,
                background: "rgba(0,191,255,0.6)",
                boxShadow: "0 0 4px rgba(0,191,255,0.5)",
                opacity: 0.5 + i * 0.07,
                animation: `anomaly-pulse ${1.2 + i * 0.15}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </Panel>
  );
}
