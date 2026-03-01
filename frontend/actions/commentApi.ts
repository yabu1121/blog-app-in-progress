'use server'
import { CreateCommentRequest } from "@/types/comment";
import { mapToComment } from "@/util/map";
import { cookies } from "next/headers";

export const getComments = async (postId: number) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/post/${postId}/comments`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    },
  })
  if (!res.ok) throw new Error("取得失敗")
  const data = await res.json();
  return data.map((item: any) => mapToComment(item))
}

export const createComment = async ({ postId, req }: {
  postId: number;
  req: CreateCommentRequest;
}) => {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth_token')?.value

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/post/${postId}/comment`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Cookie: `auth_token=${token}` } : {}),
    },
    body: JSON.stringify({
      title: req.title,
      content: req.content,
      post_id: req.postId,
      // author_id はバックエンドがJWTから取得するため送信不要
    })
  })
  if (!res.ok) throw new Error("作成失敗")
  return res.json()
}