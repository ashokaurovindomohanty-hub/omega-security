import { create } from "zustand";

// ─── Exported Constants ────────────────────────────────────────────────────────

export const MOCK_AGENTS = [
  "AGENT_7",
  "SENTINEL_3",
  "COMMAND_CENTER",
  "RECON_ALPHA",
  "SHADOW_UNIT",
  "ORACLE_9",
  "NEXUS_PRIME",
] as const;

export const THREAT_TEMPLATES: { type: string; action: string }[] = [
  { type: "INTRUSION ATTEMPT", action: "BLOCKED by perimeter firewall" },
  { type: "BRUTE FORCE ATTACK", action: "NEUTRALIZED via rate-limiter" },
  { type: "SQL INJECTION", action: "INTERCEPTED by query sanitizer" },
  { type: "DDOS SURGE", action: "ABSORBED by load balancer" },
  { type: "ZERO-DAY EXPLOIT", action: "QUARANTINED in sandbox layer" },
  { type: "PHISHING PAYLOAD", action: "FLAGGED and sender blacklisted" },
  { type: "PRIVILEGE ESCALATION", action: "DENIED by zero-trust policy" },
  { type: "RANSOMWARE PROBE", action: "DETONATED in decoy honeypot" },
  { type: "SUPPLY CHAIN VECTOR", action: "TRACED and dependency locked" },
  { type: "LATERAL MOVEMENT", action: "SEVERED by micro-segmentation" },
  { type: "DATA EXFILTRATION", action: "TERMINATED by egress filter" },
  { type: "CREDENTIAL STUFFING", action: "DEFEATED by anomaly detector" },
];

// ─── Types ─────────────────────────────────────────────────────────────────────

export type ThreatSeverity = "LOW" | "MED" | "HIGH" | "CRITICAL";

export interface ThreatEvent {
  id: string;
  timestamp: string;
  agent: string;
  severity: ThreatSeverity;
  type: string;
  action: string;
}

// ─── Store Interface ───────────────────────────────────────────────────────────

interface OmegaState {
  // ── Existing state ──
  threatCount: number;
  uptime: number;
  activeShields: number;
  attackersToolsDisabled: number;
  isBooted: boolean;
  commandLog: string[];

  // ── Threat Feed ──
  threatFeed: ThreatEvent[];

  // ── OMEGA ENGAGED mode ──
  isEngaged: boolean;

  // ── Simulation Sandbox ──
  simLevel: null | ThreatSeverity;

  // ── Existing actions ──
  setBooted: (v: boolean) => void;
  addCommand: (cmd: string) => void;
  tick: () => void;

  // ── Threat Feed actions ──
  addThreatEvent: (event: ThreatEvent) => void;
  clearThreatFeed: () => void;

  // ── OMEGA ENGAGED actions ──
  toggleEngaged: () => void;

  // ── Simulation Sandbox actions ──
  setSimLevel: (level: ThreatSeverity) => void;
  resetSim: () => void;
}

// ─── Severity spike map ────────────────────────────────────────────────────────

const SIM_SPIKE: Record<ThreatSeverity, number> = {
  LOW: 50,
  MED: 150,
  HIGH: 500,
  CRITICAL: 1000,
};

// ─── Store ─────────────────────────────────────────────────────────────────────

export const useOmegaStore = create<OmegaState>((set) => ({
  // ── Existing defaults ──
  threatCount: 847,
  uptime: 0,
  activeShields: 12,
  attackersToolsDisabled: 0,
  isBooted: false,
  commandLog: [],

  // ── New defaults ──
  threatFeed: [],
  isEngaged: false,
  simLevel: null,

  // ── Existing actions ──
  setBooted: (v) => set({ isBooted: v }),

  addCommand: (cmd) =>
    set((s) => ({
      commandLog: [cmd, ...s.commandLog].slice(0, 50),
    })),

  tick: () =>
    set((s) => ({
      uptime: s.uptime + 1,
      threatCount:
        s.uptime % Math.floor(3 + Math.random() * 4) === 0
          ? s.threatCount + Math.floor(1 + Math.random() * 3)
          : s.threatCount,
      activeShields:
        s.uptime % 11 === 0
          ? Math.max(
              8,
              Math.min(16, s.activeShields + (Math.random() > 0.5 ? 1 : -1)),
            )
          : s.activeShields,
      attackersToolsDisabled:
        s.uptime % 7 === 0
          ? s.attackersToolsDisabled + 1
          : s.attackersToolsDisabled,
    })),

  // ── Threat Feed actions ──
  addThreatEvent: (event) =>
    set((s) => ({
      threatFeed: [event, ...s.threatFeed].slice(0, 50),
    })),

  clearThreatFeed: () => set({ threatFeed: [] }),

  // ── OMEGA ENGAGED actions ──
  toggleEngaged: () => set((s) => ({ isEngaged: !s.isEngaged })),

  // ── Simulation Sandbox actions ──
  setSimLevel: (level) =>
    set((s) => ({
      simLevel: level,
      threatCount: s.threatCount + SIM_SPIKE[level],
    })),

  resetSim: () => set({ simLevel: null, activeShields: 12 }),
}));

// ─── Utility ───────────────────────────────────────────────────────────────────

export function formatUptime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
