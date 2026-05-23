import {ClerkProvider, useAuth} from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import "./globals.css";
import { auth, currentUser } from "@clerk/nextjs/server";
import Showcase from "../components/Showcase";
import { createUserIfNotExists } from "../db/actions/users";
// import {themes} from '@clerk/ui/themes'


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

export const metadata: Metadata = {
  title: "Pulse",
  description: "Have fun while being in Fun !",
};

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
        <body className="min-h-full flex flex-col">
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}