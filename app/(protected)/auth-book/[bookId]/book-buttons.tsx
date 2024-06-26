"use client";

// import { loginOauth } from "@/actions/login";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";


export const BookButtons = () => {
    const handleClick = async (provider: "google" | "github" | "facebook") => {
        try {
            await signIn(provider, {
                callbackUrl: DEFAULT_LOGIN_REDIRECT,
            });
        } catch (error) {
            console.log("Error signing in:", error);
        }
    };
    return (
        <div className="w-full grid grid-cols-1 gap-y-2 md:gap-y-2 md:grid-cols-1 lg:gap-y-2 lg:grid-cols-1 xl:grid-cols-2  items-center gap-x-2">

            <Button
                size="lg"
                className="w-full bg-gradient-to-r from-purple-500 to-neutral-950 hover:bg-gradient-to-l text-white outline-2 shadow-md outline-black"
                variant="outline"
                onClick={() => handleClick("github")}
            >
                Add To Book Cart
            </Button>

            <Button
                size="lg"
                className="w-full bg-gradient-to-l from-blue-500 to-neutral-950 hover:bg-gradient-to-r text-white outline-2 shadow-md outline-black"
                variant="outline"
                onClick={() => handleClick("facebook")}
            >
                Save to Book Collection
            </Button>
        </div>
    );
};
