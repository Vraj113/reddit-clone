"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const mobileLinks = [
  { href: "/", label: "Home" },
  { href: "/feed", label: "Feed" },
  { href: "/all", label: "Communities" },
  { href: "/create", label: "Create" },
  { href: "/profile", label: "Profile" },
];

export default function ProfileToggle() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (status !== "authenticated") {
    return (
      <Link href="/api/auth/signin" className="btn-secondary">
        Sign in
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        <img
          src={session.user?.image}
          alt=""
          className="h-7 w-7 rounded-full"
        />
        <span className="hidden max-w-[8rem] truncate sm:inline">
          {session.user?.name}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-lg lg:hidden">
          {mobileLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => signOut()}
            className="mt-1 w-full rounded-md px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
