import React from 'react'
import { UserAvatar, UserProfile } from '@clerk/nextjs'
  import { currentUser } from '@clerk/nextjs/server'
const Profile = async() => {

  const user = await currentUser();

  return (
    <div className='min-w-[50%] mx-auto'>
     <UserProfile />
    </div>
  )
}

export default Profile