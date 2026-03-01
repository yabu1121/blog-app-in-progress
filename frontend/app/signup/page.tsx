import { SignUpForm } from "@/components/SignUpForm"
import Link from "next/link"

const SignUpPage = () => {
  return (
    <div>
      <h1 className='font-bold text-2xl my-4'>ユーザー登録</h1>
      <SignUpForm />
      <Link href="/login" className="underline text-blue-500 cursor-pointer hover:text-blue-500/80">登録済みの方はこちら</Link>
    </div>
  )
}

export default SignUpPage