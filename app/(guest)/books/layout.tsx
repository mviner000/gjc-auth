import { Metadata } from "next"
import Image from "next/image"

import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "@/components/settings/sidebar-nav"
import Navbar from "@/components/navbar"

export const metadata: Metadata = {
  title: "Forms",
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

export default function StudentLayout({ children }: BookLayoutProps) {
  return (
    <>
    <Navbar />
      <div className="p-10">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Books</h2>
          <p className="text-muted-foreground">
            Find Books at ease
          </p>
        </div>
        <Separator className="my-6" />
          <div className="h-full w-full">
            {children}
          </div>
      </div>
    </>
  )
}