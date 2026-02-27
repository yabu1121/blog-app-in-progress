'use client'
import { useUpdateModalStore } from "@/store/useModalstore";
import { Pen } from "lucide-react";

export const UpdateButton = ({id}: {id:number}) => {
  const { openModal } = useUpdateModalStore()
  const handleClick = (e) => {
    e.stopPropagation()
    e.preventDefault()
    openModal(id)
  }
  return <Pen onClick={handleClick} className="text-blue-300 hover:text-blue-400 cursor-pointer"/>
}