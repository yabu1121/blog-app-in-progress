import { Post } from "./post";

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  posts: Post[];
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export type GetUserResponse = {
  id: number;
  name: string;
}

export type CreateUserRequest = {
  name: string;
  email: string;
}


export type SignUpRequest = {
  name: string;
  email: string;
  password: string;
}

export type SignUpResponse = {
  token: string;
}