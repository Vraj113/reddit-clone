"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ProfileView = () => {
  const { data: session, status } = useSession();
  const [profileToggle, setProfileToggle] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      setProfileToggle(true);
    } else {
      setProfileToggle(false);
    }
  }, [status]);

  if (status !== "authenticated") {
    return (
      <Link href="/api/auth/signin" className="text-xl">
        Login
      </Link>
    );
  }

  return (
    <motion.div
      initial={{ right: -100 }}
      animate={{ right: 0 }}
      exit={{ opacity: 0 }}
      className="rounded-3xl m-4  p-4   fixed z-10 bg-white top-8 right-0 mt-16 border-black hidden md:block"
    >
      <div className="flex items-center gap-x-5 px-2">
        <img
          src={session?.user?.image || "/default-avatar.png"}
          alt="User profile"
          className="w-10 h-10 rounded-full"
        />
        <div>{session?.user?.name}</div>
      </div>
      <p className="hover:bg-zinc-300 cursor-pointer rounded p-2 my-2">
        {session?.user?.email}
      </p>
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
      <div className="hover:bg-zinc-300 cursor-pointer rounded p-2 my-2">
        Joined Subreddits
      </div>
      <button
        onClick={() => signOut()}
        className="hover:bg-red-600 hover:text-white cursor-pointer rounded p-2 w-full text-left"
      >
        Logout
      </button>
    </motion.div>
  );
};

export default ProfileView;
