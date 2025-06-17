export interface UIState {
  isModalOpen: boolean;
  isMenuOpen: boolean;
  isToastOpen: boolean;
  modalContent: string | null;
  toastMessage: string | null;
  toastType: "success" | "error" | "warning" | "info";
}

export interface UIStore {
  ui: UIState;
  openModal: (content?: string) => void;
  closeModal: () => void;
  toggleMenu: () => void;
  closeMenu: () => void;
  showToast: (message: string, type?: UIState["toastType"]) => void;
  hideToast: () => void;
  resetUI: () => void;
}

// UI element positioning types for layout components
export type UILayer = "background" | "content" | "navigation" | "overlay";
export type UIZone =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-left"
  | "center"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface UIElementProps {
  layer: UILayer;
  zone: UIZone;
  className?: string;
  children: React.ReactNode;
}
