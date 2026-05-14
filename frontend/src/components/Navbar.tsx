import { Link } from "react-router-dom";

const Navbar = () => {
  const headings = [
    {
      linkName: "Home",
      link: "/",
      icon: "<CgProfile size={25} />",
    },
    {
      linkName: "Login",
      link: "auth",
      icon: "<CgProfile size={25} />",
    },
  ];

  return (
    <>
      <section className="yoki h-14 px-3 py-5 border-border flex items-center bg-bg">
        <div className="yoki w-full flex items-center justify-between">
          <div>
            <h2>WriteFlow.ai</h2>
          </div>

          <div className="yokii flex items-center gap-2">
            {headings.map((item, idx) => (
              <Link
                key={idx}
                to={`/${item.link}`}
                className="text-gray-300 hove:text-white transition-colors capitalize"
              >
                {item.linkName}
              </Link>
            ))}
          </div>

          <div className="yokiii">Dark_lightMode</div>
        </div>
      </section>
    </>
  );
};

export default Navbar;
