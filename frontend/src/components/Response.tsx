const Response = () => {
  return (
    <>
      {/* Response section */}
      <section className="w-full py-2 px-1 flex flex-col">
        <div className="flex justify-between items-center">
          <h2 className="text-xl text-primary font-semibold">
            AI Generated Response
          </h2>

          <div>copy text icon</div>
        </div>

        <article className="flex-1 h-100 mt-4 px-2 py-3 text-sm border border-border-strong rounded md:max-h-100 overflow-y-auto scrollbar-thin"></article>

        <div className="text-right">
          <span className="text-xs text-text-muted">600 words</span>
        </div>
      </section>
    </>
  );
};

export default Response;
