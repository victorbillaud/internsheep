import AuthProvider from "@/components/AuthProvider";
import type { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import "./globals.css";

import { Toaster } from "@/components/ui/toaster";
import { authOptions } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app"
};

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <AuthProvider session={session}>
        <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
          {children}
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}
