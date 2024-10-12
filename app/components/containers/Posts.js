"use client";
import React, { useEffect, useState } from "react";
import Post from "../Post";
import { PostLoader } from "../../content-loaders/all-content-loaders";
const Posts = React.memo(() => {
  const [postsData, setPostsData] = useState(null);
  const getPosts = async () => {
    const resonse = await fetch("api/posts", { method: "GET" });
    const data = await resonse.json();

    setPostsData(data);
  };
  useEffect(() => {
    getPosts();
  }, []);
  const timesToRender = 5;
  return (
    <>
      <div className="mt-0 md:mx-28 mx-2">
        {!postsData &&
          Array.from({ length: timesToRender }).map((_, index) => (
            <PostLoader key={index} />
          ))}
      </div>

      <div className="mt-0 md:mx-28 mx-2">
        {postsData &&
          postsData.map((post) => (
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
            />
          ))}
      </div>
    </>
  );
});

export default Posts;
