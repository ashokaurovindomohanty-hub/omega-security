import type { ThreatEvent, ThreatSeverity } from "@/store/omegaStore";
import {
  MOCK_AGENTS,
  THREAT_TEMPLATES,
  useOmegaStore,
} from "@/store/omegaStore";
import { useEffect, useRef, useState } from "react";

// ─── Severity Config ───────────────────────────────────────────────────────────

const SEVERITY_CONFIG: Record<
  ThreatSeverity,
  { label: string; color: string; glow: string; pulse: boolean }
> = {
  LOW: {
    label: "LOW",
    color: "text-emerald-400 border-emerald-500/50 bg-emerald-950/40",
    glow: "",
    pulse: false,
  },
  MED: {
    label: "MED",
    color: "text-yellow-400 border-yellow-500/50 bg-yellow-950/40",
    glow: "",
    pulse: false,
  },
  HIGH: {
    label: "HIGH",
    color: "text-orange-400 border-orange-500/50 bg-orange-950/40",
    glow: "",
    pulse: false,
  },
  CRITICAL: {
    label: "CRIT",
    color: "text-red-400 border-red-500/60 bg-red-950/40",
    glow: "box-shadow: 0 0 8px rgba(239,68,68,0.6)",
    pulse: true,
  },
};

// ─── Weighted severity picker ──────────────────────────────────────────────────

function pickSeverity(elevated: boolean): ThreatSeverity {
  const r = Math.random();
  if (elevated) {
    // 60% HIGH/CRITICAL when sim is hot
    if (r < 0.35) return "CRITICAL";
    if (r < 0.6) return "HIGH";
    if (r < 0.82) return "MED";
    return "LOW";
  }
  // 60% LOW/MED in normal state
  if (r < 0.3) return "LOW";
  if (r < 0.6) return "MED";
  if (r < 0.83) return "HIGH";
  return "CRITICAL";
}

function generateEvent(): ThreatEvent {
  const template =
    THREAT_TEMPLATES[Math.floor(Math.random() * THREAT_TEMPLATES.length)];
  const agent = MOCK_AGENTS[Math.floor(Math.random() * MOCK_AGENTS.length)];
  const now = new Date();
  const ts = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    timestamp: ts,
    agent,
    severity: "LOW", // placeholder — overwritten by caller
    type: template.type,
    action: template.action,
  };
}

// ─── Watcher count ─────────────────────────────────────────────────────────────

function useWatcherCount() {
  const [count, setCount] = useState(5);
  useEffect(() => {
    const id = setInterval(
      () => setCount(3 + Math.floor(Math.random() * 7)),
      4200,
    );
    return () => clearInterval(id);
  }, []);
  return count;
}

// ─── Component ─────────────────────────────────────────────────────────────────

export function ThreatFeedPanel() {
  const threatFeed = useOmegaStore((s) => s.threatFeed);
  const addThreatEvent = useOmegaStore((s) => s.addThreatEvent);
  const simLevel = useOmegaStore((s) => s.simLevel);
  const scrollRef = useRef<HTMLDivElement>(null);
  const watchers = useWatcherCount();

  const elevated = simLevel === "HIGH" || simLevel === "CRITICAL";
  const interval = elevated ? 800 : 2500;

  // ── Auto-generate threat events ──
  useEffect(() => {
    const id = setInterval(() => {
      const event = generateEvent();
      event.severity = pickSeverity(elevated);
      addThreatEvent(event);
    }, interval);
    return () => clearInterval(id);
  }, [elevated, interval, addThreatEvent]);

  // ── Auto-scroll to bottom ──
  const feedLength = threatFeed.length;
  const prevLengthRef = useRef(feedLength);
  useEffect(() => {
    if (feedLength !== prevLengthRef.current) {
      prevLengthRef.current = feedLength;
      const el = scrollRef.current;
      if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  });

  const recent = [...threatFeed].reverse().slice(0, 20);

  return (
    <div
      className="panel-border rounded-lg flex flex-col"
      style={{
        background:
          "linear-gradient(180deg, rgba(0,10,40,0.95) 0%, rgba(5,8,30,0.98) 100%)",
        minHeight: "340px",
      }}
      data-ocid="threat-feed.panel"
    >
      {/* ── Header ── */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b"
        style={{ borderColor: "rgba(0,191,255,0.18)" }}
      >
        <div className="flex items-center gap-2.5">
          {/* Red live dot */}
          <span
            className="relative flex h-2.5 w-2.5"
            aria-label="Live indicator"
          >
            <span
              className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"
              style={{ animation: "threat-ping 1.2s ease-out infinite" }}
            />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
          </span>
          <h3
            className="font-display font-bold tracking-widest text-sm uppercase text-glow"
            style={{ color: "#00BFFF", letterSpacing: "0.2em" }}
          >
            LIVE THREAT FEED
          </h3>
          <span
            className="text-xs font-mono px-1.5 py-0.5 rounded"
            style={{
              color: "#ff4444",
              border: "1px solid rgba(255,68,68,0.4)",
              background: "rgba(255,68,68,0.08)",
              fontWeight: 700,
              letterSpacing: "0.05em",
            }}
          >
            LIVE
          </span>
        </div>

        {/* Watcher count */}
        <div
          className="flex items-center gap-1.5 text-xs font-mono"
          style={{ color: "rgba(0,191,255,0.6)" }}
          data-ocid="threat-feed.watcher_count"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="currentColor"
            aria-hidden="true"
            role="presentation"
          >
            <circle cx="5" cy="3.5" r="2" />
            <path d="M1 8.5c0-2.2 1.8-4 4-4s4 1.8 4 4" />
          </svg>
          <span
            style={{
              color: "#00BFFF",
              textShadow: "0 0 6px rgba(0,191,255,0.5)",
            }}
          >
            {watchers}
          </span>
          <span style={{ opacity: 0.6 }}>watching</span>
        </div>
      </div>

      {/* ── Feed scroll area ── */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-3 py-2 space-y-1"
        style={{
          maxHeight: "280px",
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(0,191,255,0.2) transparent",
        }}
        data-ocid="threat-feed.list"
      >
        {recent.length === 0 && (
          <div
            className="flex items-center justify-center h-24 text-xs font-mono"
            style={{ color: "rgba(0,191,255,0.3)" }}
            data-ocid="threat-feed.empty_state"
          >
            AWAITING INCOMING THREAT VECTORS…
          </div>
        )}

        {recent.map((event, i) => {
          const cfg = SEVERITY_CONFIG[event.severity];
          return (
            <div
              key={event.id}
              className="flex items-start gap-2 py-1.5 px-2 rounded transition-smooth"
              style={{
                background:
                  i === 0 ? "rgba(0,191,255,0.05)" : "rgba(255,255,255,0.01)",
                borderLeft: `2px solid ${
                  event.severity === "CRITICAL"
                    ? "rgba(239,68,68,0.7)"
                    : event.severity === "HIGH"
                      ? "rgba(249,115,22,0.6)"
                      : event.severity === "MED"
                        ? "rgba(234,179,8,0.5)"
                        : "rgba(52,211,153,0.4)"
                }`,
                animation: i === 0 ? "counter-up 0.3s ease-out" : undefined,
              }}
              data-ocid={`threat-feed.item.${i + 1}`}
            >
              {/* Severity badge */}
              <span
                className={`flex-shrink-0 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${cfg.color} ${cfg.pulse ? "animate-pulse" : ""}`}
                style={{
                  minWidth: "36px",
                  textAlign: "center",
                  letterSpacing: "0.05em",
                  ...(event.severity === "CRITICAL"
                    ? {
                        boxShadow:
                          "0 0 8px rgba(239,68,68,0.5), 0 0 16px rgba(239,68,68,0.2)",
                      }
                    : {}),
                }}
              >
                {cfg.label}
              </span>

              {/* Timestamp */}
              <span
                className="flex-shrink-0 text-[10px] font-mono mt-0.5"
                style={{ color: "rgba(0,191,255,0.45)", minWidth: "56px" }}
              >
                {event.timestamp}
              </span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <span
                  className="text-[10px] font-mono font-bold mr-1.5"
                  style={{
                    color: "#00BFFF",
                    textShadow: "0 0 6px rgba(0,191,255,0.4)",
                  }}
                >
                  [{event.agent}]
                </span>
                <span
                  className="text-[10px] font-mono font-bold mr-1"
                  style={{ color: "rgba(255,255,255,0.85)" }}
                >
                  {event.type}
                </span>
                <span
                  className="text-[10px] font-mono"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  → {event.action}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Footer status bar ── */}
      <div
        className="flex items-center justify-between px-4 py-2 border-t"
        style={{ borderColor: "rgba(0,191,255,0.12)" }}
      >
        <span
          className="text-[10px] font-mono"
          style={{ color: "rgba(0,191,255,0.4)" }}
        >
          STREAM: {elevated ? "ELEVATED · 0.8s" : "NORMAL · 2.5s"}
        </span>
        <span
          className="text-[10px] font-mono"
          style={{
            color: elevated ? "rgba(239,68,68,0.7)" : "rgba(0,191,255,0.4)",
          }}
          data-ocid="threat-feed.event_count"
        >
          {threatFeed.length} EVENTS LOGGED
        </span>
      </div>
    </div>
  );
}

export default ThreatFeedPanel;
