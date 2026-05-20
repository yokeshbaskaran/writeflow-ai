import Navbar from "../components/Navbar";
import Home from "../pages/Home";

const MainLayout = () => {
  return (
    <>
      <section className="bg-bg text-text h-screen">
        <div className="flex flex-col">
          <Navbar />
          <Home />
        </div>
      </section>
    </>
  );
};

export default MainLayout;
