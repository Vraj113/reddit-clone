"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LoadingBar from "react-top-loading-bar";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import AddIcon from "@mui/icons-material/Add";
const LeftNavBar = () => {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);

  const runTopLoadingBar = () => {
    setProgress(30);
    setTimeout(() => {
      setProgress(100);
    }, 100);
    1;
  };
  useEffect(() => {
    runTopLoadingBar();
  }, [pathname]);

  return (
    <>
      <LoadingBar
        color="#2563EB"
        progress={progress}
        height={5}
        waitingTime={600}
        style={{
          borderTopRightRadius: "20px",
          borderBottomRightRadius: "20px",
        }}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="  rounded-3xl m-4  p-4 text-lg fixed z-10 bg-white top-8 mt-16 border-black hidden md:block ">
        <Link href="/">
          {" "}
          <div
            className={`flex items-center gap-x-2 py-2 px-4 font-semibold  rounded my-2 min-w-48 cursor-pointer hover:bg-gray-100 ${
              pathname === "/" ? "bg-zinc-100" : ""
            }`}
          >
            <HomeIcon />

            <div> Home</div>
          </div>
        </Link>
        <Link href="/all">
          {" "}
          <div
            className={`flex items-center gap-x-2 py-2 px-4 font-semibold  rounded my-2 min-w-48 cursor-pointer hover:bg-gray-100 ${
              pathname === "/all" ? "bg-zinc-100" : ""
            }`}
          >
            <ArticleIcon />

            <div> All</div>
          </div>
        </Link>
        <Link href="/create">
          {" "}
          <div
            className={`flex items-center gap-x-2 py-2 px-4 font-semibold  rounded my-2 min-w-48 cursor-pointer hover:bg-gray-100 ${
              pathname === "/create" ? "bg-zinc-100" : ""
            }`}
          >
            <AddIcon />

            <div> Create New Post</div>
          </div>
        </Link>
        {/* <Link href="/popular">
          <div
            className={`py-2 px-4 font-semibold  rounded-3xl my-2 min-w-48 cursor-pointer hover:bg-gray-100 ${
              pathname === "/popular" ? "bg-zinc-100" : ""
            }`}
          >
            {" "}
            Popular
          </div>
        </Link>
        <Link href="/explore">
          <div
            className={`py-2 px-4 font-semibold  rounded-3xl my-2 min-w-48 cursor-pointer hover:bg-gray-100 ${
              pathname === "/explore" ? "bg-zinc-100" : ""
            }`}
          >
            {" "}
            Explore
          </div>
        </Link> */}
      </div>
    </>
  );
};

export default LeftNavBar;
