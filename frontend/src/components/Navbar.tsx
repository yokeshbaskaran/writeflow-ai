import { BiMessageRoundedAdd } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { IoHomeOutline, IoSearch } from "react-icons/io5";
import { MdLockPerson } from "react-icons/md";
import { TbBellRinging } from "react-icons/tb";
import { RiMenuUnfold3Line, RiMenuUnfold4Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import DarkMode from "./DarkMode";
import { useState } from "react";

const Navbar = () => {
  const [authUser] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

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
      link: "/myprofile",
      icon: <CgProfile size={25} />,
      linkName: "Profile",
    },
    {
      link: "/search",
      icon: <IoSearch size={25} />,
      linkName: "Search",
    },
    {
      link: "/notifications",
      icon: <TbBellRinging size={25} />,
      linkName: "Notifications",
    },
    {
      link: "/create",
      icon: <BiMessageRoundedAdd size={25} />,
      linkName: "Create Post",
    },
  ];

  const navDetails = authUser ? authenticatedNav : unauthenticatedNav;

  return (
    <>
      <section className="h-14 px-3 py-5 border-b border-border flex items-center bg-bg">
        <div className="w-full flex items-center justify-between">
          {/* Mobile Navbar  */}
          {
            <>
              <div className="md:hidden">
                <div
                  onClick={() => setMobileNav(!mobileNav)}
                  className="p-2 text-white bg-primary rounded"
                >
                  {mobileNav ? (
                    <>
                      <RiMenuUnfold4Line size={20} />
                    </>
                  ) : (
                    <>
                      <RiMenuUnfold3Line size={20} />
                    </>
                  )}
                </div>
              </div>
            </>
          }

          <div>
            <h2 className="text-xl font-bold text-primary">
              WriteFlow<span className="text-text">.ai</span>
            </h2>
          </div>

          {/* Desktop Navbar  */}
          <div className="max-md:hidden mx-5 w-full flex items-center justify-center">
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
