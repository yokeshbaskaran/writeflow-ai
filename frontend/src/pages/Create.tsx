import Generate from "../components/Generate";
import Response from "../components/Response";

const Create = () => {
  return (
    <>
      <main className="bg-bg">
        {/* 1. Greetings  */}
        <header className="py-2 text-center">
          <h1 className="text-2xl text-text font-bold">Generate New Content</h1>
          <p className="text-base text-text-muted">
            Create amazing content with the power of AI in seconds.
          </p>
        </header>

        {/* 2. Generate content/response  */}
        <section className="w-full py-5 flex max-md:flex-col justify-center items-stretch gap-7 md:gap-3">
          <Generate />
          <Response />
        </section>
      </main>
    </>
  );
};

export default Create;
