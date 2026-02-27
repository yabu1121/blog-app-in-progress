import { create } from "zustand"

type PostEditState = {
  editingId: number | null;
  openEdit: (id: number) => void;
  closeEdit: () => void;
}

export const usePostEditstore = create<PostEditState>((set) => ({
  editingId: null,
  openEdit: (id) => set({ editingId: id }),
  closeEdit: () => set({ editingId: null }),
}))