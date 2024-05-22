import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = ({ githubUrl, facebookUrl }: { githubUrl: string; facebookUrl: string }) => {
    const handleClick = (url: string) => {
        if (url) {
            window.open(url, "_blank");
        }
    };

    return (
        <div className="w-full grid grid-cols-1 space-y-2 md:space-y-2 md:grid-cols-1 lg:space-y-2 lg:grid-cols-1 xl:grid-cols-2 items-center gap-x-2">
            <Button
                size="lg"
                className="w-full bg-gradient-to-r from-purple-500 to-neutral-950 hover:bg-gradient-to-l text-white outline-2 shadow-md outline-black"
                variant="outline"
                onClick={() => handleClick(githubUrl)}
            >
                Github
            </Button>

            <Button
                size="lg"
                className="w-full bg-gradient-to-l from-blue-500 to-neutral-950 hover:bg-gradient-to-r text-white outline-2 shadow-md outline-black"
                variant="outline"
                onClick={() => handleClick(facebookUrl)}
            >
                Facebook
            </Button>
        </div>
    );
};
