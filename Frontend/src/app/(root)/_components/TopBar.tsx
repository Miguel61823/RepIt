const Topbar = () => {
  return ( 
    <header className="bg-blue-600 text-white p-4">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-2xl font-bold">RepIt App</h1>
      <nav>
        <ul className="flex space-x-4">
          <li><a className="hover:underline">Features</a></li>
          <li><a className="hover:underline">Pricing</a></li>
          <li><a className="hover:underline">Contact</a></li>
          <li><a className="hover:underline">Login</a></li>
        </ul>
      </nav>
    </div>
  </header>
   );
}
 
export default Topbar;