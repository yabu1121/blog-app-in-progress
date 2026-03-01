import { LoginForm } from "@/components/LoginForm copy"
import Link from "next/link"

const LoginPage = () => {
  return (
    <div>
      <h1 className='font-bold text-2xl my-4'>ログイン</h1>
      <LoginForm />
      <Link href="/signup" className="underline text-blue-500 cursor-pointer hover:text-blue-500/80">登録がまだの方はこちら</Link>
    </div>
  )
}

export default LoginPage