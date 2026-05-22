const Generate = () => {
  const handleSubmit = (
    e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    e.preventDefault();
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
                className="mt-2 p-2 border border-border rounded focus:outline-primary"
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
                className="mt-2 p-2 border border-border rounded focus:outline-primary"
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
                className="w-full h-28 mt-2 p-2 pb-5 border focus:border-border rounded outline-primary"
                // overflow-y-scroll scrollbar-none"
                id="topic"
                placeholder=" Write a blog post about benefits of using Al in daily life"
              ></textarea>
              <span className="absolute bottom-2 right-2 text-xs text-text-muted">
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
                className="mt-2 p-2 border border-border rounded focus:outline-primary"
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
                className="mt-2 p-2 border border-border rounded focus:outline-primary"
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
                className="w-full h-18 mt-2 p-2 pb-5 border border-border-strong focus:outline-primary"
                id="instructions"
                placeholder="E.g. Include examples, statistics, call to action ... 0/300"
              ></textarea>
              <span className="absolute bottom-2 right-2 text-xs text-text-muted">
                words count: 58/500
              </span>
            </div>
          </div>

          <button className="w-full p-2 text-base text-white bg-primary rounded hover:bg-primary-hover cursor-pointer">
            Generate Response
          </button>
        </form>
      </section>
    </>
  );
};

export default Generate;
