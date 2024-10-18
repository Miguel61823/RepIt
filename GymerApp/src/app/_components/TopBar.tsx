import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const Topbar = () => {
  return ( 
    <header className="bg-blue-600 text-white p-4 ">
    <div className="container mx-auto flex items-center justify-between">
      <Button variant="logo">RepIt</Button>
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