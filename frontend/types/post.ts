import { GetUserResponse, User } from "./user";

export type Post = {
  id: number;
  title: string;
  content: string;
  userId: number;
  user: User;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export type CreatePostRequest = {
  title: string;
  content: string;
}

export type GetPostResponse = {
  id: number;
  title: string;
  content: string;
  user: GetUserResponse;
  createdAt: string;
  updatedAt: string;
}