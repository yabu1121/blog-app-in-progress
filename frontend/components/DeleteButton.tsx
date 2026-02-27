'use client'
import { Trash2 } from 'lucide-react'
import { usePostDeleteModalStore } from '@/store/useModalstore'

const DeleteButton = ({id}: { id:number }) => {
  const { openModal } = usePostDeleteModalStore()
  
  const handleOpen = (e) => {
    e.stopPropagation()
    e.preventDefault()
    openModal(id)
  }

  return (
    <>
      <Trash2 onClick={handleOpen} className="text-blue-300 hover:text-blue-400 cursor-pointer"/>
    </>
  )
}

export default DeleteButton