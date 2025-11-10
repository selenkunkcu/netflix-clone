import React from 'react'
import { useRouter } from 'next/router';


interface ProfileCardProps {
    username: string;
    imgUrl: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ username, imgUrl }) => {

      const router = useRouter();

    return (
            <div className='group flex flex-col items-center' onClick={() => router.push('/')}>
              
              <div className='rounded-md flex items-center justify-center border-2 border-transparent overflow-hidden group-hover:cursor-pointer group-hover:border-white w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40'>
                <img src={imgUrl} alt="Profile" className="w-full h-full object-cover"/>
              </div>

              <div className='mt-4 sm:mt-3 text-gray-400 text-xs sm:text-sm md:text-base lg:text-2xl text-center group-hover:text-white'>
                {username}
              </div>

            </div>
    )
}

export default ProfileCard