import PostForm from "@/components/PostForm";

type postResponse = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

const page = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/post`,{
    method: 'GET',
    cache: 'no-store'
  })
  const data: postResponse[] = await res.json();
  
  return (
    <>
      <h1>posts</h1>

      <ul>
        {data.map((item) => {
          return (
            <li key={item.id}>
              {item.id}:{item.title}: {item.content}
            </li>
          )
        })}
      </ul>

      <PostForm />
    </>
  )
}

export default page