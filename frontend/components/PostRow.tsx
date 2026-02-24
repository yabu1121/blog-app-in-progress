import { GetPostResponse } from "@/types/post"
import { fonrmatDate, formatDate } from "@/util/formatDate"
import Link from "next/link"

export const PostRow = ({post}: {post:GetPostResponse}) => {
  return (
    <Link href={`/post/${post.id}`} className="block rounded boerder border-2 border-black px-4 py-2">
      <div>
        <p>id:{post.id}</p>
        <p className="text-2xl font-bold text-blue-400">{post.title}</p>
        <p className="text-sm font-semibold">{post.content}</p>
      </div>

      <div className="mr-0">
        <p>作成:{formatDate(post.created_at)}</p>
        <p>更新:{formatDate(post.updated_at)}</p>
      </div>
    </Link>
  )
}
