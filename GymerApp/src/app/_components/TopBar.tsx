'use client';

import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  useAuth,
  UserButton,
} from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu } from 'lucide-react';
import { useState } from 'react';

const Topbar = () => {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const [activeLink, setActiveLink] = useState(null);

  const handleLogoClick = () => {
    if (isSignedIn) {
      //redirect to dashboard
      router.push('/');
    } else {
      //redirect to '/'
      router.push('/');
    }
  };

  const handleLinkHover = (link) => {
    setActiveLink(link);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    if (isSignedIn) {
      switch (link) {
        case 'dashboard':
          router.push('/dashboard');
          break;
        case 'facilities':
          router.push('/facilities');
          break;
        case 'sessions':
          router.push('/sessions');
          break;
        case 'goals':
          router.push('/goals');
          break;
        case 'supplements':
          router.push('/supplements');
          break;
        default:
          break;
      }
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
            <Button
              variant="link"
              onClick={() => handleLinkClick('dashboard')}
              onMouseEnter={() => handleLinkHover('dashboard')}
              onMouseLeave={() => handleLinkHover(null)}
              className={`relative ${
                activeLink === 'dashboard' ? 'text-violet-600' : ''
              }`}
            >
              Dashboard
              {activeLink === 'dashboard' && (
                <div className="absolute left-0 right-0 bottom-0 h-1 bg-violet-600 animate-link-underline" />
              )}
            </Button>
            <Button
              variant="link"
              onClick={() => handleLinkClick('facilities')}
              onMouseEnter={() => handleLinkHover('facilities')}
              onMouseLeave={() => handleLinkHover(null)}
              className={`relative ${
                activeLink === 'facilities' ? 'text-violet-600' : ''
              }`}
            >
              Facilities
              {activeLink === 'facilities' && (
                <div className="absolute left-0 right-0 bottom-0 h-1 bg-violet-600 animate-link-underline" />
              )}
            </Button>
            <Button
              variant="link"
              onClick={() => handleLinkClick('sessions')}
              onMouseEnter={() => handleLinkHover('sessions')}
              onMouseLeave={() => handleLinkHover(null)}
              className={`relative ${
                activeLink === 'sessions' ? 'text-violet-600' : ''
              }`}
            >
              Sessions
              {activeLink === 'sessions' && (
                <div className="absolute left-0 right-0 bottom-0 h-1 bg-violet-600 animate-link-underline" />
              )}
            </Button>
            <Button
              variant="link"
              onClick={() => handleLinkClick('goals')}
              onMouseEnter={() => handleLinkHover('goals')}
              onMouseLeave={() => handleLinkHover(null)}
              className={`relative ${
                activeLink === 'goals' ? 'text-violet-600' : ''
              }`}
            >
              Goals
              {activeLink === 'goals' && (
                <div className="absolute left-0 right-0 bottom-0 h-1 bg-violet-600 animate-link-underline" />
              )}
            </Button>
            <Button
              variant="link"
              onClick={() => handleLinkClick('supplements')}
              onMouseEnter={() => handleLinkHover('supplements')}
              onMouseLeave={() => handleLinkHover(null)}
              className={`relative ${
                activeLink === 'supplements' ? 'text-violet-600' : ''
              }`}
            >
              Supplements
              {activeLink === 'supplements' && (
                <div className="absolute left-0 right-0 bottom-0 h-1 bg-violet-600 animate-link-underline" />
              )}
            </Button>
          </div>
          <div className="flex items-center justify-end w-full">
            <div className="min-[600px]:hidden flex gap-3 px-4 items-center">
              <div className="px-3 mt-1">
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
                      <Button
                        variant="link"
                        onClick={() => handleLinkClick('dashboard')}
                        onMouseEnter={() => handleLinkHover('dashboard')}
                        onMouseLeave={() => handleLinkHover(null)}
                        className={`relative ${
                          activeLink === 'dashboard' ? 'text-violet-600' : ''
                        }`}
                      >
                        Dashboard
                        {activeLink === 'dashboard' && (
                          <div className="absolute left-0 right-0 bottom-0 h-1 bg-violet-600 animate-link-underline" />
                        )}
                      </Button>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup className="flex flex-row justify-end px-1">
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <ModeToggle />
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="hidden min-[600px]:flex items-center">
              <div className="px-3 mt-1">
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

      <style jsx>{`
        @keyframes link-underline {
          0% {
            width: 0;
          }
          100% {
            width: 100%;
          }
        }

        .animate-link-underline {
          animation: link-underline 0.3s ease-in-out forwards;
        }
      `}</style>
    </>
  );
};

export default Topbar;