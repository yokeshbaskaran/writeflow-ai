import { BiMessageRoundedAdd } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { IoHomeOutline } from "react-icons/io5";
import { MdLockPerson, MdOutlineClose } from "react-icons/md";
import { TbBellRinging } from "react-icons/tb";
import { RiMenu5Fill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import DarkMode from "./DarkMode";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const { authUser, logout } = useAppContext();
  const [mobileNav, setMobileNav] = useState(false);

  const { pathname } = useLocation();

  const unauthenticatedNav = [
    {
      link: "/",
      icon: <IoHomeOutline size={25} />,
      linkName: "Home",
    },
    {
      link: "/auth",
      icon: <MdLockPerson size={25} />,
      linkName: "Login/SignUp",
    },
  ];

  const authenticatedNav = [
    {
      link: "/",
      icon: <IoHomeOutline size={25} />,
      linkName: "Home",
    },
    {
      link: "/create",
      icon: <BiMessageRoundedAdd size={25} />,
      linkName: "Generate",
    },
    {
      link: "/myprofile",
      icon: <CgProfile size={25} />,
      linkName: "Profile",
    },
    // {
    //   link: "/search",
    //   icon: <IoSearch size={25} />,
    //   linkName: "Search",
    // },
    {
      link: "/notifications",
      icon: <TbBellRinging size={25} />,
      linkName: "Notifications",
    },
  ];

  const navDetails = authUser ? authenticatedNav : unauthenticatedNav;

  return (
    <>
      <section className="h-14 px-3 py-5 border-b border-border flex items-center bg-bg">
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
                <div className="fixed top-0 left-0 w-64 h-screen p-1 z-50 yokii bg-bg">
                  {/* 1. Logo  */}
                  <div className="px-1 py-2 flex items-center justify-between border-b border-border-strong">
                    {/* Project Text Logo  */}
                    <div>
                      <h2 className="text-xl font-bold text-primary">
                        WriteFlow<span className="text-text">.ai</span>
                      </h2>
                    </div>
                    <button
                      className="cursor-pointer"
                      onClick={() => setMobileNav(!mobileNav)}
                    >
                      <MdOutlineClose size={25} />
                    </button>
                  </div>

                  {/* 2. Nav List  */}
                  <div>
                    <nav className="mb-auto mt-2">
                      <ul className="flex flex-col gap-3">
                        {navDetails.map((item, idx) => {
                          const isActive = pathname === item.link;

                          return (
                            <li key={idx}>
                              <Link
                                to={item.link}
                                className={`px-2 py-2 flex items-center gap-3 rounded transition-colors duration-300 ${
                                  isActive
                                    ? "bg-appColor text-white"
                                    : "hover:text-appColor text-black"
                                }`}
                              >
                                {item.icon}
                                <span className="text-lg">{item.linkName}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </nav>
                  </div>
                </div>
              </>
            )}

            {
              <>
                <div
                  onClick={() => setMobileNav(!mobileNav)}
                  className="p-2 text-white bg-primary rounded"
                >
                  <RiMenu5Fill size={20} />
                </div>
              </>
            }
          </div>
          {/* i) Mobile Navbar  */}

          {/* ii) Desktop Navbar  */}
          <div>
            {/* Project Text Logo  */}
            <h2 className="text-xl font-bold text-primary">
              WriteFlow<span className="text-text">.ai</span>
            </h2>
          </div>

          <div className="max-md:hidden mx-5 w-full flex items-center justify-center gap-2">
            {/* ii) Navbar list  */}
            <div className="flex items-center gap-5">
              {navDetails.map((item, idx) => (
                <Link
                  key={idx}
                  to={`${item.link}`}
                  className="text-text hove:text-white transition-colors capitalize"
                >
                  {item.linkName}
                </Link>
              ))}
            </div>

            {/* Logout only exist when user logined */}
            {authUser && (
              <button
                onClick={logout}
                className="mx-2 px-2 py-1 text-red-700 bg-bg-hover rounded cursor-pointer"
              >
                Logout
              </button>
            )}
          </div>

          <div>
            <DarkMode />
          </div>
        </div>
      </section>
    </>
  );
};

export default Navbar;
