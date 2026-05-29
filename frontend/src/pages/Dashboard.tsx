import History from "../components/History";
import Metrics from "../components/Metrics";
import { useAppContext } from "../context/AppContext";

const Dashboard = () => {
  const { authUser, response } = useAppContext();
  const personName = authUser?.username;

  return (
    <main className="flex flex-col overflow-hidden">
      {/* DashBoard */}
      <section className="shrink-0">
        <div className="my-3 mx-3 text-center">
          <h1 className="text-2xl font-bold">
            Hi! Welcome,{" "}
            <span className="text-primary capitalize">{personName}</span>
          </h1>

          <p className="mt-1 text-text-muted">
            Here's what's happening with your content today.
          </p>
        </div>
      </section>

      {/* Metrics Data Section */}
      <section>
        <Metrics />
      </section>

      {/* History Section  */}
      <section className="min-h-0 flex flex-1 flex-col px-3 pb-4">
        <div className="px-3 shrink-0">
          <h2 className="text-xl font-bold">History Responses:</h2>
          <p className="my-1 text-text-muted text-base">
            All your generated content in one place.
          </p>
        </div>

        {/* Divider  */}
        <div className="w-full my-2 border-b border-border"></div>

        <div className="min-h-0 flex-1 overflow-y-auto scrollbar-none pr-2">
          {response && <History />}
          {response.length === 0 && <span>No Responses Generated</span>}
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
