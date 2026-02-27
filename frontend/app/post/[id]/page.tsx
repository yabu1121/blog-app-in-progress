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
    <>
      <h1 className="font-bold text-2xl">{post.title}</h1>
      <hr />
      <p className="text-sm my-4">{post.content}</p>

      <div className="my-4">
        <h2 className="font-bold text-xl">コメント一覧</h2>
        <hr className="mb-4"/>
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="border w-full h-fit px-4 py-2 rounded">
              <h3 className="text-lg font-bold">件名</h3>
              <p className="text-sm">内容</p>
              <p className="text-end">投稿日時:</p>
              <p className="text-end">投稿者:</p>
            </div>
            <div className="border w-full h-fit px-4 py-2 rounded">
              <h3 className="text-lg font-bold">件名</h3>
              <p className="text-sm">内容</p>
              <p className="text-end">投稿日時:</p>
              <p className="text-end">投稿者:</p>
            </div>
            <div className="border w-full h-fit px-4 py-2 rounded">
              <h3 className="text-lg font-bold">件名</h3>
              <p className="text-sm">内容</p>
              <p className="text-end">投稿日時:</p>
              <p className="text-end">投稿者:</p>
            </div>
            <div className="border w-full h-fit px-4 py-2 rounded">
              <h3 className="text-lg font-bold">件名</h3>
              <p className="text-sm">内容</p>
              <p className="text-end">投稿日時:</p>
              <p className="text-end">投稿者:</p>
            </div>
            <div className="border w-full h-fit px-4 py-2 rounded">
              <h3 className="text-lg font-bold">件名</h3>
              <p className="text-sm">内容</p>
              <p className="text-end">投稿日時:</p>
              <p className="text-end">投稿者:</p>
            </div>
          </div>

      </div>

      <div className="mx-auto w-fit">
        <Link className="bg-blue-500 rounded-full text-white w-30 h-10 flex items-center justify-center" href="/post">スレッドに戻る</Link>
      </div>
    </>
  )
}

export default page