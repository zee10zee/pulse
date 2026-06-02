"use client";

import React, { useActionState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea';
import { createPost } from '@/src/db/actions/posts';
const NewPost = () => {

  const [state, formAction, isPending] = useActionState(createPost, null);
  return (
    <div className='w-screen md:w-[80%] lg:w-[50%]  px-4 py-2 mx-auto mt-15'>
      <h1 className='text-3xl font-bold'>
        Creat New Post 
      </h1>

     <form action={formAction} className='flex flex-col gap-4 min-w-[50%] mx-auto my-4'>
        <Input placeholder='Provide a Title' name="ptitle" className='border border-[#555]' />
        <Textarea placeholder='Provide a description' name="pcontent" className='border border-[#555]' />
        <Button type="submit" className='bg-green-800 w-fit ' disabled={isPending}>
          {isPending ? 'Submitting...' : 'Submit'}
        </Button>
      </form>

  </div>
  )
}

export default NewPost