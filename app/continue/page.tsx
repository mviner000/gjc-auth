"use client";

import { Button } from "@/components/ui/moving-border";

const continueUrl = process.env.NEXT_PUBLIC_APP_URL;

const ContinuePage = () => {
    const handleContinueClick = () => {
        // Perform a hard refresh
        window.location.href = `${continueUrl}/`;
    };

    return (
        <div className="flex justify-center items-center min-h-96">
            <div className="text-center">
                <p className="text-xl font-bold mb-5 mt-32">You have successful login.</p>
                <Button onClick={handleContinueClick}>Continue</Button>
            </div>
        </div>
    );
};

export default ContinuePage;