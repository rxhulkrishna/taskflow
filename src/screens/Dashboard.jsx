import Sidebar from "../components/Sidebar";
import MainContent from "../Layout/MainContent";

function Dashboard() {
  return (
    <div className="h-full p-4 flex">
      <Sidebar />
      <MainContent/>
    </div>
  );
}

export default Dashboard;
