import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";

const Navbar = () => {
    return (
        <header className=" text-white py-4 md:pl-16 pl-5 pr-8 w-full z-10 border-b border-neutral-400 bg-emerald-800 ">
            
        <div className="md:mx-10">
            <div className="flex items-center justify-between text-white">
                {/* <h1 className="hidden md:block text-xl font-semibold">Home</h1> */}
                <ul className="flex">
                    <li className="mr-1">
                    <Link className="hover:text-blue-500" href="#">
                        <Image 
                        width={38}
                        height={38}
                        src="https://i.imgur.com/yyuB3s5.png" 
                        alt="General De Jesus Logo"
                        /> 
                        </Link>
                    </li>
                    <li className="mr-6 mt-[7px] dark:text-white ">
                        <Link className="hover:text-blue-500" href="#">GJCLibrary</Link>
                    </li>
                    
                    <li className="mr-6 mt-[7px] dark:text-white hidden md:block">
                        <Link className="hover:text-blue-500" href="/about">About</Link>
                    </li>
                    
                    <li className="mr-6 mt-[7px] dark:text-white hidden md:block">
                        <Link className="hover:text-blue-500" href="/team">Team</Link>
                    </li>
                    
                    <li className="mr-6 mt-[7px] dark:text-white hidden md:block">
                        <Link className="hover:text-blue-500" href="/contacts">Contacts</Link>
                    </li>
                    
                </ul> 
                <div className="mt-2 gap-3 flex ">
                <div className="mt-[-8px]">
                <UserButton />
                </div>
                <Link className="hover:text-blue-500  text-white"  href="/settings">Settings</Link>
                <Link href="/login">
                    <Button variant="ghost" className="mr-10 mt-[-2rem] text-white outline outline-[1px] outline-emerald-500">Sign In</Button>
                </Link>
                </div>
            </div>
        </div>
        </header>
    )
}

export default Navbar;