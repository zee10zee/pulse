import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { posts, users } from '@/lib/data/data'
import { ThumbsUp } from 'lucide-react'
import Link from 'next/dist/client/link'
// importing database actions // all posts and the users
import { getRecentPosts } from '@/src/db/actions/posts'
import { getAllUsers} from '@/src/db/actions/users'

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
      <h1 className='text-3xl font-bold'>Feeds</h1>
      {postswithUsers.map(post =>(
        <Card key={post.id} className='flex-col w-full '>
          <CardHeader>
           <div className="title-owner flex flex-row items-center justify-between">
            
            <div className="title-date">
             <CardTitle>{post.title}</CardTitle>
        <CardTitle className='text-sm font-thin'>{post.createdAt.toLocaleDateString({year: 'numeric', month: 'short', day: 'numeric' })}</CardTitle>
           </div>

             <CardTitle className='flex flex-row gap-2 items-center'>{post.ownerName} <ThumbsUp /> </CardTitle>
           
           </div>
            <CardDescription>
              {post.content}
              <Link href={`/post/${post.id}`} className='text-blue-400'>Read more</Link>
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
    </>
  )
}

export default Feeds