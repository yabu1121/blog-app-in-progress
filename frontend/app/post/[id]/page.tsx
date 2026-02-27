import { CommentCreateModal } from "@/components/@modal/CommentPostModal";
import { CommentList } from "@/components/CommentList";
import { CommentPostButton } from "@/components/CommentPostButton";
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
      <div>
        <h1 className="font-bold text-2xl">{post.title}</h1>
        <hr />
        <p className="text-sm my-4">{post.content}</p>
      </div>

      <div className="my-4">
        <div className="flex justify-between">
          <h2 className="font-bold text-xl">コメント一覧</h2>
          <CommentPostButton id={Number(id)}/>
        </div>
        <hr className="mb-4"/>
        <div className="max-w-4xl mx-auto space-y-4">
          <CommentList postId={Number(id)}/>
        </div>
      </div>

      <div className="mx-auto w-fit">
        <Link className="bg-blue-500 rounded-full text-white w-30 h-10 flex items-center justify-center" href="/post">スレッドに戻る</Link>
      </div>

      <CommentCreateModal />
    </>
  )
}

export default page