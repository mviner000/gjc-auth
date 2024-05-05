import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "GJCLibrary",
  description: "The Next Generation Library Website Of General De Jesus College",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body
      className={cn(
        "bg-gradient-to-t from-emerald-600 via-50% to-emerald-700 to-70% min-h-screen bg-background font-sans antialiased",
        inter.className
      )}
    >
    <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
        <div className="z-10 absolute top-5 right-5">
          <ModeToggle/>
        </div>
        {children}
        <Toaster />
    </ThemeProvider>
      </body>
    </html>
  );
}
