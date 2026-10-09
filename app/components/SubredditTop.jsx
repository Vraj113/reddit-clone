"use client";

import JoinButton from "./JoinButton";
import { motion } from "framer-motion";

export default function SubredditTop({
  slug,
  name,
  description,
  image,
  bannerImage,
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="card mb-4 overflow-hidden"
    >
      {bannerImage && (
        <img
          src={bannerImage}
          alt=""
          className="h-32 w-full object-cover sm:h-40"
        />
      )}
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <img
            src={image}
            alt=""
            className="h-14 w-14 rounded-full ring-2 ring-white"
          />
          <div>
            <h1 className="text-xl font-semibold text-slate-900">r/{name}</h1>
            <p className="text-sm text-slate-600 line-clamp-2">{description}</p>
          </div>
        </div>
        <JoinButton slug={slug} />
      </div>
    </motion.section>
  );
}
