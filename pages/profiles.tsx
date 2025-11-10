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
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center">
        
        <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white text-center">
          Who's watching?
        </h1>

        <div className=" mt-10 mb-10 flex flex-wrap items-center justify-center gap-6 sm:gap-8 " >

          <ProfileCard username={user?.name ?? 'Profile'} imgUrl="/images/default-blue.png" />
          {/* Dummy Users */}
          <ProfileCard username="User 1" imgUrl="/images/default-green.png" />
          <ProfileCard username="User 2" imgUrl="/images/default-red.png" />
          <ProfileCard username="Kids" imgUrl="/images/kids.webp" />

          <div className="w-full sm:w-auto flex justify-center">
            <div className="group flex flex-col items-center">
              <div className=" rounded-md flex items-center justify-center border-2 border-transparent overflow-hidden group-hover:cursor-pointer group-hover:bg-white w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 ">
                <MdAddCircle className="text-gray-400" size={120} />
              </div>
              <div className=" mt-2 sm:mt-3 text-xs sm:text-sm md:text-base lg:text-xl text-gray-400 text-center group-hover:text-white">
                Add Profile
              </div>
            </div>
          </div>

        </div>

        <div className=" mt-4 sm:mt-8 mx-auto w-fit px-4 sm:px-8 py-2 text-sm sm:text-base md:text-xl text-gray-400 text-center border-2 border-gray-400 cursor-pointer hover:text-white hover:border-white " >
          Manage Profiles
        </div>

      </div>
    </div>
  );
}