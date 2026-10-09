import prisma from "@/lib/prisma";
import Comments from "@/app/components/containers/Comments";
import PostDetail from "@/app/components/PostDetail";
import Link from "next/link";

export default async function PostwithSlug({ params }) {
  const post = await prisma.posts.findFirst({
    where: { slug: params.postSlug },
  });

  if (!post) {
    return (
      <div className="card p-10 text-center">
        <h1 className="text-xl font-semibold">Post not found</h1>
        <Link href="/" className="btn-primary mt-4 inline-flex">
          Back home
        </Link>
      </div>
    );
  }

  const community = await prisma.subreddit.findUnique({
    where: { name: post.subredditId },
  });

  return (
    <div className="w-full space-y-4">
      <Link
        href={`/r/${post.subredditId}`}
        className="inline-flex text-sm font-medium text-slate-600 hover:text-orange-700"
      >
        ← r/{post.subredditId}
      </Link>
      <PostDetail post={post} community={community} />
      <Comments slug={params.postSlug} />
    </div>
  );
}
