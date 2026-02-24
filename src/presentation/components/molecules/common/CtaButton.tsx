"use client";

import React from "react";
import { RiPhoneLine } from "@remixicon/react";
import { Button } from "@/presentation/components/atoms/ui/button";
import { useContactModal } from "@/hooks/use-contact-modal";
import { cn } from "@/lib/utils";

interface CtaButtonProps {
  label?: string;
  variant?: "brick" | "brick-outline";
  className?: string;
  showIcon?: boolean;
}

const CtaButton = ({
  label = "CONTACT US NOW",
  variant = "brick",
  className,
  showIcon = true,
}: CtaButtonProps) => {
  const { openModal } = useContactModal();

  return (
    <Button
      variant={variant}
      size="lg"
      onClick={openModal}
      className={cn(
        "h-12 px-8 py-4 rounded-lg inline-flex justify-center items-center gap-4 text-base font-medium font-rubik uppercase",
        className,
      )}
    >
      {label}
      {showIcon && <RiPhoneLine className="size-5" />}
    </Button>
  );
};

export { CtaButton };
