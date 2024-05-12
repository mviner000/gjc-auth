

import Image from "next/image";

const Returning = () => {


    return (
        <>
       <div className="bg-rose-500 p-5 ">
            <div className="md:container"></div>
                <h1 className="font-bold px-2 xl:px-6 md:px-3">Returning <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-yellow-300 border border-yellow-300">
            New Feature
            </span></h1>
                <h1 className="p-1 xl:p-5 md:p-2 text-4xl md:text-5xl font-semibold mb-3">Returning now is easier</h1> 
            <div className="p-1 xl:p-5 md:p-2 md:gap-3  grid grid-cols-1 md:grid-cols-3">
            <div className="col-span-1">
    Find books quickly and easily with our new search box. Save time by using this tool to search for your favorite books faster. We&apos;ve made it simple to find what you&apos;re looking for, so you can spend more time reading and less time searching!
</div>

                <div className="col-span-2 w-full ">
                    <Image
                        src='https://i.imgur.com/erbrrIw.png'
                        alt="book_image"
                        width={1890}
                        height={1890}
                        className="mt-2 md:mt-[-10px]  xl:mt-[-50px] xl:p-10 2xl:mt-[-100px]"
                    />
                </div>
            </div>
        </div>
       </>
    )
}

export default Returning;