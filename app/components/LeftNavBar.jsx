"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LoadingBar from "react-top-loading-bar";
import { useRouter } from "next/navigation";
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
        color="#FF4500"
        progress={progress}
        height={5}
        waitingTime={600}
        style={{
          borderTopRightRadius: "20px",
          borderBottomRightRadius: "20px",
        }}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="h-full p-4 text-lg fixed z-10 bg-white mt-16 hidden md:block">
        <Link href="/">
          <div
            className={`py-2 px-4 font-semibold  rounded my-2 min-w-48 cursor-pointer hover:bg-gray-100 ${
              pathname === "/" ? "bg-zinc-100" : ""
            }`}
          >
            Home
          </div>
        </Link>
        <Link href="/popular">
          <div
            className={`py-2 px-4 font-semibold  rounded my-2 min-w-48 cursor-pointer hover:bg-gray-100 ${
              pathname === "/popular" ? "bg-zinc-100" : ""
            }`}
          >
            {" "}
            Popular
          </div>
        </Link>
        <Link href="/explore">
          <div
            className={`py-2 px-4 font-semibold  rounded my-2 min-w-48 cursor-pointer hover:bg-gray-100 ${
              pathname === "/explore" ? "bg-zinc-100" : ""
            }`}
          >
            {" "}
            Explore
          </div>
        </Link>
        <Link href="/all">
          <div
            className={`py-2 px-4 font-semibold  rounded my-2 min-w-48 cursor-pointer hover:bg-gray-100 ${
              pathname === "/all" ? "bg-zinc-100" : ""
            }`}
          >
            {" "}
            All
          </div>
        </Link>
        <Link href="/create">
          <div
            className={`py-2 px-4 font-semibold  rounded my-2 min-w-48 cursor-pointer hover:bg-gray-100 ${
              pathname === "/create" ? "bg-zinc-100" : ""
            }`}
          >
            Create New Post
          </div>
        </Link>
      </div>
    </>
  );
};

export default LeftNavBar;
