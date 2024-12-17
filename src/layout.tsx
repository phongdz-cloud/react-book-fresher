import { Outlet } from "react-router-dom";
import AppHeader from "./components/layout/app.header";
import { useEffect } from "react";
import { fetchAccountAPI } from "./services/api";
import { useCurrentApp } from "./components/context/app.context";
import { PacmanLoader } from "react-spinners";

function Layout() {
  const { setUser, setAuthenticated, isAppLoading, setAppLoading } =
    useCurrentApp();

  useEffect(() => {
    const fetchAccount = async () => {
      const res = await fetchAccountAPI();
      if (res.data) {
        setUser(res.data.user);
        setAuthenticated(true);
      }
      setAppLoading(false);
    };

    fetchAccount();
  }, []);

  return (
    <>
      {!isAppLoading ? (
        <div>
          <AppHeader />
          <Outlet />
        </div>
      ) : (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <PacmanLoader size={30} color="#36d6b4" />
        </div>
      )}
    </>
  );
}

export default Layout;
