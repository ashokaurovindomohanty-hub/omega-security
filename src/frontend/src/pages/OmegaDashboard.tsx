import AIFace from "@/components/AIFace";
import CommandInput from "@/components/CommandInput";
import OmegaEngagedOverlay from "@/components/OmegaEngagedOverlay";
import ParticleField from "@/components/ParticleField";
import SimulationSandbox from "@/components/SimulationSandbox";
import ThreatFeedPanel from "@/components/ThreatFeedPanel";
import BehavioralAnomalyPanel from "@/components/advanced/BehavioralAnomalyPanel";
import QuantumEncryptionPanel from "@/components/advanced/QuantumEncryptionPanel";
import ZeroTrustPanel from "@/components/advanced/ZeroTrustPanel";
import { AutoDefendPanel } from "@/components/panels/AutoDefendPanel";
import { CommandHierarchyPanel } from "@/components/panels/CommandHierarchyPanel";
import { FirewallPanel } from "@/components/panels/FirewallPanel";
import { KingsEyePanel } from "@/components/panels/KingsEyePanel";
import { MirrorDecoyPanel } from "@/components/panels/MirrorDecoyPanel";
import { NNNProtocolPanel } from "@/components/panels/NNNProtocolPanel";
import { ThreatDetectionPanel } from "@/components/panels/ThreatDetectionPanel";
import { useOmegaStore } from "@/store/omegaStore";

interface OmegaDashboardProps {
  showSim: boolean;
  onSimClose: () => void;
}

export default function OmegaDashboard({
  showSim,
  onSimClose,
}: OmegaDashboardProps) {
  const simLevel = useOmegaStore((s) => s.simLevel);

  const isHighAlert = simLevel === "HIGH" || simLevel === "CRITICAL";

  return (
    <>
      {/* OMEGA ENGAGED full-screen overlay */}
      <OmegaEngagedOverlay />

      {/* Simulation Sandbox modal */}
      <SimulationSandbox isOpen={showSim} onClose={onSimClose} />

      <div
        className="relative min-h-screen omega-bg overflow-x-hidden"
        style={{
          fontFamily: "var(--font-body)",
          transition: "box-shadow 0.6s ease",
          boxShadow: isHighAlert
            ? "inset 0 0 0 2px rgba(255,0,51,0.35), 0 0 60px rgba(255,0,51,0.25)"
            : "none",
        }}
      >
        {/* Global scan line texture */}
        <div className="scanline-overlay" />

        {/* Chiaroscuro background radial glow */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 25%, rgba(30,144,255,0.1) 0%, rgba(0,10,40,0.5) 40%, transparent 70%)",
            zIndex: 0,
          }}
        />

        {/* High-alert red radial tint */}
        {isHighAlert && (
          <div
            className="fixed inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,0,51,0.07) 0%, transparent 70%)",
              zIndex: 0,
              transition: "opacity 0.6s ease",
            }}
          />
        )}

        <div className="relative z-10 p-2">
          {/* Dashboard grid */}
          <div
            className="grid gap-2 mt-2"
            style={{
              gridTemplateColumns: "1fr 1fr 300px 1fr 1fr",
              gridTemplateRows: "auto auto auto auto",
            }}
          >
            {/* Row 1: Left panels */}
            <div className="col-span-2 grid grid-cols-2 gap-2">
              <FirewallPanel />
              <ThreatDetectionPanel />
            </div>

            {/* Central AI Face — spans rows 1-2 */}
            <div
              className="row-span-2 flex flex-col items-center justify-center relative rounded-lg overflow-hidden py-4"
              style={{
                background: "rgba(3,8,25,0.85)",
                border: "1px solid rgba(0,191,255,0.15)",
                boxShadow:
                  "0 0 40px rgba(0,191,255,0.12), inset 0 0 40px rgba(0,0,0,0.7)",
              }}
            >
              <ParticleField count={28} />
              <AIFace />
              <div className="mt-4 text-center">
                <h1
                  className="font-display font-black tracking-[0.2em] text-glow leading-none"
                  style={{
                    fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                    color: "#00BFFF",
                  }}
                >
                  OMEGA
                </h1>
                <h1
                  className="font-display font-black tracking-[0.2em] text-glow leading-none"
                  style={{
                    fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                    color: "#00BFFF",
                  }}
                >
                  SECURITY
                </h1>
                <div
                  className="font-mono text-xs tracking-widest mt-1"
                  style={{ color: "rgba(0,191,255,0.45)" }}
                >
                  AI INTELLIGENCE COMMAND
                </div>
              </div>
            </div>

            {/* Row 1: Right panels */}
            <div className="col-span-2 grid grid-cols-2 gap-2">
              <CommandHierarchyPanel />
              <MirrorDecoyPanel />
            </div>

            {/* Row 2: Left panels */}
            <div className="col-span-2 grid grid-cols-2 gap-2">
              <AutoDefendPanel />
              <NNNProtocolPanel />
            </div>

            {/* Row 2: Right panels */}
            <div className="col-span-2 grid grid-cols-2 gap-2">
              <ZeroTrustPanel />
              <QuantumEncryptionPanel />
            </div>

            {/* Row 3: King's Eye world map */}
            <div className="col-span-5">
              <KingsEyePanel />
            </div>

            {/* Row 4: Anomaly + Command Interface */}
            <div className="col-span-2">
              <BehavioralAnomalyPanel />
            </div>
            <div className="col-span-3">
              <CommandInput />
            </div>

            {/* Row 5: Live Threat Feed — full width */}
            <div className="col-span-5" data-ocid="threat-feed_panel">
              <ThreatFeedPanel />
            </div>
          </div>

          {/* Footer */}
          <footer
            className="mt-4 text-center font-mono text-xs py-2"
            style={{
              color: "rgba(0,191,255,0.2)",
              borderTop: "1px solid rgba(0,191,255,0.08)",
            }}
          >
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : "",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(0,191,255,0.45)" }}
            >
              caffeine.ai
            </a>
          </footer>
        </div>
      </div>
    </>
  );
}
