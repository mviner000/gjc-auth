"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";
import { useCurrentUser } from "@/hooks/use-current-user";
import SearchBox from '@/components/searchbox';
import StudentNavbar from '@/components/navbar/student-navbar';
import AdminNavbar from '@/components/navbar/admin-navbar';
import GuestNavbar from '@/components/navbar/guest-navbar';

type Role = "USER" | "ADMIN";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const [userRole, setUserRole] = useState<Role>();
  const user = useCurrentUser();

  useEffect(() => {
    setIsLoggedIn(!!user);
    setUserRole(user?.role as Role);
  }, [user]);


  return (
    <header className="text-white py-4 md:pl-16 pl-5 pr-8 w-full z-10 border-b border-neutral-400 bg-emerald-800">
      <div className="md:mx-10">
        <div className='grid grid-cols-3 justify-between'>
          <div>
            <ul className="flex">
              <li className="lg:block hidden mr-1">
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
                <Link className="hover:text-blue-500" href="/">GJCLibrary</Link>
              </li>
              {isLoggedIn && userRole === 'ADMIN' ? (
                <>
                  <AdminNavbar />
                </>
              ) : isLoggedIn && userRole === 'USER' ? (
                <>
                  <StudentNavbar />
                </>
              ) : (
                <GuestNavbar />
              )}
            </ul>
          </div>
          <div className='justify-center text-center'>
            <SearchBox />
          </div>
          <div className='justify-right text-right'>
            {isLoggedIn ? (
              <div className="mt-1 mr-10">
                <UserButton />
              </div>
            ) : (
              <Link href="auth/login">
                <Button
                  variant="ghost"
                  className="mr-10 mt-1 text-white outline outline-[1px] outline-emerald-500"
                >
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );

}

export default Navbar;