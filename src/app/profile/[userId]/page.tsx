import React from 'react'
import { clerkClient } from '@clerk/nextjs/server'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const PostOwnerProfile = async({params} : {params : Promise<{userId: string}>}) => {

  const { userId } = await params;
  const postOwner = await (await clerkClient()).users.getUser(userId)

console.log('Post Owner ID:', userId);


    return (
      <div className='w-screen md:min-w-[50%] mx-auto'>
        <h1 className='text-3xl font-bold'>User Profile</h1>
        <Avatar>
            <AvatarImage src={postOwner.imageUrl} />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    )

}

export default PostOwnerProfile