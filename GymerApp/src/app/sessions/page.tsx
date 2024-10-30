import Footer from "../_components/Footer";
import Topbar from "../_components/TopBar";
import SessionList from "./_components/sessionHistory";

const SessionsPage = () => {
  return ( 
    <div>
      <Topbar />
      <div>
        <SessionList />
      </div>
      <Footer/>
    </div>
  );
}
 
export default SessionsPage;