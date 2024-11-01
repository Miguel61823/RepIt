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
      router.push('/')
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
  const handleWorkoutClick = () => {
    if (isSignedIn) {
      //redirect to dashboard
      router.push('/dashboard')
    } else {
      //redirect to '/'
      router.push('/')
    }
  }
  const handleSessionClick = () => {
    if (isSignedIn) {
      //redirect to gyms page
      router.push('/sessions')
    } else {
      router.push('/')
    }
  }

  return ( 
    <header className="z-50 sticky top-0 bg-neutral-200 dark:bg-gray-800 dark:text-white text-black py-4 mx-auto border-b w-full">
    <div className="relative flex items-center text-violet-600">
      <Button variant="logo" onClick={handleLogoClick}>RepIt</Button>
      <div className="flex items-center justify-between w-full">
          <div className="flex items-center font-sans">
            <Button variant="link" onClick={handleGymClick}>Gyms</Button>
            <Button variant="link" onClick={handleWorkoutClick}>Workouts</Button>
            <Button variant="link" onClick={handleSessionClick}>Sessions</Button>
          </div>
          <div className="flex items-center">
            <div className="px-3">
              <SignedIn>
                  <UserButton/>
              </SignedIn>

              <SignedOut>
                <SignInButton mode="modal">
                  <button className="bg-blue-500 px-4 py-2 rounded-md text-white">
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
