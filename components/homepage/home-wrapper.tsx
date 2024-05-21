"use client";

import { useState, useEffect } from 'react';
import { useCurrentUser } from "@/hooks/use-current-user";
import { FidgetSpinner } from 'react-loader-spinner';
import LandingPage from "@/components/homepage/landing-page";
import UnliBook from './unli-books';

const HomeWrapper = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const user = useCurrentUser();

    useEffect(() => {
        setIsLoggedIn(!!user);
        setIsLoading(false);
    }, [user]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
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
        );
    }

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
