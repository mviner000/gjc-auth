// "use client";

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
  } from "@/components/ui/card";

import { BackButton } from "@/components/auth//back-button";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
  
  import { Poppins } from "next/font/google";
import Image from "next/image";
  
  
  const poppins = Poppins({
    subsets: ["latin"],
    weight: ["600"],
  });
  
  type CardWrapperProps = {
    children: React.ReactNode;
    headerTitle: string;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
  };
  
  export const CardWrapper = ({
    children,
    headerTitle,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial,
  }: CardWrapperProps) => {
    return (
      <Card className="mt-12 mb-10 w-[425px] shadow-md border-8 border-emerald-800">
      <CardHeader className="relative">
        <Image
          className="absolute bottom-24 left-[128px]"
          src="https://i.imgur.com/yyuB3s5.png"
          width={142}
          height={142}
          alt="General De Jesus Logo"
          priority
        />
        <div className="static inline-block">
          <h1 className="mt-10 ml-[-8px] text-3xl font-bold mb-2 text-center text-black dark:text-white">{headerTitle}</h1>
        <Separator className="absolute right-0 bg-green-500 h-[1px] w-full"/>
        </div>
        <Header label={headerLabel}/>
      </CardHeader>
      <CardContent>
      {children}
      </CardContent>
      <Separator className="right-0 bg-green-500 h-[1px] mb-3"/>
      {showSocial && (
          <CardFooter>
              <Social />
          </CardFooter>
      )}
   
      <CardFooter>
          <BackButton 
              label={backButtonLabel}
              href={backButtonHref}
          />
      </CardFooter>
  </Card>
    );
  };
  