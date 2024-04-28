import { Header } from "@/components/auth/header";
import { BackButton } from "@/components/auth/back-button";
import { Poppins } from "next/font/google"

import { cn } from "@/lib/utils";

const poppins = Poppins({ subsets: ["latin"], weight: ["600"] });
import {
    Card,
    CardFooter,
    CardHeader
} from "@/components/ui/card";
import Image from "next/image";
import { CardWrapper } from "./card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
  });

export const ErrorCard = () => {
    return (
        <>
        {/* <Card className="w-[400px] shadow-md">
            <CardHeader>
                <div className="flex justify-center">
            <Image 
                width={58}
                height={58}
                src="https://img.icons8.com/3d-fluency/94/lock-2.png" 
                alt="lock-2"
            /> 
            <h1 className={cn(
                "text-6xl font-semibold text-slate-800 drop-shadow-md dark:text-white",
            font.className,
            )}>Auth
            </h1>
            </div>
            <Header label="Oops! Something went wrong!" />
            </CardHeader>
            <CardFooter>
                <BackButton 
                    label="Back to login"
                    href="/auth/login"
                />
            </CardFooter>
        </Card> */}
        <CardWrapper 
            headerTitle="Error Page"
            headerLabel="Oops! Something went wrong!"
            backButtonHref="/auth/login"
            backButtonLabel="Back to login"
        >
            <div className="w-full flex justify-center items-center">
                <ExclamationTriangleIcon className="w-20 h-20 text-red-500 dark:text-yellow-300 drop-shadow-md"/>
            </div>
        </CardWrapper>
        </>
    )
}