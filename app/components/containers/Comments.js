"use client";

import React, { useEffect, useState } from "react";
import Comment from "../Comment";
import { CommentLoader } from "../../content-loaders/all-content-loaders";

const Comments = React.memo(function Comments({ slug }) {
  const [commentsData, setCommentsData] = useState(null);
  const [comment, setComment] = useState("");

  const getComments = async () => {
    const res = await fetch("/api/comments", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    });
    const data = await res.json();
    setCommentsData(data.comments || []);
  };

  const addComment = async () => {
    if (!comment.trim()) return;
    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, content: comment }),
    });
    const response = await res.json();
    if (response.success) {
      setComment("");
      getComments();
    }
  };

  useEffect(() => {
    getComments();
  }, [slug]);

  return (
    <section className="card w-full p-6 sm:p-8">
      <h2 className="text-lg font-semibold text-slate-900">
        Comments{commentsData ? ` · ${commentsData.length}` : ""}
      </h2>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          placeholder="Add a comment"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          className="input-pro"
        />
        <button type="button" className="btn-primary shrink-0" onClick={addComment}>
          Post
        </button>
      </div>
      <div className="mt-6 space-y-3">
        {!commentsData && (
          <>
            <CommentLoader />
            <CommentLoader />
          </>
        )}
        {commentsData?.length === 0 && (
          <p className="text-sm text-slate-500">No comments yet. Start the thread.</p>
        )}
        {commentsData?.map((item) => (
          <Comment
            key={item.id}
            name={item.postedByName}
            content={item.content}
            postedOn={item.createdAt}
          />
        ))}
      </div>
    </section>
  );
});

export default Comments;
