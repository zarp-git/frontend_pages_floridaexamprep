"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { PandaVideoPlayer } from "@/presentation/components/molecules/PandaVideoPlayer";

interface FloatingVideoProps {
  src: string;
  className?: string;
  autoPlay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  disableInteraction?: boolean;
}

export function FloatingVideo({ 
  src, 
  className,
  autoPlay = false,
  controls = false,
  loop = false,
  muted = true,
  disableInteraction = false,
}: FloatingVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainVideoRef = useRef<HTMLVideoElement>(null);
  const pipVideoSlotRef = useRef<HTMLDivElement>(null);
  const originalParentRef = useRef<HTMLElement | null>(null);
  const originalClassNameRef = useRef<string>("");
  const [isOutOfView, setIsOutOfView] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Track if user has scrolled past the video section
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsOutOfView(!entry.isIntersecting);
      },
      {
        threshold: 0.1,
      },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Mark that the user has interacted with the video (clicked play)
  const handleVideoPlay = useCallback(() => {
    setHasInteracted(true);
  }, []);

  // Auto-mark as interacted if autoPlay is enabled
  useEffect(() => {
    if (autoPlay) {
      setHasInteracted(true);
    }
  }, [autoPlay]);

  const handleDismiss = useCallback(() => {
    setIsDismissed(true);
  }, []);

  // Reset dismiss state if user scrolls back up to the video
  useEffect(() => {
    if (!isOutOfView) {
      setIsDismissed(false);
    }
  }, [isOutOfView]);

  const showMiniature = isOutOfView && hasInteracted && !isDismissed;

  // Move the actual video element between main container and PiP
  useEffect(() => {
    const video = mainVideoRef.current;
    const pipSlot = pipVideoSlotRef.current;
    if (!video || !pipSlot) return;

    // Capture original parent on first run
    if (!originalParentRef.current) {
      originalParentRef.current = video.parentElement;
      originalClassNameRef.current = video.className;
    }

    if (showMiniature) {
      // Move video into PiP container
      video.className = "w-full h-full object-cover pointer-events-none";
      pipSlot.appendChild(video);
    } else if (originalParentRef.current) {
      // Move video back to original parent
      video.className = originalClassNameRef.current;
      originalParentRef.current.insertBefore(
        video,
        originalParentRef.current.firstChild,
      );
    }
  }, [showMiniature]);

  return (
    <>
      {/* Original video slot */}
      <div ref={containerRef} className={className}>
        <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-[24px] md:rounded-[30px]">
          <PandaVideoPlayer
            src={src}
            className="w-full h-[200px] sm:h-[320px] md:h-[400px] lg:h-[504px] rounded-2xl sm:rounded-[24px] md:rounded-[30px]"
            controls={controls}
            muted={muted}
            autoPlay={autoPlay}
            loop={loop}
            onPlay={handleVideoPlay}
            externalVideoRef={mainVideoRef}
            disableInteraction={disableInteraction}
          />
          <FakeProgressBar videoRef={mainVideoRef} />
          
          {/* Overlay to block interactions when controls are disabled */}
          {!controls && (
            <div className="absolute inset-0 z-20 cursor-default" />
          )}
        </div>
      </div>

      {/* Floating miniature - always in DOM, toggled via CSS transitions */}
      <div
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 group/pip transition-all duration-300 ease-out ${
          showMiniature
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-0 opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        {/* Glow ring */}
        <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-blue-500 via-blue-400 to-sky-300 opacity-60 blur-sm group-hover/pip:opacity-80 transition-opacity" />

        {/* Container - clickable to scroll back */}
        <div
          className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-white/80 shadow-2xl bg-black cursor-pointer"
          onClick={() => {
            containerRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }}
        >
          {/* Slot where the actual video element gets moved into */}
          <div ref={pipVideoSlotRef} className="w-full h-full" />

          {/* Dismiss button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDismiss();
            }}
            className="absolute top-0 right-0 w-6 h-6 sm:w-7 sm:h-7 bg-black/70 rounded-full flex items-center justify-center opacity-0 group-hover/pip:opacity-100 transition-opacity cursor-pointer hover:bg-black/90"
            aria-label="Close miniature"
          >
            <X className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          </button>

          {/* Pulse ring animation */}
          <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-[ping_3s_ease-in-out_infinite]" />
        </div>
      </div>
    </>
  );
}

/**
 * Fake progress bar styled like PandaVideo.
 * Accelerates to 60% in the first 30s, then decelerates asymptotically.
 * Snaps to 100% when the video ends.
 * Uses direct DOM manipulation via refs to avoid per-frame React re-renders.
 */
function FakeProgressBar({
  videoRef,
}: {
  videoRef: React.RefObject<HTMLVideoElement | null>;
}) {
  const barRef = useRef<HTMLDivElement>(null);
  const accumulatedRef = useRef(0);
  const lastTickRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tick = (now: number) => {
      if (!isPlayingRef.current) return;

      if (lastTickRef.current !== null) {
        accumulatedRef.current += (now - lastTickRef.current) / 1000;
      }
      lastTickRef.current = now;

      const t = accumulatedRef.current;
      let p: number;

      if (t <= 30) {
        // Phase 1: 0% → 60% in 30 seconds (ease-out curve)
        const ratio = t / 30;
        p = 60 * (1 - Math.pow(1 - ratio, 2));
      } else {
        // Phase 2: 60% → asymptotically approaches 95%
        const extra = t - 30;
        p = 60 + 35 * (1 - Math.exp(-extra / 120));
      }

      if (barRef.current) {
        barRef.current.style.width = `${Math.min(p, 100)}%`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    const onPlay = () => {
      isPlayingRef.current = true;
      rafRef.current = requestAnimationFrame(tick);
    };

    const onPause = () => {
      isPlayingRef.current = false;
      lastTickRef.current = null;
      cancelAnimationFrame(rafRef.current);
    };

    const onEnded = () => {
      isPlayingRef.current = false;
      lastTickRef.current = null;
      cancelAnimationFrame(rafRef.current);
      if (barRef.current) barRef.current.style.width = "100%";
    };

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("ended", onEnded);

    // Handle case where video is already playing
    if (!video.paused) onPlay();

    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("ended", onEnded);
      cancelAnimationFrame(rafRef.current);
    };
  }, [videoRef]);

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10 z-10">
      <div
        ref={barRef}
        className="h-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"
        style={{ width: "0%" }}
      />
    </div>
  );
}
