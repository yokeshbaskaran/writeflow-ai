import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//types
type AuthStateType = {
  username: string;
  password: string;
};

type AppContextType = {
  pathToHome: () => void;
  auth: AuthStateType | null;
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
  const [auth, setAuth] = useState<AuthStateType | null>(null);

  //when page reloads
  useEffect(() => {
    const stored = localStorage.getItem("userdata");

    if (stored) {
      setAuth(JSON.parse(stored));
    }
  }, []);

  // Redirects to Homepage
  const navigate = useNavigate();
  const pathToHome = () => {
    navigate("/");
  };

  //context values
  const contextValue = { auth, pathToHome };

  return (
    <>
      <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
    </>
  );
};
