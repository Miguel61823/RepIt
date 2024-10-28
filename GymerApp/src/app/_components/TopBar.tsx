'use client'

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, useAuth, UserButton } from "@clerk/nextjs";
import Link from "next/link";
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
  const handleGymClick = () => {
    if (isSignedIn) {
      //redirect to gyms page
      router.push('/gyms')
    } else {
      router.push('/')
    }
  }

  return ( 
    <header className="sticky top-0 bg-white dark:bg-black dark:text-white text-black py-4 mx-auto border-b w-full">
    <div className="relative flex items-center">
      <Button variant="logo" onClick={handleLogoClick}>RepIt</Button>
      <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <Button variant="link" onClick={handleGymClick}>Gyms</Button>
          </div>
          <div className="flex items-center">
            <div className="px-3">
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
            </div>
            <div>
              <ModeToggle/>
            </div>
          </div>
      </div>
    </div>
  </header>
   );
}
 
export default Topbar;
