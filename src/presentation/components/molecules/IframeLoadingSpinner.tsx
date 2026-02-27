"use client";

interface IframeLoadingSpinnerProps {
  message?: string;
  className?: string;
}

export function IframeLoadingSpinner({
  message = "Loading checkout...",
  className = "",
}: IframeLoadingSpinnerProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 py-12 ${className}`}
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      {/* Spinner */}
      <div className="relative w-12 h-12">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
        {/* Spinning ring */}
        <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
      </div>

      {/* Loading message */}
      <p className="text-gray-600 text-base font-normal font-rubik">
        {message}
      </p>
    </div>
  );
}
