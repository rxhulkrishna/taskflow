import Sidebar from "../components/Sidebar";
import MainContent from "../Layout/MainContent";

function Dashboard() {
  return (
    <div className="h-screen flex bg-[#f7faff] lg:overflow-y-hidden">
      <Sidebar />
      <MainContent/>
    </div>
  );
}

export default Dashboard;