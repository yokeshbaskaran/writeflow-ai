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
  // login: (email: string, password: string) => void;
  // logout: () => void;
  // authUser: AuthStateType | null;
  // setAuthUser: (user: AuthStateType | null) => void;
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

  //context values
  const contextValue = {
    pathToHome,
  };

  return (
    <>
      <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
    </>
  );
};
