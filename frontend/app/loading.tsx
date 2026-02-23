import { Loader } from 'lucide-react'

const loading = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center bg-gray-50'>
      <div className='flex flex-col items-center gap-4'>
        <Loader className='animate-spin w-12 h-12 text-blue-500' style={{animationDuration: '2s'}}/>
        <p className='animate-pulse'>loading...</p>
      </div>
    </div>
  )
}

export default loading