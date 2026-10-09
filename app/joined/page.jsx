import prisma from "@/lib/prisma";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import PageHeader from "../components/ui/PageHeader";

export default async function Joined() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return (
      <div className="card p-8 text-center">
        <p>Sign in to see communities you joined.</p>
        <Link href="/api/auth/signin" className="btn-primary mt-4 inline-flex">
          Sign in
        </Link>
      </div>
    );
  }

  const user = await prisma.user.findFirst({
    where: { email: session.user.email },
  });
  const joined = user?.joinedSubs || [];

  return (
    <div className="w-full">
      <PageHeader
        eyebrow="Memberships"
        title="Joined communities"
        description="Communities you follow."
      />
      {joined.length === 0 ? (
        <div className="card p-8 text-center text-sm text-slate-600">
          You have not joined any communities.{" "}
          <Link href="/all" className="font-medium text-orange-700 hover:underline">
            Browse all
          </Link>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {joined.map((name) => (
            <Link key={name} href={`/r/${name}`} className="card card-hover p-4">
              <p className="font-semibold text-slate-900">r/{name}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
