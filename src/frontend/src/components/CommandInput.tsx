import { useOmegaStore } from "@/store/omegaStore";
import { Terminal } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const OMEGA_RESPONSES = [
  "THREAT MATRIX RECALIBRATED. ALL SECTORS SECURED.",
  "NEURAL NET NEMESIS PROTOCOL STANDING BY. LOGIC VIRUS ARMED.",
  "SCANNING QUANTUM ENTANGLEMENT CHANNELS... PATHWAYS ENCRYPTED.",
  "ZERO-TRUST VERIFICATION COMPLETE. ACCESS GRANTED TO OMEGA TIER.",
  "DEPLOYING COUNTER-INTRUSION SWARM... 47 VECTORS NEUTRALIZED.",
  "KING'S EYE SURVEILLANCE ACTIVE. GLOBAL PERIMETER LOCKED.",
  "MISA BACKUP AI ONLINE. SECONDARY PROTOCOLS ENGAGED.",
  "MIRROR DECOY SYSTEM ACTIVATED. ATTACKER REDIRECTED TO HONEYPOT.",
  "AUTO-DEFEND EVOLUTION CYCLE COMPLETE. NEW STRATEGY SYNTHESIZED.",
  "BEHAVIORAL ANOMALY SUPPRESSED. THREAT SCORE DROPPED TO NOMINAL.",
  "FIREWALL INTEGRITY AT 100%. ETERNAL SHIELD HOLDING.",
  "QUANTUM ENCRYPTION LAYER REFORTIFIED. QUANTUM-256 ACTIVE.",
  "COMMAND HIERARCHY ACKNOWLEDGED. VOICE INPUT CONFIRMED — PRIMARY.",
  "NEURAL NET SURVEILLANCE ACTIVE. 99.97% ACCURACY MAINTAINED.",
  "OMEGA COMMAND ACCEPTED. DEPLOYING RESPONSE PROTOCOL DELTA-9.",
  "INTRUSION ATTEMPT LOGGED. ATTACKER TOOLS DISABLED. COUNT UPDATED.",
  "ALL TWELVE SHIELDS ENGAGED. OMEGA DEFENSE MATRIX OPERATIONAL.",
  "SATELLITE UPLINK CONFIRMED. KING'S EYE GLOBAL GRID ONLINE.",
];

interface LogEntry {
  id: number;
  cmd: string;
  response: string;
  typing: boolean;
}

let entryId = 0;

function useTypewriter(text: string, active: boolean, speed = 28) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!active) {
      setDisplayed(text);
      return;
    }
    setDisplayed("");
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, active, speed]);

  return displayed;
}

function LogLine({ entry }: { entry: LogEntry }) {
  const typed = useTypewriter(entry.response, entry.typing);

  return (
    <div className="mb-2">
      {/* Command line */}
      <div className="flex items-center gap-1.5">
        <span
          className="font-mono font-bold flex-shrink-0"
          style={{ fontSize: 10, color: "rgba(0,191,255,0.4)" }}
        >
          OMEGA://$
        </span>
        <span
          className="font-mono font-bold truncate"
          style={{ fontSize: 10, color: "rgba(255,255,255,0.8)" }}
        >
          {entry.cmd}
        </span>
      </div>
      {/* Response */}
      <div className="flex items-start gap-1.5 mt-0.5 pl-1">
        <span
          className="font-mono font-black flex-shrink-0"
          style={{
            fontSize: 10,
            color: "#00BFFF",
            textShadow: "0 0 8px rgba(0,191,255,0.7)",
          }}
        >
          OMEGA &gt;
        </span>
        <span
          className="font-mono break-words"
          style={{
            fontSize: 10,
            color: "rgba(0,191,255,0.9)",
            lineHeight: 1.5,
          }}
        >
          {typed}
          {entry.typing && typed.length < entry.response.length && (
            <span
              className="inline-block w-1.5 h-3 ml-0.5"
              style={{
                background: "#00BFFF",
                verticalAlign: "middle",
                animation: "anomaly-pulse 0.6s infinite",
              }}
            />
          )}
        </span>
      </div>
    </div>
  );
}

export default function CommandInput() {
  const [input, setInput] = useState("");
  const [log, setLog] = useState<LogEntry[]>([]);
  const { addCommand } = useOmegaStore();
  const logRef = useRef<HTMLDivElement>(null);

  // Auto-scroll when log updates — use ref to avoid stale closure
  const scrollToBottom = useCallback(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, []);
  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = input.trim();
      if (!trimmed) return;
      const cmd = trimmed.toUpperCase();
      const response =
        OMEGA_RESPONSES[Math.floor(Math.random() * OMEGA_RESPONSES.length)];
      addCommand(cmd);
      entryId += 1;
      const id = entryId;
      setLog((prev) => [
        ...prev.slice(-4), // keep last 4 before adding new = max 5 visible
        { id, cmd, response, typing: true },
      ]);
      // Stop typewriter effect after response is done (estimate)
      const duration = response.length * 28 + 200;
      setTimeout(() => {
        setLog((prev) =>
          prev.map((e) => (e.id === id ? { ...e, typing: false } : e)),
        );
      }, duration);
      setInput("");
    },
    [input, addCommand],
  );

  return (
    <div
      className="w-full rounded-lg overflow-hidden"
      style={{
        background: "rgba(3,7,20,0.95)",
        border: "1px solid rgba(0,191,255,0.3)",
        boxShadow:
          "0 0 20px rgba(0,191,255,0.1), 0 0 40px rgba(0,191,255,0.04), inset 0 0 30px rgba(0,0,0,0.7)",
      }}
      data-ocid="panel-command-input"
    >
      {/* Terminal header bar */}
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{
          background: "rgba(0,191,255,0.06)",
          borderBottom: "1px solid rgba(0,191,255,0.18)",
        }}
      >
        <Terminal className="w-3.5 h-3.5" style={{ color: "#00BFFF" }} />
        <span
          className="font-mono font-bold tracking-wider text-xs"
          style={{ color: "#00BFFF" }}
        >
          OMEGA COMMAND INTERFACE
        </span>
        {/* Traffic lights style dots */}
        <div className="ml-auto flex gap-1.5">
          {[
            "rgba(255,68,68,0.7)",
            "rgba(255,204,0,0.7)",
            "rgba(0,191,255,0.7)",
          ].map((bg) => (
            <div
              key={bg}
              className="w-2 h-2 rounded-full"
              style={{ background: bg }}
            />
          ))}
        </div>
      </div>

      {/* Log scroll area */}
      <div
        ref={logRef}
        className="px-3 pt-2 overflow-y-auto"
        style={{ minHeight: 80, maxHeight: 140 }}
        data-ocid="command-log"
      >
        {log.length === 0 ? (
          <div
            className="font-mono py-2"
            style={{ fontSize: 9, color: "rgba(0,191,255,0.3)" }}
          >
            OMEGA COMMAND TERMINAL READY. AWAITING INPUT...
          </div>
        ) : (
          log.map((entry) => <LogLine key={entry.id} entry={entry} />)
        )}
      </div>

      {/* Input form */}
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 px-3 pb-3 pt-2"
        style={{ borderTop: "1px solid rgba(0,191,255,0.1)" }}
      >
        <div
          className="flex-1 flex items-center gap-2 rounded px-2"
          style={{
            background: "rgba(0,0,20,0.7)",
            border: "1px solid rgba(0,191,255,0.22)",
            boxShadow: "inset 0 0 10px rgba(0,0,0,0.5)",
          }}
        >
          <span
            className="font-mono font-bold flex-shrink-0"
            style={{ fontSize: 10, color: "rgba(0,191,255,0.45)" }}
          >
            OMEGA://$
          </span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="ENTER OMEGA COMMAND..."
            className="flex-1 bg-transparent outline-none font-mono tracking-wider py-1.5"
            style={{
              fontSize: 10,
              color: "#00BFFF",
              caretColor: "#00BFFF",
            }}
            data-ocid="command-input"
            aria-label="OMEGA command input"
            autoComplete="off"
            spellCheck={false}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-1.5 rounded font-mono font-black tracking-wider transition-smooth flex-shrink-0"
          style={{
            fontSize: 10,
            background: "rgba(0,191,255,0.15)",
            border: "1px solid rgba(0,191,255,0.45)",
            color: "#00BFFF",
            boxShadow: "0 0 12px rgba(0,191,255,0.2)",
            textShadow: "0 0 8px rgba(0,191,255,0.6)",
          }}
          data-ocid="btn-command-submit"
          aria-label="Execute command"
        >
          EXECUTE
        </button>
      </form>
    </div>
  );
}
