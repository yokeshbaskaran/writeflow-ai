import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//types
type AuthStateType = {
  email: string;
  password: string;
};

type AppContextType = {
  pathToHome: () => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  authUser: AuthStateType | null;
  setAuthUser: (user: AuthStateType | null) => void;
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
  const [authUser, setAuthUser] = useState<AuthStateType | null>(null);

  //when page reloads
  useEffect(() => {
    const stored = localStorage.getItem("userdata");

    if (!stored) return;
    setAuthUser(JSON.parse(stored));
  }, []);

  // dummy User login
  const login = (email: string, password: string) => {
    const authData = { email, password };

    setAuthUser(authData);
    localStorage.setItem("userdata", JSON.stringify(authData));
  };

  // dummy User Logout
  const logout = () => {
    setAuthUser(null);
  };

  // Redirects to Homepage
  const navigate = useNavigate();
  const pathToHome = () => {
    navigate("/");
  };

  //context values
  const contextValue = {
    pathToHome,
    // auth
    login,
    logout,
    authUser,
    setAuthUser,
  };

  return (
    <>
      <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
    </>
  );
};
