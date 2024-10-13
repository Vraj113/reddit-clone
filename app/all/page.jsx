import prisma from "@/lib/prisma";
import Link from "next/link";
import React from "react";

const All = async () => {
  const allSubs = await prisma.subreddit.findMany({});

  return (
    <>
      <div className="h-2"></div>
      <div className=" rounded-3xl text-3xl font-bold   p-6 bg-white cursor-pointer md:max-w-[800px]  mx-2 my-4 ">
        All Subreddits
      </div>
      <div className="md:flex flex-wrap    justify-evenly  md:max-w-[800px] w-full  ">
        {allSubs.map((subreddit) => {
          return (
            <Link key={subreddit.name} href={`r/${subreddit.name}`}>
              <div
                key={subreddit.id}
                className="max-w-96   mb-4 rounded-3xl p-4 bg-white shadow-lg text-justify hover:bg-zinc-100 cursor-pointer mx-2 "
              >
                <div className="flex items-center gap-x-4   my-2">
                  <img
                    className="rounded-full h-16 w-16 md:w-20 md:h-20  "
                    src={subreddit.image}
                    alt={subreddit.name}
                  />
                  <div className="md:text-3xl text-xl font-semibold">
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
