import { CgProfile } from "react-icons/cg";
import {
  IoHomeOutline,
  IoSparklesSharp,
  IoChevronDownSharp,
} from "react-icons/io5";
import { MdEmojiSymbols, MdLockPerson, MdOutlineClose } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { RiMenu5Fill, RiAiGenerateText } from "react-icons/ri";

import { Link, useLocation, useNavigate } from "react-router-dom";
import DarkMode from "./DarkMode";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { LuUserRound } from "react-icons/lu";

const Navbar = () => {
  const { handleUserLogout, authUser, pathToHome } = useAppContext();
  const [mobileNav, setMobileNav] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  // console.log("pathname:", pathname);

  const unauthenticatedNav = [
    {
      link: "/",
      icon: <IoHomeOutline size={25} />,
      linkName: "Home",
    },
    // {
    //   // for demo purpose
    //   link: "/demo",
    //   icon: <MdEmojiSymbols size={25} />,
    //   linkName: "demo",
    // },
    {
      link: "/login",
      icon: <MdLockPerson size={25} />,
      linkName: "Login",
    },
  ];

  const authenticatedNav = [
    {
      link: "/dashboard",
      icon: <RxDashboard size={25} />,
      linkName: "Dashboard",
    },
    {
      link: "/create",
      icon: <RiAiGenerateText size={25} />,
      linkName: "Generate",
    },
    // {
    //   link: "/profile",
    //   icon: <CgProfile size={25} />,
    //   linkName: "Profile",
    // },
    // {
    //   link: "/search",
    //   icon: <IoSearch size={25} />,
    //   linkName: "Search",
    // },
    // {
    //   link: "/notifications",
    //   icon: <TbBellRinging size={25} />,
    //   linkName: "Notifications",
    // },
  ];

  const navDetails = authUser ? authenticatedNav : unauthenticatedNav;

  const signupNavigate = () => {
    navigate("/signup");
  };

  return (
    <>
      <section className="w-full h-12 px-3 py-8 border-b border-border-strong flex items-center bg-bg">
        <div className="w-full flex items-center justify-between">
          {/* i) Mobile Navbar  */}
          <div className="md:hidden">
            {mobileNav && (
              <>
                {/* Backdrop overlay  */}
                <div
                  onClick={() => setMobileNav(!mobileNav)}
                  className="fixed inset-0 bg-black/50 z-40 md:hidden"
                ></div>

                {/* Sidebar Nav  */}
                <div className="fixed top-0 left-0 w-68 h-screen px-2 py-1 z-50 bg-bg border-r border-border-strong">
                  {/* 1. Logo  */}
                  <div className="px-1 py-2 flex items-center justify-between border-b border-border-strong">
                    {/*   Project Logo  */}
                    <div className="md:hidden flex items-center gap-2">
                      <div className="size-8 rounded-xl bg-linear-to-br from-violet-500 to-indigo-400 flex items-center justify-center shadow-lg shadow-violet-500/30">
                        <IoSparklesSharp className="w-5 h-5 text-white" />
                      </div>

                      <h1 className="text-xl font-bold tracking-tight">
                        WriteFlow<span className="text-primary-hover">.ai</span>
                      </h1>
                    </div>

                    {/* Close button  */}
                    <button
                      className="cursor-pointer"
                      onClick={() => setMobileNav(!mobileNav)}
                    >
                      <MdOutlineClose size={25} />
                    </button>
                  </div>

                  {/* 2. Nav List  */}
                  <div>
                    <nav className="mb-auto mt-3">
                      <ul className="flex flex-col gap-3">
                        {navDetails.map((item, idx) => {
                          const isActive = pathname === item.link;

                          return (
                            <li key={idx}>
                              <Link
                                to={item.link}
                                className={`px-1 py-2 flex items-center gap-3 rounded transition-colors duration-300 ${
                                  isActive
                                    ? "bg-primary text-white"
                                    : "hover:text-primary"
                                }`}
                              >
                                {item.icon}
                                <span className="text-lg">{item.linkName}</span>
                              </Link>
                            </li>
                          );
                        })}

                        {authUser && (
                          <Link to="/signup" className={``}>
                            <li className="py-2 rounded transition-colors duration-300 bg-primary text-white text-lg text-center">
                              Get Started
                            </li>
                          </Link>
                        )}
                      </ul>
                    </nav>
                  </div>
                </div>
              </>
            )}

            {/* Menu when mobile view  */}
            <>
              <div
                onClick={() => setMobileNav(!mobileNav)}
                className="p-2 text-white bg-primary rounded cursor-pointer"
              >
                <RiMenu5Fill size={20} />
              </div>
            </>
          </div>
          {/* i) Mobile Navbar  */}

          {/* ii) Desktop Navbar  */}
          {/* 1. Project Text Logo  */}
          <div className="flex items-center gap-2">
            <div className="size-9 rounded-xl bg-linear-to-br from-violet-500 to-indigo-400 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <IoSparklesSharp className="w-5 h-5 text-white" />
            </div>

            <h1 className="text-2xl font-bold tracking-tight">
              WriteFlow<span className="text-primary-hover">.ai</span>
            </h1>
          </div>

          {/* 2. Navbar list  */}
          <div className="max-md:hidden mx-5 w-full flex items-center justify-end gap-2">
            <div className="py-2 flex items-center gap-5">
              {navDetails.map((item, idx) => (
                <Link
                  key={idx}
                  to={`${item.link}`}
                  className={`px-4 py-1 ${pathname === item.link ? "text-white bg-primary rounded-4xl" : "text-text-muted hover:text-primary"}  transition capitalize`}
                >
                  {item.linkName}
                </Link>
              ))}

              {!authUser && (
                <button
                  onClick={signupNavigate}
                  className="bg-primary text-white hover:opacity-85 transition px-5 py-2 rounded-2xl font-medium shadow-md shadow-violet-700/30 cursor-pointer"
                >
                  Get Started
                </button>
              )}
            </div>

            {/* Logout only exist when user logined */}
            {authUser && (
              <div>
                user profile
                <button
                  onClick={handleUserLogout}
                  className="mx-2 px-2 py-1 text-red-700 border border-red-900 rounded cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* User Profile exist only for Mobile view in top navbar*/}
          <div className="md:hidden">
            <div className="px-3 py-1 flex items-center justify-center gap-2 bg-bg-soft border border-border rounded cursor-pointer">
              <div className="p-2 border border-primary rounded-full cursor-pointer">
                <LuUserRound size={20} />
              </div>
              <p className="capitalize">{authUser?.username}</p>
              <div className="mt-1">
                <IoChevronDownSharp size={15} />
              </div>
            </div>
          </div>

          {/* DarkMode exist only for desktop in top navbar*/}
          <div className="max-md:hidden">
            <DarkMode />
          </div>
        </div>
      </section>
    </>
  );
};

export default Navbar;
