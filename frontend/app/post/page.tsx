'use client'
import PostForm from "@/components/PostForm";
import { PostRow } from "@/components/PostRow";
import { getPosts } from "@/lib/api";
import { Post } from "@/types/post";
import { useQuery } from "@tanstack/react-query";

const page = () => {
  const { data: posts, isPending, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })

  if(isPending)return<p>loading...</p>
  if(isError)return<p>Sorry...Error..</p>

  return (
    <>
      <h1 className="text-3xl font-bold py-4">posts</h1>

      <div className="space-y-2">
        {posts.map((post: Post) => <PostRow key={post.id} post={post}/>)}
      </div>

      <PostForm />
    </>
  )
}

export default page