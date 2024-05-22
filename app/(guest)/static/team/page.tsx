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
import TeamCard from './team-card'

const myFont = localFont({ src: '../../../../app/fonts/MonotypeOldEnglish.woff2' })

export const metadata: Metadata = {
    title: "GJCLibrary - Team",
    description: "The Team behind the GJCLibrary website",
}

const cld = new Cloudinary({ cloud: { cloudName: 'dqpzvvd0v' } });
const TeamPage = () => {

    return (
        <>

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
                            <TeamCard />
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

        </>
    )
}

export default TeamPage