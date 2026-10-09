"use client";

import { useState, useEffect } from "react";

export default function JoinButton({ slug }) {
  const [joined, setJoined] = useState(null);

  const checkJoined = async () => {
    const res = await fetch("/api/join", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ slug }),
    });
    const response = await res.json();
    setJoined(Boolean(response.joined));
  };

  const toggleJoin = async () => {
    await fetch("/api/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ slug }),
    });
    setJoined((prev) => !prev);
  };

  useEffect(() => {
    checkJoined();
  }, [slug]);

  if (joined === null) {
    return <div className="h-9 w-24 animate-pulse rounded-lg bg-slate-200" />;
  }

  return (
    <button
      type="button"
      onClick={toggleJoin}
      className={joined ? "btn-secondary" : "btn-primary"}
    >
      {joined ? "Joined" : "Join"}
    </button>
  );
}
