import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import { MdAddCircle } from 'react-icons/md';

import useCurrentUser from '@/hooks/useCurrentUser';
import ProfileCard from '@/components/ProfileCard';

export async function getServerSideProps(context: NextPageContext) {

  const session = await getSession(context);

  if(!session){
    return{
      redirect:{
        destination:'/auth',
        permanent : false,
      }
    }
  }

  return{
    props: {}
  }
  
}


export default function Profiles() {
  const { data: user } = useCurrentUser();

  return (
    <div className='flex items-center h-full justify-center'>
      <div className='flex flex-col'>
        <h1 className='text-3xl md:text-6xl text-white text-center'>Who's watching?</h1>
        <div className='flex items-center justify-center gap-8 mt-10'>
          
          <ProfileCard username={user?.name} imgUrl="/images/default-blue.png"/>
          {/* Dummy Users */}
          <ProfileCard username="User 1"  imgUrl="/images/default-green.png"/>
          <ProfileCard username="User 2"  imgUrl="/images/default-red.png"/>
          <ProfileCard username="Kids"  imgUrl="/images/kids.webp"/>


        <div >
            <div className='group flex-row w-40 mx-auto'>
              <div className='w-40 h-40 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:bg-white overflow-hidden'>
                  <MdAddCircle size={130} className='text-gray-400'/>
              </div>

              <div className='mt-4 text-gray-400 text-2xl text-center group-hover:text-white'>
                Add Profile
              </div>
            </div>
        </div>

        </div>
      </div>
    </div>
  )
}
