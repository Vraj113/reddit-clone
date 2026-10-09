import prisma from "@/lib/prisma";
import Post from "../components/Post";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import PageHeader from "../components/ui/PageHeader";

export default async function Profile() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return (
      <div className="card p-8 text-center">
        <p className="text-slate-700">Sign in to view your profile.</p>
        <Link href="/api/auth/signin" className="btn-primary mt-4 inline-flex">
          Sign in
        </Link>
      </div>
    );
  }

  const posts = await prisma.posts.findMany({
    where: { postedByEmail: session.user.email },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="w-full space-y-4">
      <PageHeader eyebrow="Account" title="Profile" />
      <section className="card flex items-center gap-4 p-6">
        <img
          src={session.user.image || "/default-avatar.png"}
          alt=""
          className="h-16 w-16 rounded-full ring-2 ring-orange-100"
        />
        <div>
          <p className="text-lg font-semibold text-slate-900">{session.user.name}</p>
          <p className="text-sm text-slate-500">{session.user.email}</p>
        </div>
      </section>
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">Your posts</h2>
        {posts.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-sm text-slate-600">You have not posted yet.</p>
            <Link href="/create" className="btn-primary mt-4 inline-flex">
              Create a post
            </Link>
          </div>
        ) : (
          posts.map((post) => <Post key={post.id} {...post} />)
        )}
      </section>
    </div>
  );
}
