import { Post } from "@/types/post";
import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>; 
};

const page = async ({ params }: Props) => {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/post/${id}`)
  const post: Post = await res.json()
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <Link href="/post">ホームに戻る</Link>
    </div>
  )
}

export default page