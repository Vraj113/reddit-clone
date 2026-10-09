import prisma from "@/lib/prisma";
import Post from "@/app/components/Post";
import SubredditTop from "@/app/components/SubredditTop";

export default async function SubReddit({ params }) {
  const subredditData = await prisma.subreddit.findUnique({
    where: { name: params.slug },
  });

  const posts = await prisma.posts.findMany({
    where: { subredditId: params.slug },
    orderBy: { createdAt: "desc" },
  });

  if (!subredditData) {
    return (
      <div className="card p-10 text-center">
        <h1 className="text-xl font-semibold">Community not found</h1>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <SubredditTop
        slug={params.slug}
        name={subredditData.name}
        description={subredditData.description}
        image={subredditData.image}
        bannerImage={subredditData.bannerImage}
      />
      <div className="space-y-3">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post.id}
              title={post.title}
              description={post.description}
              link={post.link}
              postedBy={post.postedBy}
              votes={post.votes}
              subredditId={post.subredditId}
              slug={post.slug}
              createdAt={post.createdAt}
              imageURL={post.imageURL}
              subredditImg={subredditData.image}
            />
          ))
        ) : (
          <div className="card p-8 text-center text-sm text-slate-600">
            No posts in this community yet.
          </div>
        )}
      </div>
    </div>
  );
}
