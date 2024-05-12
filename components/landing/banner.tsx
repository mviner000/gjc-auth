import { cn } from "@/lib/utils";
import { BookImage, BookOpenText, LibraryBig, PenTool, Sailboat } from "lucide-react";



const Banner = () => {
    return (
    <>
    <div className="p-5 md:mx-36 md:pt-20">
        <div >
            <h1 className="text-3xl font-semibold md:text-5xl ">
                    <div className="inline-block">
                    <span className="inline-block">How you</span>
                    <span className="font-bold text-yellow-500 inline-block ml-2">
                        learn<BookImage size={40} className="inline-block ml-[2px] mt-[-5px] text-yellow-500" />
                    </span>
                    <span className="inline-block font-bold text-yellow-500">,&nbsp;</span>
                    <span className="inline-block font-bold text-purple-500">explore </span>
                    <Sailboat size={40} className="inline-block mt-[-10px] ml-1 mr-2 text-purple-500" />
                    <span>and </span>
                    <span className="inline-block font-bold text-emerald-500 emerald:text-white"> research </span>
                    <LibraryBig size={40} className="inline-block mt-[-5px] ml-1 mr-2 text-emerald-500" />
                    <span>matters.</span>
                    <span className=""> Do it together with </span>
                    <span className="
                        bg-gradient-to-r from-cyan-500 to-emerald-500 bg-clip-text text-transparent animate-gradient
                        font-bold 
                        dark:bg-gradient-to-r dark:from-yellow-300  dark:to-emerald-500 dark:text-transparent dark:bg-clip-text dark:animate-gradient">
                        General De Jesus.
                    </span>
                </div> 
            </h1>
        </div>
    </div>
    </>
    )
}

export default Banner;