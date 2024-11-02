import Footer from "../_components/Footer";
import Topbar from "../_components/TopBar";
import SessionList from "./_components/sessionHistory";

const SessionsPage = () => {
  return ( 
    <div className="flex flex-col dark:bg-gray-900  bg-gray-100 min-h-screen  dark:text-white text-black">
      <Topbar />
      <div className="container flex-grow mx-auto dark:bg-gray-900 bg-netural-200 mt-8 px-4">
        <SessionList />
      </div>
      <Footer/>
    </div>
  );
}
 
export default SessionsPage;