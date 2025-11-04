import React from 'react'
import { useRouter } from 'next/router';


interface ProfileCardProps {
    username: string;
    imgUrl: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ username, imgUrl }) => {

      const router = useRouter();

    return (
        <div onClick={() => router.push('/')}>
            <div className='group flex-row w-40 mx-auto'>
              
              <div className='w-40 h-40 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden'>
                <img src={imgUrl} alt="Profile" className="w-full h-full object-cover"/>
              </div>

              <div className='mt-4 text-gray-400 text-2xl text-center group-hover:text-white'>
                {username}
              </div>

            </div>
        </div>
    )
}

export default ProfileCard