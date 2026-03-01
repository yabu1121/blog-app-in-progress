'use server'

import { SignUpRequest, SignUpResponse } from "@/types/user"

export const createSignUp = async (formData: FormData) => {
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

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })

  if (!res.ok) throw new Error("登録に失敗")

  const data: SignUpResponse = await res.json()
  console.log(data.token)
}