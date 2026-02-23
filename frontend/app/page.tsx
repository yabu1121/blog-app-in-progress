type HelloResponse = {
  id: number;
  message:string;
}

type UserResponse = {
  id: string;
  name: string;
  age: number;
  skills: string[];
  is_active: boolean;
}

const page = async () => {
  //直列
  // const res = await fetch(`${process.env.BACKEND_URL}`, {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   cache: 'no-store'
  // });

  // const resUser = await fetch(`${process.env.BACKEND_URL}/user`, {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   cache: 'no-store'
  // })

  //並列
  const id = Math.floor(Math.random() * 100000) + 1;
  const [res, resUser] = await Promise.all([
    fetch(`${process.env.BACKEND_URL}/users/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    }),
    fetch(`${process.env.BACKEND_URL}/users/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'reload'
    })
  ])

  if (!res.ok || !resUser.ok) {
    return <p>fail</p>
  }

  const [data, dataUser]:[HelloResponse, UserResponse] = await Promise.all([
    res.json(),
    resUser.json(),
  ])

  return (
    <>
      <p>{res.ok ? "res.ok: true" : "res.ok: false"}</p>
      <p>{res.status}</p>
      <p>{`content-length: ${res.headers.get("content-length")}`}</p>
      <p>{`content-type: ${res.headers.get("content-type")}`}</p>
      <p>{`date: ${res.headers.get("date")}`}</p>
      <p>{data.id}</p>
      <p>{data.message}</p>
      <p>{dataUser.id}</p>
      <p>{dataUser.name}</p>
      <p>{dataUser.age}</p>
      <ul>
        {dataUser.skills.map((item) => {
          return (
            <li key={item}>{item}</li>
          )
        })}
      </ul>
      <p>{dataUser.is_active ? "is_active: true" : "is_active: false"}</p>
    </>
  )
}

export default page