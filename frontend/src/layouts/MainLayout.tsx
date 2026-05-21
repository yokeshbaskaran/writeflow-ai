import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
// import Home from "../pages/Home";

const MainLayout = () => {
  return (
    <>
      <section className="bg-bg text-text h-screen">
        <div className="flex flex-col">
          <Navbar />

          <div className="yoki p-2">
            <Outlet />
          </div>
        </div>
      </section>
    </>
  );
};

export default MainLayout;
