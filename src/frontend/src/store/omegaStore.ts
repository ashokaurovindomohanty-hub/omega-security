import { create } from "zustand";

interface OmegaState {
  threatCount: number;
  uptime: number;
  activeShields: number;
  attackersToolsDisabled: number;
  isBooted: boolean;
  commandLog: string[];

  setBooted: (v: boolean) => void;
  addCommand: (cmd: string) => void;
  tick: () => void;
}

export const useOmegaStore = create<OmegaState>((set) => ({
  threatCount: 847,
  uptime: 0,
  activeShields: 12,
  attackersToolsDisabled: 0,
  isBooted: false,
  commandLog: [],

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
}));

export function formatUptime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
