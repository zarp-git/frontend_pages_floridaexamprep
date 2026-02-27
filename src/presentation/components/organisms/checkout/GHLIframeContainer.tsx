"use client";

import { useState, useEffect, useRef } from "react";
import { CourseSlug } from "@/types/courses";
import { IframeErrorFallback } from "@/presentation/components/molecules/IframeErrorFallback";
import { setupListener } from "@/utils/iframePostMessage";
import { IframeLoadEvent } from "@/types/monitoring";

/**
 * Iframe URL mapping for each course tier
 * Reads directly from environment variables on the client side
 */
const IFRAME_URLS: Record<CourseSlug, string> = {
  "primary-course": process.env.NEXT_PUBLIC_GHL_IFRAME_PRIMARY_COURSE || "",
  "primary-books": process.env.NEXT_PUBLIC_GHL_IFRAME_PRIMARY_BOOKS || "",
  "premium-books": process.env.NEXT_PUBLIC_GHL_IFRAME_PREMIUM_BOOKS || "",
};

/**
 * GHL origin for iframe security validation
 */
const GHL_ORIGIN = process.env.NEXT_PUBLIC_GHL_ORIGIN || "";

/**
 * Props interface for GHLIframeContainer component
 */
interface GHLIframeContainerProps {
  courseSlug: CourseSlug;
  className?: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

/**
 * State interface for iframe management
 */
interface IframeState {
  hasError: boolean;
  errorMessage: string | null;
  iframeHeight: number;
  isVisible: boolean;
}

/**
 * GHLIframeContainer Component
 * 
 * Main component that renders GHL iframes for checkout pages.
 * Handles loading states, error handling, and iframe lifecycle.
 * 
 * @param courseSlug - The course identifier to load the appropriate iframe
 * @param className - Optional CSS classes for styling
 * @param onLoad - Optional callback when iframe loads successfully
 * @param onError - Optional callback when iframe fails to load
 */
export default function GHLIframeContainer({
  courseSlug,
  className,
  onLoad,
  onError,
}: GHLIframeContainerProps) {
  // Initialize iframe state
  const [iframeState, setIframeState] = useState<IframeState>({
    hasError: false,
    errorMessage: null,
    iframeHeight: 800, // Default height
    isVisible: false,
  });

  // Create ref for container element
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const loadStartTimeRef = useRef<number | null>(null);

  // Get iframe configuration from environment variables
  const iframeUrl = IFRAME_URLS[courseSlug];
  const allowedOrigins = GHL_ORIGIN ? [GHL_ORIGIN] : [];
  
  // Validate configuration
  const hasValidConfig = Boolean(iframeUrl && GHL_ORIGIN);

  /**
   * Log iframe load event for monitoring
   */
  const logIframeLoadEvent = (event: IframeLoadEvent) => {
    console.log(
      `[GHLIframeContainer] Iframe load event:`,
      {
        courseSlug: event.courseSlug,
        timestamp: new Date(event.timestamp).toISOString(),
        loadTime: `${event.loadTime}ms`,
        success: event.success,
        errorMessage: event.errorMessage,
      }
    );
    // Future: Send to external monitoring service (e.g., Sentry, LogRocket)
  };

  // Set up Intersection Observer for lazy loading
  useEffect(() => {
    // Fallback: if IntersectionObserver is not supported, load immediately
    if (typeof IntersectionObserver === "undefined") {
      setIframeState((prev) => ({ ...prev, isVisible: true }));
      return;
    }

    // Create Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Component is visible in viewport
            // Log iframe load start with timestamp
            const loadStartTime = Date.now();
            loadStartTimeRef.current = loadStartTime;
            console.log(
              `[GHLIframeContainer] Iframe load started:`,
              {
                courseSlug,
                timestamp: new Date(loadStartTime).toISOString(),
              }
            );

            setIframeState((prev) => ({ ...prev, isVisible: true }));
            // Stop observing once visible
            if (containerRef.current) {
              observer.unobserve(containerRef.current);
            }
          }
        });
      },
      {
        // Trigger when component is within 200px of viewport
        rootMargin: "200px",
        threshold: 0.01,
      }
    );

    // Start observing the container
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Cleanup observer on unmount
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
      observer.disconnect();
    };
  }, [courseSlug]);

  // Set up postMessage listener for height adjustments
  useEffect(() => {
    // Only set up listener after iframe is visible and not in error state
    if (!iframeState.isVisible || iframeState.hasError || !iframeRef.current || !hasValidConfig) {
      return;
    }

    // Callback to handle height changes from iframe
    const handleHeightChange = (height: number) => {
      setIframeState((prev) => ({
        ...prev,
        iframeHeight: height,
      }));
    };

    // Set up the postMessage listener with origin validation
    const cleanup = setupListener(
      iframeRef.current,
      allowedOrigins,
      handleHeightChange
    );

    // Return cleanup function to remove listener on unmount
    return cleanup;
  }, [iframeState.isVisible, iframeState.hasError, hasValidConfig, allowedOrigins]);

  // Handle iframe load success
  const handleIframeLoad = () => {
    // Calculate load time
    const loadEndTime = Date.now();
    const loadTime = loadStartTimeRef.current 
      ? loadEndTime - loadStartTimeRef.current 
      : 0;

    // Log successful load with load time
    console.log(
      `[GHLIframeContainer] Iframe loaded successfully:`,
      {
        courseSlug,
        timestamp: new Date(loadEndTime).toISOString(),
        loadTime: `${loadTime}ms`,
      }
    );

    // Create and log IframeLoadEvent for monitoring
    const loadEvent: IframeLoadEvent = {
      courseSlug,
      timestamp: loadEndTime,
      loadTime,
      success: true,
    };
    logIframeLoadEvent(loadEvent);

    if (onLoad) {
      onLoad();
    }
  };

  // Handle iframe load error
  const handleIframeError = () => {
    // Calculate load time (time until error)
    const errorTime = Date.now();
    const loadTime = loadStartTimeRef.current 
      ? errorTime - loadStartTimeRef.current 
      : 0;

    const errorMessage = `Failed to load iframe for course: ${courseSlug}`;
    const error = new Error(errorMessage);

    // Log error with courseSlug, timestamp, and error details
    console.error(
      `[GHLIframeContainer] Load error:`,
      {
        courseSlug,
        timestamp: new Date(errorTime).toISOString(),
        loadTime: `${loadTime}ms`,
        error: errorMessage,
      }
    );

    // Create and log IframeLoadEvent for monitoring
    const loadEvent: IframeLoadEvent = {
      courseSlug,
      timestamp: errorTime,
      loadTime,
      success: false,
      errorMessage,
    };
    logIframeLoadEvent(loadEvent);

    setIframeState((prev) => ({
      ...prev,
      hasError: true,
      errorMessage: "We couldn't load the checkout form. Please check your connection and try again.",
    }));

    if (onError) {
      onError(error);
    }
  };

  // Handle retry functionality
  const handleRetry = () => {
    // Reset error state and reload iframe
    setIframeState((prev) => ({
      ...prev,
      hasError: false,
      errorMessage: null,
    }));

    // Force iframe reload by updating key or src
    if (iframeRef.current) {
      const currentSrc = iframeRef.current.src;
      iframeRef.current.src = "";
      setTimeout(() => {
        if (iframeRef.current) {
          iframeRef.current.src = currentSrc;
        }
      }, 100);
    }
  };

  // Handle case where config is invalid (show error)
  if (!hasValidConfig) {
    return (
      <section className={className}>
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-red-800 font-medium">
            Unable to load checkout form. Configuration not found for course: {courseSlug}
          </p>
          <p className="text-red-600 text-sm mt-2">
            Please contact support if this issue persists.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={className} ref={containerRef}>
      <div className="w-full">
        {/* Show error fallback when error occurs */}
        {iframeState.hasError && (
          <IframeErrorFallback
            errorMessage={iframeState.errorMessage || "An unexpected error occurred."}
            onRetry={handleRetry}
            className="min-h-[400px]"
          />
        )}

        {/* Show iframe when visible and not in error state */}
        {iframeState.isVisible && !iframeState.hasError && (
          <iframe
            ref={iframeRef}
            src={iframeUrl}
            sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
            loading="lazy"
            aria-label={`Checkout form for ${courseSlug} course`}
            data-testid="ghl-iframe"
            style={{ 
              height: `${iframeState.iframeHeight}px`,
            }}
            className="w-full border-0"
            title={`GoHighLevel checkout form for ${courseSlug}`}
            onLoad={handleIframeLoad}
            onError={handleIframeError}
          />
        )}

        {/* Show placeholder when not yet visible */}
        {!iframeState.isVisible && !iframeState.hasError && (
          <div
            data-testid="iframe-placeholder"
            style={{ height: `${iframeState.iframeHeight}px` }}
            className="w-full bg-gray-50 animate-pulse"
            aria-label="Loading checkout form"
          />
        )}
      </div>
    </section>
  );
}
