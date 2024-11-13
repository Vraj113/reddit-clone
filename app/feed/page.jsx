"use client";
import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import { PostLoader } from "../content-loaders/all-content-loaders";
import { getSession } from "next-auth/react";

const Feed = () => {
  const [data, setData] = useState({
    email: "",
    name: "",
  });
  const [postsData, setPostsData] = useState(null);

  const fetchSession = async () => {
    const session = await getSession();
    if (session) {
      setData({
        email: session.user?.email || "",
        name: session.user?.name || "",
      });
    }
  };

  const getPosts = async () => {
    const response = await fetch("/api/feed", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    setPostsData(result);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchSession();
      getPosts();
    };
    fetchData();
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
};

export default Feed;
