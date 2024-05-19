import { Metadata } from 'next'
import React from 'react'
import { Social } from './social'
import Footer from '@/components/footer'

import { cn } from "@/lib/utils"

import localFont from 'next/font/local'

import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import TechImages from './tech-images'
import { StaticSidebar } from '@/components/static-sidebar'

const myFont = localFont({ src: '../../../../app/fonts/MonotypeOldEnglish.woff2' })

export const metadata: Metadata = {
    title: "GJCLibrary - Team",
    description: "The Team behind the GJCLibrary website",
}

const cld = new Cloudinary({ cloud: { cloudName: 'dqpzvvd0v' } });
const TeamPage = () => {

    return (
        <>
            <div className="">

                <div className="text-black dark:text-white text-center">
                    <div className="grid lg:grid-cols-5 ">
                        <StaticSidebar className="hidden lg:block" />

                        <div className="col-span-3 lg:col-span-4 lg:border-l p-10">
                            <div>
                                <div className="">
                                    <div className="text-white text-center">
                                        <div className='flex justify-center'>
                                            <div className='absolute'>
                                                <h1 className={cn("bg-gradient-to-r from-neutral-800  to-neutral-950 bg-clip-text text-transparent animate-gradient font-bold dark:bg-gradient-to-r dark:from-blue-500  dark:to-rose-500 dark:text-transparent dark:bg-clip-text dark:animate-gradient text-4xl ml-[-3px]", myFont.className)}>
                                                    Meet Our Team
                                                </h1>
                                            </div>

                                            <div className='relative'>
                                                <h1 className={cn("bg-gradient-to-r from-cyan-500 to-emerald-500 bg-clip-text text-transparent animate-gradient font-bold dark:bg-gradient-to-r dark:from-yellow-300  dark:to-emerald-500 dark:text-transparent dark:bg-clip-text dark:animate-gradient text-4xl", myFont.className)}>
                                                    Meet Our Team
                                                </h1>
                                            </div>
                                        </div>
                                        <div className="p-4 grid xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 md:gap-4 xs:gap-3 gap-4 ">
                                            <div className="bg-white shadow-md rounded-lg overflow-hidden p-[3px]">
                                                <div className="aspect-w-16 aspect-h-9">
                                                    <img src="https://i.imgur.com/s3MQXGV.jpg" alt="Melvin Nogoy" className="transition duration-300 ease-in-out hover:scale-110 object-cover w-full h-full" />
                                                </div>
                                                <div className="p-4 text-center text-white bg-teal-500">
                                                    <p className="text-lg font-bold">Melvin E. Nogoy</p>

                                                    <Social />
                                                </div>
                                            </div>



                                            <div className="bg-white shadow-md rounded-lg overflow-hidden p-[3px]">
                                                <div className="aspect-w-16 aspect-h-9">
                                                    <img src="https://i.imgur.com/YtxdFt4.jpg" alt="Jethro Mabeza" className="transition duration-300 ease-in-out hover:scale-110 object-cover w-full h-full" />
                                                </div>
                                                <div className="p-4 text-center text-white bg-teal-500">
                                                    <p className="text-lg font-bold">Jethro Mabeza</p>
                                                    <Social />
                                                </div>
                                            </div>

                                            <div className="bg-white shadow-md rounded-lg overflow-hidden p-[3px]">
                                                <div className="aspect-w-16 aspect-h-9">
                                                    <img src="https://i.imgur.com/yB3fdBK.jpg" alt="Janzen De Asis" className="transition duration-300 ease-in-out hover:scale-110 object-cover w-full h-full" />
                                                </div>
                                                <div className="p-4 text-center text-white bg-teal-500">
                                                    <p className="text-lg font-bold">Janzen De Asis</p>
                                                    <Social />
                                                </div>
                                            </div>

                                            <div className="bg-white shadow-md rounded-lg overflow-hidden p-[3px]">
                                                <div className="aspect-w-16 aspect-h-9">
                                                    <img src="https://i.imgur.com/L4tIPCd.jpg" alt="Jonn Esternon" className="transition duration-300 ease-in-out hover:scale-110 object-cover w-full h-full" />
                                                </div>
                                                <div className="p-4 text-center text-white bg-teal-500">
                                                    <p className="text-lg font-bold">Jonn Esternon</p>
                                                    <Social />
                                                </div>
                                            </div>

                                            <div className="bg-white shadow-md rounded-lg overflow-hidden p-[3px]">
                                                <div className="aspect-w-16 aspect-h-9">
                                                    <img src="https://i.imgur.com/YusSTZt.jpg" alt="John Miguel Macabagdal" className="transition duration-300 ease-in-out hover:scale-110 object-cover w-full h-full" />
                                                </div>
                                                <div className="p-4 text-center text-white bg-teal-500">
                                                    <p className="text-lg font-bold mx-[0px] md:mx-[0px] lg:mx-[-30px]">Miguel Macabagdal</p>
                                                    <Social />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='hidden md:block'>
                                        <div className='flex justify-center mt-5 '>
                                            <div className='absolute'>
                                                <h1 className="bg-gradient-to-r from-neutral-800  to-neutral-950 bg-clip-text text-transparent animate-gradient font-bold dark:bg-gradient-to-r dark:from-blue-500  dark:to-rose-500 dark:text-transparent dark:bg-clip-text dark:animate-gradient text-4xl ml-[-3px]">
                                                    Tech Stack Used
                                                </h1>
                                            </div>

                                            <div className='relative'>
                                                <h1 className="bg-gradient-to-r from-cyan-500 to-emerald-500 bg-clip-text text-transparent animate-gradient font-bold dark:bg-gradient-to-r dark:from-yellow-300  dark:to-emerald-500 dark:text-transparent dark:bg-clip-text dark:animate-gradient text-4xl">
                                                    Tech Stack Used
                                                </h1>
                                            </div>

                                        </div>
                                        <div className='text-center justify-center'>
                                            <TechImages />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default TeamPage