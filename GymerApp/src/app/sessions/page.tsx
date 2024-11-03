import Footer from "../_components/Footer";
import Topbar from "../_components/TopBar";
import SessionList from "./_components/sessionHistory";

const SessionsPage = () => {
  return ( 
    <div className="container flex-grow mx-auto dark:bg-gray-900 bg-netural-200 mt-8 px-4">
      <SessionList />
    </div>
  );
}
 
export default SessionsPage;