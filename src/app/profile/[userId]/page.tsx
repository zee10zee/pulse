import React from 'react'
import { clerkClient } from '@clerk/nextjs/server'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Feeds from '@/src/components/Feeds';
import { getUserPosts } from '@/src/db/actions/posts';

const PostOwnerProfile = async({params} : {params : Promise<{userId: string}>}) => {

  const { userId } = await params;
  const postOwner = await (await clerkClient()).users.getUser(userId)
  const userPosts = await getUserPosts(userId)
  

    return (
      <div className='px-4 my-10 w-screen  md:w-[80%] lg:w-[60%] mx-auto'>

          <div className='flex flex-col items-center gap-4 mb-5'>
            <Avatar className='w-24 h-24 mb-4'>
             <AvatarImage src={postOwner.imageUrl} />
             <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className='text-xl font-bold'>{postOwner.fullName}</h1>
          </div>

        <h1 className='text-2xl font-bold mx-auto mt-10'>{postOwner.fullName}'s Feeds</h1>          
        <Feeds posts = {userPosts} /> 

      </div>
    )

}

export default PostOwnerProfile