import { Metadata } from "next"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { CalendarDateRangePicker } from "@/components/dashboard/date-range-picker"
import { MainNav } from "@/components/dashboard/main-nav"
import { Overview } from "@/components/dashboard/overview"
import { RecentSales } from "@/components/dashboard/recent-sales"
import { Search } from "@/components/dashboard/search"
import TeamSwitcher from "@/components/dashboard/team-switcher"
import { UserNav } from "@/components/dashboard/user-nav"
import UserImage from "@/components/user-image"
import { BookAudio } from "lucide-react"
import { StudentsMainNav } from "./main-nav"
import UserAvatarInfo from '@/components/user-avatar-info';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="h-full">


      <div className="flex-col">
        <div className="flex h-16 items-center px-4">

          <div className="ml-auto flex items-center space-x-4">
            {/* <Search /> */}
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}

export default DashboardLayout;