
import Image from 'next/image'
import React from 'react'

const FavouriteImage = () => {

const favImage = 'https://images.pexels.com/photos/37547656/pexels-photo-37547656/free-photo-of-emotionales-portrat-zweier-frauen-in-schwarzweiss.jpeg?auto=compress&cs=tinysrgb&w=600&loading=lazy'

  return (
    <div className="imageContainer  w-[170px] h-64 flex flex-row items-center justify-center gap-10">
        <Image src={favImage} className='rounded-lg rotate-[-90deg]' alt='my favourite image' width={500} height={500}/>
    </div>
  )
}

export default FavouriteImage