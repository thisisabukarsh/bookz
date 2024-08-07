import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import Landing from "../components/home/Landing";
import { poppins, rubik } from "@/utils/font";
import { useEffect, useState } from "react";

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
    </div>
  );
}
