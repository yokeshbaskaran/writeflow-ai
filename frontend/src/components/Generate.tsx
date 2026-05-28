import { useState } from "react";
import { API_URL, useAppContext } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

type GenerateContentType = {
  content_type: string;
  topic: string;
  tone: string;
  length: string;
  instructions: string;
};

// array of options
const typeOptions = [
  "General post",
  "LinkedIn Post",
  "Blog Post",
  "Create a Tweet(X) post",
  "Instagram Captions",
  "SEO titles",
  "Resume Bullet Points",
];

const toneOptions = ["Casual", "Technical", "Professional", "Educational"];

const lengthOptions = [
  "Short (100-200 words)",
  "Medium (300-500 words)",
  "Long (600-1000 words)",
  "Detailed (1000-1500 words)",
];

const Generate = () => {
  const [type, setType] = useState("");
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("");
  const [length, setLength] = useState("");
  const [instructions, setInstructions] = useState("");
  const [displayText, setDisplayText] = useState(false);

  // Count words
  const topicWordCount = topic.trim() ? topic.trim().split(/\s+/).length : 0;
  const { setAiResponse } = useAppContext();

  const handleSubmit = (
    e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    e.preventDefault();
  };

  // generate a AI Response
  const generateResponse = async () => {
    console.log("Generate content page!");
    setDisplayText(true);

    try {
      if (!type.trim() || !topic.trim() || !length.trim()) {
        toast.error("Enter all details to generate!");
        return;
      }

      const data: GenerateContentType = {
        content_type: type,
        topic,
        tone,
        length,
        instructions,
      };

      const token = localStorage.getItem("token");

      const response = await axios.post(API_URL + "/generate", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const dbData = response.data;
      // console.log("generate-data!:", dbData);
      const cleanedContent = dbData.content
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const parsedResponse = JSON.parse(cleanedContent);
      setAiResponse(parsedResponse);
      // console.log("parsedResponse:", parsedResponse);
      toast.success("Your Response generated");

      // sets the useState
      setType("");
      setTopic("");
      setTone("");
      setLength("");
      setInstructions("");
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
    } finally {
      setDisplayText(false);
    }
  };

  return (
    <>
      <section className="w-full py-2 px-2 flex flex-col border border-border rounded">
        {/* Content section */}
        <h2 className="text-xl text-primary font-semibold">
          Generate New Content
        </h2>

        <form
          className="mt-2 flex flex-col items-start gap-3"
          onSubmit={handleSubmit}
        >
          {/* Type and Style  */}

          <section className="w-full px-1 pt-2 flex justify-center items-start gap-2 text-sm">
            {/* Content Type  */}

            <div className="w-full flex flex-col">
              <label htmlFor="type" className="text-text font-semibold">
                Content Type
              </label>
              <select
                className="mt-2 p-2 bg-bg border border-border rounded focus:outline-primary"
                id="type"
                name="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">choose type</option>
                {typeOptions.map((item, idx) => (
                  <option key={idx} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </section>

          {/* Topic  */}
          <div className="w-full flex flex-col text-sm ">
            <label htmlFor="topic" className="font-semibold">
              Topic / Prompt
            </label>

            <div className="relative">
              <textarea
                className="w-full h-28 mt-2 p-2 pb-5 border border-border-strong rounded outline-primary resize-none scrollbar-none"
                id="topic"
                placeholder=" Write a blog post about benefits of using Al in daily life"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                // onChange={(e) => {
                //   const text = e.target.value;
                //   const words = text.trim().split(/\s+/);

                //   if (words.length <= 500 || text === "") {
                //     setTopic(text);
                //   }
                // }}
              ></textarea>
              <span className="px-1 absolute bottom-2 right-1 text-xs rounded text-text-muted">
                {topicWordCount > 0 && `words: ${topicWordCount}`}
              </span>
            </div>
          </div>

          {/* Tone and Length */}
          <section className="w-full flex items-start gap-2 text-sm">
            {/* Tone  */}
            <div className="w-1/2 flex flex-col">
              <label htmlFor="tone" className="font-semibold">
                Tone <span className="pl-1 text-text-muted">(Optional)</span>
              </label>
              <select
                className="mt-2 p-2 bg-bg border border-border rounded focus:outline-primary"
                id="tone"
                name="tone"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
              >
                <option value="">choose tone</option>
                {toneOptions.map((item, idx) => (
                  <option key={idx} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/*   Length */}
            <div className="w-1/2 flex flex-col">
              <label htmlFor="length" className="font-semibold">
                Length
              </label>
              <select
                className="mt-2 p-2 bg-bg border border-border rounded focus:outline-primary"
                id="length"
                name="length"
                value={length}
                onChange={(e) => setLength(e.target.value)}
              >
                <option value="">choose length</option>
                {lengthOptions.map((item, idx) => (
                  <option key={idx} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </section>

          <div className="w-full flex flex-col text-sm">
            <label htmlFor="instructions" className="font-semibold">
              Additional Instructions{" "}
              <span className="pl-1 text-text-muted">(Optional)</span>
            </label>

            <div className="relative">
              <textarea
                className="w-full h-20 mt-2 p-2 pb-5 border border-border-strong focus:outline-primary resize-none scrollbar-none"
                id="instructions"
                placeholder="E.g. Include examples, statistics, call to action"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              ></textarea>
            </div>
          </div>

          <button
            disabled={displayText}
            onClick={generateResponse}
            className={`w-full p-2 text-base text-white bg-primary rounded hover:bg-primary-hover cursor-pointer ${displayText && "opacity-85"}`}
          >
            {displayText ? "Generating..." : "  Generate Response"}
          </button>
        </form>
      </section>
    </>
  );
};

export default Generate;
