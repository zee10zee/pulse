
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import FormattedDate from '@/src/components/FormattedDate';
import NavigationButton from '@/src/components/NavigationButton';
import { getPostDetails} from '@/src/db/actions/posts';
import { MoveRight, PlusIcon, ThumbsUp } from 'lucide-react';


const PostDetails = async({params} : {params: Promise<{ id: string }>; }) => {
  const {id} = await params
  const clickedPost = await getPostDetails(id)

  return (
    <div className="w-screen md:w-[80%] lg:w-[60%]  px-4 py-2 mx-auto mt-15 my-20">
      <div className=' border border-pink-200 rounded-sm relative p-5'>

          <div className='flex flex-row items-center justify-between'>           
            <div className="title-date">
             <CardTitle className='font-bold'>{clickedPost.title}</CardTitle>
           </div>

             <CardTitle className='flex flex-row gap-2 items-center'>
              <NavigationButton destination={`/profile/${clickedPost.ownerId}`} label={`${clickedPost.ownerName}`} icon = {<ThumbsUp />} />  
              </CardTitle>
           </div>

           <FormattedDate date={clickedPost.createdAt} />
       
           <CardDescription className='text-[16px]'>{clickedPost.content}</CardDescription>
     
      <div className="backButton py-5">
        <NavigationButton  label={''} icon={<MoveRight />} />
      </div>
    </div>
    </div>
    
  )
}

export default PostDetails