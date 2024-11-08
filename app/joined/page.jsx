import prisma from "@/lib/prisma";
import Link from "next/link";
import React from "react";
import { cookies } from "next/headers";
import * as jose from "jose";

const Joined = async () => {
  const cookieStore = cookies();
  const token =
    cookieStore.get("next-auth.session-token")?.value ||
    cookieStore.get("__Secure-next-auth.session-token")?.value;

  if (!token) {
    return <div>You are not logged in</div>;
  }
  const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);
  const decoded = await jose.jwtVerify(token, secret);
  const { email } = decoded.payload;

  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  return (
    <>
      <div className="md:rounded-3xl rounded-none my-4 p-6 bg-white md:max-w-[800px]  m-auto  ">
        <div className="  md:text-3xl text-xl font-semibold    cursor-pointer border-b-2 pb-4 text-center ">
          Joined Subreddits
        </div>
        {user.joinedSubs.length === 0 && (
          <div className="bg-white cursor-pointer text-center  text-xl mt-4 ">
            No Subreddits Joined, Please Click{" "}
            <Link className="underline" href="/all">
              here
            </Link>{" "}
            to see the avaiable subreddits
          </div>
        )}
        {user.joinedSubs.length !== 0 && (
          <div className="flex flex-wrap  justify-start my-4 md:max-w-[800px] w-full m-auto gap-2 md:gap-4">
            {user.joinedSubs.map((subreddit) => {
              return (
                <Link href={`r/${subreddit}`} key={subreddit}>
                  <div className="max-w-96    rounded-3xl p-4 bg-white shadow-md text-justify hover:bg-zinc-100 cursor-pointer md:text-2xl text-lg font-semibold">
                    r/{subreddit}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Joined;
