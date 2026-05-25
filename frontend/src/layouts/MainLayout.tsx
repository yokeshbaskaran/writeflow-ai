import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <>
      <section className="flex flex-col h-screen bg-bg text-text">
        <div>
          <Navbar />
        </div>

        <div className="flex-1 flex flex-col">
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default MainLayout;
