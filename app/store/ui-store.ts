import { create } from "zustand";
import { UIStore } from "@/app/types";

export const useUIStore = create<UIStore>((set) => ({
  ui: {
    isModalOpen: false,
    isMenuOpen: false,
    isToastOpen: false,
    modalContent: null,
    toastMessage: null,
    toastType: "info",
  },

  openModal: (content) =>
    set((state) => ({
      ui: { ...state.ui, isModalOpen: true, modalContent: content || null },
    })),

  closeModal: () =>
    set((state) => ({
      ui: { ...state.ui, isModalOpen: false, modalContent: null },
    })),

  toggleMenu: () =>
    set((state) => ({
      ui: { ...state.ui, isMenuOpen: !state.ui.isMenuOpen },
    })),

  closeMenu: () =>
    set((state) => ({
      ui: { ...state.ui, isMenuOpen: false },
    })),

  showToast: (message, type = "info") =>
    set((state) => ({
      ui: {
        ...state.ui,
        isToastOpen: true,
        toastMessage: message,
        toastType: type,
      },
    })),

  hideToast: () =>
    set((state) => ({
      ui: { ...state.ui, isToastOpen: false, toastMessage: null },
    })),

  resetUI: () =>
    set(() => ({
      ui: {
        isModalOpen: false,
        isMenuOpen: false,
        isToastOpen: false,
        modalContent: null,
        toastMessage: null,
        toastType: "info",
      },
    })),
}));
