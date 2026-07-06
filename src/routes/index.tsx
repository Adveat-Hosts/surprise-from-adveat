import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useMusic } from "@/components/music";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  const navigate = useNavigate();
  const { start } = useMusic();
  const [hover, setHover] = useState(false);
  const [confetti, setConfetti] = useState<{ x: number; y: number; c: string; r: number }[]>([]);

  useEffect(() => {
    const colors = ["#ff7ab6", "#ffb26b", "#ffe066", "#7ce0d3", "#a78bfa", "#f472b6"];
    setConfetti(
      Array.from({ length: 60 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        c: colors[Math.floor(Math.random() * colors.length)],
        r: Math.random() * 8 + 4,
      })),
    );
  }, []);

  const go = () => {
    start();
    setTimeout(() => navigate({ to: "/wish" }), 400);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      {/* animated gradient blob background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-rainbow opacity-20 animate-gradient-shift" />
      <div className="pointer-events-none absolute inset-0">
        {confetti.map((p, i) => (
          <motion.span
            key={i}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: [0, 20, 0], opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 4 + (i % 5), repeat: Infinity, delay: i * 0.05 }}
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.r, height: p.r, background: p.c }}
            className="absolute rounded-full blur-[1px]"
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-10 px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="font-serif-elegant text-lg tracking-[0.4em] text-muted-foreground uppercase"
        >
          A little something · just for you
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
          className="font-display text-5xl leading-tight sm:text-7xl md:text-8xl"
        >
          <span className="text-gradient-rainbow animate-gradient-shift">Press</span>
          <br />
          <span className="animate-shimmer-text">to begin.</span>
        </motion.h1>

        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, type: "spring", stiffness: 120 }}
          whileHover={{ scale: 1.08, rotate: -2 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setHover(true)}
          onHoverEnd={() => setHover(false)}
          onClick={go}
          className="group relative overflow-hidden rounded-full px-14 py-6 text-lg font-semibold text-primary-foreground animate-pulse-glow"
        >
          <span className="absolute inset-0 bg-gradient-rainbow bg-[length:300%_300%] animate-gradient-shift" />
          <span className="relative z-10 flex items-center gap-3 tracking-wide">
            {hover ? "✨ open your surprise ✨" : "click here"}
          </span>
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="text-xs uppercase tracking-[0.3em] text-muted-foreground"
        >
          turn your sound on 🎧
        </motion.p>
      </div>
    </main>
  );
}
