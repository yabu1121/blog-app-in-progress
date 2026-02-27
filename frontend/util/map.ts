import { GetCommentResponse } from "@/types/comment";
import { GetPostResponse } from "@/types/post";

export const mapToPost = (raw: any): GetPostResponse => {
  return {
    id: raw.id,
    title: raw.title,
    content: raw.content,
    user: {
      id: raw.user?.id,
      name: raw.user?.name,
    },
    createdAt: raw.created_at,
    updatedAt: raw.updated_at
  }
}

export const mapToComment = (raw: any): GetCommentResponse => {
  return {
    title: raw.title,
    content: raw.content,
    authorId: raw.author_id,
    author: {
      id: raw.author.id,
      name: raw.author.name,
    },
    createdAt: raw.created_at
  }
}