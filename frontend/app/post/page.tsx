import { DeleteModal } from "@/components/modal/DeleteModal";
import { UpdateModal } from "@/components/modal/UpdateModal";
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";

const page = () => {
  return (
    <>
      <h1 className="text-3xl font-bold py-4">posts</h1>
      <PostList />
      <PostForm />

      <DeleteModal />
      <UpdateModal />
    </>
  )
}

export default page