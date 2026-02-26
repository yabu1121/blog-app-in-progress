'use client'
import { deletePosts } from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2, X } from 'lucide-react'
import { useState } from 'react';

const DeleteButton = ({id}: { id:number }) => {
  const [isOpen, setIsOpen ] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isSuccess } = useMutation({
    mutationFn: (targetId: number) => deletePosts( targetId ),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['posts']});
      setIsOpen(false)
    }
  })

  const handleConfirm = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOpen((state) => !state)
  }
  
  const toggleModal = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOpen((state) => !state)
  }
  
  const handleDelete = (e) => {
    e.stopPropagation()
    e.preventDefault()
    mutate(id)
  }

  return (
    <>
      <Trash2 onClick={handleConfirm} className="text-blue-300 hover:text-blue-400 cursor-pointer"/>
      {
      isOpen && <div className='absolute bg-gray-100 border rounded-md w-120 py-20 mx-auto left-0 right-0'>
          <X onClick={toggleModal} className='bg-white border rounded-full w-8 h-8 absolute right-0 -top-10'/>
          <p className='text-center'>本当に削除しますか？</p>
          <p className='text-center'>この操作は削除できません</p>
          <div className='flex items-center justify-center gap-4 mt-20'>
            <button onClick={handleDelete} className='cursor-pointer bg-red-200 hover:bg-red-400 w-40 h-10 rounded text-sm text-black transition-all duration-200'>削除</button>
            <button onClick={toggleModal} className='cursor-pointer bg-white hover:bg-blue-200 w-40 h-10 border rounded text-sm text-black transition-all duration-200'>戻る</button>
          </div>
        </div>
      }
    </>
  )
}

export default DeleteButton