import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import rainImg from "@/assets/rain.png";

export const Route = createFileRoute("/bold")({
  component: BoldPage,
});

const compliments = [
  "🩶 Long, naturally wavy black hair with a center part.",
  "🩶 Large almond-shaped brown eyes, gentle, not sharp.",
  "🩶 A small nose with a soft, kind bridge.",
  "🩶 Rounded cheeks and a narrow jaw, softer than any trend.",
  "🩶 Thin, natural eyebrows that ask nothing of the mirror.",
  "🩶 A subtle smile that lifts one side, and the whole room with it.",
  "🩶 A slender build and easy, unbothered posture.",
  "🩶 Minimal makeup. Real skin. Real courage.",
  "🩶 A quiet kind of bold, the kind that lasts.",
  "🩶 You don't shout to be seen; the room learns to listen.",
];

function BoldPage() {
  const drops = useMemo(
    () => Array.from({ length: 90 }, () => ({
      left: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 0.8 + Math.random() * 1.6,
      size: 1 + Math.random() * 1.5,
      opacity: 0.3 + Math.random() * 0.5,
    })),
    [],
  );

  const [typed, setTyped] = useState("");
  const message = "Keep going. Keep being this bold.";
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(message.slice(0, i));
      if (i >= message.length) clearInterval(id);
    }, 55);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-rain">
      {/* rain layer */}
      <div className="pointer-events-none absolute inset-0">
        {drops.map((d, i) => (
          <span
            key={i}
            className="absolute top-0 rounded-full bg-white/70"
            style={{
              left: `${d.left}%`,
              width: d.size,
              height: 12 + d.size * 8,
              opacity: d.opacity,
              animation: `rain-fall ${d.duration}s linear ${d.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* glow */}
      <div className="pointer-events-none absolute -bottom-32 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <section className="relative z-10 mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-16 px-6 py-24 md:grid-cols-2">
        {/* image with rainy window feel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute -inset-3 rounded-[2rem] bg-white/5 blur-xl" />
          <img src={rainImg} alt="Bold, quiet, unstoppable" className="relative rounded-[2rem] shadow-soft ring-1 ring-white/10 grayscale-[0.15]" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-background/80 px-5 py-2 font-serif-elegant text-xs uppercase tracking-[0.35em] text-foreground/80 backdrop-blur"
          >
            The bold, quiet one
          </motion.div>
        </motion.div>

        {/* content */}
        <div className="relative">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-serif-elegant text-sm uppercase tracking-[0.5em] text-foreground/60"
          >
            Chapter Three · The Storm
          </motion.p>

          <h2 className="mt-4 font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            <span className="animate-shimmer-text">{typed}</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="ml-1 inline-block h-[0.9em] w-[3px] bg-foreground align-middle"
            />
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="mt-8 max-w-lg font-serif-elegant text-lg leading-relaxed text-foreground/85 whitespace-pre-line"
          >
            No loud outfit, no forced pose, just her....shoulders relaxed, sitting like she owns the room. (That's just who she is when nobody's asking her to perform)
            {"\n\n"}
            Some people are loud and some people are lightning. You're the second kind....the sky waits for you. Never dim it down for a room that isn't ready &gt;&gt;&gt;
            {"\n\n"}
          </motion.p>

          {/* compliment cards */}
          <div className="mt-10 grid gap-3">
            {compliments.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ delay: i * 0.08, duration: 0.7 }}
                whileHover={{ x: 6, scale: 1.02 }}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 font-serif-elegant text-base text-foreground/90 backdrop-blur-sm transition"
              >
                {c}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-14 rounded-3xl border border-primary/30 bg-gradient-gold p-8 text-[oklch(0.15_0.02_60)] shadow-glow"
          >
            <p className="font-display text-2xl leading-snug sm:text-3xl">
              Happy Birthday Dhruviiiii.<br />
              <span className="italic">Stay soft. Stay bold. Stay exactly like this.</span>
            </p>
            <p className="mt-4 font-serif-elegant italic opacity-80 whitespace-pre-line">
              — with all my love, always.
              {"\n"}
              &nbsp; &nbsp; &nbsp;Adveat Sankhe
            </p>
          </motion.div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/"
              className="rounded-full border border-white/20 px-6 py-3 text-sm uppercase tracking-[0.3em] text-foreground/70 transition hover:bg-white/5"
            >
              ↺ start over
            </Link>
            <span className="text-xs uppercase tracking-[0.3em] text-foreground/50">page 3 of 3</span>
          </div>
        </div>
      </section>
    </main>
  );
}
