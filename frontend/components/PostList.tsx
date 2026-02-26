'use client'
import { getPosts } from '@/lib/api'
import { Post } from '@/types/post'
import { useQuery } from '@tanstack/react-query'
import { PostRow } from './PostRow'

const PostList = () => {
  const {data:posts, isPending, isError} = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })

  if(isPending)return<p>loading...</p>
  if(isError)return<p>Sorry...Error..</p>


  return (
    <div className="space-y-2">
      {posts.map((post: Post) => <PostRow key={post.id} post={post}/>)}
    </div>
  )
}

export default PostList