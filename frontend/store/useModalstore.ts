import { create } from "zustand"

type ModalState = {
  modalId: number | null;
  openModal: ( id: number ) => void;
  closeModal: () => void;
}

export const usePostDeleteModalStore = create<ModalState>((set) => ({
  modalId: null,
  openModal: (id) => set({modalId: id}),
  closeModal: () => set({modalId: null}),
}))

export const usePostUpdateModalStore = create<ModalState>((set) => ({
  modalId: null,
  openModal: (id) => set({modalId: id}),
  closeModal: () => set({modalId: null}),
}))

export const useCommentCreateModalStore = create<ModalState>((set) => ({
  modalId: null,
  openModal: (id) => set({modalId: id}),
  closeModal: () => set({modalId: null}),
}))