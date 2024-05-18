"use client";

import { Button } from "@/components/ui/moving-border";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { FidgetSpinner } from "react-loader-spinner";

type LoginButtonProps = {
  isLoading?: boolean;
};

const continueUrl = process.env.NEXT_PUBLIC_APP_URL;

const ContinuePage = ({
  isLoading = false }) => {

  const [isLoadingState, setIsLoadingState] = useState(isLoading);

  const handleContinueClick = () => {

    setIsLoadingState(true);
    // Perform a hard refresh
    window.location.href = `${continueUrl}/dashboard`;
  };

  return (
    <div className="flex min-h-96 items-center justify-center">
      <div className="text-center">
        <p className="text-xl font-bold mb-5 mt-32">You have successful login.</p>
        {isLoadingState ?
          <div className="flex justify-center">
            <FidgetSpinner />
          </div>
          :
          <Button onClick={handleContinueClick}>
            <span className="text-base">
              Continue
              <ArrowRight className="inline-block ml-1 mt-[-2px]" size={20} />

            </span>
          </Button>
        }
      </div>
    </div>
  );
};

export default ContinuePage;
