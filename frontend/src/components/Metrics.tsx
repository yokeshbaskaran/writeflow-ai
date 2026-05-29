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
    bgColor: "bg-green-700",
  };

  const words = {
    icon: <IoDocumentTextSharp size={30} />,
    title: "Words generated",
    data: wordsData,
    bgColor: "bg-blue-700",
  };

  const content = {
    icon: <HiOutlinePencilAlt size={30} />,
    title: "Contents created",
    data: contentData,
    bgColor: "bg-primary",
  };

  const metricsList = [credits, words, content];

  return (
    <>
      <section className="my-3 px-2 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-7">
        {/* Credits left  */}
        {metricsList.map((item, idx) => (
          <div
            key={idx}
            className="w-full px-4 py-3 flex items-center gap-3 bg-bg-soft border border-border-strong rounded-xl"
          >
            <div className={`p-2 text-white border rounded-xl ${item.bgColor}`}>
              {item.icon}
            </div>

            <div className="flex flex-col items-start gap-1">
              <h2 className="text-sm text-text-muted font-semibold">
                {item.title}
              </h2>
              <span className="text-text text-xl font-bold">{item.data}</span>
            </div>
          </div>
        ))}

        {/* Words generated  */}
      </section>
    </>
  );
};

export default Metrics;
