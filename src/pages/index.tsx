import { Inter } from "next/font/google";
import Head from "next/head";
import Landing from "../components/home/landing/Landing";
import Tabs from "@/components/home/Tabs";
import Cards from "@/components/home/Cards";
import Categories from "@/components/home/categories";
import ImageGallery from "@/components/cards/imageGallery";
import useScrollFadeIn from "@/hooks/useScrollFadeIn";
import Dialog from "@/components/dialog";
import { useState } from "react";
import ResetPasswordForm from "@/components/dialogs/restPassword";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <div>
      <Head>
        <title>Book-Z</title>
        <meta name="description" content="Home description" />
      </Head>
      <div className="md:text-xs relative md:h-[550px]">
        <Landing />
      </div>
      <div className="px-4 lg:px-0 mt-10 lg:mt-14 flex justify-center flex-col m-2">
        {/* <Tabs /> */}
        <button className="" onClick={openDialog}>
          open dialog
        </button>
        <Dialog isOpen={isDialogOpen} onClose={closeDialog} title="test">
          <ResetPasswordForm />
        </Dialog>
        <ImageGallery />
        <Categories />
        <Cards />
      </div>
    </div>
  );
}
