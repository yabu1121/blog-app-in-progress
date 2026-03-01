'use server'

import { SignUpRequest, SignUpResponse } from "@/types/user"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const SignUp = async (formData: FormData) => {
  const name = String(formData.get('name'))
  const email = String(formData.get('email'))
  const password = String(formData.get('password'))

  if (!name || !email || !password) {
    throw new Error("すべての項目を入力してください")
  }

  const req: SignUpRequest = {
    name: name,
    email: email,
    password: password,
  }

  // req 送信
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })

  if (!res.ok) throw new Error("登録に失敗")

  const data: SignUpResponse = await res.json()
  const token = data.token

  // cookieに保存
  const cookieStore = await cookies()
  cookieStore.set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 4,
  })
  redirect("dashboard")
}