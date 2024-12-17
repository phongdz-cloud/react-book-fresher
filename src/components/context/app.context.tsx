import { createContext, useContext, useState } from "react";

interface IAppContext {
  isAuthenticated: boolean;
  isAppLoading: boolean;
  setAuthenticated: (value: boolean) => void;
  setUser: (value: IUser | null) => void;
  setAppLoading: (value: boolean) => void;
  user: IUser | null;
}

const CurrentAppContext = createContext<IAppContext | null>(null);

type TProps = {
  children: React.ReactNode;
};

export const AppProvider = (props: TProps) => {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [isAppLoading, setAppLoading] = useState<boolean>(true);
  const [user, setUser] = useState<IUser | null>(null);

  return (
    <CurrentAppContext.Provider
      value={{
        isAuthenticated,
        isAppLoading,
        user,
        setAuthenticated,
        setUser,
        setAppLoading,
      }}
    >
      {props.children}
    </CurrentAppContext.Provider>
  );
};

export const useCurrentApp = () => {
  const currentAppContext = useContext(CurrentAppContext);

  if (!currentAppContext) {
    throw new Error("useCurrentApp must be used within AppContext");
  }

  return currentAppContext;
};
