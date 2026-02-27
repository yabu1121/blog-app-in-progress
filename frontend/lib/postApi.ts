import { CreatePostRequest } from "@/types/post";
import { mapToPost } from "@/util/map";

export const getPost = async ( id: number ) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/post/${id}`,{
    method: 'GET',
    headers: {
      "Content-Type": "applicaiton/json",
    },
  })
  if (!res.ok) throw new Error("取得失敗")
  return res.json()
}

export const getPosts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/post`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    },
  });
  if (!res.ok) throw new Error("取得失敗");
  const data = await res.json();
  return data.map(mapToPost)
}

export const deletePosts = async ( id:number ) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/post/${id}`, {
    method: 'DELETE',
  })
  if(!res.ok) throw new Error("削除失敗");
  return null 
}

export const createPost = async ( newPost : CreatePostRequest) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/post`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost)
  });
  if (!res.ok)throw new Error("投稿失敗");
  return res.json()
}

export const updatePost = async (id:number, updatedPost: CreatePostRequest) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/post/${id}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedPost)
  });
  if(!res.ok)throw new Error("更新失敗");
  return res.json()
}
