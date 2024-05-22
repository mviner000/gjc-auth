"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FidgetSpinner } from "react-loader-spinner";



const AdminNavbar = () => {
    const [loading, setLoading] = useState(false);

    const handleClick = (href: string) => {
        setLoading(true);
        // Simulate a delay for the loading state
        setTimeout(() => {
            window.location.href = href;
            setLoading(false);
        }, 1000);
    };
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
            <li className="  dark:text-white">
                <Button variant="ghost"
                    className="hover:text-blue-500 hover:bg-transparent"
                    onClick={() => handleClick("/admin/accept/borrow")}>
                    Admin
                </Button>
            </li>
            <li className="  dark:text-white">
                <Button variant="ghost"
                    className="hover:text-blue-500 hover:bg-transparent"
                    onClick={() => handleClick("/students")}>
                    Students
                </Button>

            </li>
            <li className="  dark:text-white">

                <Button variant="ghost"
                    className="hover:text-blue-500 hover:bg-transparent"
                    onClick={() => handleClick("/profile")}>
                    Profile
                </Button>

            </li>
            <li className="  dark:text-white hidden md:block">
                <Button variant="ghost"
                    className="ml-3 outline outline-[1px] outline-emerald-500"
                    onClick={() => handleClick("/auth-book")}>
                    Books
                </Button>
            </li>
        </>
    );

}

export default AdminNavbar;