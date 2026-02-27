'use client'

import { getComments } from "@/lib/commentApi";
import { GetCommentResponse } from "@/types/comment";
import { formatDate } from "@/util/formatDate";
import { useQuery } from "@tanstack/react-query"

export const CommentList = ({ postId }: { postId: number }) => {
  const { data: comments, isLoading, isError } = useQuery<GetCommentResponse[]>({
    queryKey: ['comments', postId],
    queryFn: () => getComments(postId),
  })
  if(isLoading)return <p>コメント読み込み中...</p>
  if( isError || !comments) return <p>コメントはありません。</p>
  return (
    <>
      {comments.map((item: GetCommentResponse, i:number) => (
        <div key={i} className="border w-full h-fit px-4 py-2 rounded">
          <h3 className="text-lg font-bold">件名: {item.title}</h3>
          <p className="text-sm">内容: {item.content}</p>
          <p className="text-end">投稿日時:{formatDate(item.createdAt)}</p>
          <p className="text-end">投稿者:{item.author?.name}</p>
        </div>
      ))}
    </>
  )
}