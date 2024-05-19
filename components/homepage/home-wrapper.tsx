"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";
import { useCurrentUser } from "@/hooks/use-current-user";
import SearchBox from '@/components/searchbox';
import LandingPage from "@/components/homepage/landing-page";
import GuestNavbar from "@/components/navbar/guest-navbar";  // Import GuestNavbar
import UnliBook from './unli-books';


const HomeWrapper = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const user = useCurrentUser();

    useEffect(() => {
        setIsLoggedIn(!!user);
    }, [user]);

    return (
        <div>
            {isLoggedIn ? (
                <UnliBook />
            ) : (
                <LandingPage />
            )}
        </div>
    );
}

export default HomeWrapper;
