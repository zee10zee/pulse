'use client';

import { SignOutButton } from '@clerk/nextjs'


const SignOut = () => {
  return (
       <SignOutButton redirectUrl="/sign-in">
        <button className="your-button-styles">
          Sign out
        </button>
        </SignOutButton>
  )
}

export default SignOut