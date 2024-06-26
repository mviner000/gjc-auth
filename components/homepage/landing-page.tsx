"use client";

import { cn } from "@/lib/utils"

import localFont from 'next/font/local'

import Returning from "@/components/returning";
import { Button } from "@/components/ui/moving-border";
import { LoginButton } from "@/components/auth/login-button";
import CarouselGallery from "@/components/carousel-gallery";
import DieNot from "@/components/die-not";
import Searching from "@/components/searching";
import Borrowing from "@/components/borrowing";
import Footer from "@/components/footer";
import Banner from "@/components/landing/banner";

const myFont = localFont({ src: '../../app/fonts/Grotesk.woff2' })

const LandingPage = () => {
    return (
        <>
            <div className="">
                <div className={cn("text-6xl font-semibold ", myFont.className)}>
                    <Banner />
                    <div className="flex ml-4 justify-left text-center md:text-center md:justify-center">
                        <LoginButton>
                            <Button className="text-lg emerald:text-white" variant="secondary" >
                                Get Started
                            </Button>
                        </LoginButton>
                    </div>
                </div>
                <CarouselGallery />
                <Searching />
                <Borrowing />
                <Returning />
            </div>
            <DieNot />
            <Footer />
        </>
    )
}

export default LandingPage