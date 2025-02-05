import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-slate-300 py-6 lg:px-8 px-2 font-poppins">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-4xl text-slate-800 font-poppins font-extrabold tracking-tighter">
          <Link to="/">Havenly</Link>
        </span>
        <span className="flex space-x-4">
          <Link
            to="/sign-in"
            className="flex shadow-lg bg-slate-700 text-white items-center px-4 py-2 font-semibold rounded-md hover:bg-slate-200 hover:text-slate-900 transition duration-300"
          >
            Sign In
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Header;
