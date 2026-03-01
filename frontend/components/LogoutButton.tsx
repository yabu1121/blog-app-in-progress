'use client'
import { Logout } from "@/actions/logout"
import { LogOut } from "lucide-react"

const LogoutButton = () => {
  return (
    <LogOut onClick={Logout} className='block text-blue-500 hover:text-blue-500/80 cursor-pointer text-xl'/>
  )
}

export default LogoutButton