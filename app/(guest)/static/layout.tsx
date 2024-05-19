import { Metadata } from "next"
import Image from "next/image"

import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "@/components/settings/sidebar-nav"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import NavMenu from "@/components/nav-menu"

import { playlists } from "@/actions/playlists"

import { StaticSidebar } from '@/components/static-sidebar';
import DieNot from "@/components/die-not"

export const metadata: Metadata = {
    title: "GJCLibrary",
    description: "Advanced form example using react-hook-form and Zod.",
}


interface BookLayoutProps {
    children: React.ReactNode
}

export default function StaticLayout({ children }: BookLayoutProps) {
    return (
        <>
            <Navbar />


            {children}

        </>
    )
}