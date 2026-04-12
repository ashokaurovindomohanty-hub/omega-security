import { useMemo } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 15 + Math.random() * 70,
    y: 10 + Math.random() * 80,
    size: 2 + Math.random() * 3,
    delay: Math.random() * 6,
    duration: 4 + Math.random() * 4,
    opacity: 0.4 + Math.random() * 0.6,
  }));
}

export default function ParticleField({ count = 25 }: { count?: number }) {
  const particles = useMemo(() => generateParticles(count), [count]);

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.id % 3 === 0 ? "#1E90FF" : "#00BFFF",
            boxShadow: `0 0 ${p.size * 3}px ${p.id % 3 === 0 ? "rgba(30,144,255,0.8)" : "rgba(0,191,255,0.8)"}`,
            opacity: p.opacity,
            animation: `particle-float ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
