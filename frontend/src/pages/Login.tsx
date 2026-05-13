import Footer from "./Footer";

const Login = () => {
  return (
    <>
      <section className="yoki w-full h-screen flex flex-col justify-start items-center">
        <div className="mt-10 mb-5 flex flex-col items-center gap-5">
          <h2 className="text-4xl font-bold">writeflow.ai</h2>
          <h3 className="text-lg font-medium">Login/SignUp</h3>
        </div>

        <div className="w-110 mt-5 px-15 pt-5 pb-5 border border-zinc-400 rounded">
          <div className="w-full flex flex-col">
            {/* Email Address: */}

            <div className="flex flex-col items-start gap-2">
              <p className="mt-5 font-medium">Email:</p>

              <input
                type="text"
                className="w-full px-2 py-2 border border-zinc-400 rounded"
                placeholder="enter email address"
              />

              <button className="w-full h-10 mt-3 bg-[#693EE0] rounded text-white">
                Submit
              </button>
            </div>

            {/* Divider*/}
            <div className="my-5 border border-zinc-200"></div>

            {/* Signup/login account*/}
            <div className="flex justify-center items-center gap-2">
              <p>Don't have an account?</p>
              <button className="text-violet-500 hover:underline cursor-pointer">
                Sign up
              </button>
            </div>

            <div className="flex justify-center items-center gap-2">
              <p>Already have an account?</p>
              <button className="text-violet-500 hover:underline cursor-pointer">
                Login
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default Login;
