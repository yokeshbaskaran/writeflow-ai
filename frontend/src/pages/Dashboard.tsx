import History from "../components/History";
import { useAppContext } from "../context/AppContext";

const Dashboard = () => {
  const { authUser } = useAppContext();
  const personName = authUser?.username;

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <div className="shrink-0">
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
      </div>

      <div className="flex flex-col items-start overflow-hidden px-3 pb-3">
        <div className="px-3">
          <h2 className="text-xl font-bold">History Responses:</h2>
          <p className="my-2 text-text-muted text-base">
            All your generated content in one place.
          </p>
        </div>

        <div className="w-full my-2 border-b border-border"></div>

        <div className="h-full overflow-y-auto scrollbar-none pr-2">
          <History />
        </div>
      </div>
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
  const { response, authUser } = useAppContext();

  // creditsData
  const creditsData = authUser?.credits || 0;
  // wordsData
  const generateWordCount = () => {
    const totalWords = response?.reduce(
      (sum, item) => sum + (item.words_created || 0),
      0,
    );
    // console.log("totalWords:", totalWords);
    return totalWords;
  };
  const wordCountFunction = generateWordCount();
  const wordsData = wordCountFunction || 0;

  // contentData
  const contentData = response?.length || 0;

  const credits = {
    icon: <HiOutlineSparkles size={30} />,
    title: "Credits left",
    data: creditsData,
  };

  const words = {
    icon: <IoDocumentTextSharp size={30} />,
    title: "Words generated",
    data: wordsData,
  };

  const content = {
    icon: <HiOutlinePencilAlt size={30} />,
    title: "Contents created",
    data: contentData,
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
