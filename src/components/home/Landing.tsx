import { poppins, rubik } from "@/utils/font";
import Image from "next/image";
import { useEffect, useState } from "react";

const TITLES = [
  "Discover New Worlds: Exchange Books with Fellow Readers",
  "Expand Your Library: Join Our Book Exchange Community Today",
  "Connect Through Stories: Swap Books with Other Enthusiasts",
  "Share the Joy of Reading: Trade Books and Discover Hidden Gems",
  "Build Your Bookshelf: Exchange Books and Connect with Bibliophiles",
  "Unlock New Adventures: Trade Books and Explore Diverse Narratives",
  "Join the Literary Exchange: Connect with Readers and Swap Stories",
  "Dive into New Narratives: Swap Books and Expand Your Horizons",
  "Exchange Books, Share Stories: Connect with Fellow Book Lovers",
  "Trade Tales: Join Our Book Exchange Community and Dive into New Worlds",
];

const LandingPage = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      let nextCharIndex = typedText.length;
      if (nextCharIndex < TITLES[titleIndex].length) {
        setTypedText(
          (prevTypedText) => prevTypedText + TITLES[titleIndex][nextCharIndex]
        );
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setFadeIn(false);
          setTimeout(() => {
            setTitleIndex((prevIndex) => (prevIndex + 1) % TITLES.length);
            setTypedText("");
            setFadeIn(true);
          }, 1000); // Adjust delay before next text appears
        }, 4000); // Adjust duration before fade-out
      }
    }, 100); // Adjust typing speed (milliseconds per character)

    return () => clearInterval(interval);
  }, [titleIndex, typedText]);
  return (
    <>
      <div className="">
        <Image
          src="/assets/landindImg.jpg"
          alt="home image"
          fill
          className="object-cover filter brightness-50"
          quality={100}
          priority
        />
      </div>
      <div className="h-full flex items-start justify-center p-4 md:p-0 text-sm">
        <div className="h-full w-full z-10 lg:max-w-screen-dt">
          <div className="h-full md:flex flex-col justify-center items-start">
            <div
              className={`mt-2 md:mt-7 md:mb-7 font-bold ltr:${poppins.className} rtl:${rubik.className}`}
            >
              <h2 className="text-left text-lg lg:text-4xl md:text-white">
                Hello There
              </h2>
              <p className="text-left my-6 text-sm lg:text-2xl md:text-white ltr:tracking-widest md:tracking-[2.5px]">
                {typedText}
                <span className="typing-cursor">|</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
