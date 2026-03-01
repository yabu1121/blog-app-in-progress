import { createSignUp } from "@/actions/createSignup"

export const SignUpForm = () => (
  <form action={createSignUp} className="space-y-2">
    <div className='flex items-center w-[80%] justify-between gap-4'>
      <label className="w-30" htmlFor="name">名前</label>
      <input id='name' name="name" type="text" className='border px-2 w-full'/>
    </div>
    <div className='flex items-center w-[80%] justify-between gap-4'>
      <label className="w-30" htmlFor="email">メールアドレス</label>
      <input id='email' name="email" type="email" className='border w-full px-2'/>
    </div>
    <div className='flex items-center w-[80%] justify-between gap-4'>
      <label className="w-30" htmlFor="password">パスワード</label>
      <input id='password' name="password" type="password" className='border w-full px-2'/>
    </div>
    <button type='submit' className='bg-blue-500 text-white w-20 h-10 rounded cursor-pointer'>登録</button>
  </form>
)
