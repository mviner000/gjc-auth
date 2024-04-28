"use client";

// import { loginOauth } from "@/actions/login";

import { signIn } from "next-auth/react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {
  const handleClick = async (provider: "google" | "github") => {
    try {
      await signIn(provider, {
        callbackUrl: DEFAULT_LOGIN_REDIRECT,
      });
    } catch (error) {
      console.log("Error signing in:", error);
    }
  };
  return (
    <div className="w-full flex items-center gap-x-2">
      <Button
        size="lg"
        className="w-full bg-emerald-300 text-white outline-2 shadow-md outline-black"
        variant="outline"
        onClick={() => handleClick("google")}
      >
        <FaGoogle className="h-5 w-5" />
      </Button>
      <Button
        size="lg"
        className="w-full bg-indigo-500 text-white outline-2 shadow-md outline-black"
        variant="outline"
        onClick={() => handleClick("github")}
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
};
