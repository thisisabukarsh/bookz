import dynamic from "next/dynamic";
import Footer from "./Footer";
import { lalezar, manrope, poppins, rubik } from "@/utils/font";

const Header = dynamic(() => import("./Header"), {
  ssr: false,
});

const Layout = (props: any) => {
  return (
    <div
      className={`${poppins.variable} ${lalezar.variable} ${manrope.variable} ltr:${manrope.className} rtl:${rubik.className} font-semibold relative z-0`}
    >
      <Header parentClass="relative z-20 w-full top-0 bg-white shadow-md transition-transform" />

      <div className="bg-white">{props.children}</div>

      <Footer />
    </div>
  );
};

export default Layout;
