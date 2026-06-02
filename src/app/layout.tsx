import {ClerkProvider} from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { auth, currentUser } from "@clerk/nextjs/server";
import { createUserIfNotExists } from "../db/actions/users";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const MontserratSans = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// src/app/layout.tsx
export const metadata: Metadata = {
  title: "Pulse",
  description: "Let the world know your pulses !",
  icons : {
    icon : [
      {
        url: "/maskable_icon_x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/maskable_icon_x512.png",
        sizes: "512x512",
        type: "image/png",
      }
    ]
  },
  manifest: "/manifest.json",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: "#000000",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Pulse",
  },
  formatDetection: {
    telephone: false,
  },
};


export const dynamic = 'force-dynamic';
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { isAuthenticated } = await auth();
  const user = await currentUser();

  console.log(isAuthenticated, ' is authenticated');

  // Only create user if authenticated AND all required fields exist
  if (isAuthenticated && user && user.id && user.fullName && user.primaryEmailAddress?.emailAddress) {
    await createUserIfNotExists({
      id: user.id,
      name: user.fullName,
      email: user.primaryEmailAddress.emailAddress,
    });
  }

  return (
    <ClerkProvider>
      <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/maskable_icon_x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Pulse" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#000000" />
      </head>
        <body className="min-h-full flex flex-col">
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}