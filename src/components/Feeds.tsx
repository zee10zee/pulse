import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import FormattedDate from './FormattedDate'
import { ThumbsUp } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { clerkClient } from '@clerk/nextjs/server'
import { PostWithUser } from '@/lib/data/data'

//@ts-ignore
const Feeds = async ({posts} : {posts: PostWithUser[]}) => {

const postsWithClierUserDetails = await Promise.all(posts.map(async (post) => {
  const user = await clerkClient().then(client => client.users.getUser(post.ownerId))
  return {
    ...post,
    ownerName: user ? user.username : 'Unknown User',
    ownerImageUrl: user ? user.imageUrl : ''
  }
}))



  return (
    <div >
     
     {postsWithClierUserDetails.map(post => (      
       <Card key={post.id} className='flex flex-col w-full mb-5'>

          <CardHeader>
           <div className="title-owner flex flex-row items-center justify-between">
              <div className="title-date">
                <FormattedDate date={post.createdAt} />
              </div>

             <CardTitle className='flex flex-row gap-2 items-center'>
                 <Link href={`/profile/${post.ownerId}`} className='text-blue-500 font-bold'>
                  <Image width={40} height={100} src={post.ownerImageUrl} alt={post.ownerName}
                   className='rounded-full mr-2'
                  />
                  
                 </Link>
                 <ThumbsUp /> 
              </CardTitle>
           
           </div>
             <CardTitle className='flex flex-row gap-2 items-center font-bold'>{post.title} </CardTitle>

           {post.content.length > 150 ? (
            <CardDescription>
               {post.content.substring(0, 150) }
               <Link className='text-blue-500' href={`/post/${post.id}`}>See more</Link>
            </CardDescription> ) : 
            (<CardDescription>
               {post.content}
            </CardDescription>
            )}

          </CardHeader>
        </Card>
        )) }
    </div>
  )

}

export default Feeds