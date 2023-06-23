import { Link, useLocation } from "react-router-dom";
import { LuSearch } from "react-icons/lu";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";

const Navbar = ({ setIsMobileNavOpen, setIsSearch }) => {
  const { pathname } = useLocation();
  const [navbarColor, setNavbarColor] = useState("bg-transparent");

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 50) {
        setNavbarColor("bg-black/75 backdrop-blur shadow");
      } else {
        setNavbarColor("bg-transparent");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`fixed z-30 inset-x-0 ${navbarColor} transition-colors duration-300`}>
      <div className="custom-container flex items-center justify-between space-x-10 p-3 md:p-6">
        <Link to="/" className=" flex items-center gap-1">
          <div className="text-white text-lg font-extrabold flex items-center">
            Mo
            <img src="/cinema.png" className="w-7 object-contain" alt="" />
            ie
            <span className="text-yellow-500">Mania</span>
          </div>
        </Link>
        <nav className="hidden md:block py-28 md:p-0 px-10 w-full">
          <ul className="flex items-center">
            <li className={`nav__links ${pathname === "/" && "text-yellow-500"}`}>
              <Link to="/">Home</Link>
            </li>
            <li className={`nav__links ${pathname === "/popular-movies" && "text-yellow-500"}`}>
              <Link to="/popular-movies">Movies</Link>
            </li>
            <li className={`nav__links ${pathname === "/tv-shows" && "text-yellow-500"}`}>
              <Link to="/tv-shows">TV Shows</Link>
            </li>
            <li className={`nav__links ${pathname === "/popular-people" && "text-yellow-500"}`}>
              <Link to="/popular-people">Popular people</Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center space-x-3">
          <button className="ml-auto hover:bg-white/20 rounded-full p-1.5 transition duration-200">
            <LuSearch onClick={() => setIsSearch(true)} className="text-lg" />
          </button>
          <button onClick={() => setIsMobileNavOpen(true)} className="md:hidden">
            <GiHamburgerMenu className="text-2xl text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
