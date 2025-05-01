import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className={!isHomePage ? "pt-20" : undefined}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
