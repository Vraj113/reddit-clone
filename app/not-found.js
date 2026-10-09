import Link from "next/link";

export default function Custom404() {
  return (
    <div className="card mx-auto max-w-lg p-10 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">404</p>
      <h1 className="mt-2 text-2xl font-semibold text-slate-900">Page not found</h1>
      <p className="mt-2 text-sm text-slate-600">
        That link does not exist or the community was removed.
      </p>
      <Link href="/" className="btn-primary mt-6 inline-flex">
        Go home
      </Link>
    </div>
  );
}
