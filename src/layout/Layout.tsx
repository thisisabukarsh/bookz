import dynamic from "next/dynamic";
import Footer from "./Footer";
import { lalezar, manrope, poppins, rubik } from "@/utils/font";
import { Head } from "next/document";

const Header = dynamic(() => import("./Header"), {
  ssr: false, // Set to true if you want server-side rendering for this component
});

const Layout = (props: any) => {
  return (
    <div
      className={`${poppins.variable} ${lalezar.variable} ${manrope.variable} ltr:${manrope.className} rtl:${rubik.className} font-semibold relative z-0`}
    >
      <Header />
      <Head>
        <meta
          charSet="utf-8"
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
      </Head>

      <div className="bg-white">{props.children}</div>

      <Footer />
    </div>
  );
};

export default Layout;
