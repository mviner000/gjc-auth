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
import { Button } from '@/components/ui/button'
import Link from 'next/link'

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
                                                    <div className="w-full grid grid-cols-1 space-y-2 md:space-y-2 md:grid-cols-1 lg:space-y-2 lg:grid-cols-1 xl:grid-cols-2  items-center gap-x-2">

                                                        <Link href="https://facebook.com/mviner000">
                                                            <Button
                                                                size="lg"
                                                                className="w-full bg-gradient-to-r from-purple-500 to-neutral-950 hover:bg-gradient-to-l text-white outline-2 shadow-md outline-black"
                                                                variant="outline"
                                                            >
                                                                Github
                                                            </Button>
                                                        </Link>
                                                        <Link href="https://github.com/mviner000">
                                                            <Button
                                                                size="lg"
                                                                className="w-full bg-gradient-to-l from-blue-500 to-neutral-950 hover:bg-gradient-to-r text-white outline-2 shadow-md outline-black"
                                                                variant="outline"
                                                            >
                                                                Facebook
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>



                                            <div className="bg-white shadow-md rounded-lg overflow-hidden p-[3px]">
                                                <div className="aspect-w-16 aspect-h-9">
                                                    <img src="https://i.imgur.com/YtxdFt4.jpg" alt="Jethro Mabeza" className="transition duration-300 ease-in-out hover:scale-110 object-cover w-full h-full" />
                                                </div>
                                                <div className="p-4 text-center text-white bg-teal-500">
                                                    <p className="text-lg font-bold">Jethro Mabeza</p>
                                                    <div className="w-full grid grid-cols-1 space-y-2 md:space-y-2 md:grid-cols-1 lg:space-y-2 lg:grid-cols-1 xl:grid-cols-2  items-center gap-x-2">

                                                        <Link href="https://github.com/j3thzki">
                                                            <Button
                                                                size="lg"
                                                                className="w-full bg-gradient-to-r from-purple-500 to-neutral-950 hover:bg-gradient-to-l text-white outline-2 shadow-md outline-black"
                                                                variant="outline"
                                                            >
                                                                Github
                                                            </Button>
                                                        </Link>
                                                        <Link href="https://facebook.com/jethromabeza">
                                                            <Button
                                                                size="lg"
                                                                className="w-full bg-gradient-to-l from-blue-500 to-neutral-950 hover:bg-gradient-to-r text-white outline-2 shadow-md outline-black"
                                                                variant="outline"
                                                            >
                                                                Facebook
                                                            </Button>
                                                        </Link>

                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-white shadow-md rounded-lg overflow-hidden p-[3px]">
                                                <div className="aspect-w-16 aspect-h-9">
                                                    <img src="https://i.imgur.com/yB3fdBK.jpg" alt="Janzen De Asis" className="transition duration-300 ease-in-out hover:scale-110 object-cover w-full h-full" />
                                                </div>
                                                <div className="p-4 text-center text-white bg-teal-500">
                                                    <p className="text-lg font-bold">Janzen De Asis</p>
                                                    <div className="w-full grid grid-cols-1 space-y-2 md:space-y-2 md:grid-cols-1 lg:space-y-2 lg:grid-cols-1 xl:grid-cols-2  items-center gap-x-2">
                                                        <Link href="https://github.com/paizen">
                                                            <Button
                                                                size="lg"
                                                                className="w-full bg-gradient-to-r from-purple-500 to-neutral-950 hover:bg-gradient-to-l text-white outline-2 shadow-md outline-black"
                                                                variant="outline"
                                                            >
                                                                Github
                                                            </Button>
                                                        </Link>
                                                        <Link href="https://facebook.com/zen.ponce.de.asis">
                                                            <Button
                                                                size="lg"
                                                                className="w-full bg-gradient-to-l from-blue-500 to-neutral-950 hover:bg-gradient-to-r text-white outline-2 shadow-md outline-black"
                                                                variant="outline"
                                                            >
                                                                Facebook
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-white shadow-md rounded-lg overflow-hidden p-[3px]">
                                                <div className="aspect-w-16 aspect-h-9">
                                                    <img src="https://i.imgur.com/L4tIPCd.jpg" alt="Jonn Esternon" className="transition duration-300 ease-in-out hover:scale-110 object-cover w-full h-full" />
                                                </div>
                                                <div className="p-4 text-center text-white bg-teal-500">
                                                    <p className="text-lg font-bold">Jonn Esternon</p>
                                                    <div className="w-full grid grid-cols-1 space-y-2 md:space-y-2 md:grid-cols-1 lg:space-y-2 lg:grid-cols-1 xl:grid-cols-2  items-center gap-x-2">

                                                        <Link href="https://github.com/esternonjonn">
                                                            <Button
                                                                size="lg"
                                                                className="w-full bg-gradient-to-r from-purple-500 to-neutral-950 hover:bg-gradient-to-l text-white outline-2 shadow-md outline-black"
                                                                variant="outline"
                                                            >
                                                                Github
                                                            </Button>
                                                        </Link>
                                                        <Link href="https://facebook.com/jonn.esternon">
                                                            <Button
                                                                size="lg"
                                                                className="w-full bg-gradient-to-l from-blue-500 to-neutral-950 hover:bg-gradient-to-r text-white outline-2 shadow-md outline-black"
                                                                variant="outline"
                                                            >
                                                                Facebook
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-white shadow-md rounded-lg overflow-hidden p-[3px]">
                                                <div className="aspect-w-16 aspect-h-9">
                                                    <img src="https://i.imgur.com/YusSTZt.jpg" alt="John Miguel Macabagdal" className="transition duration-300 ease-in-out hover:scale-110 object-cover w-full h-full" />
                                                </div>
                                                <div className="p-4 text-center text-white bg-teal-500">
                                                    <p className="text-lg font-bold mx-[0px] md:mx-[0px] lg:mx-[-30px]">Miguel Macabagdal</p>
                                                    <div className="w-full grid grid-cols-1 space-y-2 md:space-y-2 md:grid-cols-1 lg:space-y-2 lg:grid-cols-1 xl:grid-cols-2  items-center gap-x-2">

                                                        <Link href="https://github.com/">
                                                            <Button
                                                                size="lg"
                                                                className="w-full bg-gradient-to-r from-purple-500 to-neutral-950 hover:bg-gradient-to-l text-white outline-2 shadow-md outline-black"
                                                                variant="outline"
                                                            >
                                                                Github
                                                            </Button>
                                                        </Link>
                                                        <Link href="https://facebook.com/miguel.macabagdal">
                                                            <Button
                                                                size="lg"
                                                                className="w-full bg-gradient-to-l from-blue-500 to-neutral-950 hover:bg-gradient-to-r text-white outline-2 shadow-md outline-black"
                                                                variant="outline"
                                                            >
                                                                Facebook
                                                            </Button>
                                                        </Link>
                                                    </div>
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