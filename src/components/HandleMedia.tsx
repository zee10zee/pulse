import React from 'react'

const HandleMedia = ({ mediaFile }: { mediaFile: string }) => {

 if(mediaFile.endsWith('.jpg') || mediaFile.endsWith('.png') || mediaFile.endsWith('.jpeg')) {
  return (
    <img src={mediaFile} alt="Post media" className='mt-4 rounded-md' width={500} height={300} />
  )
 }
  return (
       <video width="500" height="40" controls className='mt-4 rounded-md'> 
         <source src={mediaFile} type="video/mp4" />
       </video>
  )
}

export default HandleMedia