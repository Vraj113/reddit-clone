import prisma from "@/lib/prisma";
import Link from "next/link";
import React from "react";

const All = async () => {
  const allSubs = await prisma.subreddit.findMany({});

  return (
    <>
      <div className="md:mx-16 mx-8 rounded-xl text-3xl font-bold my-4 p-6 bg-white w-fit cursor-pointer">
        All Subreddits
      </div>
      <div className="flex flex-wrap justify-center   w-fit mx-10 gap-4   ">
        {allSubs.map((subreddit) => {
          return (
            <Link href={`r/${subreddit.name}`}>
              <div
                key={subreddit.id}
                className="max-w-96 rounded-xl p-4 bg-white shadow-lg text-justify hover:bg-zinc-100 cursor-pointer"
              >
                <div className="flex items-center gap-x-4   my-2">
                  <img
                    className="rounded-full w-20 h-20  "
                    src={subreddit.image}
                    alt={subreddit.name}
                  />
                  <div className="text-3xl font-semibold">
                    r/{subreddit.name}
                  </div>
                </div>
                <div className="line-clamp-3">{subreddit.description}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default All;
