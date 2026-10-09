import Link from "next/link";
import ProfileToggle from "./ProfileToggle";

export default function NavBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="shell flex h-14 items-center gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-600 text-sm font-bold text-white">
            r
          </span>
          <span className="hidden font-semibold text-slate-900 sm:inline">
            RedditClone
          </span>
        </Link>

        <div className="hidden flex-1 md:block">
          <input
            type="search"
            placeholder="Search communities and posts"
            className="input-pro max-w-xl"
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Link href="/create" className="btn-primary hidden sm:inline-flex">
            Create post
          </Link>
          <ProfileToggle />
        </div>
      </div>
    </header>
  );
}
