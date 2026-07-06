import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import forestImg from "@/assets/forest.png";
import { useMusic } from "@/components/music";

export const Route = createFileRoute("/wish")({
  component: WishPage,
});

const leaves = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 6,
  duration: 8 + Math.random() * 8,
  size: 14 + Math.random() * 22,
  rot: Math.random() * 360,
}));

function WishPage() {
  const { start } = useMusic();
  const [greeting, setGreeting] = useState(0);
  const lines = [
    "Happy Birthday",
    "to the sunlight",
    "of our family.",
  ];

  useEffect(() => { start(); }, [start]);
  useEffect(() => {
    const t = setInterval(() => setGreeting((g) => (g + 1) % lines.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-forest">
      {/* falling leaves */}
      <div className="pointer-events-none absolute inset-0">
        {leaves.map((l) => (
          <motion.div
            key={l.id}
            initial={{ y: -60, x: 0, rotate: l.rot, opacity: 0 }}
            animate={{ y: "110vh", x: [0, 30, -20, 15, 0], rotate: l.rot + 360, opacity: [0, 0.9, 0.9, 0] }}
            transition={{ duration: l.duration, delay: l.delay, repeat: Infinity, ease: "linear" }}
            style={{ left: `${l.left}%`, width: l.size, height: l.size }}
            className="absolute rounded-full bg-[oklch(0.75_0.18_95)] shadow-[0_0_20px_oklch(0.85_0.18_80/0.5)]"
          />
        ))}
      </div>

      {/* sun flare */}
      <div className="pointer-events-none absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-[oklch(0.9_0.18_75)] opacity-40 blur-3xl animate-float-slow" />

      <section className="relative z-10 mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
        {/* image */}
        <motion.div
          initial={{ opacity: 0, x: -80, rotate: -6 }}
          animate={{ opacity: 1, x: 0, rotate: -2 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-gold opacity-70 blur-2xl" />
          <motion.img
            whileHover={{ scale: 1.03, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            src={forestImg}
            alt="Sunlit portrait"
            className="relative rounded-[2rem] shadow-soft ring-1 ring-white/20"
          />
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 1, type: "spring" }}
            className="absolute -bottom-6 -right-6 rounded-full bg-background/80 px-5 py-2 font-serif-elegant text-sm text-primary shadow-glow backdrop-blur"
          >
            golden hour, always
          </motion.div>
        </motion.div>

        {/* text */}
        <div className="relative">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-serif-elegant text-sm uppercase tracking-[0.5em] text-primary/80"
          >
            Chapter One · The Sun
          </motion.p>

          <div className="mt-6 min-h-[220px] sm:min-h-[300px]">
            {lines.map((line, i) => (
              <motion.h1
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={greeting >= i ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl md:text-7xl text-gradient-gold"
              >
                {line}
              </motion.h1>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8, duration: 1.5 }}
            className="mt-8 max-w-lg font-serif-elegant text-lg italic leading-relaxed text-foreground/90"
          >
            You walk into every room like the forest opens for you......leaves
            catching the light, warmth spilling from your smile. Today the whole
            world takes a moment to celebrate the girl who makes ordinary days
            feel golden {">>>"}
            <br />
            <br />
            <br />
            Some people need the perfect light to look like this. She just steps
            into it and the light figures out how to keep up that long, wavy dark
            hair catching every bit of sun, those big warm eyes doing that thing
            where they look gentle even when she's clearly the main character of
            whatever's happening around her.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.4 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/golden"
              className="group relative overflow-hidden rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground shadow-glow transition hover:scale-105"
            >
              <span className="relative z-10">continue the story →</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-gold transition-transform duration-500 group-hover:translate-x-0" />
            </Link>
            <span className="text-xs uppercase tracking-[0.3em] text-foreground/60">page 1 of 3</span>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
