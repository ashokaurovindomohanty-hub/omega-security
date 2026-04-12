import { Activity } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Line, LineChart, ResponsiveContainer, YAxis } from "recharts";

interface DataPoint {
  id: number;
  v: number;
}

function Panel({
  title,
  icon,
  children,
  ocid,
  anomaly,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  ocid: string;
  anomaly?: boolean;
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
        border: anomaly
          ? "1px solid rgba(255,68,68,0.6)"
          : active
            ? "1px solid rgba(0,191,255,0.65)"
            : "1px solid rgba(0,191,255,0.2)",
        boxShadow: anomaly
          ? "0 0 20px rgba(255,68,68,0.3), 0 0 40px rgba(255,68,68,0.1), inset 0 0 20px rgba(0,0,0,0.5)"
          : active
            ? "0 0 30px rgba(0,191,255,0.35), 0 0 60px rgba(0,191,255,0.12), inset 0 0 20px rgba(0,0,0,0.5)"
            : "0 0 10px rgba(0,191,255,0.08), inset 0 0 20px rgba(0,0,0,0.6)",
        transition: "box-shadow 0.4s, border-color 0.4s",
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

let seqId = 0;

function genPoint(prev: number): DataPoint {
  // Random walk with occasional spike
  const spike = Math.random() < 0.07;
  const delta = spike ? 25 + Math.random() * 40 : (Math.random() - 0.5) * 18;
  const v = Math.max(5, Math.min(100, prev + delta));
  seqId += 1;
  return { id: seqId, v };
}

export default function BehavioralAnomalyPanel() {
  const [data, setData] = useState<DataPoint[]>(() => {
    let prev = 30;
    return Array.from({ length: 20 }, () => {
      const pt = genPoint(prev);
      prev = pt.v;
      return pt;
    });
  });
  const [anomalyDetected, setAnomalyDetected] = useState(false);
  const anomalyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateData = useCallback(() => {
    setData((prev) => {
      const last = prev[prev.length - 1];
      const next = genPoint(last?.v ?? 30);
      const updated = [...prev.slice(-19), next];
      if (next.v > 75) {
        setAnomalyDetected(true);
        if (anomalyTimer.current) clearTimeout(anomalyTimer.current);
        anomalyTimer.current = setTimeout(
          () => setAnomalyDetected(false),
          2200,
        );
      }
      return updated;
    });
  }, []);

  useEffect(() => {
    const id = setInterval(updateData, 900);
    return () => {
      clearInterval(id);
      if (anomalyTimer.current) clearTimeout(anomalyTimer.current);
    };
  }, [updateData]);

  const current = data[data.length - 1]?.v ?? 0;
  const isHot = current > 75;

  return (
    <Panel
      title="BEHAVIORAL ANOMALY ENGINE"
      icon={<Activity className="w-3.5 h-3.5" />}
      ocid="panel-anomaly"
      anomaly={anomalyDetected}
    >
      <div>
        {/* Header row */}
        <div
          className="flex justify-between items-center font-mono mb-2"
          style={{ fontSize: 9 }}
        >
          <span style={{ color: "rgba(0,191,255,0.5)" }}>
            DEVIATION SCORE (LIVE)
          </span>
          <div className="flex items-center gap-2">
            {anomalyDetected && (
              <span
                className="font-bold tracking-widest px-1.5 py-0.5 rounded"
                style={{
                  fontSize: 8,
                  color: "#ff4444",
                  background: "rgba(255,68,68,0.15)",
                  border: "1px solid rgba(255,68,68,0.4)",
                  animation: "deploy-flash 0.35s linear 4",
                  boxShadow: "0 0 10px rgba(255,68,68,0.4)",
                }}
              >
                ⚠ ANOMALY DETECTED
              </span>
            )}
            <span
              style={{
                color: isHot ? "#ff4444" : "#00BFFF",
                fontWeight: 700,
                textShadow: isHot
                  ? "0 0 8px rgba(255,68,68,0.8)"
                  : "0 0 8px rgba(0,191,255,0.6)",
                transition: "color 0.3s",
              }}
            >
              {Math.round(current)}%
            </span>
          </div>
        </div>

        {/* Chart */}
        <div style={{ height: 56 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 2, right: 2, left: 2, bottom: 2 }}
            >
              <YAxis domain={[0, 100]} hide />
              <Line
                type="monotone"
                dataKey="v"
                stroke={anomalyDetected ? "#ff4444" : "#00BFFF"}
                strokeWidth={1.5}
                dot={false}
                isAnimationActive={false}
                style={{
                  filter: anomalyDetected
                    ? "drop-shadow(0 0 4px rgba(255,68,68,0.9))"
                    : "drop-shadow(0 0 4px rgba(0,191,255,0.8))",
                  transition: "stroke 0.4s, filter 0.4s",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Threshold line label */}
        <div
          className="flex justify-between items-center mt-1"
          style={{ fontSize: 8 }}
        >
          <span className="font-mono" style={{ color: "rgba(0,191,255,0.3)" }}>
            THRESHOLD: 75%
          </span>
          <span
            className="font-mono"
            style={{
              color: isHot ? "rgba(255,68,68,0.7)" : "rgba(0,191,255,0.35)",
            }}
          >
            STATUS: {isHot ? "ALERT" : "NOMINAL"}
          </span>
        </div>
      </div>
    </Panel>
  );
}
