"use client";

import { AlertCircle, RefreshCw } from "lucide-react";

interface IframeErrorFallbackProps {
  errorMessage: string;
  onRetry?: () => void;
  className?: string;
}

export function IframeErrorFallback({
  errorMessage,
  onRetry,
  className = "",
}: IframeErrorFallbackProps) {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleRetry();
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center gap-6 py-12 px-4 ${className}`}
      role="alert"
      aria-live="assertive"
    >
      {/* Error icon */}
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-50">
        <AlertCircle className="w-8 h-8 text-red-600" aria-hidden="true" />
      </div>

      {/* Error message */}
      <div className="flex flex-col items-center gap-2 text-center max-w-md">
        <h3 className="text-gray-800 text-xl font-semibold font-red-hat">
          Unable to Load Checkout
        </h3>
        <p className="text-gray-600 text-base font-normal font-rubik leading-6">
          {errorMessage}
        </p>
      </div>

      {/* Retry button */}
      {onRetry && (
        <button
          onClick={handleRetry}
          onKeyDown={handleKeyDown}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white text-base font-medium font-rubik rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          aria-label="Retry loading checkout"
        >
          <RefreshCw className="w-5 h-5" aria-hidden="true" />
          Try Again
        </button>
      )}
    </div>
  );
}
