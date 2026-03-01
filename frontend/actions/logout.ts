'use server'
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

 

export const Logout = async () => {
  const cookieStore = await cookies()
  cookieStore.delete('auth_token')
  redirect('/login')
} 