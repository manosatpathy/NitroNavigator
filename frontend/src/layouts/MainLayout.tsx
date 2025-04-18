import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "./../components/SearchBar";

const MainLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isSignInPage = location.pathname === "/sign-in";
  const isRegisterPage = location.pathname === "/register";

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto">
        {!isHomePage && !isSignInPage && !isRegisterPage && <SearchBar />}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
