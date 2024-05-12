import { Poppins } from "next/font/google"
const poppins = Poppins({ subsets: ["latin"], weight: ["600"] });

import { Button } from "@/components/ui/moving-border";
import { LoginButton } from "@/components/auth/login-button";
import Navbar from "@/components/navbar";
import Banner from "@/components/landing/banner";


import { cn } from "@/lib/utils"

import localFont from 'next/font/local'
import CarouselGallery from "@/components/carousel-gallery";
import Footer from "@/components/footer";
import DieNot from "@/components/die-not";
import Searching from "@/components/searching";
import Borrowing from "@/components/borrowing";
import Returning from "@/components/returning";


const myFont = localFont({ src: '../app/fonts/Grotesk.woff2' })

export default function Home() {
  return (
    <main className="h-full items-center justify-center ">
      <Navbar />
      <div className="">
      <div className={cn("text-6xl font-semibold ", myFont.className)}>
        <Banner />
        <div className="flex ml-4 justify-left text-center md:text-center md:justify-center">
          <LoginButton>
            <Button className="text-lg emerald:text-white" variant="secondary" >
            Sign in
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
    </main>
  );
}
