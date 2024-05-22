"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BadgeInfo, CircleHelp, PhoneOutgoing, Sticker, Users } from "lucide-react";
import { useState } from "react";
import { FidgetSpinner } from "react-loader-spinner";


interface SideBarRightProps extends React.HTMLAttributes<HTMLDivElement> { }

export function SideBarRight({ className }: SideBarRightProps) {
    const [loading, setLoading] = useState(false);

    const handleClick = (href: string) => {
        setLoading(true);
        // Simulate a delay for the loading state
        setTimeout(() => {
            window.location.href = href;
            setLoading(false);
        }, 1000);
    };

    return (

        <>
            {loading && (
                <div className="fixed inset-0 flex justify-center items-center bg-neutral-500/50 z-50">
                    <FidgetSpinner
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        ballColors={['#ff0000', '#00ff00', '#0000ff']}
                        backgroundColor="#F4442E"
                    />
                </div>
            )}
            <div className={cn("pb-12 sidebar", className)}>
                <div className="space-y-4 py-4">
                    <div className="px-3 py-2">
                        <div className="space-y-1 text-black dark:text-slate-500">
                            <Button
                                variant="ghost"
                                className="w-full justify-start text-lg"
                                onClick={() => handleClick("/static/about")}
                            >
                                <BadgeInfo size={20} className="mr-1.5" />
                                About
                            </Button>
                            <Button
                                variant="ghost"
                                className="w-full justify-start text-lg"
                                onClick={() => handleClick("/static/faqs")}
                            >
                                <CircleHelp size={20} className="mr-1.5" />
                                FAQs
                            </Button>
                            <Button
                                variant="ghost"
                                className="w-full justify-start text-lg"
                                onClick={() => handleClick("/static/team")}
                            >
                                <Users size={20} className="mr-1.5" />
                                Team
                            </Button>
                            <Button
                                variant="ghost"
                                className="w-full justify-start text-lg"
                                onClick={() => handleClick("/static/contacts")}
                            >
                                <PhoneOutgoing size={20} className="mr-1.5" />
                                Contacts
                            </Button>

                            <Button
                                variant="ghost"
                                className="w-full justify-start text-lg"
                                onClick={() => handleClick("/static/terms")}
                            >
                                <Sticker size={20} className="mr-1.5" />
                                Terms
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}