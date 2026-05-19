"use client"; 
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { posts } from '@/lib/data/data';
import { MoveRight, ThumbsUp } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation'
import React from 'react'

const PostDetails = () => {
  const {id} = useParams()
  const router = useRouter()
  
  const clickedPost = posts.find(post => post.id === Number(id))

  return (
    <div className='w-[50%] mx-auto my-3 bg-pink-200 p-4 rounded-sm relative'>

          <div className='flex flex-row items-center justify-between'>           
            <div className="title-date">
             <CardTitle>{clickedPost.title}</CardTitle>
             <CardTitle className='text-sm font-thin'>{clickedPost.createdAt.toLocaleDateString({year: 'numeric', month: 'short', day: 'numeric' })}</CardTitle>
           </div>

             <CardTitle className='flex flex-row gap-2 items-center'>{'abed khan'} <ThumbsUp /> </CardTitle>
           
           </div>
       
           <CardDescription className='text-[16px]'>{clickedPost.content}</CardDescription>
     
     
      <div className="backButton py-5">
        <button onClick={() => router.push('/home')} 
      className='bg-blue-500 text-white p-1 rounded absolute bottom-1 right-4 flex items-center gap-1'>
            <MoveRight />
      </button>
      </div>
    </div>
  )
}

export default PostDetails