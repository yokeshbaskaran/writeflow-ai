import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//types
type ContentSectionType = {
  heading: string;
  content: string;
};

type AIResponseType = {
  title: string;
  introduction: string;
  sections: ContentSectionType[];
  conclusion: string;
};

export const API_URL = import.meta.env.VITE_API_URL;
// console.log("API_URL", API_URL);

type AppContextType = {
  pathToHome: () => void;
  //auth
  handleUserLogout: () => void;
  aiResponse: AIResponseType | null;
  setAiResponse: React.Dispatch<React.SetStateAction<AIResponseType | null>>;
};

const AppContext = createContext({} as AppContextType);

// function Context
export function useAppContext() {
  return useContext(AppContext);
}

type AppContextProviderType = {
  children: React.ReactNode;
};

export const AppContextProvider = ({ children }: AppContextProviderType) => {
  // dummy authentication
  const [aiResponse, setAiResponse] = useState<AIResponseType | null>(null);
  console.log("aiResponse::", aiResponse);

  //when page reloads
  useEffect(() => {
    // const stored = localStorage.getItem("userdata");
    // if (!stored) return;
    // setAuthUser(JSON.parse(stored));
  }, []);

  // Redirects to Homepage
  const navigate = useNavigate();
  const pathToHome = () => {
    navigate("/");
  };

  const handleUserLogout = () => {
    localStorage.setItem("token", "");
  };

  //context values
  const contextValue = {
    pathToHome,
    handleUserLogout,
    aiResponse,
    setAiResponse,
  };

  return (
    <>
      <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
    </>
  );
};
