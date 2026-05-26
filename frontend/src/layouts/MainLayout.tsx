import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <>
      <section className="flex flex-col h-screen bg-bg text-text">
        <div className="shrink-0">
          <Navbar />
        </div>

        <div className="flex-1 flex flex-col overflow-y-auto">
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default MainLayout;
