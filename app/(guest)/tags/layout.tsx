import { Metadata } from "next"
import Image from "next/image"

import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "@/components/settings/sidebar-nav"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import NavMenu from "@/components/nav-menu"

export const metadata: Metadata = {
  title: "GJCLibrary - Tags",
  description: "Advanced form example using react-hook-form and Zod.",
}

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/settings",
  },
  {
    title: "Account",
    href: "/settings/account",
  },
  {
    title: "Appearance",
    href: "/settings/appearance",
  },
  {
    title: "Notifications",
    href: "/settings/notifications",
  },
]

interface BookLayoutProps {
  children: React.ReactNode
}

export default function TagsLayout({ children }: BookLayoutProps) {
  return (
    <>
      <Navbar />
      <div className="p-10">
        <div className="space-y-0.5 text-center justify-center">
          <h2 className="text-2xl font-bold tracking-tight">Books</h2>
          <p className="text-muted-foreground">
            Find Specific Book Tagged at ease
          </p>
          <div className="text-left justify-start">
            <NavMenu />
          </div>
        </div>
        <Separator className="my-6" />
        <div className="h-full w-full">
          {children}
        </div>
      </div>
      <Footer />
    </>
  )
}