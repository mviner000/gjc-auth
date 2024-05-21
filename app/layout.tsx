import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from '@/auth';

import "./globals.css";

import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });
import { cn } from "@/lib/utils"
import LoggingOutDisplay from "@/components/logging-out-display";
import { LoggingOutProvider } from "@/components/logging-out-context";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "GJCLibrary",
  description: "The Next Generation Library Website Of General De Jesus College",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <LoggingOutProvider>
        <html lang="en" suppressHydrationWarning>
          <body
            className={cn(
              " font-sans antialiased",
              inter.className
            )}
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              themes={['light', 'dark', 'emerald']}
            >
              <div className="z-10 absolute top-5 right-5">
                <ModeToggle />
              </div>

              <LoggingOutDisplay />

              <Navbar />
              {children}
              <Toaster />

            </ThemeProvider>
          </body>
        </html>
      </LoggingOutProvider>
    </SessionProvider>
  );
}
