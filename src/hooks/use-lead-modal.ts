import { create } from "zustand"

interface LeadModalStore {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

export const useLeadModal = create<LeadModalStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}))
