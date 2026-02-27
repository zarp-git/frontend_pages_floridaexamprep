import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const brandedButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium font-red-hat transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white hover:bg-primary/90 shadow-sm hover:shadow-md border border-primary/20",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm hover:shadow-md",
        outline:
          "border-2 border-primary text-primary bg-background hover:bg-primary hover:text-white",
        ghost: "text-primary hover:bg-primary/10",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-xs uppercase tracking-wider",
        md: "h-11 px-6 text-sm uppercase tracking-wide",
        lg: "h-14 px-8 text-base uppercase tracking-wide",
        icon: "h-10 w-10",
      },
      effect: {
        none: "",
        pulse: "animate-pulse",
        shake: "animate-shake-infinite",
        shine:
          "before:content-[''] before:absolute before:inset-0 before:-translate-x-full before:animate-shine before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent overflow-hidden",
        radar: "animate-glow",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      effect: "none",
      fullWidth: false,
    },
  },
);

export interface BrandedButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof brandedButtonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const BrandedButton = React.forwardRef<HTMLButtonElement, BrandedButtonProps>(
  (
    {
      className,
      variant,
      size,
      effect,
      fullWidth,
      loading,
      asChild = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(
          brandedButtonVariants({
            variant,
            size,
            effect,
            fullWidth,
            className,
          }),
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span className="opacity-90">Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && (
              <span className="mr-2 flex items-center">{leftIcon}</span>
            )}
            {children}
            {rightIcon && (
              <span className="ml-2 flex items-center">{rightIcon}</span>
            )}
          </>
        )}
      </Comp>
    );
  },
);

BrandedButton.displayName = "BrandedButton";

export { BrandedButton, brandedButtonVariants };
