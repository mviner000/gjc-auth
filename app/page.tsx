import { cn } from "@/lib/utils"

import localFont from 'next/font/local'
import CarouselGallery from "@/components/carousel-gallery";
import Footer from "@/components/footer";
import DieNot from "@/components/die-not";
import Searching from "@/components/searching";
import Borrowing from "@/components/borrowing";
import Returning from "@/components/returning";
import { Button } from "@/components/ui/moving-border";
import { LoginButton } from "@/components/auth/login-button";
import Navbar from "@/components/navbar";
import Banner from "@/components/landing/banner";
import LandingPage from "@/components/homepage/landing-page";
import HomeWrapper from "@/components/homepage/home-wrapper";


const myFont = localFont({ src: '../app/fonts/Grotesk.woff2' })

export default function Home() {
  return (
    <main className="h-full items-center justify-center ">
      <Navbar />
      <HomeWrapper />
      <Footer />
    </main>
  );
}
