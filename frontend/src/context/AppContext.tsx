import { createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//types
// type AuthStateType = {
//   email: string;
//   password: string;
// };

export const API_URL = import.meta.env.VITE_API_URL;
// console.log("API_URL", API_URL);

type AppContextType = {
  pathToHome: () => void;
  //auth
  handleUserLogout: () => void;
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
  };

  return (
    <>
      <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
    </>
  );
};
