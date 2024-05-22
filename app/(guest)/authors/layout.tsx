import { Metadata } from "next"

import { Separator } from "@/components/ui/separator"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import NavMenu from "@/components/nav-menu"

import { playlists } from "@/actions/playlists"
import BreadcrumbComponent from '@/components/breadcrumb';
import PaginationControls from '@/components/pagination-controls';
import CartSheet from '@/components/cart-sheet';
import AuthorCard from '@/components/authors/author-card';
import { SideBarRight } from '@/components/sidebar-right';
import { Sidebar } from "@/components/sidebar"

export const metadata: Metadata = {
  title: "GJCLibrary - Authors",
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