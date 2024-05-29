import { Metadata } from "next"

import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "GJCLibrary - Tags",
  description: "Explore GJCLibrary's extensive tag system to find books and authors quickly and easily.",
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
      <div className="px-10 mt-7">
        <div className="h-full w-full">
          {children}
        </div>
      </div>
      <Footer />
    </>
  )
}