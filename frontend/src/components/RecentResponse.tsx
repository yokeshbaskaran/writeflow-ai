import { PiEye } from "react-icons/pi";
import { BiCopy } from "react-icons/bi";
import { IoLogoLinkedin, IoTrashOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";
import { type AIResponseType, API_URL } from "../context/AppContext";
import { MdDone } from "react-icons/md";
import toast from "react-hot-toast";
import { LuDot } from "react-icons/lu";

type OmitContentType = Omit<AIResponseType, "content_type">;

type AllResponseType = {
  _id: string;
  user_email: string;
  created_at: string;
  content: OmitContentType;
  content_type: string;
};

const RecentResponse = () => {
  const [response, setResponse] = useState<AllResponseType[] | null>(null);
  const [textCopied, setTextCopied] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    async function getAllResponses() {
      const token = localStorage.getItem("token");
      const response = await axios.get(API_URL + "/responses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const dbData = response.data;
      console.log("responses:::", dbData);
      setResponse(dbData);
    }

    getAllResponses();
  }, []);

  // format the date
  const formatDate = (isoTimestamp: string) => {
    const time = new Date(
      isoTimestamp.endsWith("Z") ? isoTimestamp : `${isoTimestamp}Z`,
    ).getTime();
    const now = new Date().getTime();

    const seconds = Math.floor((now - time) / 1000);

    const intervals = [
      { label: "y", seconds: 31536000 },
      { label: "m", seconds: 2592000 },
      { label: "w", seconds: 604800 },
      { label: "d", seconds: 86400 },
      { label: "hr", seconds: 3600 },
      { label: "min", seconds: 60 },
      { label: "sec", seconds: 1 },
    ];

    for (const { label, seconds: unit } of intervals) {
      const count = Math.floor(seconds / unit);
      if (count >= 1) {
        return `${count} ${label}`;
      }
    }

    return "now";
  };

  // format all words
  const getFormattedText = (words: OmitContentType) => {
    const formattedText = `
${words?.title ?? ""}
${words?.introduction ?? ""}
${
  words?.sections
    ?.map((section) => `${section.heading}\n-----\n${section.content}`)
    .join("\n\n") ?? ""
}
${words?.conclusion ?? ""}
`;

    return formattedText;
  };

  // count the format all words
  const countWords = (content: OmitContentType) => {
    const text = getFormattedText(content);
    return text.split(" ").length;
  };

  // copying the response
  const handleCopiedText = async (item: AllResponseType) => {
    const text = getFormattedText(item.content);
    await navigator.clipboard.writeText(text);

    setCopiedId(item._id);
    setTextCopied(true);
    toast.success("Content copied!");
    setTimeout(() => {
      setTextCopied(false);
    }, 2000);
  };

  return (
    <>
      <main>
        <div className="px-3">
          <h2 className="text-xl font-bold">History Responses:</h2>
          <p className="my-2 text-text-muted text-base">
            All your generated content in one place.
          </p>
        </div>

        {/* Responses  */}
        <section className="w-200">
          <div className="flex flex-col gap-5">
            {response &&
              response?.map((item, idx) => (
                <div
                  key={idx}
                  className="w-full p-2 flex items-center justify-between border border-border rounded-lg"
                >
                  <div className="w-2/4 flex items-center">
                    <div className="p-2 text-white bg-blue-700 border rounded-xl">
                      <IoLogoLinkedin size={25} />
                    </div>

                    <div className="w-full mx-4 flex flex-col items-start gap-1">
                      <p className="font-normal text-base text-center">
                        {item?.content?.title}
                      </p>

                      <div className="w-3/4 flex items-center gap-2">
                        <span className="w-full rounded-full text-sm font-medium text-text-muted capitalize">
                          {item?.content_type}
                        </span>
                        <LuDot size={25} />
                        <p className="w-full text-text-muted text-sm">
                          {countWords(item.content)} words
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="w-1/4 max-md:hidden px-2 py-4 text-center text-sm text-text-muted">
                    {formatDate(item.created_at)}
                  </div>

                  <div className="w-1/4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="border border-border rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-blue-600 cursor-pointer">
                        <PiEye size={17} />
                      </button>

                      <button
                        className="border border-border rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-green-600 cursor-pointer"
                        onClick={() => handleCopiedText(item)}
                      >
                        {textCopied && copiedId === item._id ? (
                          <MdDone size={19} />
                        ) : (
                          <BiCopy size={19} />
                        )}
                      </button>

                      <button className="border border-border rounded-lg p-2 text-red-500 transition hover:bg-red-50 hover:text-red-600 cursor-pointer">
                        <IoTrashOutline size={19} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default RecentResponse;
