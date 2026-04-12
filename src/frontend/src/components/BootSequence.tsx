import { useOmegaStore } from "@/store/omegaStore";
import { useEffect, useState } from "react";

const BOOT_LINES = [
  "OMEGA SECURITY v9.1.0 — INITIALIZING...",
  "LOADING NEURAL NET NEMESIS PROTOCOL...",
  "QUANTUM ENCRYPTION MODULES: ONLINE",
  "KING'S EYE SURVEILLANCE: ACTIVE",
  "ZERO-TRUST ARCHITECTURE: ENGAGED",
  "AI FACE RECOGNITION: CALIBRATING...",
  "FIREWALL MATRIX: DEPLOYED",
  "BEHAVIORAL ANOMALY ENGINE: RUNNING",
  "ALL SYSTEMS NOMINAL. OMEGA IS ONLINE.",
];

export default function BootSequence() {
  const setBooted = useOmegaStore((s) => s.setBooted);
  const [phase, setPhase] = useState<"scan" | "lines" | "title" | "done">(
    "scan",
  );
  const [visibleLines, setVisibleLines] = useState(0);
  const [titleVisible, setTitleVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Phase 1: scan lines for 700ms
    const t1 = setTimeout(() => setPhase("lines"), 700);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (phase !== "lines") return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= BOOT_LINES.length) {
        clearInterval(interval);
        setTimeout(() => setPhase("title"), 300);
      }
    }, 200);
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase !== "title") return;
    setTitleVisible(true);
    const t = setTimeout(() => {
      setDismissed(true);
      setTimeout(() => setBooted(true), 600);
    }, 1200);
    return () => clearTimeout(t);
  }, [phase, setBooted]);

  return (
    <div
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center transition-opacity duration-700 ${
        dismissed ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ background: "#000610" }}
    >
      {/* Sweeping scan bar */}
      {phase === "scan" && (
        <div
          className="absolute left-0 w-full h-1 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent, #00BFFF, #1E90FF, transparent)",
            boxShadow: "0 0 30px rgba(0,191,255,0.8)",
            animation: "boot-scan 0.7s ease-in-out forwards",
          }}
        />
      )}

      {/* Terminal lines */}
      <div className="w-full max-w-2xl px-8 space-y-1 mb-6">
        {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
          <div
            key={line}
            className="font-mono text-xs tracking-widest"
            style={{
              color:
                i === visibleLines - 1 ? "#00BFFF" : "rgba(0,191,255,0.45)",
              animation: "boot-reveal 0.15s ease-out forwards",
            }}
          >
            <span style={{ color: "rgba(0,191,255,0.35)" }}>&gt;&nbsp;</span>
            {line}
          </div>
        ))}
      </div>

      {/* OMEGA SECURITY glitch title */}
      {titleVisible && (
        <div className="text-center mt-4">
          <div
            className="font-display font-black tracking-[0.3em] text-glow"
            style={{
              fontSize: "clamp(2rem, 8vw, 5rem)",
              color: "#00BFFF",
              animation:
                "glitch 0.6s ease-in-out, boot-reveal 0.4s ease-out forwards",
            }}
          >
            OMEGA SECURITY
          </div>
          <div
            className="font-mono tracking-[0.5em] text-xs mt-2"
            style={{ color: "rgba(0,191,255,0.6)" }}
          >
            AI INTELLIGENCE COMMAND — ONLINE
          </div>
        </div>
      )}

      {/* Progress bar */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-64 h-0.5 rounded-full overflow-hidden"
        style={{ background: "rgba(0,191,255,0.1)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-200"
          style={{
            width: `${(visibleLines / BOOT_LINES.length) * 100}%`,
            background: "linear-gradient(90deg, #1E90FF, #00BFFF)",
            boxShadow: "0 0 8px rgba(0,191,255,0.8)",
          }}
        />
      </div>

      {/* Scanline overlay */}
      <div className="scanline-overlay" />
    </div>
  );
}
