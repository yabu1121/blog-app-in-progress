import PostForm from "@/components/PostForm";
import Link from "next/link";

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

      <ul className="w-screen">
        <div className="mx-auto">
          {data.map((item) => {
              return (
                <li key={item.id}>
                  <Link href={`/post/${item.id}`} className="bg-blue-400 text-white w-20 rounded">
                    {item.id}
                  </Link>
                  :{item.title}:{item.content}
                </li>
              )
          })}
        </div>
      </ul>

      <PostForm />
    </>
  )
}

export default page