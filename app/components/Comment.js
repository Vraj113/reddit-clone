"use client";

function relativeTime(isoString) {
  const seconds = Math.floor((Date.now() - new Date(isoString)) / 1000);
  const units = [
    ["year", 31536000],
    ["month", 2592000],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];
  for (const [label, size] of units) {
    const count = Math.floor(seconds / size);
    if (count > 0) return `${count} ${label}${count > 1 ? "s" : ""} ago`;
  }
  return "just now";
}

export default function Comment({ name, content, postedOn }) {
  return (
    <article className="rounded-lg border border-slate-100 bg-slate-50 px-4 py-3">
      <div className="flex items-center gap-2 text-sm">
        <span className="font-semibold text-slate-900">{name}</span>
        <span className="text-slate-400">•</span>
        <span className="text-slate-500">{relativeTime(postedOn)}</span>
      </div>
      <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-800">
        {content}
      </p>
    </article>
  );
}
