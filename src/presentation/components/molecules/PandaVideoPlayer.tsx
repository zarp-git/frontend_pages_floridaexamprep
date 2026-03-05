"use client";
import { useState, useRef, useEffect, memo, type RefObject } from "react";
import { cn } from "@/lib/utils";

interface PandaVideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  preload?: "none" | "metadata" | "auto";
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  externalVideoRef?: RefObject<HTMLVideoElement | null>;
  disableInteraction?: boolean;
}

const PandaVideoPlayerComponent = ({
  src,
  poster,
  className,
  autoPlay = false,
  loop = false,
  muted = true,
  controls = true,
  preload = "metadata",
  onPlay,
  onPause,
  onEnded,
  externalVideoRef,
  disableInteraction = false,
}: PandaVideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(muted);
  const [awaitingUnmute, setAwaitingUnmute] = useState(muted);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Sync external ref with internal ref
  useEffect(() => {
    if (externalVideoRef && videoRef.current) {
      (
        externalVideoRef as React.MutableRefObject<HTMLVideoElement | null>
      ).current = videoRef.current;
    }
  }, [externalVideoRef]);

  // Workaround: React doesn't reliably set the `muted` attribute on initial render,
  // which causes Chrome to block muted autoplay. Manually ensure muted + play via ref.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !autoPlay) return;

    // Ensure muted is set imperatively (React bug workaround)
    video.muted = muted;

    const tryPlay = () => {
      video.play().catch(() => {
        // Autoplay blocked — the overlay handles this case
      });
    };

    if (video.readyState >= 2) {
      tryPlay();
    } else {
      video.addEventListener("canplay", tryPlay, { once: true });
      return () => video.removeEventListener("canplay", tryPlay);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      setIsPlaying(true);
      onPlay?.();
    };

    const handlePause = () => {
      setIsPlaying(false);
      onPause?.();

      // If interaction is disabled and video is paused, restart it
      if (disableInteraction && autoPlay) {
        video.play().catch(console.warn);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onEnded?.();
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
    };
  }, [onPlay, onPause, onEnded, disableInteraction, autoPlay]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const doc = document as unknown as Record<string, Element | null>;
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        doc["webkitFullscreenElement"] ||
        doc["mozFullScreenElement"] ||
        doc["msFullscreenElement"]
      );
      setIsFullscreen(isCurrentlyFullscreen);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange,
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange,
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange,
      );
    };
  }, []);

  const handleVideoClick = () => {
    const video = videoRef.current;
    if (!video || isLoading || disableInteraction) return;

    if (isMuted) {
      // Unmute and restart: must call play() synchronously within the
      // user-gesture frame so the browser doesn't revoke the gesture token.
      video.muted = false;
      video.currentTime = 0;

      const playPromise = video.play();
      if (playPromise) {
        setIsLoading(true);
        playPromise
          .then(() => {
            setIsMuted(false);
            setAwaitingUnmute(false);
          })
          .catch((err) => console.warn("Error playing video:", err))
          .finally(() => setIsLoading(false));
      } else {
        setIsMuted(false);
        setAwaitingUnmute(false);
      }
    } else {
      // Not muted — just toggle play/pause
      if (video.paused) {
        const p = video.play();
        if (p) {
          setIsLoading(true);
          p.catch((err) => console.warn("Error playing video:", err)).finally(
            () => setIsLoading(false),
          );
        }
      } else {
        video.pause();
      }
    }
  };

  return (
    <div
      className={cn(
        "relative w-full aspect-video rounded-2xl overflow-hidden bg-black group",
        className,
      )}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className={cn(
          "w-full h-full video-player",
          disableInteraction ? "pointer-events-none" : "cursor-pointer",
        )}
        style={{
          objectFit: isFullscreen ? "contain" : "cover",
        }}
        preload={preload}
        autoPlay={autoPlay}
        loop={loop}
        muted={isMuted}
        controls={controls && !awaitingUnmute}
        playsInline
        disablePictureInPicture
        onClick={handleVideoClick}
      />

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
        </div>
      )}

      {(awaitingUnmute || !isPlaying) && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          {/* Override Tailwind v4's animation-duration reset */}
          <style>{`
            .panda-muted-indicator-impact-wrapper {
              animation: gentle-breathe 3s ease-in-out infinite !important;
            }
          `}</style>
          <button
            onClick={handleVideoClick}
            disabled={isLoading}
            className="panda-muted-indicator-impact-wrapper panda-muted-indicator-item hover:scale-105 transition-transform flex flex-col items-center px-6 py-4 bg-black/60 rounded-2xl backdrop-blur-sm border border-white/20 group/button disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <span className="text-white text-sm font-medium">Click here</span>
            <div className="relative">
              <svg
                className="w-24 h-16 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 400 200"
                xmlSpace="preserve"
              >
                <style>{`
                  @keyframes gentle-breathe {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                  }
                  .fg-color { fill: currentColor; }
                  .bg-color { fill: rgba(0,0,0,0.8); }
                  .volume, .wave { transform: scale(1); transform-box: fill-box; transform-origin: center; }
                  .wave {
                    animation: wave-pulse 1.5s ease-in-out infinite !important;
                    transform-origin: center;
                  }
                  .wave:nth-child(3) { animation-delay: 0s !important; }
                  .wave:nth-child(4) { animation-delay: 0.2s !important; }
                  .wave:nth-child(5) { animation-delay: 0.4s !important; }
                  @keyframes wave-pulse {
                    0%, 100% { opacity: 0.3; transform: scale(0.85); }
                    50% { opacity: 1; transform: scale(1.1); }
                  }
                  .volume {
                    animation: volume-heartbeat 1.8s ease-in-out infinite !important;
                  }
                  @keyframes volume-heartbeat {
                    0%, 100% { transform: scale(1); }
                    15% { transform: scale(1.15); }
                    30% { transform: scale(1); }
                    45% { transform: scale(1.1); }
                    60% { transform: scale(1); }
                  }
                  .line {
                    animation: line-flash 1.5s ease-in-out infinite !important;
                  }
                  @keyframes line-flash {
                    0%, 100% { opacity: 0.7; }
                    50% { opacity: 1; filter: drop-shadow(0 0 4px rgba(255,255,255,0.5)); }
                  }
                `}</style>
                <path
                  className="volume fg-color"
                  d="M169.8 85.5h-23c-1.9 0-3.1 1.2-3.1 3.1v26.5c0 1.9 1.2 3.1 3.1 3.1h23l19.3 18.4V68.7c.3 0-19.3 16.8-19.3 16.8z"
                />
                <path
                  className="wave fg-color opacity-80"
                  d="M205.9 127.8c-1.2-1.2-.9-3.4.3-5 9.6-12.1 9.6-29.3 0-41.1-1.2-1.6-1.2-3.7-.3-5 1.2-1.2 3.7-.9 5 .9 11.5 14.3 11.5 34.9 0 48.9-1.4 2.6-3.8 2.6-5 1.3z"
                />
                <path
                  className="wave fg-color opacity-60"
                  d="M223.9 138.4c-1.2-1.2-.9-3.4.3-5 14.6-17.1 14.6-42.3 0-59.4-1.2-1.6-1.6-3.7-.3-5 1.2-1.2 3.4-.9 5 .9 16.5 19.3 16.5 48.2 0 67.5-1.5 2.2-3.8 2.6-5 1z"
                />
                <path
                  className="wave fg-color opacity-40"
                  d="M241.6 149.3c-1.2-1.2-.9-3.4.3-5 21.2-24 21.2-60.1 0-84-1.2-1.2-1.6-3.1-.3-4.4 1.2-1.2 3.4-.9 5 .6 23.3 26.1 23.3 66 0 92.1-1.2 1.9-3.7 2.2-5 .7z"
                />
                <path
                  className="line bg-color"
                  d="M274 141.2c-.3-1.6-1.2-3.1-2.8-4L135.6 50.6c-.9-.6-2.2-.9-3.4-.9-2.2 0-4 .9-5.3 2.8-.9 1.6-1.2 3.1-.9 4.7.3 1.6 1.2 3.1 2.8 4l135.4 86.2c.9.6 2.2.9 3.4.9 2.2 0 4-.9 5.3-2.8 1.1-.9 1.4-2.7 1.1-4.3z"
                />
                <path
                  className="line fg-color"
                  d="M267.8 145.9c-.6 0-1.2-.3-1.6-.6L130.9 58.4c-1.6-.9-1.9-2.8-.9-4 .9-1.6 2.8-1.9 4-.9l135.4 86.2c1.6.9 1.9 2.8.9 4.4-.7.8-1.5 1.8-2.5 1.8z"
                />
              </svg>
            </div>
            <span className="text-white text-sm font-medium">
              to enable sound
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

// Apply React.memo for performance optimization
export const PandaVideoPlayer = memo(PandaVideoPlayerComponent);
