'use client'
import { getMyInfomation } from '@/actions/getMyInfomation'
import { useQuery } from '@tanstack/react-query'

export const UserInfo = () => {
  const { data:user, isPending, isError } = useQuery({
    queryKey: ['user'],
    queryFn: getMyInfomation,
  })

  if (isPending || isError)return null 

  return (
    <div className='w-full h-20 border rounded-md'>
      <p>id:{user?.id}</p>
      <p>name:{user?.name}</p>
    </div>
  )
}