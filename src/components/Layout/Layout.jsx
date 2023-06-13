import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import NavMobile from "../NavMobile";
import { useState } from "react";

const Layout = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <>
      <header>
        <Navbar setIsMobileNavOpen={setIsMobileNavOpen} />
        <NavMobile
          isMobileNavOpen={isMobileNavOpen}
          setIsMobileNavOpen={setIsMobileNavOpen}
        />
      </header>

      <main className="min-h-screen overflow-hidden sm:overflow-visible">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
