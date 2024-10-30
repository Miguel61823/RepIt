import { SessionForm } from "@/components/forms/SessionForm";
import Topbar from "../_components/TopBar";

const SessionsPage = () => {
  return ( 
    <div>
      <Topbar />
      <div>
        <SessionForm />
        {/* <SessionsList /> */}
      </div>
    </div>
  );
}
 
export default SessionsPage;