import PageHeader from "../components/ui/PageHeader";

export default function Popular() {
  return (
    <div>
      <PageHeader
        eyebrow="Coming soon"
        title="Popular"
        description="Trending posts will show up here."
      />
      <div className="card p-8 text-sm text-slate-600">Nothing ranked yet.</div>
    </div>
  );
}
