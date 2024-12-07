import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { createProfile, getProfileByUserId } from '@/db/queries/profiles-queries';
import { cn } from "@/lib/utils";
import { ClerkProvider } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Claude - AI Assistant",
  description: "Privacy-first AI that helps you create in confidence.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const { userId } = await auth();

  if (userId) {
    const profile = await getProfileByUserId(userId);
    if (!profile) {
      await createProfile({ userId });
    }
  }

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn("min-h-screen bg-background antialiased", geistSans.variable, geistMono.variable)}>
          <Header />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  )
}
