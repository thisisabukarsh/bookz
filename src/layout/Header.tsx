import { lalezar } from "@/utils/font";
import Link from "next/link";

const pagesButtons = [
  {
    title: "Home",
    route: "/",
  },
  {
    title: "About",
    route: "/about",
  },
  {
    title: "Profile",
    route: "/profile",
  },
];

const Header = () => {
  return (
    <header className="relative z-20 w-full top-0 bg-white shadow-md transition-transform">
      {/* <div>for head translation or something like that </div> */}
      <nav className="container mx-auto py-3 flex justify-between items-center lg:max-w-screen-dt ">
        <div className="flex flex-row items-center justify-center gap-8">
          <Link
            className="flex items-center justify-center px-2 md:px-0"
            href="/"
          >
            <div className={`mt-2 text-3xl md:text-4xl ${lalezar.className}`}>
              Book-<span className="text-BookBlue">Z</span>
            </div>
          </Link>
          <div className="hidden flex-row lg:flex justify-center items-center">
            {pagesButtons.map((_b, _index) => (
              <div
                key={`${_index}-${_b.title}`}
                className="group/main inline-block relative"
              >
                <Link
                  href={_b.route}
                  className="transition duration-1000 font-semibold border-b-2 border-transparent py-4 px-4 inline-flex items-center group-hover/main:font-bold group-hover/main:border-blue-1"
                >
                  {_b.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
