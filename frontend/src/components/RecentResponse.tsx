import { PiEye } from "react-icons/pi";
import { BiCopy } from "react-icons/bi";
import { IoTrashOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";
import { type AIResponseType, API_URL } from "../context/AppContext";
import { MdDone } from "react-icons/md";
import toast from "react-hot-toast";

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
---
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
      <div className="overflow-x-auto rounded-xl border border-border-strong bg-bg-hover shadow-sm">
        <table className="min-w-full divide-y divide-border-strong">
          {/* Headings  */}
          <thead className="bg-bg">
            <tr className="divide-x divide-border-strong">
              <th className="px-1 py-4 text-center text-sm font-bold text-primary">
                Title
              </th>
              <th className="px-3 text-center text-sm font-bold text-primary">
                Type
              </th>
              <th className="px-1 max-md:hidden text-center text-sm font-bold text-primary">
                Words
              </th>
              <th className="max-md:hidden text-center text-sm font-bold text-primary">
                Created
              </th>
              <th className="text-center text-sm font-bold text-primary">
                Actions
              </th>
            </tr>
          </thead>

          {/* Responses  */}
          <tbody className="divide-y divide-border-strong bg-bg">
            {response &&
              response?.map((item, idx) => (
                <tr key={idx} className="transition bg-bg hover:bg-bg-hover">
                  <td className="w-2/6 px-2 py-5 font-normal text-center">
                    {item?.content?.title}
                  </td>

                  <td className="w-1/6 px-4 py-4 text-center">
                    <span className="rounded-full bg-blue-100 px-3 py-2 text-xs font-medium text-blue-700 capitalize">
                      {item?.content_type}
                    </span>
                  </td>

                  <td className="w-1/6 max-md:hidden px-2 py-4 text-center text-sm">
                    {countWords(item.content)}
                  </td>

                  <td className="w-1/6 max-md:hidden px-2 py-4 text-center text-sm text-text-muted">
                    {formatDate(item.created_at)}
                  </td>

                  <td className="w-1/6">
                    <div className="flex items-center justify-center gap-2">
                      <button className="border border-border rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-blue-600 cursor-pointer">
                        <PiEye size={17} />
                      </button>

                      <button
                        onClick={() => handleCopiedText(item)}
                        className="border border-border rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-green-600 cursor-pointer"
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
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RecentResponse;
