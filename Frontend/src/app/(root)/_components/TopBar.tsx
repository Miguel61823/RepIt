import { ModeToggle } from "@/components/mode-toggle";
import { SignedIn, SignIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const Topbar = () => {
  return ( 
    <header className="bg-blue-600 text-black dark:text-white p-4 ">
    <div className="container mx-auto flex items-center ">
      <h1 className="text-2xl font-bold">RepIt App</h1>
      <nav className="">
        <ul className="flex space-x-4 justify-right">
          <li><a className="hover:underline">Features</a></li>
          <li><a className="hover:underline">Pricing</a></li>
          <li><a className="hover:underline">Contact</a></li>
          <li><a className="hover:underline">Login</a></li>
        </ul>
      </nav>
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
  </header>
   );
}
 
export default Topbar;