"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";
import Link from "next/link";
import LeftNavBar from "./LeftNavBar";
import { usePathname } from "next/navigation";
const ProfileToggle = () => {
  const { data: session, status } = useSession();
  const [profileToggle, setProfileToggle] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    setProfileToggle(false);
  }, [pathname]);

  return (
    <div
      initial={{ scale: 0.75 }}
      animate={{ scale: 1 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
      }}
    >
      {" "}
      {status === "authenticated" ? (
        <>
          <p
            onClick={() => setProfileToggle(!profileToggle)}
            className="cursor-pointer"
          >
            {session.user.name}
          </p>
        </>
      ) : (
        <Link href="/api/auth/signin" className="text-xl">
          Login
        </Link>
      )}
      {profileToggle && (
        <motion.div
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="md:hidden z-10 border-2 bg-white p-2  right-10 shadow-md rounded-lg fixed"
        >
          <div className="flex items-center gap-x-5 px-2">
            <img src={session.user.image} className="w-10 h-10 rounded-full" />
            <div>{session.user.name}</div>
          </div>
          <p className="hover:bg-zinc-300 cursor-pointer rounded p-2 my-2">
            {session.user.email}
          </p>
          <Link href="/">
            <div
              className={`hover:bg-zinc-300 cursor-pointer rounded p-2 my-2 ${
                pathname === "/" ? "bg-zinc-100" : ""
              }`}
            >
              Home
            </div>
          </Link>
          <Link href="/popular">
            <div
              className={`hover:bg-zinc-300 cursor-pointer rounded p-2 my-2 ${
                pathname === "/popular" ? "bg-zinc-100" : ""
              }`}
            >
              {" "}
              Popular
            </div>
          </Link>
          <Link href="/explore">
            <div
              className={`hover:bg-zinc-300 cursor-pointer rounded p-2 my-2 ${
                pathname === "/explore" ? "bg-zinc-100" : ""
              }`}
            >
              {" "}
              Explore
            </div>
          </Link>
          <Link href="/all">
            <div
              className={`hover:bg-zinc-300 cursor-pointer rounded p-2 my-2 ${
                pathname === "/all" ? "bg-zinc-100" : ""
              }`}
            >
              {" "}
              All
            </div>
          </Link>
          <Link href="/create">
            <div
              className={`hover:bg-zinc-300 cursor-pointer rounded p-2 my-2 ${
                pathname === "/create" ? "bg-zinc-100" : ""
              }`}
            >
              Create New Post
            </div>
          </Link>
          <Link href="/profile">
            <div className="hover:bg-zinc-300 cursor-pointer rounded p-2 my-2">
              Profile
            </div>
          </Link>
          <Link href="/settings">
            <div className="hover:bg-zinc-300 cursor-pointer rounded p-2 my-2">
              Settings
            </div>
          </Link>
          <Link className="/joined">
            <div className="hover:bg-zinc-300 cursor-pointer rounded p-2 my-2">
              Joined Subreddits
            </div>
          </Link>
          <button
            onClick={() => signOut()}
            className="hover:bg-red-600 hover:text-white cursor-pointer rounded p-2  w-full text-left"
          >
            Logout
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default ProfileToggle;
