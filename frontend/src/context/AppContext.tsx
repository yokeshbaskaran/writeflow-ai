import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

//types
export type ContentSectionType = {
  heading: string;
  content: string;
};

export type AIResponseType = {
  title: string;
  introduction: string;
  sections: ContentSectionType[];
  conclusion: string;
  content_type: string;
};

export type AuthUserType = {
  username: string;
  email: string;
};

type AppContextType = {
  pathToHome: () => void;
  //auth
  handleUserLogout: () => void;
  aiResponse: AIResponseType | null;
  setAiResponse: React.Dispatch<React.SetStateAction<AIResponseType | null>>;

  authUser: AuthUserType | null;
  setAuthUser: React.Dispatch<React.SetStateAction<AuthUserType | null>>;

  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
  authLoading: boolean;
};

export const API_URL = import.meta.env.VITE_API_URL;
// console.log("API_URL", API_URL);

const AppContext = createContext({} as AppContextType);

// function Context
export function useAppContext() {
  return useContext(AppContext);
}

type AppContextProviderType = {
  children: React.ReactNode;
};

export const AppContextProvider = ({ children }: AppContextProviderType) => {
  //  setting light-dark mode
  const [dark, setDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  // Authentication
  // const [aiResponse, setAiResponse] = useState(null);

  const [aiResponse, setAiResponse] = useState<AIResponseType | null>(() => {
    const saved = localStorage.getItem("aiResponse");
    return saved ? JSON.parse(saved) : null;
  });
  // console.log("aiResponse::", aiResponse);
  const [authUser, setAuthUser] = useState<AuthUserType | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const getProfile = async () => {
    const token = localStorage.getItem("token");

    if (!token) return null;

    try {
      const response = await axios.get(`${API_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await getProfile();

        if (user) {
          setAuthUser(user);
        }
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
        localStorage.removeItem("token");
        setAuthUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Redirects to Homepage
  const navigate = useNavigate();
  const pathToHome = () => {
    navigate("/");
  };

  const handleUserLogout = () => {
    localStorage.removeItem("token");
    setAuthUser(null);
  };

  //context values
  const contextValue = {
    pathToHome,
    dark,
    setDark,

    authUser,
    setAuthUser,
    handleUserLogout,
    aiResponse,
    setAiResponse,
    authLoading,
  };

  return (
    <>
      <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
    </>
  );
};
