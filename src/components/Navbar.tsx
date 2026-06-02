
import { Button } from "@/components/ui/button";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { SignOutButton, UserAvatar, UserProfile } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { HeartPulse } from "lucide-react";
import Link from "next/link";
import SignOut from "../app/(auth)/SignOut";


 const Navbar = async()=> {
  const {isAuthenticated} = await auth()
  const user = await currentUser()
  return (
    <div className="navbar flex flex-row items-center justify-around px-4 py-2 fixed top-0 left-0 right-0 bg-white shadow-md z-10">

        <div className="left">
            <h1 className="text-2xl font-bold">
                <Link href={'/'}>Pulse
                <HeartPulse className="inline-block ml-1 text-red-500 animate-pulse" size={24} />
                </Link> 
            </h1>
        </div>
        <div className="right">
            <Menubar className="">
      <MenubarMenu>
        <MenubarTrigger>
          <Link href={'/profile'}>
            <UserAvatar />
          </Link>
        </MenubarTrigger>
      
      </MenubarMenu>
      
        {isAuthenticated ?
      <MenubarMenu>
        <MenubarTrigger>Profile</MenubarTrigger>
        <MenubarContent>
        
          <MenubarGroup>
            <MenubarItem inset>
             <Link href={'/profile'} >{user?.fullName}</Link>
            </MenubarItem>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarGroup>
            <MenubarItem inset>
               <SignOut />
            </MenubarItem>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>
  : <MenubarMenu>
    <MenubarTrigger>
        <Link href={'/sign-in'}>Sign in</Link>
    </MenubarTrigger>
  </MenubarMenu>
    }
    </Menubar>
        </div>
        
    </div>
  )
}

export default Navbar