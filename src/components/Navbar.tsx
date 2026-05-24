
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
    <div className="navbar flex flex-row items-center justify-around px-4 py-2 ">

        <div className="left">
            <h1 className="text-2xl font-bold">
                <Link href={'/'}>Pulse
                <HeartPulse className="inline-block ml-1 text-red-500 animate-pulse" size={24} />
                </Link> 
            </h1>
        </div>
        <div className="right">
            <Menubar className="w-50">
      <MenubarMenu>
        <MenubarTrigger>
          <Link href={'/profile'}>
            <UserAvatar />
          </Link>
        </MenubarTrigger>
      
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarGroup>
            <MenubarItem>
              Undo <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
            </MenubarItem>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarGroup>
            <MenubarSub>
              <MenubarSubTrigger>Find</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarGroup>
                  <MenubarItem>Search the web</MenubarItem>
                </MenubarGroup>
                <MenubarSeparator />
                <MenubarGroup>
                  <MenubarItem>Find...</MenubarItem>
                  <MenubarItem>Find Next</MenubarItem>
                  <MenubarItem>Find Previous</MenubarItem>
                </MenubarGroup>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarGroup>
            <MenubarItem>Cut</MenubarItem>
            <MenubarItem>Copy</MenubarItem>
            <MenubarItem>Paste</MenubarItem>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent className="w-44">
          <MenubarGroup>
            <MenubarCheckboxItem>Bookmarks Bar</MenubarCheckboxItem>
            <MenubarCheckboxItem checked>Full URLs</MenubarCheckboxItem>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarGroup>
            <MenubarItem inset>
              Reload <MenubarShortcut>⌘R</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled inset>
              Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
            </MenubarItem>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarGroup>
            <MenubarItem inset>Toggle Fullscreen</MenubarItem>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarGroup>
            <MenubarItem inset>Hide Sidebar</MenubarItem>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>
        {isAuthenticated ?
      <MenubarMenu>
        <MenubarTrigger>Profiles</MenubarTrigger>
        <MenubarContent>
        
          <MenubarGroup>
            <MenubarItem inset>
             <Link href={'/profile'} >Profile</Link>
            </MenubarItem>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarGroup>
            <MenubarItem>
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