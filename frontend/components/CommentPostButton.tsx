'use client'
import { useCommentCreateModalStore } from '@/store/useModalstore'
import { Pen } from 'lucide-react'


export const CommentPostButton = ({ id }: { id: number }) => {
  const { openModal } = useCommentCreateModalStore();
  const handlePost = (e: React.MouseEvent) => {
    e.preventDefault();
    openModal(id);
  }
  return (
    <div>
      <Pen className='text-blue-300 hover:text-blue-400 cursor-pointer ' onClick={handlePost} />
    </div>
  )
}
