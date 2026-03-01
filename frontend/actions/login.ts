'use server'
import { LoginRequest, LoginResponse } from "@/types/user"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const Login = async (FormData: FormData) => {
  const email = String(FormData.get('email'))
  const password = String(FormData.get('password'))

  if (!email || !password) throw new Error("項目が不十分です")

  const req: LoginRequest = {
    email: email,
    password: password,
  } 


  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(req)
  })

  if (!res.ok)throw new Error("メールアドレスまたはパスワードが正しくありません。")

  const data: LoginResponse = await res.json()
  const token = data.token
  
  const cookieStore = await cookies()
  cookieStore.set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 3,
  })

  redirect("/dashboard")
}