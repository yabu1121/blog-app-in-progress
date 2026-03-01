import LogoutButton from '@/components/LogoutButton'
import Link from 'next/link'

const page = () => {
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
  return (
    <div>
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