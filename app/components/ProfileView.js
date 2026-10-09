"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function ProfileView() {
  const { data: session, status } = useSession();

  if (status !== "authenticated") {
    return (
      <div className="card p-4">
        <h3 className="text-sm font-semibold text-slate-900">Get started</h3>
        <p className="mt-1 text-xs text-slate-600">
          Sign in to vote, comment, and personalize your feed.
        </p>
        <Link href="/api/auth/signin" className="btn-primary mt-3 w-full">
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="card p-4">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
        <img
          src={session?.user?.image || "/default-avatar.png"}
          alt=""
          className="h-10 w-10 rounded-full ring-2 ring-orange-100"
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-900">
            {session?.user?.name}
          </p>
          <p className="truncate text-xs text-slate-500">{session?.user?.email}</p>
        </div>
      </div>
      <div className="mt-2 space-y-1 text-sm">
        <Link href="/profile" className="block rounded-md px-2 py-1.5 text-slate-700 hover:bg-slate-50">
          Profile
        </Link>
        <Link href="/joined" className="block rounded-md px-2 py-1.5 text-slate-700 hover:bg-slate-50">
          Joined communities
        </Link>
        <button
          type="button"
          onClick={() => signOut()}
          className="w-full rounded-md px-2 py-1.5 text-left text-red-600 hover:bg-red-50"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
