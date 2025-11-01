import React from 'react'
import { signOut } from 'next-auth/react'
import { FaPencil } from 'react-icons/fa6';
import { BiTransferAlt } from 'react-icons/bi';
import { FaRegUser } from 'react-icons/fa6';
import { LuCircleHelp } from 'react-icons/lu';


import useCurrentUser from '@/hooks/useCurrentUser';

interface AccountMenuProps{
    visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> =  ({ visible }) => {

     const { data: user } = useCurrentUser();
    if(!visible) return null;

    return (
        <div className='bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex'>
            <div className='flex flex-col gap-3'>
                <div className='px-3 group/item flex flex-row gap-3 items-center w-full'>
                    <img className='w-8 rounded-md' src="/images/default-blue.png" alt="profiles" />
                    <p className='text-white text-sm group-hover/item:underline'>
                        {user?.name}
                    </p>
                </div>
                <div className='px-3 group/item flex flex-row gap-3 items-center w-full'>
                    <img className='w-8 rounded-md' src="/images/default-green.png" alt="profiles" />
                    <p className='text-white text-sm group-hover/item:underline'>
                        User 2
                    </p>
                </div>
                <div className='px-3 group/item flex flex-row gap-3 items-center w-full'>
                    <img className='w-8 rounded-md' src="/images/default-red.png" alt="profiles" />
                    <p className='text-white text-sm group-hover/item:underline'>
                        User 3
                    </p>
                </div>
                <div className='px-3 group/item flex flex-row gap-3 items-center w-full'>
                    <img className='w-8 rounded-md' src="/images/default-slate.png" alt="profiles" />
                    <p className='text-white text-sm group-hover/item:underline'>
                        Kids
                    </p>
                </div>
                <div className='px-3 group/item flex flex-row gap-3 items-center w-full'>
                    <FaPencil className='text-white w-8' size={25} />
                    <p className='text-white text-sm group-hover/item:underline'>
                        Manage Profiles
                    </p>
                </div>
                <div className='px-3 group/item flex flex-row gap-3 items-center w-full'>
                    <BiTransferAlt className='text-white w-8' size={35} />
                    <p className='text-white text-sm group-hover/item:underline'>
                        Transfer Profile
                    </p>
                </div>
                <div className='px-3 group/item flex flex-row gap-3 items-center w-full'>
                    <FaRegUser className='text-white w-8' size={25} />
                    <p className='text-white text-sm group-hover/item:underline'>
                        Account
                    </p>
                </div>
                <div className='px-3 group/item flex flex-row gap-3 items-center w-full'>
                    <LuCircleHelp className='text-white w-8' size={30} />
                    <p className='text-white text-sm group-hover/item:underline'>
                        Help Center
                    </p>
                </div>




                <hr className='bg-gray-600 border-0 h-px my-2 mb-1' />
                <div onClick={() => signOut()} className='text-center text-white text-md hover:underline'>
                    Sign out of Netflix
                </div>
            </div>
        </div>
    )
}

export default AccountMenu