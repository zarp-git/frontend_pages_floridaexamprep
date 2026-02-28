"use client";

import React from "react";
import { RiToolsLine, RiMailLine } from "@remixicon/react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/presentation/components/atoms/ui/dialog";
import { useMaintenanceModal } from "@/hooks/use-maintenance-modal";
import { PrimaryButton } from "@/presentation/components/atoms/PrimaryButton";

export const MaintenanceModal = () => {
  const { isOpen, closeModal } = useMaintenanceModal();

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <div className="relative bg-linear-to-br from-gray-50 to-gray-100 p-8">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
              <div className="relative bg-primary/10 p-6 rounded-full">
                <RiToolsLine className="w-12 h-12 text-primary" />
              </div>
            </div>
          </div>

          {/* Title */}
          <DialogTitle className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center font-red-hat">
            Page Under Maintenance
          </DialogTitle>

          {/* Description */}
          <p className="text-base text-gray-600 mb-6 font-rubik leading-relaxed text-center">
            This page is currently undergoing maintenance to bring you an even
            better experience. We appreciate your patience and will be back
            online shortly.
          </p>

          {/* CTA */}
          <div className="text-center">
            <p className="text-sm text-gray-500 font-rubik mb-3">
              Need help now? Contact us:
            </p>
            <PrimaryButton
              variant="blue"
              size="lg"
              className="shadow-xl"
              icon={<RiMailLine className="w-5 h-5" />}
              iconPosition="left"
              onClick={() =>
                (window.location.href = "mailto:cruzvinci@floridaexamprep.com")
              }
            >
              cruzvinci@floridaexamprep.com
            </PrimaryButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
