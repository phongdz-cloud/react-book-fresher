import { createContext, useContext, useState } from "react";

interface IAppContext {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  setUser: (value: IUser | null) => void;
  user: IUser | null;
}

const CurrentAppContext = createContext<IAppContext | null>(null);

type TProps = {
  children: React.ReactNode;
};

export const AppProvider = (props: TProps) => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const [user, setUser] = useState<IUser | null>(null);

  return (
    <CurrentAppContext.Provider
      value={{ isAuthenticated, user, setAuthenticated, setUser }}
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
