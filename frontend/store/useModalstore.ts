import { create } from "zustand"

type ModalState = {
  modalId: number | null;
  openModal: ( id: number ) => void;
  closeModal: () => void;
}

export const useDeleteModalStore = create<ModalState>((set) => ({
  modalId: null,
  openModal: (id) => set({modalId: id}),
  closeModal: () => set({modalId: null}),
}))

export const useUpdateModalStore = create<ModalState>((set) => ({
  modalId: null,
  openModal: (id) => set({modalId: id}),
  closeModal: () => set({modalId: null}),
}))