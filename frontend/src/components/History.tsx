import { PiEye } from "react-icons/pi";
import { BiCopy } from "react-icons/bi";
import { IoTrashOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  type OmitContentType,
  type AllResponseType,
  API_URL,
  useAppContext,
} from "../context/AppContext";
import { MdDone } from "react-icons/md";
import toast from "react-hot-toast";
import { LuDot } from "react-icons/lu";
import DeletePopup from "./DeletePopup";
import ContentTypeIcon from "./ContentTypeIcon";

const RecentResponse = () => {
  const [textCopied, setTextCopied] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { response, setResponse } = useAppContext();

  useEffect(() => {
    async function getAllResponses() {
      const token = localStorage.getItem("token");
      const res = await axios.get(API_URL + "/responses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const dbData = res.data;
      console.log("all-responses:", dbData);
      setResponse(dbData);
    }

    getAllResponses();
  }, [setResponse]);

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

  // if words greater than 20, shows ...
  const readMoreWords = (words: string) => {
    // console.log("words:-", words.length);
    const returnValue = words.length > 30 ? words.slice(0, 30) + "..." : words;
    return returnValue;
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

  const handleDeleteResponse = async (responseID: string) => {
    console.log("Delete response!");

    const token = localStorage.getItem("token");

    if (!token) return null;

    try {
      if (!responseID.trim()) {
        toast.error("Response id is required");
        return;
      }

      const response = await axios.delete(API_URL + `/response/${responseID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const dbData = response.data;
      setResponse((prev) => prev?.filter((item) => item._id !== responseID));

      // console.log("login-data!:", response, dbData);

      toast.success(dbData.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const detail = error.response?.data?.detail;

        toast.error(
          Array.isArray(detail)
            ? detail[0].msg
            : (detail ?? "Something went wrong"),
        );
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <>
      <main>
        {/* History of Responses  */}
        {response?.length > 0 && (
          <section className="w-full px-1 py-1 overflow-y-auto">
            <div className="flex flex-col gap-4 overflow-y-auto">
              {/* Single Response */}
              {response &&
                response?.map((item, idx) => (
                  <div
                    key={idx}
                    className="w-full bg-bg-soft border border-border rounded-xl flex flex-col md:flex-row md:items-center md:justify-between p-3 md:p-2"
                  >
                    {/* Left */}
                    <div className="flex items-center md:items-center flex-1">
                      <ContentTypeIcon type={item.content_type} />
                      <div className="ml-3 flex-1">
                        <p className="text-sm">
                          {readMoreWords(item?.content?.title)}
                          {/* {item.content.title.slice(0, 30)}... */}
                        </p>

                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span className="text-sm text-text-muted capitalize">
                            {item?.content_type}
                          </span>

                          <LuDot size={18} />

                          <span className="text-sm text-text-muted">
                            {item?.words_created} words
                          </span>
                        </div>

                        {/* Mobile Date */}
                        <p className="mt-1 text-xs text-text-muted">
                          {formatDate(item.created_at)}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex justify-end gap-2 mt-3 md:mt-0">
                        <button className="border border-border rounded-lg p-2 cursor-pointer">
                          <PiEye size={17} />
                        </button>

                        <button
                          onClick={() => handleCopiedText(item)}
                          className="border border-border rounded-lg p-2 cursor-pointer"
                        >
                          {textCopied && copiedId === item._id ? (
                            <MdDone size={18} />
                          ) : (
                            <BiCopy size={18} />
                          )}
                        </button>

                        <button
                          onClick={() => setDeleteId(item._id)}
                          className="border border-border rounded-lg p-2 text-red-500 cursor-pointer"
                        >
                          <IoTrashOutline size={18} />
                        </button>

                        {deleteId && (
                          <DeletePopup
                            responseID={deleteId}
                            onCancel={() => setDeleteId(null)}
                            onConfirm={() => {
                              handleDeleteResponse(deleteId);
                              setDeleteId(null);
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default RecentResponse;
