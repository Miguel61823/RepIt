'use client';

import {ModeToggle} from '@/components/mode-toggle';
import {Button} from '@/components/ui/button';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  useAuth,
  UserButton,
} from '@clerk/nextjs';
import {useRouter} from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {Menu} from 'lucide-react';

const Topbar = () => {
  const router = useRouter();
  const {isSignedIn} = useAuth();
  const handleLogoClick = () => {
    if (isSignedIn) {
      //redirect to dashboard
      router.push('/');
    } else {
      //redirect to '/'
      router.push('/');
    }
  };
  const handleFacilityClick = () => {
    if (isSignedIn) {
      //redirect to gyms page
      router.push('/facilities');
    } else {
      router.push('/');
    }
  };
  const handleWorkoutClick = () => {
    if (isSignedIn) {
      //redirect to dashboard
      router.push('/workouts');
    } else {
      //redirect to '/'
      router.push('/');
    }
  };
  const handleSessionClick = () => {
    if (isSignedIn) {
      //redirect to gyms page
      router.push('/sessions');
    } else {
      router.push('/');
    }
  };

  return (
    <>
      <header className="block z-50 sticky top-0 bg-neutral-100 dark:bg-gray-800 dark:text-white text-black p-6 border-b">
        <div className="relative flex justify-between items-center text-violet-600 px-2">
          <Button variant="logo" onClick={handleLogoClick}>
            RepIt
          </Button>
          <div className="hidden min-[600px]:flex items-center font-sans">
            <Button variant="link" onClick={handleFacilityClick}>
              Facilities
            </Button>
            <Button variant="link" onClick={handleWorkoutClick}>
              Workouts
            </Button>
            <Button variant="link" onClick={handleSessionClick}>
              Sessions
            </Button>
          </div>
          <div className="flex items-center justify-end w-full">
            <div className="min-[600px]:hidden flex gap-3 px-4 items-center">
              <div className="px-3">
                <SignedIn>
                  <UserButton />
                </SignedIn>

                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="bg-violet-600 px-4 py-2 rounded-lg text-white">
                      Sign In
                    </button>
                  </SignInButton>
                </SignedOut>
              </div>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild className="cursor-pointer">
                  <Menu />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="font-sans bg-neutral-100 dark:bg-gray-800 dark:text-white text-black"
                >
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="">
                      <Button variant="link" onClick={handleFacilityClick}>
                        Facilities
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Button variant="link" onClick={handleWorkoutClick}>
                        Workouts
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Button variant="link" onClick={handleSessionClick}>
                        Sessions
                      </Button>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup className="flex flex-row justify-end px-1">
                    <DropdownMenuItem onSelect={e => e.preventDefault()}>
                      <ModeToggle />
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="hidden min-[600px]:flex items-center">
              <div className="px-3">
                <SignedIn>
                  <UserButton />
                </SignedIn>

                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="bg-violet-600 px-4 py-2 rounded-md text-white">
                      Sign In
                    </button>
                  </SignInButton>
                </SignedOut>
              </div>
              <div>
                <ModeToggle />
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </header>
    </>
  );
};

export default Topbar;
