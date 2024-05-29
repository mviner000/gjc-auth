import { Metadata } from "next"
import Image from "next/image"

import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "GJCLibrary - Books",
  description: "Browse through the extensive collection of books at GJCLibrary. Find your next great read from a wide range of genres and authors",
}

interface BookLayoutProps {
  children: React.ReactNode
}

export default function BookLayout({ children }: BookLayoutProps) {
  return (
    <>
      <div className="px-10 mt-7">
        <div className="h-full w-full">
          {children}
        </div>
      </div>
      <Footer />
    </>
  )
}