"use client";
import React, { useEffect, useState } from "react";
import Comment from "../Comment";
import { CommentLoader } from "../../content-loaders/all-content-loaders";

const Comments = React.memo(({ slug }) => {
  const [commentsData, setCommentsData] = useState(null);
  const [comment, setComment] = useState("");
  const getComments = async () => {
    const res = await fetch("../../../api/comments", {
      method: "PUT",
      body: JSON.stringify({ slug }),
    });
    const data = await res.json();

    setCommentsData(data.comments);
  };
  const onChange = (e) => {
    setComment(e.target.value);
  };
  const addComment = async () => {
    let res = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug, content: comment }),
    });
    let response = await res.json();
    if (response.success) {
      setComment("");
      getComments();
    }
  };
  useEffect(() => {
    getComments();
  }, []);

  return (
    <div>
      <div className="  p-4 border2  mt-8 shadow-lg  bg-white rounded-lg md:mx-28 mx-2 ">
        <div className="text-3xl font-semibold">Comments</div>
        <div className="bg-zinc-100 p-4 rounded-xl my-2  font-semibold text-xl flex items-center ">
          <input
            placeholder="Add Comment"
            onChange={onChange}
            name="comment"
            value={comment}
            className="outline-1 font-semibold text-xl p-2 w-full rounded-md outline-blue-500 border-2 border-zinc-400"
          />
          <button
            className="bg-blue-600 text-white h-full p-2 rounded-md ml-2"
            onClick={addComment}
          >
            Post
          </button>
        </div>
        {!commentsData && (
          <>
            <CommentLoader />
            <CommentLoader />
            <CommentLoader />
          </>
        )}
        {commentsData &&
          commentsData.map((comment) => {
            return (
              <Comment
                key={comment.id}
                name={comment.postedByName}
                email={comment.email}
                content={comment.content}
                postedOn={comment.createdAt}
              />
            );
          })}
      </div>
    </div>
  );
});

export default Comments;
