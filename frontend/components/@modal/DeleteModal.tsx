'use client'
import { deletePosts } from "@/lib/postApi";
import { usePostDeleteModalStore } from "@/store/useModalstore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { toast } from "sonner";

export const DeleteModal = () => {
  const queryClient = useQueryClient();
  const { modalId, closeModal } = usePostDeleteModalStore();

  const { mutate } = useMutation({
    mutationFn: (targetId: number) => deletePosts( targetId ),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['posts']});
      closeModal()
      toast.success('削除完了')
    }
  })

  if (modalId === null) return null

  const handleClose = (e) => {
    e.stopPropagation()
    e.preventDefault()
    closeModal()
  }
  
  const handleDelete = (e) => {
    e.stopPropagation()
    e.preventDefault()
    mutate(modalId)
  }

  return (
    <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-200 z-50'>
      <div className='relative bg-white rounded-2xl shadow-2xl p-8 w-80 animate-in fade-in zoom-in-95 duration-300'>
        <button
          onClick={handleClose}
          className='absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-400 hover:border-red-200 transition-all duration-150 cursor-pointer'
        >
          <X className='w-4 h-4' />
        </button>
        <div className='mb-6'>
          <p className='text-lg font-bold text-gray-900 mb-2'>本当に削除しますか？</p>
          <p className='text-sm text-gray-500 leading-relaxed'>この操作は元に戻すことができません。</p>
        </div>
        <div className='flex gap-3'>
          <button onClick={handleClose} className='flex-1 h-11 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-all duration-150 cursor-pointer'>
            戻る
          </button>
          <button onClick={handleDelete} className='flex-1 h-11 rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-all duration-150 cursor-pointer shadow-lg shadow-red-200'>
            削除する
          </button>
        </div>
      </div>
    </div>
  )
}