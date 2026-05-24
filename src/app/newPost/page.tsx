"use client";

import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea';
import { createPost } from '@/src/db/actions/posts';
const NewPost = () => {
  return (
    <div className='min-w-screen px-4 py-2 mx-auto'>
      <h1 className='text-3xl font-bold'>
        Creat New Post 
      </h1>

     <form action={createPost} className='flex flex-col gap-4 min-w-[50%] mx-auto my-4'>
        <Input placeholder='Provide a Title' name="ptitle" className='border border-[#555]' />
        <Textarea placeholder='Provide a description' name="pcontent" className='border border-[#555]' />
        <Button type="submit" className='bg-green-800 w-fit '>Sumbit</Button>
      </form>

  </div>
  )
}

export default NewPost