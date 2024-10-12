import React from "react";
import prisma from "@/lib/prisma";
import Comments from "../../../../components/containers/Comments";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ShareIcon from "@mui/icons-material/Share";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import Link from "next/link";
import LinkPreview from "@/app/components/LinkPreview";
import Image from "next/image";
import Post from "@/app/components/Post";
const PostwithSlug = async ({ params }) => {
  const post = await prisma.posts.findFirst({
    where: {
      slug: params.postSlug,
    },
  });
  const subredditData = await prisma.subreddit.findUnique({
    where: {
      name: post.subredditId,
    },
  });

  if (!subredditData) {
    return (
      <>
        <div className="w-full h-full flex justify-center items-center text-4xl font-semibold">
          <div className="-mt-10 -ml-10">Something went wrong</div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="md:mt-4  l mt-24 bg-zinc-100   md:mx-28 mx-2 ">
          {post && (
            <Post
              key={post.id}
              title={post.title}
              description={post.description}
              link={post.link}
              postedBy={post.postedBy}
              votes={post.votes}
              slug={post.slug}
              createdAt={post.createdAt}
              imageURL={post.imageURL}
              subredditId={post.subredditId}
              subredditImg={subredditData.image}
            />
          )}
        </div>

        <Comments slug={params.postSlug} />
      </>
    );
  }
};

export default PostwithSlug;
