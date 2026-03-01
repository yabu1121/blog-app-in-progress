import { getMyInfomation } from '@/actions/getMyInfomation'
import LogoutButton from '@/components/LogoutButton'
import { UserInfo } from '@/components/UserInfo'
import Link from 'next/link'

const page = async () => {
  const listMap = [
      { href: "/",
        name: "ホーム "},
      { href: "/dashboard",
        name: "ダッシュボード" },
      { href: "/signup",
        name: "サインアップ" },
      { href: "/login",
        name: "ログイン" },
      { href: "/post",
        name: "投稿一覧" },
  ]

  const user = await getMyInfomation()

  return (
    <div>
      <p>ダッシュボード</p>

      {user ? (
        <div className='w-full h-20 border rounded-md p-4'>
          <p>ID: {user.id}</p>
          <p>Name: {user.name}</p>
        </div>
      ) : (
        <p>ログイン情報が取得できませんでした</p>
      )}
      {
        listMap.map((item,idx) => {
          return (
            <Link key={idx} href={item.href} className='block text-blue-500 hover:text-blue-500/80 cursor-pointer text-xl my-2'>{item.name}</Link>
          )
        })
      }
      <LogoutButton />
    </div>
  )
}

export default page