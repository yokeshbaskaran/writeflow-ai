import RecentResponse from "../components/RecentResponse";
import { useAppContext } from "../context/AppContext";

const Dashboard = () => {
  const { authUser } = useAppContext();
  const personName = authUser?.username;

  return (
    <div>
      {/* <h2>This is Dashboard</h2> */}
      <div className="my-3 mx-3 text-center">
        <h1 className="text-2xl font-bold">
          Hi! Welcome,{" "}
          <span className="text-primary capitalize">{personName}</span>
        </h1>

        <p className="mt-1 text-text-muted">
          Here's what's happening with your content today.
        </p>
      </div>
      <ContentData />
      <RecentResponse />
    </div>
  );
};

export default Dashboard;

import { HiOutlineSparkles } from "react-icons/hi2";
import { IoDocumentTextSharp } from "react-icons/io5";
import { HiOutlinePencilAlt } from "react-icons/hi";

// type DisplayDataType = {
//   title: string;
//   data: string;
//   icon: React.ReactNode;
// };

export const ContentData = () => {
  const credits = {
    icon: <HiOutlineSparkles size={30} />,
    title: "Credits left",
    data: 120,
  };

  const words = {
    icon: <IoDocumentTextSharp size={30} />,
    title: "Words generated",
    data: "18.5k",
  };

  const content = {
    icon: <HiOutlinePencilAlt size={30} />,
    title: "Contents created",
    data: "50",
  };

  return (
    <>
      <section className="my-5 p-2 flex max-md:flex-col items-center justify-between gap-5">
        {/* Credits left  */}
        <div className="w-full px-4 py-3 flex items-center gap-3 border border-border-strong rounded">
          <div className="p-2 text-white bg-violet-700 border rounded-xl">
            {credits.icon}
          </div>

          <div className="flex flex-col items-start gap-1">
            <h2 className="text-sm text-text-muted font-semibold">
              {credits.title}
            </h2>
            <span className="text-text text-xl font-bold">{credits.data}</span>
          </div>
        </div>

        {/* Words generated  */}
        <div className="w-full px-4 py-3 flex items-center gap-3 border border-border-strong rounded">
          <div className="p-2 text-white bg-blue-700 border rounded-xl">
            {words.icon}
          </div>

          <div className="flex flex-col items-start gap-1">
            <h2 className="text-sm text-text-muted font-semibold">
              {words.title}
            </h2>
            <span className="text-text text-xl font-bold">{words.data}</span>
          </div>
        </div>

        {/* Words generated  */}
        <div className="w-full px-4 py-3 flex items-center gap-3 border border-border-strong rounded">
          <div className="p-2 text-white bg-green-700 border rounded-xl">
            {content.icon}
          </div>

          <div className="flex flex-col items-start gap-1">
            <h2 className="text-sm text-text-muted font-semibold">
              {content.title}
            </h2>
            <span className="text-text text-xl font-bold">{content.data}</span>
          </div>
        </div>
      </section>
    </>
  );
};
