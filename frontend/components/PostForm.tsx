'use client'
import { createPost } from "@/actions/postApi";
import { CreatePostRequest } from "@/types/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";



export default function PostForm() {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (targetPost: CreatePostRequest) => createPost(targetPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('投稿完了')
    }
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget
    const formData = new FormData(e.currentTarget);

    const req = {
      title: String(formData.get('title') ?? ""),
      content: String(formData.get('content') ?? ""),
    };

    mutate(req, {
      onSuccess: () => form.reset()
    })
  };

  if (isError) (<p>error...</p>)

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
      <input name="title" type="text" className="border p-1" placeholder="title" />
      <input name="content" type="text" className="border p-1" placeholder="content" />
      <button type="submit" className="bg-blue-500 text-white p-1">{isPending ? "投稿中" : "投稿"}</button>
    </form>
  );
}