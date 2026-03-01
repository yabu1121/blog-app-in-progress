'use client'
import { usePostUpdateModalStore } from "@/store/useModalstore";
import { Pen } from "lucide-react";

export const PostUpdateButton = ({ id }: { id: number }) => {
  const { openModal } = usePostUpdateModalStore()
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    openModal(id)
  }
  return <Pen onClick={handleClick} className="text-blue-300 hover:text-blue-400 cursor-pointer" />
}