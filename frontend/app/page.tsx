type HelloResponse = {
  id: number;
  message:string;
}

const page = async () => {
  const res = await fetch(`${process.env.BACKEND_URL}`, {
    cache: 'no-store'
  });
  if (!res.ok) {
    return <p>fail</p>
  }
  const data: HelloResponse = await res.json();
  
  return (
    <>
      <p>{res.ok ? "res.ok === true" : "res.ok === false"}</p>
      <p>{res.status}</p>
      <p>{res.headers}</p>
      <p>{data.id}</p>
      <p>{data.message}</p>
    </>
  )
}

export default page