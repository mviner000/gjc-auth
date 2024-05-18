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
                            height="40"
                            width="40" />
                    </span>
                    <p className="pt-5 text-black font-semibold text-base">Logging out...</p>
                </div>
            )}
        </>
    );
}

export default LoggingOutDisplay;
