// import { useState } from "react";
import { API_URL, useAppContext } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

// type GenerateContentType = {
//   content_type: string;
//   style: string;
//   topic: string;
//   tone: string;
//   length: number;
//   instructions: string;
// };

const Generate = () => {
  // const [type, setType] = useState("");
  // const [style, setStyle] = useState("");
  // const [topic, setTopic] = useState("");
  // const [tone, setTone] = useState("");
  // const [instructions, setInstructions] = useState("");

  const { setAiResponse } = useAppContext();

  const handleSubmit = (
    e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    e.preventDefault();
  };

  // generate a AI Response
  const generateResponse = async () => {
    console.log("Generate content page!");
    const data = {
      content_type: "linkedin-post",
      topic: "Learning FastAPI",
      tone: "professional",
      length: "medium",
      style: "Tutorial",
      instructions: "return the JSON format as content response",
    };

    // const userContent: GenerateContentType = {
    //   content_type: type,
    //   style,
    //   topic,
    //   tone,
    //   length,
    //   instructions,
    // };

    try {
      // if (!type.trim()) {
      //   toast.error("Email is required");
      //   return;
      // }

      const token = localStorage.getItem("token");

      const response = await axios.post(API_URL + "/generate", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      const dbData = response.data;
      const cleanedContent = dbData.content
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
      // console.log("generate-data!:", response, dbData);
      const parsedResponse = JSON.parse(cleanedContent);
      setAiResponse(parsedResponse);
      console.log("parsedResponse", parsedResponse);

      toast.success(dbData.message);

      // sets the useState
      // setType("");
      // setStyle("");
      // setTopic("");
      // setTone("");
      // setInstructions("");
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
            <div className="w-1/2 flex flex-col">
              <label htmlFor="type" className="text-text font-semibold">
                Content Type
              </label>
              <select
                className="mt-2 p-2 bg-bg border border-border rounded focus:outline-primary"
                id="type"
                name="type"
              >
                <option>LinkedIn Post</option>
                <option>Blog Post</option>
                <option>Create a Tweet X post</option>
                <option>Instagram Caption</option>
                <option>SEO titles</option>
                <option>Resume Bullet Points</option>
              </select>
            </div>

            <div className="w-1/2 flex flex-col">
              <label htmlFor="style" className="font-semibold">
                Style
              </label>
              <select
                className="mt-2 p-2 bg-bg border border-border rounded focus:outline-primary"
                id="style"
                name="style"
              >
                <option>Informative</option>
                <option>Tutorial</option>
                <option>Step-by-Step guide</option>
                <option>Case Study</option>
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
                className="w-full h-28 mt-2 p-2 pb-5 border focus:border-border rounded outline-primary resize-none scrollbar-none"
                id="topic"
                placeholder=" Write a blog post about benefits of using Al in daily life"
              ></textarea>
              <span className="px-1 absolute bottom-2 right-2 text-xs border border-border rounded bg-bg-hover text-text-muted">
                words count: 58/500
              </span>
            </div>
          </div>

          {/* Tone and Length */}
          <section className="w-full flex items-start gap-2 text-sm">
            <div className="w-1/2 flex flex-col">
              <label htmlFor="tone" className="font-semibold">
                Tone
              </label>
              <select
                className="mt-2 p-2 bg-bg border border-border rounded focus:outline-primary"
                id="tone"
                name="tone"
              >
                <option>Casual</option>
                <option>Technical</option>
                <option>Professional</option>
                <option>Educational</option>
              </select>
            </div>

            <div className="w-1/2 flex flex-col">
              <label htmlFor="length" className="font-semibold">
                Length
              </label>
              <select
                className="mt-2 p-2 bg-bg border border-border rounded focus:outline-primary"
                id="length"
                name="length"
              >
                <option>Short (100-200 words)</option>
                <option> semibold (300-500 words)</option>
                <option>Long (600-1000 words)</option>
                <option>Detailed (1000-1500 words)</option>
              </select>
            </div>
          </section>

          <div className="w-full flex flex-col text-sm">
            <label htmlFor="instructions" className="font-semibold">
              Additional Instructions (Optional)
            </label>

            <div className="relative">
              <textarea
                className="w-full h-18 mt-2 p-2 pb-5 border border-border-strong focus:outline-primary resize-none scrollbar-none"
                id="instructions"
                placeholder="E.g. Include examples, statistics, call to action ... 0/300"
              ></textarea>
            </div>
          </div>

          <button
            onClick={generateResponse}
            className="w-full p-2 text-base text-white bg-primary rounded hover:bg-primary-hover cursor-pointer"
          >
            Generate Response
          </button>
        </form>
      </section>
    </>
  );
};

export default Generate;
