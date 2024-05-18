"use client";

import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { LoginForm } from "./login-form";
import { useState } from "react";
import { FidgetSpinner } from "react-loader-spinner";


type LoginButtonProps = {
    children: React.ReactNode;
    mode?: "modal" | "redirect";
    asChild?: boolean;
    isLoading?: boolean;
}

export const LoginButton = ({
    children,
    mode = "redirect",
    asChild,
    isLoading = false
}: LoginButtonProps) => {

    const router = useRouter();
    const [isLoadingState, setIsLoadingState] = useState(isLoading);

    const handleClick = () => {
        setIsLoadingState(true);
        router.push("/dashboard");
    };

    if (mode === "modal") {
        return (
            <Dialog>
                <DialogTrigger asChild={asChild}>
                    {children}
                </DialogTrigger>
                <DialogContent className="p-0 w-auto bg-transparent border-none">
                    <LoginForm />
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <span onClick={handleClick} className="cursor-pointer">
            {isLoadingState ? <FidgetSpinner /> : children}
        </span>
    )
}