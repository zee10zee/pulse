
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import FormattedDate from '@/src/components/FormattedDate';
import NavigationButton from '@/src/components/NavigationButton';
import { getPostDetails} from '@/src/db/actions/posts';
import { MoveRight, ThumbsUp } from 'lucide-react';


const PostDetails = async({params} : {params: Promise<{ id: string }>; }) => {
  const {id} = await params
  const clickedPost = await getPostDetails(id)

  return (
    <div className='w-screen mx-auto lg:w-[60%] md:w-[80%] my-3 bg-pink-200 px-4 py-2 rounded-sm relative'>

          <div className='flex flex-row items-center justify-between'>           
            <div className="title-date">
             <CardTitle>{clickedPost.title}</CardTitle>
             <FormattedDate date={clickedPost.createdAt} />
           </div>

             <CardTitle className='flex flex-row gap-2 items-center'>{clickedPost.ownerName} <ThumbsUp /> </CardTitle>
           </div>
       
           <CardDescription className='text-[16px]'>{clickedPost.content}</CardDescription>
     
      <div className="backButton py-5">
        <NavigationButton  label={''} icon={<MoveRight />} />
      </div>
    </div>
  )
}

export default PostDetails