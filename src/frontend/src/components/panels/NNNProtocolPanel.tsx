import { useOmegaStore } from "@/store/omegaStore";
import { FlaskConical } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

// Glitch overlay component for DEPLOY VIRUS effect
function GlitchOverlay({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 pointer-events-none z-50" aria-hidden="true">
      {/* Flash */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,255,255,0.08)",
          animation: "deploy-flash 0.1s linear 6",
        }}
      />
      {/* Glitch bars */}
      {[15, 35, 55, 70, 85].map((top) => (
        <div
          key={top}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: `${top}%`,
            height: "3px",
            background: "rgba(0,255,255,0.4)",
            animation: "glitch 0.4s ease-out",
          }}
        />
      ))}
      {/* Scan line */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: "4px",
          background:
            "linear-gradient(90deg, transparent, rgba(0,191,255,0.8), transparent)",
          animation: "boot-scan 1s ease-out",
        }}
      />
    </div>
  );
}

export function NNNProtocolPanel() {
  const [active, setActive] = useState(false);
  const [deploying, setDeploying] = useState(false);
  const [glitchVisible, setGlitchVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { attackersToolsDisabled } = useOmegaStore();
  const deployTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleActivate() {
    setActive(true);
    setTimeout(() => setActive(false), 800);
  }

  const handleDeploy = useCallback(
    (e: React.MouseEvent | React.KeyboardEvent) => {
      e.stopPropagation();
      if (deploying) return;
      setDeploying(true);
      setGlitchVisible(true);
      deployTimeoutRef.current = setTimeout(() => {
        setDeploying(false);
        setGlitchVisible(false);
      }, 1800);
    },
    [deploying],
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (deployTimeoutRef.current) clearTimeout(deployTimeoutRef.current);
    };
  }, []);

  return (
    <>
      <GlitchOverlay visible={glitchVisible} />

      <div
        className="relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300"
        role="button"
        tabIndex={0}
        aria-label="Neural Net Nemesis Protocol panel — click to activate"
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
        data-ocid="panel-nnn-protocol"
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
              "linear-gradient(90deg, transparent, #FF4444, #00BFFF, transparent)",
            boxShadow: "0 0 8px rgba(255,68,68,0.4)",
          }}
        />

        <div
          className="flex items-center gap-2 px-3 py-2"
          style={{ borderBottom: "1px solid rgba(0,191,255,0.12)" }}
        >
          <FlaskConical
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
            NEURAL NET NEMESIS (NNN) PROTOCOL
          </span>
        </div>

        <div className="p-3 flex flex-col gap-2.5">
          {/* Status badge */}
          <div className="flex items-center justify-between">
            <span
              className="font-mono font-black tracking-widest text-xs"
              style={{
                color: "#00FF88",
                textShadow: "0 0 12px rgba(0,255,136,0.8)",
                animation: "anomaly-pulse 1.5s ease-in-out infinite",
              }}
            >
              LOGIC VIRUS
            </span>
            <span
              className="font-mono font-bold text-xs px-2 py-0.5 rounded"
              style={{
                background: "rgba(0,255,136,0.1)",
                border: "1px solid rgba(0,255,136,0.4)",
                color: "#00FF88",
                fontSize: 10,
                boxShadow: "0 0 8px rgba(0,255,136,0.3)",
                animation: "anomaly-pulse 1.5s ease-in-out infinite",
              }}
            >
              READY
            </span>
          </div>

          {/* Injection visualization — hover for syringe animation */}
          <div
            className="relative rounded overflow-hidden"
            style={{
              height: 44,
              background: "rgba(0,0,20,0.7)",
              border: "1px solid rgba(0,191,255,0.15)",
              cursor: "default",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {/* Liquid fill */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: deploying ? "100%" : hovered ? "70%" : "20%",
                background: deploying
                  ? "linear-gradient(0deg, rgba(255,68,68,0.5), rgba(0,191,255,0.4))"
                  : "linear-gradient(0deg, rgba(0,255,136,0.4), rgba(0,191,255,0.15))",
                transition: "height 0.4s ease, background 0.3s",
                animation: deploying ? "virus-inject 1.5s ease-in-out" : "none",
              }}
            />

            {/* Syringe SVG on hover */}
            {hovered && !deploying && (
              <svg
                className="absolute right-2 top-1/2"
                style={{
                  transform: "translateY(-50%) rotate(-30deg)",
                  filter: "drop-shadow(0 0 6px rgba(0,191,255,0.7))",
                }}
                width={30}
                height={12}
                viewBox="0 0 30 12"
                fill="none"
                aria-hidden="true"
              >
                <title>Syringe injection</title>
                {/* Barrel */}
                <rect
                  x={4}
                  y={3}
                  width={20}
                  height={6}
                  rx={2}
                  fill="none"
                  stroke="rgba(0,191,255,0.7)"
                  strokeWidth="1"
                />
                {/* Plunger */}
                <rect
                  x={1}
                  y={4}
                  width={4}
                  height={4}
                  rx={1}
                  fill="rgba(0,191,255,0.4)"
                  stroke="rgba(0,191,255,0.7)"
                  strokeWidth="0.5"
                />
                {/* Needle */}
                <path
                  d="M24 5.5 L30 6"
                  stroke="rgba(0,191,255,0.9)"
                  strokeWidth="0.8"
                />
                {/* Content */}
                <rect
                  x={6}
                  y={4.5}
                  width={12}
                  height={3}
                  rx={1}
                  fill="rgba(0,255,136,0.5)"
                />
              </svg>
            )}

            <div
              className="absolute inset-0 flex items-center justify-center font-mono font-bold text-xs tracking-widest"
              style={{
                color: deploying
                  ? "rgba(255,68,68,0.9)"
                  : "rgba(0,191,255,0.7)",
                textShadow: deploying ? "0 0 8px rgba(255,68,68,0.9)" : "none",
                animation: deploying ? "deploy-flash 0.2s linear 8" : "none",
              }}
            >
              {deploying
                ? "INJECTING..."
                : hovered
                  ? "READY TO DEPLOY"
                  : "PAYLOAD LOADED"}
            </div>
          </div>

          {/* Counter + Deploy button */}
          <div className="flex items-center justify-between">
            <span
              className="font-mono text-xs"
              style={{ color: "rgba(0,191,255,0.5)", fontSize: 9 }}
            >
              TOOLS DISABLED:{" "}
              <span
                style={{
                  color: "#00BFFF",
                  fontWeight: 700,
                  textShadow: "0 0 6px rgba(0,191,255,0.8)",
                }}
              >
                {attackersToolsDisabled}
              </span>
            </span>
            <button
              type="button"
              className="font-mono font-black text-xs px-3 py-1.5 rounded transition-smooth"
              style={{
                background: deploying
                  ? "rgba(255,68,68,0.2)"
                  : "linear-gradient(135deg, rgba(255,68,68,0.2), rgba(0,191,255,0.15))",
                border: `1px solid ${deploying ? "rgba(255,68,68,0.6)" : "rgba(255,68,68,0.4)"}`,
                color: deploying ? "#FF4444" : "#FF6666",
                boxShadow: deploying
                  ? "0 0 16px rgba(255,68,68,0.5)"
                  : "0 0 8px rgba(255,68,68,0.2)",
                letterSpacing: "0.1em",
                fontSize: 9,
              }}
              onClick={handleDeploy}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleDeploy(e);
              }}
              disabled={deploying}
              data-ocid="btn-deploy-virus"
              aria-label="Deploy logic virus"
            >
              {deploying ? "DEPLOYING..." : "DEPLOY VIRUS"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
