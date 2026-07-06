import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import goldImg from "@/assets/gold.png";

export const Route = createFileRoute("/golden")({
  component: GoldenPage,
});

const traits = [
  { label: "Almond eyes", note: "gentle, never sharp" },
  { label: "Soft bridge", note: "small nose, softer light" },
  { label: "Quiet smile", note: "one side lifts, and the world tilts" },
  { label: "Wavy midnight hair", note: "a river with a center part" },
  { label: "Skin, unfiltered", note: "the kind you don't need to edit" },
];

function GoldenPage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  return (
    <main ref={ref} className="relative min-h-screen overflow-hidden bg-[oklch(0.10_0.02_60)]">
      {/* ambient orbs */}
      <motion.div style={{ y }} className="pointer-events-none absolute -top-40 left-1/3 h-[600px] w-[600px] rounded-full bg-gradient-gold opacity-30 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_oklch(0.08_0.02_60)_75%)]" />

      {/* glittering dust */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.4, 0.5] }}
            transition={{ duration: 3 + (i % 5), delay: i * 0.15, repeat: Infinity }}
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            className="absolute h-1 w-1 rounded-full bg-[oklch(0.9_0.14_75)] shadow-[0_0_10px_oklch(0.9_0.14_75)]"
          />
        ))}
      </div>

      <section className="relative z-10 mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-16 px-6 py-24 md:grid-cols-[1.1fr_1fr]">
        {/* IMAGE with elegant framing */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute -inset-6 rounded-[2rem] bg-gradient-gold opacity-40 blur-2xl" />
          <motion.div style={{ scale }} className="relative overflow-hidden rounded-[2rem] ring-1 ring-[oklch(0.85_0.14_75/0.4)] shadow-soft">
            <img src={goldImg} alt="Golden portrait" className="w-full object-cover" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-[oklch(0.9_0.16_70/0.25)]" />
          </motion.div>

          {/* floating caption chips */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
            className="absolute -left-6 top-10 rounded-full bg-background/70 px-5 py-2 font-serif-elegant text-sm text-primary backdrop-blur"
          >
            lit from within
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.6 }}
            className="absolute -right-4 bottom-10 rounded-full bg-background/70 px-5 py-2 font-serif-elegant text-sm text-accent backdrop-blur"
          >
            half seen, wholly loved
          </motion.div>
        </motion.div>

        {/* TEXT */}
        <div className="relative">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif-elegant text-sm uppercase tracking-[0.5em] text-primary/80"
          >
            Chapter Two · The Gold
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="mt-4 font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl md:text-7xl text-gradient-gold"
          >
            You are the small,<br /> quiet kind of magic.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.2 }}
            className="mt-8 max-w-md font-serif-elegant text-lg italic leading-relaxed text-foreground/90"
          >
            Not the loud kind. The kind that shows up in the corner of a photograph, in
            the tilt of your head, in an earring catching the last of the sun. You never
            had to try. You just had to be.
          </motion.p>

          {/* traits list — scroll reveal */}
          <ul className="mt-10 space-y-4">
            {traits.map((t, i) => (
              <motion.li
                key={t.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-baseline gap-4 border-l-2 border-primary/40 pl-4"
              >
                <span className="font-display text-xl text-gradient-gold">{t.label}</span>
                <span className="font-serif-elegant italic text-foreground/70">— {t.note}</span>
              </motion.li>
            ))}
          </ul>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/bold"
              className="group relative overflow-hidden rounded-full bg-gradient-gold px-8 py-4 font-semibold text-[oklch(0.15_0.02_60)] shadow-glow transition hover:scale-105"
            >
              <span className="relative z-10">the last chapter →</span>
            </Link>
            <span className="text-xs uppercase tracking-[0.3em] text-foreground/60">page 2 of 3</span>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
