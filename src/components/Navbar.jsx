import { Link } from "react-router-dom";
import { LuSearch } from "react-icons/lu";
import { GiHamburgerMenu } from "react-icons/gi";

// eslint-disable-next-line react/prop-types
const Navbar = ({ setIsMobileNavOpen }) => {
  return (
    <div className="flex items-center justify-between p-6 space-x-7 custom-container">
      <div>
        <span>LOGO</span>
      </div>
      <nav className="hidden md:block py-28 md:p-0 px-10 w-full">
        <ul className="flex items-center">
          <li className="nav__links">
            <Link to="/">Home</Link>
          </li>
          <li className="nav__links">
            <Link to="/">Popular Movies</Link>
          </li>
          <li className="nav__links">
            <Link to="/">TV Shows</Link>
          </li>
          <li className="nav__links">
            <Link to="/">Popular people</Link>
          </li>
        </ul>
      </nav>
      <div className="flex items-center space-x-3">
        <button className="ml-auto">
          <LuSearch className="text-xl" />
        </button>
        <button onClick={() => setIsMobileNavOpen(true)} className="md:hidden">
          <GiHamburgerMenu className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
