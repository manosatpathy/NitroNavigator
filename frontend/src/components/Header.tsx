import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <header className="sticky bg-[#1c1c1c] top-0 py-6 font-poppins bg-background/95">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-4xl text-[#F8F9FA] font-poppins font-extrabold tracking-tighter">
          <Link to="/">Havenly</Link>
        </span>
        <span className="flex space-x-4">
          {isLoggedIn ? (
            <>
              <Link to="/my-bookings" className="text-white">
                My Bookings
              </Link>
              <Link to="/my-hotels" className="text-white">
                My hotels
              </Link>
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex shadow-lg bg-white text-blue-900 items-center px-4 py-2 font-semibold rounded-md hover:bg-blue-400 hover:text-white transition duration-300"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </header>
  );
};

export default Header;
