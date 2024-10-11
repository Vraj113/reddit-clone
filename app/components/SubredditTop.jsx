"use client";
import React from "react";
import JoinButton from "./JoinButton";
import { motion } from "framer-motion";
const SubredditTop = ({ slug, name, description, image, bannerImage }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
      }}
      className="mt-8 mr-4"
    >
      <div>
        <img className="rounded-xl" src={bannerImage} />
      </div>
      <div className="flex items-center ml-2 mt-4 md:justify-start justify-between">
        <div className="flex items-center">
          <img
            src={image}
            className="md:w-24   md:h-24 w-12 h-12 rounded-full"
          />
          <div className="md:text-4xl text-xl font-bold ml-2">r/{name}</div>
        </div>
        <div className="text-lg font-bold ml-4">
          <JoinButton slug={slug} />
        </div>
      </div>
      <div className=" md:text-lg text-md   p-2 my-4  rounded-xl text-justify">
        {description}
      </div>
    </motion.div>
  );
};

export default SubredditTop;
