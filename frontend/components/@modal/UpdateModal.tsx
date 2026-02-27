'use client'
import { updatePost } from "@/lib/postApi";
import { useUpdateModalStore } from "@/store/useModalstore";
import { CreatePostRequest } from "@/types/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { toast } from "sonner";

export const UpdateModal = () => {
  const queryClient = useQueryClient();
  const { modalId, closeModal } = useUpdateModalStore();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: ({ targetId, targetPost} : { 
      targetId :number, 
      targetPost: CreatePostRequest
    }) => updatePost( targetId, targetPost ), 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('更新完了')
      closeModal()
    }
  })

  if (modalId === null) return null

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget
    const formData = new FormData(e.currentTarget);
    
    const req = {
      title: String(formData.get('title') ?? ""),
      content: String(formData.get('content') ?? ""),
      user_id: Number(formData.get('userId'))
    };
    
    mutate({
      targetId:modalId, 
      targetPost: req
    }, {
      onSuccess: () => form.reset()
    })
  };

  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeModal();
  }

  return (
    <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-200 z-50'>
      <div className='relative bg-white rounded-2xl shadow-2xl p-8 w-80 animate-in fade-in zoom-in-95 duration-300'>
        <button
          className='absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-400 hover:border-red-200 transition-all duration-150 cursor-pointer'
        >
          <X onClick={handleClose} className='w-4 h-4' />
        </button>
        <div className='mb-6'>
          <p className='text-lg font-bold text-gray-900 mb-2'>更新する内容を表示</p>
          <form onSubmit={handleSubmit} id="edit-form" className="flex flex-col gap-2 mt-4">
            <input name="title" type="text" className="border p-1" placeholder="title"/>
            <input name="content" type="text" className="border p-1" placeholder="content"/>
            <input name="userId" type="number" className="border p-1" placeholder="user_id"/>
          </form>
        </div>
        <div className='flex gap-3'>
          <button type="submit" form="edit-form" className='flex-1 h-11 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-all duration-150 cursor-pointer'>
            更新する
          </button>
          <button onClick={handleClose} className='flex-1 h-11 rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-all duration-150 cursor-pointer shadow-lg shadow-red-200'>
            閉じる
          </button>
        </div>
      </div>
    </div>
  )
}