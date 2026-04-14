import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont as loadAlata } from "@remotion/google-fonts/Alata";
import { loadFont as loadPlex } from "@remotion/google-fonts/IBMPlexSans";
import { Scene } from "../config";

// Księga znaku 3.0 — nagłówki: Alata, body: IBM Plex Sans
const { fontFamily: headFont } = loadAlata();
const { fontFamily: bodyFont } = loadPlex("normal", {
  weights: ["400", "700"],
  subsets: ["latin-ext"],
});

// ─── Księga znaku 2.1 — Kolory ──────────────────────────────────────────
const C = {
  orange: "#eb5d1c",       // Crazy Orange — dominanta
  orangeDark: "#c94d14",
  peach: "#f6b090",        // Fresh Peach
  green: "#209b84",        // Hello — akcent 15-20%
  yellow: "#f9e064",       // Today — akcent 15-20%
  grayMid: "#5d6970",      // Cold London
  dark: "#1d1d1b",         // Dark Night
  dark2: "#2e2e2c",        // Dark Night lighter
  grayLight: "#c1c8cd",    // In the Morning
  white: "#ffffff",        // Snow
};

interface SceneProps {
  scene: Scene;
  sceneIndex: number;
}

// ─── Animation helpers ───────────────────────────────────────────────────
const spr = (frame: number, fps: number, delay = 0, config = { damping: 200 }) =>
  spring({ frame: frame - delay, fps, config });

const bounce = (frame: number, fps: number, delay = 0) =>
  spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 200 } });

const clamp = (frame: number, a: number, b: number) =>
  interpolate(frame, [a, b], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

// ─── Decorative: Floating sygnet shapes (real PNG from brand guidelines) ──
interface ShapeConfig {
  x: number;
  y: number;
  size: number;
  rotation: number;
  speed: number;      // float speed multiplier
  delay: number;      // entry delay in frames
  variant: "white" | "black"; // sygnet-white or sygnet-black
  opacity: number;
}

// Predefined shape layouts per scene — scattered across the frame
const SHAPE_LAYOUTS: ShapeConfig[][] = [
  // Layout 0
  [
    { x: -40, y: 120, size: 160, rotation: 15, speed: 0.8, delay: 0, variant: "white", opacity: 0.06 },
    { x: 880, y: 1600, size: 200, rotation: -10, speed: 1.2, delay: 5, variant: "black", opacity: 0.05 },
    { x: 920, y: 300, size: 100, rotation: 30, speed: 0.6, delay: 10, variant: "white", opacity: 0.04 },
    { x: 50, y: 1200, size: 120, rotation: -20, speed: 1.0, delay: 8, variant: "black", opacity: 0.05 },
    { x: 500, y: 1750, size: 80, rotation: 45, speed: 1.4, delay: 3, variant: "white", opacity: 0.03 },
  ],
  // Layout 1
  [
    { x: 850, y: 200, size: 180, rotation: -15, speed: 1.0, delay: 0, variant: "black", opacity: 0.06 },
    { x: -30, y: 1500, size: 150, rotation: 20, speed: 0.7, delay: 6, variant: "white", opacity: 0.05 },
    { x: 700, y: 1100, size: 110, rotation: -35, speed: 1.3, delay: 4, variant: "black", opacity: 0.04 },
    { x: 100, y: 400, size: 90, rotation: 10, speed: 0.9, delay: 12, variant: "white", opacity: 0.05 },
    { x: 450, y: 80, size: 70, rotation: 60, speed: 1.1, delay: 7, variant: "black", opacity: 0.03 },
  ],
  // Layout 2
  [
    { x: 920, y: 500, size: 190, rotation: 25, speed: 0.9, delay: 0, variant: "white", opacity: 0.06 },
    { x: -20, y: 800, size: 140, rotation: -30, speed: 1.1, delay: 3, variant: "black", opacity: 0.05 },
    { x: 750, y: 1650, size: 100, rotation: 15, speed: 1.5, delay: 8, variant: "white", opacity: 0.04 },
    { x: 200, y: 150, size: 130, rotation: -45, speed: 0.7, delay: 5, variant: "black", opacity: 0.05 },
    { x: 550, y: 1300, size: 85, rotation: 0, speed: 1.2, delay: 10, variant: "white", opacity: 0.03 },
  ],
  // Layout 3
  [
    { x: -30, y: 300, size: 170, rotation: -20, speed: 1.0, delay: 0, variant: "black", opacity: 0.06 },
    { x: 900, y: 1400, size: 160, rotation: 35, speed: 0.8, delay: 4, variant: "white", opacity: 0.05 },
    { x: 800, y: 700, size: 95, rotation: -10, speed: 1.3, delay: 7, variant: "black", opacity: 0.04 },
    { x: 150, y: 1700, size: 120, rotation: 50, speed: 0.6, delay: 2, variant: "white", opacity: 0.05 },
    { x: 400, y: 50, size: 75, rotation: -55, speed: 1.4, delay: 9, variant: "black", opacity: 0.03 },
  ],
];

const FloatingShapes: React.FC<{ layoutIndex?: number }> = ({ layoutIndex = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const shapes = SHAPE_LAYOUTS[layoutIndex % SHAPE_LAYOUTS.length];

  return (
    <>
      {shapes.map((s, i) => {
        const entryProg = spr(frame, fps, s.delay);
        // Gentle floating motion
        const floatY = Math.sin((frame - s.delay) * 0.03 * s.speed) * 12;
        const floatX = Math.cos((frame - s.delay) * 0.02 * s.speed) * 8;
        // Slow continuous rotation
        const rot = s.rotation + (frame - s.delay) * 0.15 * s.speed;

        return (
          <Img
            key={i}
            src={staticFile(`sygnet-${s.variant}.png`)}
            style={{
              position: "absolute",
              left: s.x + floatX,
              top: s.y + floatY,
              width: s.size,
              height: s.size * 1.42, // sygnet aspect ratio ~1:1.42
              objectFit: "contain",
              opacity: s.opacity * entryProg,
              transform: `rotate(${rot}deg) scale(${interpolate(entryProg, [0, 1], [0.5, 1])})`,
              pointerEvents: "none",
            }}
          />
        );
      })}
    </>
  );
};

// ─── Decorative: Top bar ─────────────────────────────────────────────────
const OrangeBar: React.FC<{ position: "top" | "bottom" }> = ({ position }) => (
  <div
    style={{
      position: "absolute",
      [position]: 0,
      left: 0,
      width: "100%",
      height: 6,
      background: C.orange,
    }}
  />
);

// ─── Decorative: Corner accent with green ────────────────────────────────
const CornerAccent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const prog = spr(frame, fps, 0);
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 40,
          right: 40,
          width: interpolate(prog, [0, 1], [0, 64]),
          height: 4,
          background: C.green,
          borderRadius: 2,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 40,
          right: 40,
          width: 4,
          height: interpolate(prog, [0, 1], [0, 64]),
          background: C.green,
          borderRadius: 2,
        }}
      />
    </>
  );
};

// ─── Logo watermark ──────────────────────────────────────────────────────
const LogoWatermark: React.FC = () => (
  <Img
    src={staticFile("logo-sygnet.png")}
    style={{
      position: "absolute",
      top: 48,
      left: 48,
      width: 48,
      height: 48,
      opacity: 0.25,
    }}
  />
);

// ═══════════════════════════════════════════════════════════════════════════
// HOOK SCENE — rapid-fire questions
// ═══════════════════════════════════════════════════════════════════════════
const HookScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const questions = scene.hookQuestions ?? [];
  // Dynamically divide scene duration equally among questions
  const questionDuration = questions.length > 0
    ? Math.floor(durationInFrames / questions.length)
    : durationInFrames;

  return (
    <AbsoluteFill style={{ background: C.dark }}>
      <OrangeBar position="top" />
      <OrangeBar position="bottom" />
      <FloatingShapes layoutIndex={0} />

      {questions.map((q, i) => {
        const start = i * questionDuration;
        const end = start + questionDuration;
        const visible = frame >= start && frame < end;
        const localFrame = frame - start;
        if (!visible) return null;

        const scale = interpolate(localFrame, [0, 6], [1.4, 1], {
          extrapolateRight: "clamp",
          extrapolateLeft: "clamp",
        });
        const opacity = interpolate(
          localFrame,
          [0, 3, questionDuration - 3, questionDuration],
          [0, 1, 1, 0],
          { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
        );

        // Alternate accent colors
        const accentColors = [C.orange, C.green, C.yellow, C.orange];

        return (
          <AbsoluteFill
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 72px",
            }}
          >
            <div
              style={{
                fontFamily: headFont,
                fontSize: 88,
                fontWeight: 400,
                color: C.white,
                textAlign: "center",
                lineHeight: 1.12,
                transform: `scale(${scale})`,
                opacity,
              }}
            >
              {q.split("\n").map((line, li) => (
                <div key={li}>
                  {li > 0 ? (
                    <span style={{ color: accentColors[i] }}>{line}</span>
                  ) : (
                    line
                  )}
                </div>
              ))}
            </div>
          </AbsoluteFill>
        );
      })}

      {/* Dot indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 14,
        }}
      >
        {questions.map((_, i) => {
          const active = frame >= i * questionDuration && frame < (i + 1) * questionDuration;
          return (
            <div
              key={i}
              style={{
                width: active ? 36 : 12,
                height: 12,
                borderRadius: 6,
                background: active ? C.orange : C.grayMid,
              }}
            />
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// PAIN SCENE
// ═══════════════════════════════════════════════════════════════════════════
const PainScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const items = scene.items ?? [];
  const headProg = bounce(frame, fps, 3);
  const subOpacity = clamp(frame, 12, 24);

  // Each item gets a slice of time — appear, hold, fade out
  const itemCount = items.length;
  const itemSlice = itemCount > 0 ? Math.floor((durationInFrames - 20) / itemCount) : 30;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${C.dark} 0%, #2a1810 100%)`,
        padding: "0 64px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <OrangeBar position="top" />
      <CornerAccent />
      <FloatingShapes layoutIndex={1} />

      {/* Yellow accent line */}
      <div
        style={{
          width: interpolate(headProg, [0, 1], [0, 80]),
          height: 5,
          background: C.yellow,
          borderRadius: 3,
          marginBottom: 20,
        }}
      />

      <div
        style={{
          fontFamily: headFont,
          fontSize: 110,
          color: C.white,
          lineHeight: 1.05,
          marginBottom: 28,
          textAlign: "center",
          transform: `scale(${interpolate(headProg, [0, 1], [0.5, 1])})`,
          opacity: headProg,
          transformOrigin: "center center",
        }}
      >
        {scene.headline}
      </div>

      <div
        style={{
          fontFamily: bodyFont,
          fontSize: 40,
          color: C.peach,
          lineHeight: 1.5,
          marginBottom: 44,
          textAlign: "center",
          opacity: subOpacity,
          whiteSpace: "pre-line",
        }}
      >
        {scene.sub}
      </div>

      {items.map((item, i) => {
        const itemStart = 20 + i * itemSlice;
        const itemEnd = itemStart + itemSlice;
        const localFrame = frame - itemStart;

        // Appear: scale up + fade in, then fade out before next item
        const enterProg = interpolate(localFrame, [0, 8], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const exitProg = interpolate(localFrame, [itemSlice - 6, itemSlice], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const visible = frame >= itemStart - 2 && frame < itemEnd + 2;
        if (!visible) return null;

        const itemOpacity = Math.min(enterProg, exitProg);
        const scale = interpolate(enterProg, [0, 1], [0.7, 1], { extrapolateRight: "clamp" });

        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginBottom: 18,
              transform: `scale(${scale})`,
              opacity: itemOpacity,
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 7,
                background: i % 2 === 0 ? C.orange : C.yellow,
                flexShrink: 0,
              }}
            />
            <span style={{ fontFamily: bodyFont, color: C.white, fontSize: 42, fontWeight: 700 }}>
              {item}
            </span>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// REVEAL SCENE — orange flash + signet animation
// ═══════════════════════════════════════════════════════════════════════════
const RevealScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const flashOpacity = interpolate(frame, [0, 5, 14], [1, 0.8, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const textProg = bounce(frame, fps, 8);
  const subOpacity = clamp(frame, 25, 40);
  const logoProg = spr(frame, fps, 35);

  const lines = scene.headline.split("\n");

  return (
    <AbsoluteFill style={{ background: C.dark }}>
      <AbsoluteFill style={{ background: C.orange, opacity: flashOpacity }} />

      <FloatingShapes layoutIndex={2} />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 64px",
        }}
      >
        {/* Green accent dot */}
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: 8,
            background: C.green,
            marginBottom: 32,
            opacity: clamp(frame, 10, 20),
          }}
        />

        <div style={{ textAlign: "center", marginBottom: 40 }}>
          {lines.map((line, i) => (
            <div
              key={i}
              style={{
                fontFamily: headFont,
                fontSize: 96,
                color: i === lines.length - 1 ? C.orange : C.white,
                lineHeight: 1.1,
                transform: `scale(${interpolate(textProg, [0, 1], [0.2, 1])})`,
                opacity: textProg,
              }}
            >
              {line}
            </div>
          ))}
        </div>

        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 28,
            fontWeight: 700,
            color: C.grayLight,
            textAlign: "center",
            opacity: subOpacity,
            letterSpacing: "0.06em",
          }}
        >
          {scene.sub}
        </div>

        <Img
          src={staticFile("logo-white.png")}
          style={{
            marginTop: 56,
            height: 44,
            opacity: interpolate(logoProg, [0, 1], [0, 0.6]),
            transform: `translateY(${interpolate(logoProg, [0, 1], [20, 0])}px)`,
          }}
        />
      </AbsoluteFill>
      <OrangeBar position="bottom" />
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// FEATURE SCENE — with accent variety
// ═══════════════════════════════════════════════════════════════════════════
const FeatureScene: React.FC<{ scene: Scene; sceneIndex: number }> = ({
  scene,
  sceneIndex,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const badgeProg = bounce(frame, fps, 3);
  const headProg = spr(frame, fps, 10);
  const subOpacity = clamp(frame, 22, 36);

  const progressWidth = interpolate(frame, [0, durationInFrames], [0, 100], {
    extrapolateRight: "clamp",
  });

  const lines = scene.headline.split("\n");

  // Alternate accent colors per scene
  const accentColors = [C.orange, C.green, C.yellow, C.orange];
  const accent = accentColors[sceneIndex % accentColors.length];

  const bgVariants = [
    `linear-gradient(180deg, ${C.dark} 0%, ${C.dark} 100%)`,
    `linear-gradient(180deg, ${C.dark} 0%, #1a2420 100%)`,
    `linear-gradient(180deg, ${C.dark} 0%, #1d1c14 100%)`,
    `linear-gradient(180deg, ${C.dark2} 0%, ${C.dark} 100%)`,
  ];

  return (
    <AbsoluteFill
      style={{ background: bgVariants[sceneIndex % bgVariants.length] }}
    >
      <OrangeBar position="top" />
      <LogoWatermark />
      <CornerAccent />
      <FloatingShapes layoutIndex={sceneIndex % 4} />

      {/* Centered content */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 64,
          right: 64,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Badge */}
        {scene.badge && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 110,
              height: 110,
              borderRadius: 28,
              background: accent,
              marginBottom: 32,
              transform: `scale(${interpolate(badgeProg, [0, 1], [0, 1])}) rotate(${interpolate(badgeProg, [0, 1], [-20, 0])}deg)`,
              opacity: badgeProg,
            }}
          >
            <span
              style={{
                fontFamily: headFont,
                fontSize: 44,
                color: C.white,
              }}
            >
              {scene.badge}
            </span>
          </div>
        )}

        <div style={{ textAlign: "center" }}>
          {lines.map((line, i) => (
            <div
              key={i}
              style={{
                fontFamily: headFont,
                fontSize: 80,
                color: C.white,
                lineHeight: 1.12,
                transform: `translateY(${interpolate(headProg, [0, 1], [80, 0])}px)`,
                opacity: headProg,
              }}
            >
              {line}
            </div>
          ))}
        </div>

        {/* Colored underline */}
        <div
          style={{
            marginTop: 20,
            width: interpolate(headProg, [0, 1], [0, 160]),
            height: 5,
            borderRadius: 3,
            background: accent,
          }}
        />

        <div
          style={{
            marginTop: 24,
            fontFamily: bodyFont,
            fontSize: 34,
            color: C.grayLight,
            lineHeight: 1.6,
            opacity: subOpacity,
            whiteSpace: "pre-line",
            textAlign: "center",
          }}
        >
          {scene.sub}
        </div>
      </div>

      {/* Progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: `${progressWidth}%`,
          height: 4,
          background: accent,
        }}
      />

      {/* Scene counter */}
      <div
        style={{
          position: "absolute",
          bottom: 44,
          right: 48,
          fontFamily: bodyFont,
          fontSize: 16,
          fontWeight: 700,
          color: C.grayMid,
          letterSpacing: "0.1em",
        }}
      >
        {String(sceneIndex).padStart(2, "0")}
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// STATS SCENE — animated counters + social proof
// ═══════════════════════════════════════════════════════════════════════════
const StatsScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const stats = scene.stats ?? [];

  const headProg = spr(frame, fps, 3);
  const subOpacity = clamp(frame, 10, 22);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, #0f1a17 0%, ${C.dark} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 64px",
      }}
    >
      <OrangeBar position="top" />
      <FloatingShapes layoutIndex={3} />

      {/* Green accent bar */}
      <div
        style={{
          width: interpolate(headProg, [0, 1], [0, 60]),
          height: 5,
          background: C.green,
          borderRadius: 3,
          marginBottom: 16,
        }}
      />

      {/* Headline */}
      <div
        style={{
          fontFamily: headFont,
          fontSize: 72,
          color: C.white,
          marginBottom: 8,
          textAlign: "center",
          opacity: headProg,
          transform: `translateY(${interpolate(headProg, [0, 1], [40, 0])}px)`,
        }}
      >
        {scene.headline}
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontFamily: bodyFont,
          fontSize: 28,
          color: C.green,
          fontWeight: 700,
          letterSpacing: "0.08em",
          marginBottom: 56,
          textAlign: "center",
          opacity: subOpacity,
          textTransform: "uppercase",
        }}
      >
        {scene.sub}
      </div>

      {/* Stat cards */}
      {stats.map((stat, i) => {
        const delay = 15 + i * 12;
        const prog = bounce(frame, fps, delay);
        const cardColors = [C.orange, C.green, C.yellow];
        const color = cardColors[i % cardColors.length];

        return (
          <div
            key={i}
            style={{
              marginBottom: 28,
              textAlign: "center",
              transform: `translateX(${interpolate(prog, [0, 1], [-300, 0])}px)`,
              opacity: interpolate(prog, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            {/* Value */}
            <div
              style={{
                fontFamily: headFont,
                fontSize: 88,
                color,
                lineHeight: 1,
                marginBottom: 4,
              }}
            >
              {stat.value}
            </div>
            {/* Label */}
            <div
              style={{
                fontFamily: bodyFont,
                fontSize: 28,
                color: C.grayLight,
              }}
            >
              {stat.label}
            </div>
            {/* Divider */}
            <div
              style={{
                marginTop: 16,
                width: interpolate(prog, [0, 1], [0, 600]),
                height: 1,
                background: `${C.grayMid}40`,
              }}
            />
          </div>
        );
      })}

      <OrangeBar position="bottom" />
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// PAKIET SCENE — complete package grid
// ═══════════════════════════════════════════════════════════════════════════
const PakietScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const items = scene.pakietItems ?? [];

  const headProg = spr(frame, fps, 3);
  const subOpacity = clamp(frame, 12, 24);

  const itemColors = [C.orange, C.green, C.yellow, C.orange, C.green, C.yellow];

  return (
    <AbsoluteFill
      style={{
        background: C.dark,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 64px",
      }}
    >
      <OrangeBar position="top" />
      <LogoWatermark />
      <FloatingShapes layoutIndex={0} />

      {/* Orange dot */}
      <div
        style={{
          width: 14,
          height: 14,
          borderRadius: 7,
          background: C.orange,
          marginBottom: 20,
          opacity: headProg,
        }}
      />

      <div
        style={{
          fontFamily: headFont,
          fontSize: 80,
          color: C.white,
          lineHeight: 1.1,
          marginBottom: 10,
          textAlign: "center",
          opacity: headProg,
          transform: `translateY(${interpolate(headProg, [0, 1], [50, 0])}px)`,
          whiteSpace: "pre-line",
        }}
      >
        {scene.headline}
      </div>

      <div
        style={{
          fontFamily: bodyFont,
          fontSize: 30,
          color: C.grayLight,
          marginBottom: 48,
          textAlign: "center",
          opacity: subOpacity,
        }}
      >
        {scene.sub}
      </div>

      {/* Package items grid — 2 columns */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          justifyContent: "center",
        }}
      >
        {items.map((item, i) => {
          const delay = 18 + i * 6;
          const prog = bounce(frame, fps, delay);
          const color = itemColors[i];

          return (
            <div
              key={i}
              style={{
                width: "calc(50% - 8px)",
                background: `${C.dark}`,
                border: `2px solid ${color}30`,
                borderRadius: 16,
                padding: "22px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 14,
                transform: `scale(${interpolate(prog, [0, 1], [0.7, 1])})`,
                opacity: prog,
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  background: color,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: bodyFont,
                  fontSize: 28,
                  color: C.white,
                  fontWeight: 700,
                }}
              >
                {item}
              </span>
            </div>
          );
        })}
      </div>

      <OrangeBar position="bottom" />
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// OUTRO SCENE — CTA with contact
// ═══════════════════════════════════════════════════════════════════════════
const OutroScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoProg = spr(frame, fps, 0);
  const headProg = bounce(frame, fps, 10);
  const subOpacity = clamp(frame, 22, 36);
  const ctaProg = bounce(frame, fps, 30);
  const contactOpacity = clamp(frame, 40, 55);

  const pulse = interpolate(Math.sin((frame - 35) * 0.1), [-1, 1], [0.92, 1]);
  const lines = scene.headline.split("\n");

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${C.orange} 0%, ${C.orangeDark} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 64px",
      }}
    >
      <FloatingShapes layoutIndex={1} />

      <Img
        src={staticFile("logo-dark.png")}
        style={{
          height: 64,
          marginBottom: 56,
          opacity: interpolate(logoProg, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(logoProg, [0, 1], [-30, 0])}px)`,
        }}
      />

      <div style={{ textAlign: "center", marginBottom: 20 }}>
        {lines.map((line, i) => (
          <div
            key={i}
            style={{
              fontFamily: headFont,
              fontSize: 80,
              color: C.white,
              lineHeight: 1.1,
              transform: `scale(${interpolate(headProg, [0, 1], [0.4, 1])})`,
              opacity: headProg,
            }}
          >
            {line}
          </div>
        ))}
      </div>

      <div
        style={{
          fontFamily: bodyFont,
          fontSize: 30,
          color: "rgba(255,255,255,0.85)",
          textAlign: "center",
          marginBottom: 48,
          opacity: subOpacity,
        }}
      >
        {scene.sub}
      </div>

      {scene.cta && (
        <div
          style={{
            background: C.dark,
            color: C.white,
            fontFamily: headFont,
            fontSize: 40,
            padding: "24px 60px",
            borderRadius: 100,
            letterSpacing: "0.06em",
            transform: `scale(${interpolate(ctaProg, [0, 1], [0, 1]) * pulse})`,
            opacity: ctaProg,
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          }}
        >
          {scene.cta}
        </div>
      )}

      {/* Contact info */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          opacity: contactOpacity,
        }}
      >
        <span style={{ fontFamily: bodyFont, fontSize: 18, color: "rgba(255,255,255,0.7)" }}>
          538 111 865
        </span>
        <span style={{ fontFamily: bodyFont, fontSize: 18, color: "rgba(255,255,255,0.7)" }}>
          hello@twistedpixel.pl
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// ROUTER
// ═══════════════════════════════════════════════════════════════════════════
export const SceneComponent: React.FC<SceneProps> = ({ scene, sceneIndex }) => {
  switch (scene.type) {
    case "hook":
      return <HookScene scene={scene} />;
    case "pain":
      return <PainScene scene={scene} />;
    case "reveal":
      return <RevealScene scene={scene} />;
    case "feature":
      return <FeatureScene scene={scene} sceneIndex={sceneIndex} />;
    case "stats":
      return <StatsScene scene={scene} />;
    case "pakiet":
      return <PakietScene scene={scene} />;
    case "outro":
      return <OutroScene scene={scene} />;
    default:
      return null;
  }
};
