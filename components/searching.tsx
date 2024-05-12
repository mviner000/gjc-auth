"use client";

import Image from "next/image";
import { Button } from '@/components/ui/button';
import { useRouter } from "next/navigation";

const Searching = () => {
    const router = useRouter();

    const handleClick = () => router.push("/books")

    return (
        <>
        <div className="bg-purple-400 p-5 ">
            <div className="md:container"></div>
                <h1 className="font-bold px-2 xl:px-6 md:px-3">Exploring</h1>
                <h1 className="p-1 xl:p-5 md:p-2 text-4xl md:text-5xl font-semibold mb-3">Exploring now is easier</h1> 
            <div className="p-1 xl:p-5 md:p-2 md:gap-3  grid grid-cols-1 md:grid-cols-3">
                <div className="col-span-1">
                Find books quickly and easily with our new search box. Save time by using this tool to search for your favorite books faster. We&apos;ve made it simple to find what you&apos;re looking for, so you can spend more time reading and less time searching!
                    <Button onClick={handleClick} size="lg" className="text-white dark:text-black rounded-full mt-5 hidden md:block">Explore our books now</Button>
                </div>
                <div className="col-span-2 w-full ">
                    <Image
                        src='https://i.imgur.com/2Jq0ph0.png'
                        alt="book_image"
                        width={1890}
                        height={1890}
                        className="mt-2 md:mt-[-10px]  xl:mt-[-50px] xl:p-10 2xl:mt-[-100px]"
                    />
                </div>
            </div>
            <Button onClick={handleClick} size="lg" className="text-white dark:text-black rounded-full mt-5 md:hidden">Explore our books now</Button>
        </div>
       </>
    )
}

export default Searching;