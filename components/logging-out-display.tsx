"use client";

import { useLoggingOut } from "@/components/logging-out-context";
import { FidgetSpinner } from "react-loader-spinner";


const LoggingOutDisplay = () => {
    const { isLoggingOut } = useLoggingOut();

    return (
        <>
            {isLoggingOut && (
                <div className="w-full flex space-x-2 h-16 text-center justify-center bg-yellow-500 ">
                    <span className="mt-3">
                        <FidgetSpinner

                            ballColors={["#ff0000", "#000000", "#0000FF"]}
                            height="40"
                            width="40" />
                    </span>
                    <p className="
                        pt-5
                        bg-gradient-to-r from-black to-emerald-700 bg-clip-text text-transparent animate-gradient
                        font-semibold 
                        dark:bg-gradient-to-r dark:from-black  dark:to-emerald-700 dark:text-transparent dark:bg-clip-text dark:animate-gradient">Logging out...</p>
                </div>
            )}
        </>
    );
}

export default LoggingOutDisplay;
