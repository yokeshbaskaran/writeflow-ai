import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <>
      <section className="bg-bg text-text h-screen">
        <div className="flex flex-col">
          <Navbar />

          <div>Homepage</div>
        </div>
      </section>
    </>
  );
};

export default MainLayout;
