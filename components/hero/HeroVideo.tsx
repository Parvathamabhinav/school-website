"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { buttonStyles } from "@/components/ui/Button";
import { usePrefersReducedMotion } from "@/lib/animations/use-reduced-motion";
import type { HeroMedia } from "@/types/school";

interface HeroVideoProps {
  video: NonNullable<HeroMedia["video"]>;
  focalPoint?: string;
}

/**
 * Muted ambient video layered over the hero image (which acts as poster).
 * - Fades in only once it is actually playing, so the image shows meanwhile.
 * - Not played at all under reduced motion.
 * - Removes itself if it fails, leaving the image.
 * - Always offers a pause control (WCAG 2.2.2).
 */
export function HeroVideo({ video, focalPoint }: HeroVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || reducedMotion) return;
    element.play().catch(() => setFailed(true));
    return () => element.pause();
  }, [reducedMotion]);

  if (failed || reducedMotion) return null;

  const toggle = () => {
    const element = ref.current;
    if (!element) return;
    if (element.paused) void element.play();
    else element.pause();
  };

  return (
    <>
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className={`absolute inset-0 size-full object-cover motion-colors ${playing ? "opacity-100" : "opacity-0"}`}
        style={focalPoint ? { objectPosition: focalPoint } : undefined}
      >
        {video.sources.map((source, index) => (
          <source
            key={source.src}
            src={source.src}
            type={source.type}
            onError={index === video.sources.length - 1 ? () => setFailed(true) : undefined}
          />
        ))}
      </video>
      <div className="theme-inverse absolute right-md bottom-md bg-transparent">
        <button type="button" onClick={toggle} className={buttonStyles({ variant: "ghost", size: "sm" })}>
          {playing ? <Pause aria-hidden="true" className="size-4" /> : <Play aria-hidden="true" className="size-4" />}
          <span>{playing ? "Pause video" : "Play video"}</span>
        </button>
      </div>
    </>
  );
}
