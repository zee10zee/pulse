
import {Link, PlusIcon} from 'lucide-react'

import { getRecentPosts } from '@/src/db/actions/posts'
import { getAllUsers} from '@/src/db/actions/users'

import NavigationButton from '@/src/components/NavigationButton'
import Feeds from '../components/Feeds'

const Home = async () => {
const recentPosts = await getRecentPosts()
const users = await getAllUsers()

  const postswithUsers = recentPosts.map(post =>{
    const user = users.find(u => u.id === post.ownerId)
    return {...post, ownerName: user ? user.name : 'Unknown User'}
  })


    return( 
    <>
     <div className='my-3 px-4 flex-col gap-4 w-screen lg:w-[60%] md:w-[80%] mx-auto '>

      <div className="newBtnAndTitle my-3">
        <NavigationButton destination='/newPost' label='Add' icon = {<PlusIcon />} />
         <h1 className='text-3xl font-bold'>Feeds</h1>
      </div>
      
      {postswithUsers.length > 0 ? (
        <Feeds posts = {postswithUsers} />
      ) : (
        <h1>No posts yet. Create one now <Link href={'/newPost'} className='bg-blue-400 p-2 rounded-md'>Create post</Link> </h1>
      )}
    </div>
    </>
  )
}

export default Home