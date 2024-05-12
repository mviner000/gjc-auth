"use client";

import React from 'react';
import { useRouter } from "next/navigation";
import { logout } from "@/actions/logout";

interface LogoutButtonProps {
    children?: React.ReactNode;
}

const LogoutButton = ({ children }: LogoutButtonProps) => {
    const router = useRouter();

    const onClick = async () => {
        try {
            await logout(); // Assuming logout() is an asynchronous function
            router.push('/home'); // Redirect to /home after logout
        } catch (error) {
            console.error('Logout error:', error);
            // Handle error if needed
        }
    };

    return (
        <span onClick={onClick} className='cursor-pointer'>
            {children}
        </span>
    );
};

export default LogoutButton;
