import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Music2, VolumeX } from "lucide-react";

// Soft ambient piano — royalty-free. User can replace with /music.mp3 in public/.
const DEFAULT_TRACK = "/music.mp3";
const FALLBACK_TRACK = "https://cdn.pixabay.com/download/audio/2022/03/15/audio_1a2b0dbf12.mp3?filename=relaxing-mountains-rivers-flowing-birds-singing-303069.mp3";

type MusicCtx = { playing: boolean; start: () => void; toggle: () => void };
const Ctx = createContext<MusicCtx | null>(null);

export function useMusic() {
  const c = useContext(Ctx);
  if (!c) throw new Error("MusicProvider missing");
  return c;
}

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const a = new Audio();
    a.src = DEFAULT_TRACK;
    a.loop = true;
    a.volume = 0.35;
    a.preload = "auto";
    a.addEventListener("error", () => { a.src = FALLBACK_TRACK; });
    audioRef.current = a;
    setReady(true);
    return () => { a.pause(); };
  }, []);

  const start = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    a.play().then(() => setPlaying(true)).catch(() => {});
  }, []);

  const toggle = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) a.play().then(() => setPlaying(true)).catch(() => {});
    else { a.pause(); setPlaying(false); }
  }, []);

  return <Ctx.Provider value={{ playing, start, toggle }}>{ready ? children : children}</Ctx.Provider>;
}

export function MusicToggle() {
  const { playing, toggle } = useMusic();
  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Mute music" : "Play music"}
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-card/70 text-primary shadow-glow backdrop-blur-md transition hover:scale-110"
    >
      {playing ? <Music2 className="h-5 w-5 animate-pulse" /> : <VolumeX className="h-5 w-5" />}
    </button>
  );
}
