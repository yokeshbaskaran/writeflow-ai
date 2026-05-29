import { DoughnutChart, LineChart } from "../components/Chart";
import History from "../components/History";
import Metrics from "../components/Metrics";
import { useAppContext } from "../context/AppContext";

const Dashboard = () => {
  const { authUser, response } = useAppContext();
  const personName = authUser?.username;

  return (
    <>
      <main className="px-2 flex max-md:flex-col gap-2 md:overflow-hidden">
        {/* Left Section */}
        <section className="shrink-0 md:w-7/12">
          <div className="flex flex-col gap-2">
            <div className="my-2 mx-3 text-left">
              <h1 className="text-2xl font-bold">
                Hi! Welcome,{" "}
                <span className="text-primary capitalize">{personName}</span>
              </h1>

              <p className="mt-1 text-sm text-text-muted">
                Here's what's happening with your content today.
              </p>
            </div>

            <div>
              {/* Metrics Data Section */}
              <Metrics />
            </div>

            {/* Charts */}
            <section className="p-2 grid grid-cols-1 xl:grid-cols-3 gap-3">
              {/* Usage Overview */}
              <div className="xl:col-span-2 rounded-2xl border border-border bg-bg-soft p-4">
                <LineChart />
              </div>

              {/* Content Type */}
              <div className="rounded-2xl border border-border bg-bg-soft p-3">
                <DoughnutChart />
              </div>
            </section>
          </div>
        </section>

        {/* Right Section - History */}
        <section className="md:w-5/12 min-h-0 flex flex-1 flex-col px-3 py-2 pb-2">
          <div className="px-2 shrink-0">
            <h2 className="text-xl font-bold">History Responses:</h2>
            <p className="my-1 text-text-muted text-sm">
              All your generated content in one place.
            </p>
          </div>

          {/* Divider  */}
          <div className="w-full my-2 border-b border-border"></div>

          <div className="min-h-0 mb-1 flex-1 overflow-y-auto scrollbar-none">
            {response && <History />}
            {response.length === 0 && <span>No Responses Generated</span>}
          </div>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
