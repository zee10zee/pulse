import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import FormattedDate from './FormattedDate'
import { ThumbsUp } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { clerkClient } from '@clerk/nextjs/server'
import { Post } from '@/lib/data/data'
import HandleMedia from './HandleMedia'

//@ts-ignore
const Feeds = async ({posts} : {posts: Post[]}) => {

const postsWithClierUserDetails = await Promise.all(posts.map(async (post) => {
  const user = await clerkClient().then(client => client.users.getUser(post.ownerId))
  return {
    ...post,
    ownerName: user ? user.username : 'Unknown User',
    ownerImageUrl: user ? user.imageUrl : ''
  }
}))

const IsImage = (postsWithClierUserDetails.some(post => post.mediaFile?.endsWith('.jpg') || post.mediaFile?.endsWith('.png') || post.mediaFile?.endsWith('.jpeg')))





  return (
    <div>
     
     {postsWithClierUserDetails.map(post => (    
       <Card key={post.id} className='flex flex-col w-full mb-5'>

          <CardHeader>
           <div className="title-owner flex flex-row items-center justify-between">
              <div className="title-date">
                <FormattedDate date={post.createdAt} />
              </div>

             <CardTitle className='flex flex-row gap-2 items-center'>
                 <Link href={`/profile/${post.ownerId}`} className='text-blue-500 font-bold'>
                  <Image width={40} height={100} src={post.ownerImageUrl} alt='user name' 
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

            {post.mediaFile && (

               <HandleMedia mediaFile={post.mediaFile} />
             
            )}


          </CardHeader>
        </Card>
        )) }
    </div>
  )

}

export default Feeds