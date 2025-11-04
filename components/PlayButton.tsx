import React from 'react'
import { useRouter } from 'next/navigation';
import { BsFillPlayFill } from 'react-icons/bs';

interface PlayButtonProps {
    movieId: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {

    const router = useRouter();

    return (
        <button className='bg-white rounded-md py-1 px-3 md:px-7 w-auto h-6 md:h-10 lg:h-14 text-xs lg:text-2xl font-semibold flex flex-row items-center hover:bg-neutral-300 transition'
        onClick={() => router.push(`/watch/${movieId}`)}>
            <BsFillPlayFill className="w-6 h-6 md:w-14 md:h-14" />
            
            <p className='leading-[2.4rem]'>Play</p>

        </button>
    )
}

export default PlayButton