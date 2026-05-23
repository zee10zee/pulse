
'use client';

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
const Showcase = () => {

  const router = useRouter()
  return (
    <div className='w-[50%] mx-auto flex flex-col items-center justify-center h-100 
  '>

      <h1 className='text-4xl font-bold font-mono text-blue-400'>Pulse</h1>
      <p className='mt-3 text-2xl '>LET the World know your pulses !</p>
      <Button onClick={() => router.push('/sign-up')}>
        Get started !
      </Button>
      {/* <Link className=' mt-3 text-2xl bg-amber-200 p-2 rounded-sm  ' href='/sign-up'>Get started</Link> */}
    </div>
  )
}

export default Showcase