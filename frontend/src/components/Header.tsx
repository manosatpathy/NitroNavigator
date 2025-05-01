import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";
import { SiHomebridge } from "react-icons/si";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const screenHeight = window.innerHeight - 200;
      const scrollY = window.scrollY;

      if (scrollY > screenHeight) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    if (isHomePage) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHomePage]);

  const headerBackground =
    !isHomePage || isScrolled ? "bg-gray-800" : "bg-transparent";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 ${headerBackground} transition-colors duration-700`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-5">
        <Link to="/" className="flex items-center gap-3">
          <SiHomebridge className="h-11 w-11 text-white" />
          <h1 className="font-black text-2xl text-white">Havenly</h1>
        </Link>
        <nav className="flex items-center space-x-6">
          {isLoggedIn ? (
            <div className="flex items-center gap-4 md:gap-11">
              <Link
                to="/my-bookings"
                className="text-white text-base font-mono hover:text-gray-300 transition-colors duration-200"
              >
                My Bookings
              </Link>
              <Link
                to="/my-hotels"
                className="text-white text-base font-mono hover:text-gray-300 transition-colors duration-200"
              >
                My Hotels
              </Link>
              <SignOutButton />
            </div>
          ) : (
            <Link
              to="/sign-in"
              className="px-7 py-2 bg-indigo-500 hover:bg-indigo-400 text-white text-sm sm:text-base font-semibold rounded-3xl transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
