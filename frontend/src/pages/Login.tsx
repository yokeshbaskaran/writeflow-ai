import { useState } from "react";
import { useAppContext } from "../context/AppContext";

const Authpage = () => {
  const { pathToHome, login } = useAppContext();
  const [logined, setLogined] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = () => {
    //dummy login
    login(email, password);
    setEmail("");
    setPassword("");
    console.log("Login success!");
    pathToHome();
  };

  return (
    <>
      <section className="w-full h-screen flex flex-col justify-start items-center bg-bg">
        <div className="mt-8 mb-3 flex flex-col items-center gap-2">
          <img src="login.png" alt="logo" width={60} height={50} />

          <h3 className="mt-3 text-text text-2xl font-medium">
            {logined ? "Create an account" : "Login to your account "}
          </h3>

          <p className="text-text-muted">
            Enter your details to {logined ? "create new account" : "login"}
          </p>
        </div>

        <div className="md:w-110 mt-1 px-12 pt-5 pb-5 bg-bg-hover border border-border rounded shado">
          <div className="w-full flex flex-col">
            {/* Email Address: */}

            <div className="flex text-text flex-col items-start gap-2">
              <div className="w-full">
                <p className="my-2 font-medium">Email:</p>

                <input
                  type="email"
                  className="w-full px-2 py-2 border border-primary rounded"
                  placeholder="enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="w-full">
                <p className="my-2 font-medium">Password:</p>

                <input
                  type="password"
                  className="w-full px-2 py-2 border border-primary  rounded"
                  placeholder="enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                onClick={handleAuth}
                className="w-full h-10 mt-3 bg-primary hover:bg-primary-hover rounded text-white cursor-pointer"
              >
                Submit
              </button>
            </div>

            {/* Divider*/}
            <div className="my-5 border border-border-strong"></div>

            {/* Signup/login account*/}
            <div className="text-text flex justify-center items-center gap-2">
              {logined ? (
                <>
                  <p>Already have an account?</p>
                  <button
                    onClick={() => setLogined(!logined)}
                    className="text-primary hover:underline cursor-pointer"
                  >
                    Login
                  </button>
                </>
              ) : (
                <>
                  <p>Don't have an account?</p>
                  <button
                    onClick={() => setLogined(!logined)}
                    className="text-primary hover:underline cursor-pointer"
                  >
                    Sign up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={pathToHome}
          className="my-8 p-4 text-primary border-2 border-primary rounded-xs hover:bg-primary hover:text-white cursor-pointer"
        >
          Return to Home
        </button>
      </section>
    </>
  );
};

export default Authpage;
