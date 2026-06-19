import AIFace from "@/components/AIFace";
import ParticleField from "@/components/ParticleField";
import { useOmegaStore } from "@/store/omegaStore";
import { useEffect, useState } from "react";

const CYCLING_MESSAGES = [
  "ALL SYSTEMS NOMINAL",
  "COUNTERMEASURES DEPLOYED",
  "NEURAL NET ACTIVE",
  "THREAT VECTORS NEUTRALIZED",
];

const CYCLE_MS = 4000;

export function OmegaEngagedOverlay() {
  const { isEngaged, toggleEngaged } = useOmegaStore();
  const [cycleIndex, setCycleIndex] = useState(0);
  const [textVisible, setTextVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Animate in on mount
  useEffect(() => {
    if (isEngaged) {
      requestAnimationFrame(() => setMounted(true));
    } else {
      setMounted(false);
    }
  }, [isEngaged]);

  // Cycle status messages with cross-fade
  useEffect(() => {
    if (!isEngaged) return;
    const interval = setInterval(() => {
      setTextVisible(false);
      setTimeout(() => {
        setCycleIndex((i) => (i + 1) % CYCLING_MESSAGES.length);
        setTextVisible(true);
      }, 400);
    }, CYCLE_MS);
    return () => clearInterval(interval);
  }, [isEngaged]);

  // Keyboard listeners
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && isEngaged) toggleEngaged();
      if (e.key === "e" || e.key === "E") toggleEngaged();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isEngaged, toggleEngaged]);

  if (!isEngaged) return null;

  return (
    <div
      data-ocid="omega-engaged.dialog"
      role="dialog"
      aria-modal="true"
      aria-label="OMEGA ENGAGED — Cinematic Mode"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        opacity: mounted ? 1 : 0,
        transform: mounted ? "scale(1)" : "scale(0.95)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
        background:
          "radial-gradient(ellipse 70% 60% at 50% 45%, rgba(0,191,255,0.18) 0%, rgba(0,20,80,0.55) 35%, #04061a 70%), #040611",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Dense particle field (behind) */}
      <ParticleField count={60} />

      {/* Scan-line overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,191,255,0.012) 3px, rgba(0,191,255,0.012) 4px)",
          animation: "scan-overlay 10s linear infinite",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Ambient corner flares */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "40%",
          height: "40%",
          background:
            "radial-gradient(ellipse at 0% 0%, rgba(0,191,255,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "40%",
          height: "40%",
          background:
            "radial-gradient(ellipse at 100% 100%, rgba(30,144,255,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Content layer ── */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
          width: "100%",
          padding: "2rem 1rem",
        }}
      >
        {/* Top heading */}
        <div style={{ textAlign: "center" }}>
          <h1
            data-ocid="omega-engaged.heading"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.8rem, 8vw, 6rem)",
              fontWeight: 900,
              letterSpacing: "0.25em",
              color: "#ffffff",
              textShadow:
                "0 0 20px rgba(0,191,255,0.9), 0 0 50px rgba(0,191,255,0.5), 0 0 100px rgba(0,191,255,0.25)",
              animation: "glitch 8s ease-in-out infinite",
              lineHeight: 1,
              margin: 0,
            }}
          >
            OMEGA ENGAGED
          </h1>
          <p
            data-ocid="omega-engaged.subtitle"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(0.85rem, 2vw, 1.1rem)",
              letterSpacing: "0.4em",
              color: "#00BFFF",
              textShadow:
                "0 0 10px rgba(0,191,255,0.7), 0 0 25px rgba(0,191,255,0.3)",
              marginTop: "0.75rem",
              opacity: 0.9,
            }}
          >
            THREAT PROTOCOL ACTIVE
          </p>
        </div>

        {/* AI Face at 2× scale */}
        <div
          data-ocid="omega-engaged.ai-face"
          style={{
            transform: "scale(2)",
            transformOrigin: "center center",
            margin: "80px 0",
            filter:
              "drop-shadow(0 0 40px rgba(0,191,255,0.7)) drop-shadow(0 0 80px rgba(0,191,255,0.35)) drop-shadow(0 0 160px rgba(0,191,255,0.15))",
          }}
        >
          <AIFace />
        </div>

        {/* Cycling status message */}
        <div
          data-ocid="omega-engaged.status"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
            letterSpacing: "0.35em",
            color: "#00BFFF",
            textShadow:
              "0 0 15px rgba(0,191,255,0.8), 0 0 35px rgba(0,191,255,0.4)",
            opacity: textVisible ? 1 : 0,
            transition: "opacity 0.4s ease",
            minHeight: "2em",
            textAlign: "center",
          }}
        >
          ◈ {CYCLING_MESSAGES[cycleIndex]} ◈
        </div>

        {/* Decorative horizontal rule */}
        <div
          aria-hidden="true"
          style={{
            width: "min(480px, 80vw)",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(0,191,255,0.6), rgba(0,191,255,0.4), transparent)",
            boxShadow: "0 0 8px rgba(0,191,255,0.4)",
          }}
        />

        {/* Stat readouts */}
        <div
          style={{
            display: "flex",
            gap: "3rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {[
            { label: "SHIELDS", value: "ACTIVE" },
            { label: "ENCRYPTION", value: "QUANTUM" },
            { label: "STATUS", value: "LOCKED" },
          ].map(({ label, value }) => (
            <div
              key={label}
              style={{ textAlign: "center", fontFamily: "var(--font-mono)" }}
            >
              <div
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.3em",
                  color: "rgba(0,191,255,0.55)",
                  marginBottom: "0.25rem",
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontSize: "1rem",
                  letterSpacing: "0.2em",
                  color: "#00BFFF",
                  textShadow: "0 0 10px rgba(0,191,255,0.7)",
                }}
              >
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ESC button — bottom left */}
      <button
        type="button"
        data-ocid="omega-engaged.close_button"
        onClick={toggleEngaged}
        onKeyDown={(e) => e.key === "Enter" && toggleEngaged()}
        aria-label="Exit OMEGA ENGAGED mode (Escape)"
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "2rem",
          zIndex: 3,
          background: "transparent",
          border: "1px solid rgba(0,191,255,0.4)",
          color: "#00BFFF",
          fontFamily: "var(--font-mono)",
          fontSize: "0.8rem",
          letterSpacing: "0.15em",
          padding: "0.45rem 0.9rem",
          cursor: "pointer",
          boxShadow: "0 0 12px rgba(0,191,255,0.2)",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background =
            "rgba(0,191,255,0.12)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            "0 0 20px rgba(0,191,255,0.4)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background =
            "transparent";
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            "0 0 12px rgba(0,191,255,0.2)";
        }}
      >
        [ESC] EXIT MODE
      </button>

      {/* Keyboard hint — bottom right */}
      <p
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "2.1rem",
          right: "2rem",
          zIndex: 3,
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
          letterSpacing: "0.12em",
          color: "rgba(0,191,255,0.3)",
          margin: 0,
        }}
      >
        PRESS [E] TO TOGGLE
      </p>
    </div>
  );
}

export default OmegaEngagedOverlay;
