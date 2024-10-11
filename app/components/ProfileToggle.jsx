"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";
import Link from "next/link";
const ProfileToggle = () => {
  const { data: session, status } = useSession();
  const [profileToggle, setProfileToggle] = useState(false);

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
          <p onClick={() => setProfileToggle(false)} className="cursor-pointer">
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
          className="fixed z-10 border-2 bg-white p-2  right-10 shadow-md rounded-lg"
        >
          <div className="flex items-center gap-x-5 px-2">
            <img src={session.user.image} className="w-10 h-10 rounded-full" />
            <div>{session.user.name}</div>
          </div>
          <p className="hover:bg-zinc-300 cursor-pointer rounded p-2 my-2">
            {session.user.email}
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
