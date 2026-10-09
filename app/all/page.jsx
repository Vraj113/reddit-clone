import prisma from "@/lib/prisma";
import Link from "next/link";
import PageHeader from "@/app/components/ui/PageHeader";

export default async function All() {
  const allSubs = await prisma.subreddit.findMany({ orderBy: { name: "asc" } });

  return (
    <div>
      <PageHeader
        eyebrow="Discover"
        title="Communities"
        description="Browse all subreddits and join the ones you care about."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {allSubs.map((subreddit) => (
          <Link key={subreddit.id} href={`/r/${subreddit.name}`}>
            <article className="card card-hover h-full p-4">
              <div className="flex items-center gap-3">
                <img
                  className="h-12 w-12 rounded-full ring-1 ring-slate-200"
                  src={subreddit.image}
                  alt=""
                />
                <div>
                  <h2 className="font-semibold text-slate-900">
                    r/{subreddit.name}
                  </h2>
                  <p className="line-clamp-2 text-sm text-slate-600">
                    {subreddit.description}
                  </p>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
