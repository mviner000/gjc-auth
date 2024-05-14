"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";
import { useCurrentUser } from "@/hooks/use-current-user";

type Role = "USER" | "ADMIN";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    
    const [userRole, setUserRole] = useState<Role>(); 
    const user = useCurrentUser();

    useEffect(() => {
        // Update isLoggedIn and userRole when user state changes
        setIsLoggedIn(!!user); // Set isLoggedIn to true if user exists, false otherwise
        setUserRole(user?.role as Role); // Set userRole to the user's role if user exists
    }, [user]);
    

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
      <li className="mr-6 mt-[7px] dark:text-white">
        <Link className="hover:text-blue-500" href="/books">GJCLibrary</Link>
      </li>
      {userRole === 'ADMIN' ? (
        <>
          <li className="mr-6 mt-[7px] dark:text-white">
            <Link className="hover:text-blue-500" href="/admin/accept/borrow">Admin</Link>
          </li>
          <li className="mr-6 mt-[7px] dark:text-white">
            <Link className="hover:text-blue-500" href="/dashboard">Dashboard</Link>
          </li>
          <li className="mr-6 mt-[7px] dark:text-white hidden md:block">
            <Link className="hover:text-blue-500" href="/books/table">
              <Button
                variant="ghost"
                className="mr-10 mt-[-2rem] text-white outline outline-[1px] outline-emerald-500"
              >
                Books
              </Button>
            </Link>
          </li>
        </>
      ) : (
        <li className="mr-6 mt-[7px] dark:text-white">
          <Link className="hover:text-blue-500" href="/books">Books</Link>
        </li>
      )}
    </ul>
                <div className="mt-2 gap-3 flex ">
                    {isLoggedIn ? (
                            <div className="flex gap-3 mt-1">
                                <Link className="hover:text-blue-500  text-white"  href="/settings">Settings</Link>
                                <div className="mt-[-8px] mr-10">
                                    <UserButton />
                                </div>
                            </div>
                            ) : (
                                <>
                                <Link href="auth/login">
                                    <Button 
                                        variant="ghost" 
                                        className="mr-10 mt-[-2rem] text-white outline outline-[1px] outline-emerald-500"
                                    >
                                        Sign In
                                    </Button>
                                </Link>
                                </>
                            )}
                </div>
            </div>
        </div>
    </header>
    )
}

export default Navbar;