"use client";

import React, { useEffect, useState } from "react";
import Post from "../Post";
import { PostLoader } from "../../content-loaders/all-content-loaders";

const Posts = React.memo(function Posts() {
  const [postsData, setPostsData] = useState(null);

  useEffect(() => {
    fetch("/api/posts", { method: "GET" })
      .then((res) => res.json())
      .then((data) => setPostsData(Array.isArray(data) ? data : data?.posts ?? []))
      .catch(() => setPostsData([]));
  }, []);

  if (!postsData) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <PostLoader key={i} />
        ))}
      </div>
    );
  }

  if (postsData.length === 0) {
    return (
      <div className="card p-10 text-center">
        <p className="text-lg font-semibold text-slate-900">No posts yet</p>
        <p className="mt-1 text-sm text-slate-600">
          Be the first to start a conversation in a community.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {postsData.map((post) => (
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
});

export default Posts;
