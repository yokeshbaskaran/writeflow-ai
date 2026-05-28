import { useState } from "react";
import { BiCopy } from "react-icons/bi";
import { MdDone } from "react-icons/md";
import {
  type AIResponseType,
  API_URL,
  useAppContext,
} from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const Response = () => {
  const [textCopied, setTextCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const { aiResponse, setAiResponse } = useAppContext();

  // useEffect(() => {
  //   if (aiResponse) {
  //     localStorage.setItem("aiResponse", JSON.stringify(aiResponse));
  //     console.log("aiResponse:", aiResponse);
  //   }
  // }, [aiResponse]);

  const formattedText = `
${aiResponse?.title ?? ""}
---
${aiResponse?.introduction ?? ""}

${
  aiResponse?.sections
    ?.map((section) => `${section.heading}\n-----\n${section.content}`)
    .join("\n\n") ?? ""
}

${aiResponse?.conclusion ?? ""}
`;

  // copying the response
  const handleCopiedText = async () => {
    await navigator.clipboard.writeText(formattedText);

    setTextCopied(true);
    setTimeout(() => {
      setTextCopied(false);
    }, 2000);
  };

  const saveResponse = async (generatedContent: AIResponseType) => {
    console.log("generatedResponse:", generatedContent);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first");
        return;
      }

      const generatedWords = formattedText.split(" ").length;
      // response data
      const payload = {
        title: generatedContent.title,
        content_type: generatedContent.content_type,
        introduction: generatedContent.introduction,
        sections: generatedContent.sections,
        conclusion: generatedContent.conclusion,
        words_created: generatedWords,
      };
      // console.log("save to db response:", payload);

      const response = await axios.post(API_URL + "/save", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const resData = response.data;
      toast.success("Content saved!");
      setSaved(true);
      setAiResponse(null);
      console.log("resData:", resData);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 401) {
          toast.error("Unauthorized");
        } else if (status === 422) {
          toast.error("Invalid data");
        } else if (status === 500) {
          toast.error("Server error");
        } else {
          toast.error("Content not saved");
        }
      }
    }
  };

  const clearResponse = () => {
    setAiResponse(null);
  };

  return (
    <>
      {/* Response section */}
      <section className="w-full py-2 px-1 flex flex-col">
        <div className="flex justify-between items-center">
          <h2 className="text-xl text-primary font-semibold">
            AI Generated Response
          </h2>

          {aiResponse && (
            <button
              onClick={clearResponse}
              className="mx-2 px-2 py-1 text-sm text-red-700 border border-red-900 rounded hover:text-white hover:bg-red-900 cursor-pointer"
            >
              Clear <span className="pl-1">X</span>
            </button>
          )}
        </div>

        {aiResponse && (
          <>
            <div className="relative">
              <article className="flex-1 h-100 mt-4 px-3 py-3 text-sm text-justify border border-border-strong rounded md:max-h-100 overflow-y-auto scrollbar-none">
                <h1 className="text-2xl font-bold mb-4">{aiResponse?.title}</h1>

                <p className="mb-5 indent-6">{aiResponse?.introduction}</p>

                {aiResponse?.sections?.map((section, index) => (
                  <div key={index} className="mb-5">
                    <h2 className="text-lg font-semibold">
                      {section?.heading}
                    </h2>

                    {/* divider  */}
                    <div className="my-2 border-b border-border"></div>

                    <ul className="list-disc pl-5 space-y-2">
                      {section.content
                        ?.match(/[^.!?]+[.!?]+/g)
                        ?.map((point, i) => (
                          <li key={i} className="leading-5">
                            {point.trim()}
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}

                <h3 className="font-semibold mt-4 mb-2">Conclusion</h3>
                {/* divider  */}
                <div className="my-2 border-b border-border"></div>
                <p>{aiResponse?.conclusion}</p>
              </article>

              <div className="mt-3 mx-3 absolute top-0 right-0">
                <button
                  onClick={handleCopiedText}
                  className="p-2 bg-bg  text-primary border-2 border-border rounded-4xl hover:text-white hover:bg-primary cursor-pointer"
                >
                  {textCopied ? <MdDone size={23} /> : <BiCopy size={23} />}
                </button>
              </div>
            </div>

            <div className="p-2 flex justify-between items-center">
              <span className="text-xs text-text-muted">
                words: {formattedText.split(" ").length}
              </span>

              <button
                onClick={() => saveResponse(aiResponse)}
                disabled={saved}
                className={`p-2 text-sm text-white bg-primary rounded ${
                  saved
                    ? "opacity-65 cursor-not-allowed"
                    : "hover:bg-primary-hover cursor-pointer"
                }`}
              >
                Save to collection
              </button>
            </div>
          </>
        )}

        {!aiResponse && (
          <div className="flex-1 h-100 mt-4 px-3 py-5 text-sm text-justify border border-border-strong rounded md:max-h-100 overflow-y-auto scrollbar-thin">
            <p className="py-8 text-text-muted text-center">
              {saved
                ? "Your response is stored."
                : "No AI response generated yet."}
            </p>
          </div>
        )}
      </section>
    </>
  );
};

export default Response;
