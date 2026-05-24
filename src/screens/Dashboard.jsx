import Sidebar from "../components/Sidebar";
import MainContent from "../Layout/MainContent";

function Dashboard() {
  return (
    <div className="h-screen flex bg-[#f4f8fc]">
      <Sidebar />
      <MainContent/>
    </div>
  );
}

export default Dashboard;