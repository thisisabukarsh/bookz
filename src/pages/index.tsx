import { Inter } from "next/font/google";
import Head from "next/head";
import Landing from "../components/home/landing/Landing";
import Tabs from "@/components/home/Tabs";
import Cards from "@/components/home/Cards";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Head>
        <title>Book-Z</title>
        <meta name="description" content="Home description" />
      </Head>
      <div className="w-full md:text-xs relative md:h-[550px]">
        <Landing />
      </div>
      <div className="px-4 lg:px-0 mt-10 lg:mt-14 flex justify-center flex-col">
        <Tabs />
        <Cards />
      </div>
    </div>
  );
}
