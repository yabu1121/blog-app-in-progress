import { mapToPost } from "@/util/map";

export const getPosts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/post`);
  if (!res.ok) throw new Error("取得失敗");
  const data = await res.json();
  return data.map(mapToPost)
}