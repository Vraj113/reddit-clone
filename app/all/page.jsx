import prisma from "@/lib/prisma";
import Link from "next/link";
import React from "react";

const All = async () => {
  const allSubs = await prisma.subreddit.findMany({});

  return (
    <>
      <div className=" rounded-3xl text-3xl font-bold my-4 p-6 bg-white cursor-pointer md:max-w-[800px] w-full m-auto">
        All Subreddits
      </div>
      <div className="flex flex-wrap    justify-center  md:max-w-[800px] w-full m-auto">
        {allSubs.map((subreddit) => {
          return (
            <Link key={subreddit.name} href={`r/${subreddit.name}`}>
              <div
                key={subreddit.id}
                className="max-w-96 mr-4 mb-4 rounded-3xl p-4 bg-white shadow-lg text-justify hover:bg-zinc-100 cursor-pointer"
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
