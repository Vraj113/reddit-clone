"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Post from "../components/Post";
import { PostLoader } from "../content-loaders/all-content-loaders";
import PageHeader from "../components/ui/PageHeader";

export default function Feed() {
  const { status } = useSession();
  const [postsData, setPostsData] = useState(null);

  useEffect(() => {
    if (status === "loading") return;

    if (status !== "authenticated") {
      setPostsData([]);
      return;
    }

    let cancelled = false;
    fetch("/api/feed")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setPostsData(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!cancelled) setPostsData([]);
      });

    return () => {
      cancelled = true;
    };
  }, [status]);

  return (
    <div>
      <PageHeader
        eyebrow="Personalized"
        title="Your feed"
        description="Posts from communities you have joined."
      />

      {status === "unauthenticated" && (
        <div className="card p-8 text-center">
          <p className="text-sm text-slate-600">Sign in to see your feed.</p>
          <Link href="/api/auth/signin" className="btn-primary mt-4 inline-flex">
            Sign in
          </Link>
        </div>
      )}

      {status === "authenticated" && !postsData && (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <PostLoader key={index} />
          ))}
        </div>
      )}

      {status === "authenticated" && postsData && (
        <div className="space-y-3">
          {postsData.length === 0 ? (
            <div className="card p-8 text-center text-sm text-slate-600">
              Join communities to see posts here.{" "}
              <Link href="/all" className="font-medium text-orange-700 hover:underline">
                Browse communities
              </Link>
            </div>
          ) : (
            postsData.map((post) => <Post key={post.id} {...post} />)
          )}
        </div>
      )}
    </div>
  );
}
