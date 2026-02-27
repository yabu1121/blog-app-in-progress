import { GetPostResponse } from "./post"
import { GetUserResponse } from "./user"

export type Comment = {
  id: number;
  title: string;
  content: string;
  postId: number;
  post: GetPostResponse;
  authorId: number;
  author: GetUserResponse;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export type CreateCommentRequest = {
  title: string;
  content:string;
  postId: number;
  authorId: number;
}

export type GetCommentResponse = {
  title: string;
  content: string;
  authorId: number;
  author: GetUserResponse;
  createdAt: string;
}