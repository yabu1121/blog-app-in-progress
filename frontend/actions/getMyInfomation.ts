'use server'

import { UserInfomation } from "@/types/user"
import { cookies } from "next/headers"

export const getMyInfomation = async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth_token")?.value

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Cookie: `auth_token=${token}`} : {})
    },
  })

  if (!res.ok) return null
  const data: UserInfomation = await res.json()
  return data
}