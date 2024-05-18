"use client";

import React from 'react';
import { useRouter } from "next/navigation";
import { logout } from "@/actions/logout";
import { useLoggingOut } from '@/components/logging-out-context';

interface LogoutButtonProps {
    children?: React.ReactNode;
}

const LogoutButton = ({ children }: LogoutButtonProps) => {
    const { setIsLoggingOut } = useLoggingOut();
    const router = useRouter();

    const onClick = async () => {
        try {
            setIsLoggingOut(true);
            // Add a delay of 2 seconds before logging out
            setTimeout(async () => {
                await logout(); // Assuming logout() is an asynchronous function
                router.push('/home');
                setIsLoggingOut(false);
            }, 2000);
        } catch (error) {
            console.error('Logout error:', error);
            // Handle error if needed
            setIsLoggingOut(false);
        }
    };

    return (
        <span onClick={onClick} className='cursor-pointer'>
            {children}
        </span>
    );
};

export default LogoutButton;
