import { useState } from "react";
import { BiCopy } from "react-icons/bi";
import { MdDone } from "react-icons/md";
import { useAppContext } from "../context/AppContext";

const Response = () => {
  const [textCopied, setTextCopied] = useState(false);
  const { aiResponse } = useAppContext();

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

  const handleCopiedText = async () => {
    await navigator.clipboard.writeText(formattedText);

    setTextCopied(true);
    setTimeout(() => {
      setTextCopied(false);
    }, 3000);
  };

  return (
    <>
      {/* Response section */}
      <section className="w-full py-2 px-1 flex flex-col">
        <div className="flex justify-between items-center">
          <h2 className="text-xl text-primary font-semibold">
            AI Generated Response
          </h2>
        </div>

        {aiResponse && (
          <div>
            <div className="relative">
              <article className="flex-1 h-100 mt-4 px-3 py-5 text-sm text-justify border border-border-strong rounded md:max-h-100 overflow-y-auto scrollbar-thin">
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

              <div className="mt-2 mx-5 absolute top-0 right-0">
                <button
                  onClick={handleCopiedText}
                  className="p-2 bg-bg text-primary border border-border rounded-4xl hover:text-white hover:bg-primary cursor-pointer"
                >
                  {textCopied ? <MdDone size={23} /> : <BiCopy size={23} />}
                </button>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-text-muted">
                {formattedText.split(" ").length} words
              </span>
            </div>
          </div>
        )}

        {!aiResponse && (
          <div className="flex-1 h-100 mt-4 px-3 py-5 text-sm text-justify border border-border-strong rounded md:max-h-100 overflow-y-auto scrollbar-thin">
            <p className="py-8 text-text-muted text-center">
              No AI response generated yet.
            </p>
          </div>
        )}
      </section>
    </>
  );
};

export default Response;
