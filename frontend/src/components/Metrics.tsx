import { HiOutlineSparkles } from "react-icons/hi2";
import { IoDocumentTextSharp } from "react-icons/io5";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { useAppContext } from "../context/AppContext";

const Metrics = () => {
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

  //   Metrics Data lists
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
      <section className="my-3 px-2 flex max-md:flex-col items-center justify-between gap-5">
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

export default Metrics;
