import { create } from "zustand";

interface MaintenanceModalStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useMaintenanceModal = create<MaintenanceModalStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
