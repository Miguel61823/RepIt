'use client'

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, useAuth, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Topbar = () => {

  const router = useRouter();
  const { isSignedIn } = useAuth();
  const handleLogoClick = () => {
    if (isSignedIn) {
      //redirect to dashboard
      router.push('/dashboard')
    } else {
      //redirect to '/'
      router.push('/')
    }
  }

  return ( 
    <header className="bg-white dark:bg-black dark:text-white text-black p-4 ">
    <div className="container mx-auto flex items-center justify-between">
      <Button variant="logo" onClick={handleLogoClick}>RepIt</Button>
      <div className="items-center justify-between">
        <SignedIn>
            <UserButton/>
        </SignedIn>

        <SignedOut>
          <SignInButton mode="modal">
            <button className="bg-blue-500 px-4 py-2 rounded-md">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>

        <ModeToggle/>
      </div>
    </div>
  </header>
   );
}
 
export default Topbar;
