import { useState } from "react";
import { useAppContext, API_URL } from "../context/AppContext";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type UserSignupType = {
  username: string;
  email: string;
  password: string;
};

const Authpage = () => {
  const { pathToHome } = useAppContext();
  const [logined] = useState(true);

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };

  // User Login
  const handleUserSignup = async () => {
    console.log("Signup page!");
    const userData: UserSignupType = { username, email, password };

    try {
      if (!username.trim()) {
        toast.error("Username is required");
        return;
      }

      if (!email.trim()) {
        toast.error("Email is required");
        return;
      }

      if (!password.trim()) {
        toast.error("Password is required");
        return;
      }

      if (!/\S+@\S+\.\S+/.test(email)) {
        toast.error("Invalid email");
        return;
      }

      const response = await axios.post(API_URL + "/signup", userData);
      const dbData = response.data;
      // console.log("Signup-data!:", response, dbData);

      toast.success(dbData.message);
      pathToHome();
      setUsername("");
      setEmail("");
      setPassword("");
      navigate("/login");
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
      <section className="w-full h-screen flex flex-col justify-start items-center bg-bg">
        <div className="mt-5 mb-2 flex flex-col items-center gap-2">
          <img src="login.png" alt="logo" width={60} height={50} />

          <h3 className="mt-1 text-text text-2xl font-medium">
            {logined ? "Create an account" : "Login to your account "}
          </h3>

          <p className="text-text-muted">
            Enter your details to {logined ? "create new account" : "login"}
          </p>
        </div>

        <div className="md:w-110 mt-1 px-12 pt-5 pb-5 bg-bg-hover border border-border-strong rounded shado">
          <div className="w-full flex flex-col">
            {/* Email Address: */}

            <div className="flex text-text flex-col items-start gap-2">
              <div className="w-full">
                <p className="my-2 font-medium capitalize">username:</p>

                <input
                  type="email"
                  className="w-full px-2 py-2 border border-primary rounded"
                  placeholder="enter email address"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="w-full">
                <p className="my-2 font-medium capitalize">email:</p>

                <input
                  type="email"
                  className="w-full px-2 py-2 border border-primary rounded"
                  placeholder="enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="w-full">
                <p className="my-2 font-medium capitalize">Password:</p>

                <input
                  type="password"
                  className="w-full px-2 py-2 border border-primary  rounded"
                  placeholder="enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                onClick={handleUserSignup}
                className="w-full h-10 mt-3 bg-primary hover:bg-primary-hover rounded text-white cursor-pointer"
              >
                Submit
              </button>
            </div>

            {/* Divider*/}
            <div className="my-5 border border-border-strong"></div>

            {/* Signup/login account*/}
            <div className="text-text flex justify-center items-center gap-2">
              <p>Already have an account?</p>
              <button
                onClick={handleLogin}
                className="text-primary hover:underline cursor-pointer"
              >
                Login
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={pathToHome}
          className="my-8 p-4 text-primary border-2 border-primary rounded hover:bg-primary hover:text-white cursor-pointer"
        >
          Return to Home
        </button>
      </section>
    </>
  );
};

export default Authpage;
