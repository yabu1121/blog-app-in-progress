import { GetPostResponse } from "@/types/post"
import { formatDate } from "@/util/formatDate"
import Link from "next/link"
import { PostUpdateButton } from "./PostUpdateButton"
import { PostDeleteButton } from "./PostDeleteButton"

export const PostRow = ({post}: {post:GetPostResponse}) => {
  return (
    <Link href={`/post/${post.id}`} className="block rounded boerder border-2 border-black px-4 py-2">
      <div>
        <div className="flex justify-between">
          <p>id:{post.id}</p>
          <div>
            <PostUpdateButton id={post.id}/>
            <PostDeleteButton id={post.id}/>
          </div>
        </div>
        <p className="text-2xl font-bold text-blue-400">{post.title}</p>
        <p className="text-sm font-semibold">{post.content}</p>
      </div>

      <div className="mr-0">
        <p>作成:{formatDate(post.createdAt)}</p>
        <p>更新:{formatDate(post.updatedAt)}</p>
      </div>
    </Link>
  )
}
