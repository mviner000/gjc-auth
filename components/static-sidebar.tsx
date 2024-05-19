import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BadgeInfo, CircleHelp, PhoneOutgoing, Sticker, Users } from "lucide-react";

interface StaticSidebarProps {
    className?: string;
}

export function StaticSidebar({ className }: StaticSidebarProps) {
    return (
        <div className={cn("pb-12", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <div className="space-y-1">
                        <Link className="hover:text-blue-500" href="/static/about">
                            <Button variant="ghost" className="w-full justify-start text-lg">
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
    );
}
