import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BadgeInfo, CircleHelp, PhoneOutgoing, Sticker, Users } from "lucide-react";

import { Playlist } from "@/actions/playlists"

interface SideBarRightProps extends React.HTMLAttributes<HTMLDivElement> {
    playlists: Playlist[]
}

export function SideBarRight({ className, playlists }: SideBarRightProps) {
    return (
        <div className={cn("pb-12 sidebar", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <div className="space-y-1 text-black dark:text-slate-500">
                        <Link className="hover:text-blue-500" href="/static/about">
                            <Button variant="ghost" className="w-full justify-start text-lg ">
                                <BadgeInfo size={20} className="mr-1.5" />
                                About
                            </Button>
                        </Link>
                        <Link className="hover:text-blue-500" href="/static/faqs">
                            <Button variant="ghost" className="w-full justify-start text-lg">
                                <CircleHelp size={20} className="mr-1.5" />
                                FAQs
                            </Button>
                        </Link>
                        <Link className="hover:text-blue-500" href="/static/team">
                            <Button variant="ghost" className="w-full justify-start text-lg">

                                <Users size={20} className="mr-1.5" />
                                Team
                            </Button>
                        </Link>
                        <Link className="hover:text-blue-500" href="/static/contacts">
                            <Button variant="ghost" className="w-full justify-start text-lg">
                                <PhoneOutgoing size={20} className="mr-1.5" />
                                Contacts
                            </Button>
                        </Link>

                        <Link className="hover:text-blue-500" href="/static/terms">
                            <Button variant="ghost" className="w-full justify-start text-lg">

                                <Sticker size={20} className="mr-1.5" />
                                Terms
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}