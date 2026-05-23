
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {PlusIcon, ThumbsUp } from 'lucide-react'
import Link from 'next/dist/client/link'
import { getRecentPosts } from '@/src/db/actions/posts'
import { getAllUsers} from '@/src/db/actions/users'
import FormattedDate from '@/src/components/FormattedDate'
import NavigationButton from '@/src/components/NavigationButton'

const Feeds = async () => {
const recentPosts = await getRecentPosts()
const users = await getAllUsers()

  const postswithUsers = recentPosts.map(post =>{
    const user = users.find(u => u.id === post.ownerId)
    return {...post, ownerName: user ? user.name : 'Unknown User'}
  })


    return( 
    <>
     <div className='flex-1  justify-center w-[50%] mx-auto my-3 flex-col gap-4'>
      <NavigationButton destination='/newPost' label='Add' icon = {<PlusIcon />} />

      <h1 className='text-3xl font-bold'>Feeds</h1>
      {postswithUsers.length > 0 ? postswithUsers.map(post =>(
        <Card key={post.id} className='flex flex-col w-full mb-5'>
          <CardHeader>
           <div className="title-owner flex flex-row items-center justify-between">
    
            <div className="title-date">
            <FormattedDate date={post.createdAt} />
           </div>

             <CardTitle className='flex flex-row gap-2 items-center'>{post.ownerName} <ThumbsUp /> </CardTitle>
           
           </div>
            <CardDescription>
              {post.content}
              <Link href={`/post/${post.id}`} className='text-blue-400'>Read more</Link>
            </CardDescription>
          </CardHeader>
        </Card>
      )) : 
      <h1>No posts yet create one now <Link href={'/newPost'} className='bg-blue-400 p-2 rounded-md'>Create post</Link> </h1>
      }
    </div>
    </>
  )
}

export default Feeds