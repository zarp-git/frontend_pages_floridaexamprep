"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { PandaVideoPlayer } from "@/presentation/components/molecules/PandaVideoPlayer";

interface FloatingVideoProps {
  src: string;
  className?: string;
}

export function FloatingVideo({ src, className }: FloatingVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainVideoRef = useRef<HTMLVideoElement>(null);
  const pipVideoRef = useRef<HTMLVideoElement>(null);
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

  const handleDismiss = useCallback(() => {
    setIsDismissed(true);
  }, []);

  // Reset dismiss state if user scrolls back up to the video
  useEffect(() => {
    if (!isOutOfView) {
      setIsDismissed(false);
    }
  }, [isOutOfView]);

  // Sync PiP video with main video continuously
  useEffect(() => {
    const mainVideo = mainVideoRef.current;
    const pipVideo = pipVideoRef.current;
    if (!mainVideo || !pipVideo) return;

    const syncTime = () => {
      if (pipVideo && mainVideo) {
        const drift = Math.abs(pipVideo.currentTime - mainVideo.currentTime);
        if (drift > 0.5) {
          pipVideo.currentTime = mainVideo.currentTime;
        }
      }
    };

    mainVideo.addEventListener("timeupdate", syncTime);
    return () => mainVideo.removeEventListener("timeupdate", syncTime);
  }, []);

  const showMiniature = isOutOfView && hasInteracted && !isDismissed;

  return (
    <>
      {/* Original video slot */}
      <div ref={containerRef} className={className}>
        <PandaVideoPlayer
          src={src}
          className="w-full h-[240px] sm:h-[320px] md:h-[400px] lg:h-[504px] rounded-2xl sm:rounded-[24px] md:rounded-[30px]"
          controls
          muted
          autoPlay={false}
          loop={false}
          onPlay={handleVideoPlay}
          externalVideoRef={mainVideoRef}
        />
      </div>

      {/* Preloaded PiP video - always in DOM, hidden when not active */}
      <video
        ref={pipVideoRef}
        src={src}
        className="sr-only"
        preload="auto"
        muted
        playsInline
        loop
        autoPlay
      />

      {/* Floating miniature - visual wrapper only (video is cloned via canvas or ref) */}
      <AnimatePresence>
        {showMiniature && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 40 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 group/pip"
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
              {/* Mirror the preloaded video via portal-style reparenting */}
              <PipVideoMirror videoRef={pipVideoRef} />

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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * Moves the preloaded video element into this container when mounted,
 * and returns it to sr-only when unmounted.
 */
function PipVideoMirror({
  videoRef,
}: {
  videoRef: React.RefObject<HTMLVideoElement | null>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // Move the preloaded video into the visible container
    video.className = "w-full h-full object-cover pointer-events-none";
    container.appendChild(video);

    return () => {
      // Move it back to hidden when PiP closes
      video.className = "sr-only";
      document.body.appendChild(video);
    };
  }, [videoRef]);

  return <div ref={containerRef} className="w-full h-full" />;
}
