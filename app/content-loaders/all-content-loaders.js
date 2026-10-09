export const PostLoader = () => (
  <div className="card animate-pulse overflow-hidden">
    <div className="flex gap-4 p-4">
      <div className="flex w-10 flex-col items-center gap-2">
        <div className="h-4 w-4 rounded bg-slate-200" />
        <div className="h-3 w-6 rounded bg-slate-200" />
        <div className="h-4 w-4 rounded bg-slate-200" />
      </div>
      <div className="flex-1 space-y-3">
        <div className="h-3 w-40 rounded bg-slate-200" />
        <div className="h-5 w-3/4 rounded bg-slate-200" />
        <div className="h-3 w-full rounded bg-slate-200" />
        <div className="h-3 w-5/6 rounded bg-slate-200" />
        <div className="h-36 w-full rounded-lg bg-slate-100" />
      </div>
    </div>
  </div>
);

export const CommentLoader = () => (
  <div className="card animate-pulse p-4">
    <div className="h-3 w-32 rounded bg-slate-200" />
    <div className="mt-3 h-3 w-full rounded bg-slate-200" />
    <div className="mt-2 h-3 w-4/5 rounded bg-slate-200" />
  </div>
);
