import { Metadata } from "next"

import Footer from "@/components/footer"
import { playlists } from "@/actions/playlists"
import { SideBarRight } from '@/components/sidebar-right';
import { Sidebar } from "@/components/sidebar"

export const metadata: Metadata = {
  title: "GJCLibrary - Authors",
  description: "Explore the diverse collection of authors at GJCLibrary. Discover the unique contributions each author has made to the literary world.",
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

export default function AuthorLayout({ children }: BookLayoutProps) {
  return (
    <>
      <div className="px-10 mt-7">
        <div className="h-full w-full">
          <div className=''>
            <div className="mt-3 h-full ">
              <div className="grid lg:grid-cols-7">
                <Sidebar playlists={playlists} className="hidden lg:block" />
                <div className="col-span-3 lg:col-span-5 lg:border-l lg:border-r">
                  <div className="h-full px-4 py-6 lg:px-8">
                    {children}
                  </div>
                </div>
                <SideBarRight className="hidden lg:block" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}