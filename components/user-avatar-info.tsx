"use client";


import { useCurrentUser } from '@/hooks/use-current-user';
import Image from 'next/image';
import { useState } from 'react';


interface User {
    email: string;
    studentId: number;
    image: string | null;
}

const UserAvatarInfo = () => {

    const user = useCurrentUser();
    const [selectedBooks, setSelectedBooks] = useState<number[]>([]);

    const defaultStudent = user?.email;
    const IMAGES = [
        "https://i.imgur.com/6hbUxqX.jpg",
        "https://i.imgur.com/whmZ1n6.jpg",
        "https://i.imgur.com/sDD32EB.jpg",
        "https://i.imgur.com/gvZLp1w.jpg",
        "https://i.imgur.com/nFOKKTS.jpg",
    ];


    const defaultImage = `https://res.cloudinary.com/dqpzvvd0v/image/upload/fl_preserve_transparency/v1715859935/user-avatar_jyav0n.jpg?_s=public-apps`;




    return (
        <>
            <div className='grid grid-cols-7 mt-5'>
                <div className='col-span-1'>
                    <Image
                        width={168}
                        height={168}
                        src={user?.image || defaultImage} // If user?.image is null or undefined, defaultImage will be used
                        className='rounded-full'
                        alt="student"
                    />
                </div>
                <div className='h-full content-center col-span-6'>
                    <ul>
                        <li>
                            {user?.studentId}
                        </li>
                        <li>
                            {user?.email}
                        </li>
                        <li>
                            5 Books read
                        </li>

                        <li>
                            <div className='flex'>
                                {IMAGES.map((src, index) => (
                                    <Image
                                        key={index}
                                        className={`rounded-full h-10 w-10 ${index === 0 ? 'ml-0' : 'ml-[-5px]'}`}
                                        alt='book_images'
                                        width={20}
                                        height={20}
                                        src={src} />
                                ))}
                            </div>
                        </li>

                    </ul>


                </div>
            </div>
        </>
    )
}

export default UserAvatarInfo;