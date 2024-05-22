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
import { FidgetSpinner } from 'react-loader-spinner';

type Role = "USER" | "ADMIN";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const [userRole, setUserRole] = useState<Role>();
  const user = useCurrentUser();
  const [loading, setLoading] = useState(false);

  const handleClick = (href: string) => {
    setLoading(true);
    // Simulate a delay for the loading state
    setTimeout(() => {
      window.location.href = href;
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    setIsLoggedIn(!!user);
    setUserRole(user?.role as Role);
  }, [user]);


  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center bg-neutral-500/50 z-50">
          <FidgetSpinner
            visible={true}
            height="80"
            width="80"
            ariaLabel="loading"
            wrapperStyle={{}}
            wrapperClass=""
            ballColors={['#ff0000', '#00ff00', '#0000ff']}
            backgroundColor="#F4442E"
          />
        </div>
      )}
      <div className=''>
        <div className="h-1.5 bg-gradient-to-r from-yellow-300 from-10% via-emeral-300 via-30%  to-emerald-500 to-90%"></div>

        <header className=" text-white py-4 md:pl-16 pl-5 pr-8 w-full z-10 border-b border-neutral-400 bg-emerald-800">
          <div className="md:mx-10">
            <div className='grid grid-cols-3 justify-between'>
              <div className='mt-[1.5px]'>
                <ul className="flex">
                  <li className="lg:block hidden mr-1">
                    <Button variant="ghost"
                      className="hover:text-blue-500 hover:bg-transparent"
                      onClick={() => handleClick("/")}>
                      <Image
                        width={38}
                        height={38}
                        src="https://i.imgur.com/yyuB3s5.png"
                        alt="General De Jesus Logo"
                        className='mr-1'
                      />
                      GJCLibrary
                    </Button>
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
      </div>
    </>
  );

}

export default Navbar;