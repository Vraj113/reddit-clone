"use client";
import React, { useEffect, useState } from "react";
import Post from "../Post";
import { PostLoader } from "../../content-loaders/all-content-loaders";
const Posts = () => {
  const [postsData, setPostsData] = useState(null);
  const getPosts = async () => {
    const resonse = await fetch("api/posts", { method: "GET" });
    const data = await resonse.json();
    console.log(data);
    setPostsData(data);
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="ml-28">
      {!postsData && (
        <>
          <PostLoader />
          <PostLoader />
          <PostLoader />
        </>
      )}

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
  );
};

export default Posts;
