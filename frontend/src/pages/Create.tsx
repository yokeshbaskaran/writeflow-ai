import Generate from "../components/Generate";
import Response from "../components/Response";

const Create = () => {
  return (
    <>
      <main className="bg-bg">
        {/* 1. Greetings  */}
        <header className="py-2 text-center">
          <h1 className="text-2xl text-text font-bold">Generate New Content</h1>
          <p className="py-1 text-sm text-text-muted">
            Create amazing content with the power of AI in seconds.
          </p>
        </header>

        {/* 2. Generate content/response  */}
        <section className="w-full md:px-5 px-2 py-3 flex max-md:flex-col justify-center items-stretch gap-8 md:gap-5">
          <Generate />
          <Response />
        </section>
      </main>
    </>
  );
};

export default Create;
