'use client' 

export default function PostForm() {

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const req = {
      title: formData.get('title'),
      content: formData.get('content'),
    };

    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/post`, {
      method: 'POST',
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify(req),
    });

    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
      <input name="title" type="text" className="border p-1" placeholder="title"/>
      <input name="content" type="text" className="border p-1" placeholder="content"/>
      <button type="submit" className="bg-blue-500 text-white p-1">投稿</button>
    </form>
  );
}