"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import LinkPreview from "./LinkPreview";
import VoteBar from "./ui/VoteBar";

function relativeTime(isoString) {
  const seconds = Math.floor((Date.now() - new Date(isoString)) / 1000);
  const units = [
    ["year", 31536000],
    ["month", 2592000],
    ["week", 604800],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];
  for (const [label, size] of units) {
    const count = Math.floor(seconds / size);
    if (count > 0) return `${count} ${label}${count > 1 ? "s" : ""} ago`;
  }
  return "just now";
}

export default function Post({
  title,
  description,
  link,
  postedBy,
  votes,
  slug,
  createdAt,
  imageURL,
  subredditId,
  subredditImg,
}) {
  const postHref = `/r/${subredditId}/posts/${slug}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="card card-hover overflow-hidden"
    >
      <div className="flex">
        <div className="hidden w-12 shrink-0 flex-col items-center gap-1 border-r border-slate-100 bg-slate-50 py-4 sm:flex">
          <span className="text-[10px] font-semibold text-slate-500">▲</span>
          <span className="text-xs font-bold text-slate-800">{votes}</span>
          <span className="text-[10px] font-semibold text-slate-500">▼</span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="px-4 pb-3 pt-4">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              {subredditImg ? (
                <img
                  src={subredditImg}
                  alt=""
                  className="h-6 w-6 rounded-full ring-1 ring-slate-200"
                />
              ) : (
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100 text-[10px] font-bold text-orange-700">
                  r
                </span>
              )}
              <Link
                href={`/r/${subredditId}`}
                className="text-xs font-semibold text-slate-900 hover:underline"
              >
                r/{subredditId}
              </Link>
              <span className="meta-text">•</span>
              <span className="meta-text">u/{postedBy}</span>
              <span className="meta-text">•</span>
              <span className="meta-text">{relativeTime(createdAt)}</span>
            </div>

            <Link href={postHref} className="group block">
              <h2 className="mt-2 text-lg font-semibold leading-snug text-slate-900 group-hover:text-orange-700">
                {title}
              </h2>
            </Link>

            {description && (
              <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-slate-700">
                {description}
              </p>
            )}

            {link && (
              <div className="mt-3">
                <LinkPreview link={link} />
              </div>
            )}

            {imageURL && (
              <Link href={postHref} className="block">
                <div className="relative mt-3 max-h-[420px] w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                  <Image
                    className="h-auto w-full object-contain"
                    src={imageURL}
                    alt={title}
                    width={900}
                    height={500}
                  />
                </div>
              </Link>
            )}
          </div>

          <VoteBar votes={votes} />
        </div>
      </div>
    </motion.article>
  );
}
