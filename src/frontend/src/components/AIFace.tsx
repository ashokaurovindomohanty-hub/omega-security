export default function AIFace() {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: 320, height: 360 }}
    >
      {/* Outer halo rotating ring */}
      <svg
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          animation: "halo-rotate 20s linear infinite",
          filter: "drop-shadow(0 0 12px rgba(0,191,255,0.7))",
        }}
        width={320}
        height={360}
        viewBox="0 0 320 360"
      >
        <ellipse
          cx={160}
          cy={175}
          rx={148}
          ry={168}
          fill="none"
          stroke="rgba(0,191,255,0.4)"
          strokeWidth="1.5"
          strokeDasharray="12 6"
        />
        {/* Rotating energy nodes */}
        {[0, 72, 144, 216, 288].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const x = 160 + 148 * Math.cos(rad);
          const y = 175 + 168 * Math.sin(rad);
          return (
            <circle
              key={deg}
              cx={x}
              cy={y}
              r={4}
              fill="#00BFFF"
              style={{ filter: "drop-shadow(0 0 6px rgba(0,191,255,1))" }}
            />
          );
        })}
      </svg>

      {/* Inner counter-rotating ring */}
      <svg
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          animation: "halo-rotate-reverse 12s linear infinite",
          filter: "drop-shadow(0 0 8px rgba(30,144,255,0.5))",
        }}
        width={320}
        height={360}
        viewBox="0 0 320 360"
      >
        <ellipse
          cx={160}
          cy={175}
          rx={130}
          ry={148}
          fill="none"
          stroke="rgba(30,144,255,0.3)"
          strokeWidth="1"
          strokeDasharray="4 8"
        />
      </svg>

      {/* Background radial glow */}
      <div
        className="absolute"
        style={{
          width: 280,
          height: 320,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(0,191,255,0.18) 0%, rgba(30,144,255,0.10) 35%, transparent 70%)",
          animation: "face-pulse 3s ease-in-out infinite",
        }}
      />

      {/* AI Face SVG portrait */}
      <svg
        aria-label="OMEGA AI — Abstract female AI portrait"
        role="img"
        width={220}
        height={270}
        viewBox="0 0 220 270"
        style={{
          filter:
            "drop-shadow(0 0 18px rgba(0,191,255,0.6)) drop-shadow(0 0 36px rgba(0,191,255,0.3))",
          animation: "face-pulse 3s ease-in-out infinite",
        }}
      >
        <defs>
          <radialGradient id="faceGlow" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="rgba(0,191,255,0.35)" />
            <stop offset="40%" stopColor="rgba(0,120,200,0.18)" />
            <stop offset="100%" stopColor="rgba(0,0,40,0)" />
          </radialGradient>
          <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00BFFF" stopOpacity="1" />
            <stop offset="60%" stopColor="#1E90FF" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#0a0e27" stopOpacity="0" />
          </radialGradient>
          <filter id="softBlur">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
          <filter id="glowBlur">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* Face silhouette base */}
        <ellipse cx={110} cy={130} rx={72} ry={90} fill="rgba(0,20,60,0.5)" />

        {/* Glowing contour lines — jaw */}
        <path
          d="M60,145 Q68,200 80,220 Q95,240 110,245 Q125,240 140,220 Q152,200 160,145"
          fill="none"
          stroke="rgba(0,191,255,0.35)"
          strokeWidth="1.5"
          filter="url(#softBlur)"
        />

        {/* Cheekbones — left */}
        <path
          d="M62,140 Q58,155 63,168 Q68,175 75,178"
          fill="none"
          stroke="rgba(0,191,255,0.45)"
          strokeWidth="1.2"
        />
        {/* Cheekbones — right */}
        <path
          d="M158,140 Q162,155 157,168 Q152,175 145,178"
          fill="none"
          stroke="rgba(0,191,255,0.45)"
          strokeWidth="1.2"
        />

        {/* Forehead top */}
        <path
          d="M65,110 Q68,75 110,60 Q152,75 155,110"
          fill="none"
          stroke="rgba(0,191,255,0.3)"
          strokeWidth="1"
          filter="url(#softBlur)"
        />

        {/* Nose bridge */}
        <path
          d="M105,125 L108,170 M115,125 L112,170"
          fill="none"
          stroke="rgba(0,191,255,0.25)"
          strokeWidth="0.8"
        />
        <path
          d="M100,170 Q105,178 110,180 Q115,178 120,170"
          fill="none"
          stroke="rgba(0,191,255,0.3)"
          strokeWidth="1"
        />

        {/* Left eye */}
        <ellipse cx={85} cy={140} rx={16} ry={8} fill="rgba(0,10,40,0.7)" />
        <ellipse
          cx={85}
          cy={140}
          rx={16}
          ry={8}
          fill="none"
          stroke="rgba(0,191,255,0.6)"
          strokeWidth="1"
        />
        <ellipse
          cx={85}
          cy={140}
          rx={8}
          ry={5}
          fill="url(#eyeGlow)"
          opacity="0.85"
        />
        <circle
          cx={85}
          cy={140}
          r={3}
          fill="#00BFFF"
          style={{ filter: "url(#glowBlur)" }}
        />
        <circle cx={85} cy={140} r={1.5} fill="#ffffff" opacity="0.9" />
        {/* Left eye glow halo */}
        <ellipse
          cx={85}
          cy={140}
          rx={20}
          ry={11}
          fill="none"
          stroke="rgba(0,191,255,0.2)"
          strokeWidth="0.5"
          filter="url(#softBlur)"
        />

        {/* Right eye */}
        <ellipse cx={135} cy={140} rx={16} ry={8} fill="rgba(0,10,40,0.7)" />
        <ellipse
          cx={135}
          cy={140}
          rx={16}
          ry={8}
          fill="none"
          stroke="rgba(0,191,255,0.6)"
          strokeWidth="1"
        />
        <ellipse
          cx={135}
          cy={140}
          rx={8}
          ry={5}
          fill="url(#eyeGlow)"
          opacity="0.85"
        />
        <circle
          cx={135}
          cy={140}
          r={3}
          fill="#00BFFF"
          style={{ filter: "url(#glowBlur)" }}
        />
        <circle cx={135} cy={140} r={1.5} fill="#ffffff" opacity="0.9" />
        <ellipse
          cx={135}
          cy={140}
          rx={20}
          ry={11}
          fill="none"
          stroke="rgba(0,191,255,0.2)"
          strokeWidth="0.5"
          filter="url(#softBlur)"
        />

        {/* Lips */}
        <path
          d="M96,198 Q103,194 110,196 Q117,194 124,198"
          fill="none"
          stroke="rgba(0,191,255,0.5)"
          strokeWidth="1.2"
        />
        <path
          d="M96,198 Q103,205 110,207 Q117,205 124,198"
          fill="none"
          stroke="rgba(0,191,255,0.35)"
          strokeWidth="1"
        />

        {/* Data scan lines across face */}
        {[125, 155, 185].map((y) => (
          <line
            key={y}
            x1={58}
            y1={y}
            x2={162}
            y2={y}
            stroke="rgba(0,191,255,0.08)"
            strokeWidth="0.5"
          />
        ))}

        {/* Face glow overlay */}
        <ellipse cx={110} cy={130} rx={72} ry={90} fill="url(#faceGlow)" />

        {/* Crown glow */}
        <ellipse
          cx={110}
          cy={62}
          rx={30}
          ry={12}
          fill="rgba(0,191,255,0.2)"
          filter="url(#glowBlur)"
        />
      </svg>

      {/* Pulsing inner glow ring */}
      <div
        className="absolute"
        style={{
          width: 250,
          height: 290,
          borderRadius: "50%",
          border: "1px solid rgba(0,191,255,0.2)",
          boxShadow: "inset 0 0 40px rgba(0,191,255,0.1)",
          animation: "glow 3s ease-in-out infinite",
        }}
      />
    </div>
  );
}
