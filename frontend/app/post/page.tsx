import PostForm from "@/components/PostForm";
import { PostRow } from "@/components/PostRow";
import { GetPostResponse } from "@/types/post";

const page = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/post`,{
    method: 'GET',
    cache: 'no-store'
  })
  if (!res.ok) return <p>fail</p>
  const posts: GetPostResponse[] = await res.json();

  return (
    <>
      <h1 className="text-3xl font-bold py-4">posts</h1>

      <div className="space-y-2">
        {posts.map((post) => <PostRow key={post.id} post={post}/>)}
      </div>

      <PostForm />
    </>
  )
}

export default page