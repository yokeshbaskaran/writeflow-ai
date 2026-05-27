import { IoSparklesSharp, IoHomeOutline } from "react-icons/io5";
import { MdLockPerson, MdOutlineClose } from "react-icons/md";
import { RxAvatar, RxDashboard } from "react-icons/rx";
import { RiMenu5Fill, RiAiGenerateText } from "react-icons/ri";
import { MdOutlineLockPerson } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import DarkMode from "./DarkMode";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { LuLogOut, LuUserRound } from "react-icons/lu";

const Navbar = () => {
  const { handleUserLogout, authUser, signupNavigate, loginNavigate } =
    useAppContext();
  const [mobileNav, setMobileNav] = useState(false);
  const [profileView, setProfileView] = useState(false);

  const { pathname } = useLocation();
  // console.log("pathname:", pathname);

  const unauthenticatedNav = [
    // {
    //   // for demo purpose
    //   link: "/demo",
    //   icon: <MdEmojiSymbols size={25} />,
    //   linkName: "demo",
    // },
    {
      link: "/",
      icon: <IoHomeOutline size={25} />,
      linkName: "Home",
    },
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

  if (profileView) {
    setTimeout(() => {
      setProfileView(false);
    }, 4000);
  }

  return (
    <>
      <section className="w-full h-12 px-3 py-8 border-b border-border-strong flex items-center bg-bg ">
        <div className="w-full flex items-center justify-between ">
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
                  <div className="h-full flex flex-col justify-between">
                    {/* 1. Logo  */}
                    <div className="px-1 py-2 flex items-center justify-between border-b border-border-strong">
                      {/*   Project Logo  */}
                      <div className="md:hidden flex items-center gap-2">
                        <div className="size-8 rounded-xl bg-linear-to-br from-violet-500 to-indigo-400 flex items-center justify-center shadow-lg shadow-violet-500/30">
                          <IoSparklesSharp className="w-5 h-5 text-white" />
                        </div>

                        <h1 className="text-xl font-bold tracking-tight">
                          WriteFlow
                          <span className="text-primary-hover">.ai</span>
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
                                  <span className="text-lg">
                                    {item.linkName}
                                  </span>
                                </Link>
                              </li>
                            );
                          })}

                          {/* {!authUser && (
                          <Link to="/signup" className={``}>
                            <li className="py-2 rounded transition-colors duration-300 bg-primary text-white text-lg text-center">
                              Get Started
                            </li>
                          </Link>
                        )} */}
                        </ul>
                      </nav>
                    </div>

                    {/* Divider  */}
                    <div className="mt-3 border-t border-border"></div>

                    {/* 3. User profile  */}
                    <div className="mt-auto p-3">
                      {authUser && (
                        <div className="my-5 px-2">
                          <div className="flex items-center gap-0">
                            {/* Profile Image Container */}
                            <div className="size-14 -mt-1 object-cover rounded-full">
                              {authUser ? (
                                <img
                                  src="https://i.pravatar.cc/100"
                                  alt=""
                                  className="size-11 rounded-full border border-primary"
                                />
                              ) : (
                                <RxAvatar className="size-full px-2" />
                              )}
                            </div>

                            {/* User profile details  */}
                            <div className="flex flex-col">
                              <span className="pl-1 text-lg font-semibold capitalize">
                                {authUser?.username}
                              </span>
                              <span className="text-sm text-gray-500">
                                @{authUser?.username}
                              </span>
                            </div>
                          </div>

                          {/* Logout button  */}
                          <button
                            className="w-full my-2 py-2 flex justify-center items-center gap-3 rounded-4xl bg-primary text-white hover:scale-105 transition-transform cursor-pointer"
                            onClick={handleUserLogout}
                          >
                            <span className="text-lg font-semibold">
                              Logout
                            </span>
                            <LuLogOut size={20} />
                          </button>
                        </div>
                      )}
                    </div>
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

            {/* User Profile exist only for Desktop view in top navbar*/}
            {authUser && (
              <div className="px-1 flex items-center gap-1">
                {authUser && (
                  <div className="relative">
                    {/* Profile Image Container */}
                    <div
                      onClick={() => setProfileView(!profileView)}
                      className="border-2 border-border-strong hover:bg-primary hover:text-white rounded-full cursor-pointer"
                    >
                      <div className="p-2">
                        <LuUserRound size={20} />
                      </div>
                    </div>

                    {profileView && (
                      <div className="w-30 absolute top-12 -left-10">
                        <div className="-mx-5 px-3 py-2 flex flex-col items-start justify-center gap-1 bg-bg-soft border border-border-strong shadow-lg rounded">
                          {/* user details  */}
                          <div className="w-full flex flex-col items-start">
                            <p className="capitalize">{authUser?.username}</p>
                            <p className="lowercase text-sm text-text-muted">
                              @{authUser?.username}
                            </p>
                          </div>

                          {/* divider  */}
                          <div className="my-1 w-full border-t border-border-strong"></div>

                          <div className="flex items-center gap-2">
                            <h3 className="text-green-600 text-sm font-bold">
                              Credits:
                            </h3>
                            <span>{authUser.credits}</span>
                          </div>

                          {/* divider  */}
                          <div className="my-1 w-full border-t border-border-strong"></div>

                          <button
                            onClick={handleUserLogout}
                            className="w-full py-1 text-red-700 border border-red-900 hover:bg-red-500 hover:text-white rounded cursor-pointer"
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {!authUser && (
            <button
              onClick={loginNavigate}
              className="md:hidden flex flex-col items-center gap-1 cursor-pointer"
            >
              <MdOutlineLockPerson size={25} />
              <span className="text-text-muted text-xs">Log In</span>
            </button>
          )}

          {/* DarkMode exist in top navbar*/}
          {authUser && (
            <div>
              <DarkMode />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Navbar;
