"use client";

import Link from "next/link";
import Image from "next/image";
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

export default function PostDetail({ post, community }) {
  return (
    <article className="card w-full overflow-hidden">
      <header className="border-b border-slate-100 px-6 py-5 sm:px-8">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          {community?.image ? (
            <img
              src={community.image}
              alt=""
              className="h-8 w-8 rounded-full ring-1 ring-slate-200"
            />
          ) : null}
          <Link
            href={`/r/${post.subredditId}`}
            className="font-semibold text-slate-900 hover:underline"
          >
            r/{post.subredditId}
          </Link>
          <span className="text-slate-400">•</span>
          <span className="text-slate-600">u/{post.postedBy}</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-500">{relativeTime(post.createdAt)}</span>
        </div>
        <h1 className="mt-4 text-2xl font-semibold leading-tight text-slate-900 sm:text-3xl">
          {post.title}
        </h1>
      </header>

      <div className="px-6 py-6 sm:px-8">
        {post.description && (
          <p className="whitespace-pre-wrap text-base leading-7 text-slate-800">
            {post.description}
          </p>
        )}
        {post.link && (
          <div className="mt-4">
            <LinkPreview link={post.link} />
          </div>
        )}
        {post.imageURL && (
          <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            <Image
              src={post.imageURL}
              alt={post.title}
              width={1200}
              height={700}
              className="h-auto w-full object-contain"
            />
          </div>
        )}
      </div>
      <VoteBar votes={post.votes} />
    </article>
  );
}
